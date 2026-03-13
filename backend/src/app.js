require("dotenv").config()

const express = require("express")
const cors = require("cors")

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes");
const testRoutes = require("./routes/testRoutes")
const paymentRoutes = require("./routes/paymentRoutes");

const swaggerDocs = require("./config/swagger")
const authMiddleware = require("./middlewares/authMiddleware")
const roleMiddleware = require("./middlewares/roleMiddleware")


const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/", testRoutes)
app.use("/users", userRoutes);
app.use("/payments", paymentRoutes);

swaggerDocs(app)

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000")
})

app.get("/protected", authMiddleware, (req, res) => {

  res.json({
    message: "Rota protegida acessada",
    user: req.user
  })

})

app.get(
  "/admin",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  (req, res) => {
    res.json({ message: "Área administrativa" })
  }
)

app.get(
  "/registro",
  authMiddleware,
  roleMiddleware(["REGISTRO", "ADMIN"]),
  (req, res) => {
    res.json({ message: "Área de registro" })
  }
)

app.get(
  "/autorizacao",
  authMiddleware,
  roleMiddleware(["AUTORIZACAO", "ADMIN"]),
  (req, res) => {
    res.json({ message: "Área de autorização" })
  }
)