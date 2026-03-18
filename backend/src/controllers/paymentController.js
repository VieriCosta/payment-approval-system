/**
 * Importação do Prisma Client (conexão com banco de dados)
 */
const prisma = require("../config/database");

/**
 * =========================
 * CRIAR PAGAMENTO
 * =========================
 * Cria um novo registro de pagamento
 * Associa automaticamente ao usuário autenticado (solicitante)
 */
exports.createPayment = async (req, res) => {
  try {
    const { cnpj, razaoSocial, valor, descricao } = req.body;

    const payment = await prisma.payment.create({
      data: {
        cnpj,
        razaoSocial,
        valor,
        descricao,
        solicitanteId: req.user.id // usuário logado via JWT
      }
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar pagamento" });
  }
};

/**
 * =========================
 * LISTAR PAGAMENTOS
 * =========================
 * Suporte a:
 * - Filtros (status, data)
 * - Paginação
 * - Ordenação
 * - Inclusão de relacionamentos (solicitante e autorizador)
 */
exports.getPayments = async (req, res) => {
  try {

    const {
      status,
      page = 1,
      limit = 10,
      sort = "dataRegistro",
      order = "desc",
      dataInicio,
      dataFim
    } = req.query;

    /**
     * Cálculo de paginação
     */
    const skip = (page - 1) * limit;

    /**
     * Filtros dinâmicos
     */
    const where = {};

    if (status) {
      where.status = status;
    }

    /**
     * Filtro por intervalo de datas
     */
    if (dataInicio || dataFim) {
      where.dataRegistro = {};

      if (dataInicio) {
        where.dataRegistro.gte = new Date(dataInicio);
      }

      if (dataFim) {
        where.dataRegistro.lte = new Date(dataFim);
      }
    }

    /**
     * Ordenação dinâmica
     */
    const orderBy = {};

    if (sort === "valor") {
      orderBy.valor = order;
    } else {
      orderBy.dataRegistro = order;
    }

    /**
     * Consulta paginada com relacionamentos
     */
    const payments = await prisma.payment.findMany({
      where,
      skip: Number(skip),
      take: Number(limit),
      orderBy,
      include: {
        solicitante: {
          select: {
            id: true,
            name: true
          }
        },
        autorizador: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    /**
     * Total de registros (para paginação)
     */
    const total = await prisma.payment.count({ where });

    /**
     * Retorno estruturado
     */
    res.json({
      total,
      page: Number(page),
      limit: Number(limit),
      sort,
      order,
      data: payments
    });

  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar pagamentos" });
  }
};

/**
 * =========================
 * BUSCAR POR ID
 * =========================
 * Retorna um pagamento específico com seus relacionamentos
 */
exports.getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await prisma.payment.findUnique({
      where: { id: Number(id) },
      include: {
        solicitante: true,
        autorizador: true
      }
    });

    if (!payment) {
      return res.status(404).json({ message: "Pagamento não encontrado" });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar pagamento" });
  }
};

/**
 * =========================
 * AUTORIZAR PAGAMENTO
 * =========================
 * Regras:
 * - Deve existir
 * - Deve estar com status PENDENTE
 * - Registra quem autorizou e data
 */
exports.authorizePayment = async (req, res) => {
  try {
    const { id } = req.params;

    const payment = await prisma.payment.findUnique({
      where: { id: Number(id) }
    });

    if (!payment) {
      return res.status(404).json({ message: "Pagamento não encontrado" });
    }

    if (payment.status !== "PENDENTE") {
      return res.status(400).json({ message: "Pagamento já processado" });
    }

    const updated = await prisma.payment.update({
      where: { id: Number(id) },
      data: {
        status: "AUTORIZADO",
        autorizadorId: req.user.id,
        dataAutorizacao: new Date()
      }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Erro ao autorizar pagamento" });
  }
};

/**
 * =========================
 * REJEITAR PAGAMENTO
 * =========================
 * Regras:
 * - Deve existir
 * - Deve estar PENDENTE
 * - Deve ter motivo
 */
exports.rejectPayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { motivo } = req.body;

    const payment = await prisma.payment.findUnique({
      where: { id: Number(id) }
    });

    if (!payment) {
      return res.status(404).json({ message: "Pagamento não encontrado" });
    }

    if (payment.status !== "PENDENTE") {
      return res.status(400).json({ message: "Pagamento já processado" });
    }

    const updated = await prisma.payment.update({
      where: { id: Number(id) },
      data: {
        status: "REJEITADO",
        motivoRejeicao: motivo,
        autorizadorId: req.user.id,
        dataAutorizacao: new Date()
      }
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Erro ao rejeitar pagamento" });
  }
};