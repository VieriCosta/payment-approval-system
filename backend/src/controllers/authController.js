const prisma = require("../config/database")
const { comparePassword } = require("../utils/hash")
const { generateToken } = require("../utils/jwt")

async function login(req, res) {
    const { login, password } = req.body

    const user = await prisma.user.findUnique({
        where: { login }
    })

    if (!user) {
        return res.status(401).json({ message: "Usuário inválido" })
    }

    const valid = await comparePassword(password, user.password)

    if (!valid) {
        return res.status(401).json({ message: "Senha inválida" })
    }

    const token = generateToken(user)

    res.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            role: user.role
        }
    })
}

module.exports = { login }