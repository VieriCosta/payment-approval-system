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

const { createUser } = require("../controllers/userController")
const authMiddleware = require("../middlewares/authMiddleware")
const roleMiddleware = require("../middlewares/roleMiddleware")

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criar usuário
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               login:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 example: REGISTRO
 *     responses:
 *       200:
 *         description: Usuário criado
 */

router.post("/", authMiddleware, roleMiddleware(["ADMIN"]), createUser);

module.exports = router