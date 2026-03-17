const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.getDashboard = async (req, res) => {
  try {

    const payments = await prisma.payment.findMany()

    const total = payments.reduce((acc,p)=>acc+p.valor,0)

    const approved = payments
      .filter(p=>p.status==="AUTORIZADO")
      .reduce((acc,p)=>acc+p.valor,0)

    const pending = payments
      .filter(p=>p.status==="PENDENTE")
      .reduce((acc,p)=>acc+p.valor,0)

    const rejected = payments
      .filter(p=>p.status==="REJEITADO")
      .reduce((acc,p)=>acc+p.valor,0)

    const count = {
      pending: payments.filter(p=>p.status==="PENDENTE").length,
      approved: payments.filter(p=>p.status==="AUTORIZADO").length,
      rejected: payments.filter(p=>p.status==="REJEITADO").length
    }

    const monthlyMap = {}

    payments.forEach(p => {
      const date = new Date(p.dataRegistro)
      const key = `${date.getMonth()+1}/${date.getFullYear()}`

      if(!monthlyMap[key]){
        monthlyMap[key] = 0
      }

      monthlyMap[key] += p.valor
    })

    const monthly = Object.keys(monthlyMap).map(key => ({
      month: key,
      total: monthlyMap[key]
    }))

    res.json({
      total,
      approved,
      pending,
      rejected,
      count,
      monthly
    })

  } catch (error) {
    res.status(500).json({ message:"Erro ao carregar dashboard" })
  }
}