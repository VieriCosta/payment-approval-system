const { PrismaClient } = require("@prisma/client")
const bcrypt = require("bcrypt")

const prisma = new PrismaClient()

async function main(){

  const passwordHash = await bcrypt.hash("123456",10)

  /* =====================
     USUÁRIOS
  ===================== */

  const admin = await prisma.user.upsert({
    where:{ login:"admin" },
    update:{},
    create:{
      name:"Administrador",
      login:"admin",
      password:passwordHash,
      role:"ADMIN"
    }
  })

  const registro = await prisma.user.upsert({
    where:{ login:"registro" },
    update:{},
    create:{
      name:"Usuário Registro",
      login:"registro",
      password:passwordHash,
      role:"REGISTRO"
    }
  })

  const autorizacao = await prisma.user.upsert({
    where:{ login:"autorizacao" },
    update:{},
    create:{
      name:"Usuário Autorização",
      login:"autorizacao",
      password:passwordHash,
      role:"AUTORIZACAO"
    }
  })

  console.log("Usuários criados")

  /* =====================
     PAGAMENTOS EM MASSA
  ===================== */

  const pagamentos = []

  const empresas = [
    "Tech Solutions Ltda",
    "Segurança Total S.A.",
    "Consultoria ABC",
    "Logística Express",
    "Alimentos & Cia",
    "Marketing Digital Pro",
    "ConstruTech Engenharia",
    "SoftCloud Sistemas",
    "Finance Group",
    "Serviços Gerais Brasil"
  ]

  const descricoes = [
    "Serviço de TI",
    "Consultoria empresarial",
    "Manutenção predial",
    "Serviço de transporte",
    "Campanha de marketing",
    "Fornecimento de alimentos",
    "Desenvolvimento de sistema",
    "Infraestrutura de rede"
  ]

  const statusList = ["PENDENTE", "AUTORIZADO", "REJEITADO"]

  for(let i = 0; i < 50; i++){

    const status = statusList[Math.floor(Math.random() * statusList.length)]

    pagamentos.push({
      cnpj: `${Math.floor(Math.random()*90)+10}.${Math.floor(Math.random()*900)+100}.${Math.floor(Math.random()*900)+100}/0001-${Math.floor(Math.random()*90)+10}`,
      razaoSocial: empresas[Math.floor(Math.random() * empresas.length)],
      valor: Math.floor(Math.random() * 20000) + 500,
      descricao: descricoes[Math.floor(Math.random() * descricoes.length)],
      status,

      solicitanteId: Math.random() > 0.5 ? registro.id : admin.id,

      /* 🔥 DATA CORRETA */
      dataRegistro: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 86400000
      ),

      autorizadorId: status !== "PENDENTE" ? autorizacao.id : null,
      dataAutorizacao: status !== "PENDENTE" ? new Date() : null,
      motivoRejeicao: status === "REJEITADO" ? "Dados inconsistentes" : null
    })
  }

  await prisma.payment.createMany({
    data: pagamentos
  })

  console.log("50 pagamentos criados com sucesso")

}

main()
.catch((e)=>{
  console.error(e)
  process.exit(1)
})
.finally(async ()=>{
  await prisma.$disconnect()
})