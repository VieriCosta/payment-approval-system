const prisma = require("../config/database")
const bcrypt = require("bcrypt")

async function createUser(req, res) {

  const { name, login, password, role } = req.body

  if (!name || !login || !password || !role) {
    return res.status(400).json({
      message: "Todos os campos são obrigatórios"
    })
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      login,
      password: passwordHash,
      role
    }
  })

  res.json(user)
}

module.exports = { createUser }