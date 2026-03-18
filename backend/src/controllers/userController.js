/**
 * Importação do Prisma Client (acesso ao banco)
 */
const prisma = require("../config/database")

/**
 * Biblioteca para hash de senha
 */
const bcrypt = require("bcrypt")

/**
 * Controller responsável por criar novos usuários
 * Funcionalidades:
 * - Validação de campos obrigatórios
 * - Criptografia de senha
 * - Persistência no banco de dados
 */
async function createUser(req, res) {

  /**
   * Extração dos dados enviados no body
   */
  const { name, login, password, role } = req.body

  /**
   * Validação básica de campos obrigatórios
   */
  if (!name || !login || !password || !role) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios"
    })
  }

  /**
   * Criptografia da senha utilizando bcrypt
   * Salt rounds: 10 (nível padrão seguro)
   */
  const passwordHash = await bcrypt.hash(password, 10)

  /**
   * Criação do usuário no banco de dados
   */
  const user = await prisma.user.create({
    data: {
      name,
      login,
      password: passwordHash,
      role
    }
  })

  /**
   * Retorno da resposta (sem tratamento adicional)
   */
  res.json(user)
}

/**
 * Exportação do controller
 */
module.exports = { createUser }