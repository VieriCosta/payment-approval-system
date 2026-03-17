import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/authService"
import { useAuth } from "../context/AuthContext"

export default function Login() {

  const navigate = useNavigate()

  const { setUser } = useAuth()

  const [form, setForm] = useState({
    login: "",
    password: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()

    try {

      const response = await login(form)

      const token = response.data.token
      const user = response.data.user

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      setUser(user)

      navigate("/dashboard")

    } catch (error) {

      alert("Usuário ou senha inválidos")

    }

  }

  return (

    <div className="center full-height">

      <div className="card">

        <div style={{ fontSize: "32px", marginBottom: "10px" }}>
          💰
        </div>

        <h1>Gestão de Pagamentos</h1>

        <p style={{
          color: "#6b7280",
          marginBottom: "20px"
        }}>
          Entre com suas credenciais para acessar o sistema
        </p>

        <form className="form" onSubmit={handleSubmit}>

          <label>Login</label>

          <input
            placeholder="Seu login"
            value={form.login}
            onChange={(e) =>
              setForm({ ...form, login: e.target.value })
            }
          />

          <label>Senha</label>

          <input
            type="password"
            placeholder="Sua senha"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button type="submit">
            Entrar
          </button>

        </form>

      </div>

    </div>

  )

}