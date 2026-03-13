/**
 * ============================================================
 * DOCUMENTAÇÃO DA API
 * ------------------------------------------------------------
 * A documentação desta API foi estruturada utilizando Swagger.
 * Parte da organização e geração inicial dos comentários foi
 * auxiliada por ferramentas de Inteligência Artificial (IA),
 * com posterior revisão, adaptação e validação manual por mim.
 *
 * Objetivo: garantir maior clareza na documentação dos endpoints
 * e facilitar o entendimento e consumo da API.
 * ============================================================
 */

const express = require("express");
const router = express.Router();

const {
  createPayment,
  getPayments,
  getPaymentById,
  authorizePayment,
  rejectPayment
} = require("../controllers/paymentController");

const {
  validateCreatePayment,
  validateRejectPayment
} = require("../middlewares/paymentValidation");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Gerenciamento de pagamentos
 */


/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Registrar um novo pagamento
 *     description: Cria um pagamento com status inicial PENDENTE
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cnpj
 *               - razaoSocial
 *               - valor
 *               - descricao
 *             properties:
 *               cnpj:
 *                 type: string
 *                 example: "12345678000100"
 *               razaoSocial:
 *                 type: string
 *                 example: "Empresa Teste LTDA"
 *               valor:
 *                 type: number
 *                 example: 1500
 *               descricao:
 *                 type: string
 *                 example: "Pagamento fornecedor"
 *     responses:
 *       201:
 *         description: Pagamento criado com sucesso
 *       401:
 *         description: Token não informado
 */
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["REGISTRO", "AUTORIZACAO", "ADMIN"]),
  validateCreatePayment,
  createPayment
);


/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Listar pagamentos
 *     description: Lista pagamentos com filtros, paginação e ordenação
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [PENDENTE, AUTORIZADO, REJEITADO]
 *         description: Filtrar pagamentos por status
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Página da consulta
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: Quantidade de registros por página
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [dataRegistro, valor]
 *         description: Campo de ordenação
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Direção da ordenação
 *     responses:
 *       200:
 *         description: Lista de pagamentos
 */
router.get("/", authMiddleware, getPayments);


/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Buscar pagamento por ID
 *     description: Retorna um pagamento específico
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pagamento
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Pagamento encontrado
 *       404:
 *         description: Pagamento não encontrado
 */
router.get("/:id", authMiddleware, getPaymentById);


/**
 * @swagger
 * /payments/{id}/authorize:
 *   post:
 *     summary: Autorizar pagamento
 *     description: Altera o status do pagamento para AUTORIZADO
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pagamento
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Pagamento autorizado
 *       404:
 *         description: Pagamento não encontrado
 */
router.post(
  "/:id/authorize",
  authMiddleware,
  roleMiddleware(["AUTORIZACAO", "ADMIN"]),
  authorizePayment
);


/**
 * @swagger
 * /payments/{id}/reject:
 *   post:
 *     summary: Rejeitar pagamento
 *     description: Altera o status do pagamento para REJEITADO
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do pagamento
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - motivo
 *             properties:
 *               motivo:
 *                 type: string
 *                 example: "Valor incorreto"
 *     responses:
 *       200:
 *         description: Pagamento rejeitado
 *       404:
 *         description: Pagamento não encontrado
 */
router.post(
  "/:id/reject",
  authMiddleware,
  roleMiddleware(["AUTORIZACAO", "ADMIN"]),
  validateRejectPayment,
  rejectPayment
);


module.exports = router;