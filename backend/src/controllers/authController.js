/**
 * Importação do cliente Prisma para acesso ao banco de dados
 */
const prisma = require("../config/database")

/**
 * Função utilitária para comparar senha criptografada
 */
const { comparePassword } = require("../utils/hash")

/**
 * Função responsável por gerar o token JWT
 */
const { generateToken } = require("../utils/jwt")

/**
 * Controller de autenticação
 * Responsável por realizar o login do usuário
 */
async function login(req, res) {

    /**
     * Extração dos dados enviados no body da requisição
     */
    const { login, password } = req.body

    /**
     * Busca o usuário no banco de dados pelo login
     */
    const user = await prisma.user.findUnique({
        where: { login }
    })

    /**
     * Validação: usuário não encontrado
     */
    if (!user) {
        return res.status(401).json({ message: "Usuário inválido" })
    }

    /**
     * Verifica se a senha informada corresponde à senha armazenada (criptografada)
     */
    const valid = await comparePassword(password, user.password)

    /**
     * Validação: senha incorreta
     */
    if (!valid) {
        return res.status(401).json({ message: "Senha inválida" })
    }

    /**
     * Geração do token JWT com base nos dados do usuário
     */
    const token = generateToken(user)

    /**
     * Retorno da resposta com token e dados do usuário (sem expor senha)
     */
    res.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            role: user.role
        }
    })
}

/**
 * Exportação do controller
 */
module.exports = { login }