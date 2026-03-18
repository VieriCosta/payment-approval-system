import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../services/authService"
import { useAuth } from "../context/AuthContext"

/**
 *  Componente de Login
 * Responsável por autenticar o usuário no sistema
 */
export default function Login() {

  /**
   *  Hook de navegação do React Router
   */
  const navigate = useNavigate()

  /**
   *  Contexto de autenticação
   * Permite atualizar o usuário globalmente
   */
  const { setUser } = useAuth()

  /**
   *  Estado do formulário de login
   */
  const [form, setForm] = useState({
    login: "",
    password: ""
  })

  /**
   *  Função executada ao submeter o formulário
   */
  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault() // Evita reload da página

    try {

      /**
       * 📡 Chamada para API de autenticação
       */
      const response = await login(form)

      /**
       *  Extração dos dados retornados pela API
       */
      const token = response.data.token
      const user = response.data.user

      /**
       *  Persistência no localStorage
       * Mantém usuário logado mesmo após refresh
       */
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      /**
       *  Atualiza o contexto global
       */
      setUser(user)

      /**
       *  Redireciona para dashboard
       */
      navigate("/dashboard")

    } catch (error) {

      /**
       *  Tratamento de erro (login inválido)
       */
      alert("Usuário ou senha inválidos")

    }

  }

  return (

    <div className="center full-height">

      <div className="card">

        {/*  Ícone visual */}
        <div style={{ fontSize: "32px", marginBottom: "10px" }}>
          💰
        </div>

        {/*  Título */}
        <h1>Gestão de Pagamentos</h1>

        {/*  Descrição */}
        <p style={{
          color: "#6b7280",
          marginBottom: "20px"
        }}>
          Entre com suas credenciais para acessar o sistema
        </p>

        {/*  Formulário */}
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