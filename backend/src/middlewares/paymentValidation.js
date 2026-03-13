const { body, validationResult } = require("express-validator");

exports.validateCreatePayment = [
  body("cnpj")
    .notEmpty()
    .withMessage("CNPJ é obrigatório")
    .isLength({ min: 14, max: 14 })
    .withMessage("CNPJ deve ter 14 dígitos"),

  body("razaoSocial")
    .notEmpty()
    .withMessage("Razão social é obrigatória")
    .isLength({ min: 3 })
    .withMessage("Razão social deve ter pelo menos 3 caracteres"),

  body("valor")
    .notEmpty()
    .withMessage("Valor é obrigatório")
    .isFloat({ gt: 0 })
    .withMessage("Valor deve ser maior que zero"),

  body("descricao")
    .notEmpty()
    .withMessage("Descrição é obrigatória")
    .isLength({ min: 5 })
    .withMessage("Descrição deve ter pelo menos 5 caracteres"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    next();
  }
];

exports.validateRejectPayment = [
  body("motivo")
    .notEmpty()
    .withMessage("Motivo da rejeição é obrigatório")
    .isLength({ min: 3 })
    .withMessage("Motivo deve ter pelo menos 3 caracteres"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    next();
  }
];