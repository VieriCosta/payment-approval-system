/**
 * Importação do Prisma Client para acesso ao banco de dados
 */
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

/**
 * Controller responsável por fornecer os dados do dashboard financeiro
 * Retorna:
 * - Totais financeiros por status
 * - Quantidade de registros por status
 * - Evolução mensal dos valores
 */
exports.getDashboard = async (req, res) => {
  try {

    /**
     * Busca todos os pagamentos no banco de dados
     */
    const payments = await prisma.payment.findMany()

    /**
     * Soma total de todos os pagamentos
     */
    const total = payments.reduce((acc,p)=>acc+p.valor,0)

    /**
     * Soma dos pagamentos aprovados
     */
    const approved = payments
      .filter(p=>p.status==="AUTORIZADO")
      .reduce((acc,p)=>acc+p.valor,0)

    /**
     * Soma dos pagamentos pendentes
     */
    const pending = payments
      .filter(p=>p.status==="PENDENTE")
      .reduce((acc,p)=>acc+p.valor,0)

    /**
     * Soma dos pagamentos rejeitados
     */
    const rejected = payments
      .filter(p=>p.status==="REJEITADO")
      .reduce((acc,p)=>acc+p.valor,0)

    /**
     * Contagem de registros por status
     */
    const count = {
      pending: payments.filter(p=>p.status==="PENDENTE").length,
      approved: payments.filter(p=>p.status==="AUTORIZADO").length,
      rejected: payments.filter(p=>p.status==="REJEITADO").length
    }

    /**
     * Agrupamento de valores por mês/ano
     */
    const monthlyMap = {}

    payments.forEach(p => {
      const date = new Date(p.dataRegistro)

      /**
       * Chave no formato MM/YYYY
       */
      const key = `${date.getMonth()+1}/${date.getFullYear()}`

      if(!monthlyMap[key]){
        monthlyMap[key] = 0
      }

      /**
       * Soma dos valores por mês
       */
      monthlyMap[key] += p.valor
    })

    /**
     * Conversão do mapa para array (usado no gráfico)
     */
    const monthly = Object.keys(monthlyMap).map(key => ({
      month: key,
      total: monthlyMap[key]
    }))

    /**
     * Retorno dos dados consolidados
     */
    res.json({
      total,
      approved,
      pending,
      rejected,
      count,
      monthly
    })

  } catch (error) {

    /**
     * Tratamento de erro interno
     */
    res.status(500).json({ message:"Erro ao carregar dashboard" })
  }
}