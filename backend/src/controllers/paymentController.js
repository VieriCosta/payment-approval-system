const prisma = require("../config/database");

// Criar pagamento
exports.createPayment = async (req, res) => {
  try {
    const { cnpj, razaoSocial, valor, descricao } = req.body;

    const payment = await prisma.payment.create({
      data: {
        cnpj,
        razaoSocial,
        valor,
        descricao,
        solicitanteId: req.user.id
      }
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar pagamento" });
  }
};

// Listar pagamentos
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

    const skip = (page - 1) * limit;

    const where = {};

    if (status) {
      where.status = status;
    }

    if (dataInicio || dataFim) {
      where.dataRegistro = {};

      if (dataInicio) {
        where.dataRegistro.gte = new Date(dataInicio);
      }

      if (dataFim) {
        where.dataRegistro.lte = new Date(dataFim);
      }
    }

    const orderBy = {};

    if (sort === "valor") {
      orderBy.valor = order;
    } else {
      orderBy.dataRegistro = order;
    }

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

    const total = await prisma.payment.count({ where });

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

// Buscar pagamento por id
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

// Autorizar pagamento
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

// Rejeitar pagamento
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