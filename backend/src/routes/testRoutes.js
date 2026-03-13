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

const authMiddleware = require("../middlewares/authMiddleware")
const roleMiddleware = require("../middlewares/roleMiddleware")

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Acesso área administrativa
 *     tags: [Test]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acesso permitido
 */
router.get(
  "/admin",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  (req, res) => {
    res.json({ message: "Área administrativa" })
  }
)

/**
 * @swagger
 * /registro:
 *   get:
 *     summary: Acesso área de registro
 *     tags: [Test]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acesso permitido
 */
router.get(
  "/registro",
  authMiddleware,
  roleMiddleware(["REGISTRO", "ADMIN"]),
  (req, res) => {
    res.json({ message: "Área de registro" })
  }
)

/**
 * @swagger
 * /autorizacao:
 *   get:
 *     summary: Acesso área de autorização
 *     tags: [Test]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Acesso permitido
 */
router.get(
  "/autorizacao",
  authMiddleware,
  roleMiddleware(["AUTORIZACAO", "ADMIN"]),
  (req, res) => {
    res.json({ message: "Área de autorização" })
  }
)

module.exports = router