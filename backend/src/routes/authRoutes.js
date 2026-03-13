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
const express = require("express")
const router = express.Router()

const { login } = require("../controllers/authController")

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realiza login do usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 */
router.post("/login", login)

module.exports = router