import { useState } from "react"
import { createUser } from "../services/userService"

import "../styles/users.css"

/**
 * Componente responsável pelo cadastro de usuários
 * Permite:
 * - Criar novos usuários
 * - Definir nível de permissão (RBAC)
 */
export default function Users(){

  /**
   * Estado do formulário de usuário
   */
  const [form,setForm] = useState({
    name:"",
    login:"",
    password:"",
    role:""
  })

  /**
   * Função genérica para atualizar os campos do formulário
   */
  const handleChange = (e:any)=>{

    setForm({
      ...form,
      [e.target.name]:e.target.value
    })

  }

  /**
   * Função executada ao enviar o formulário
   */
  const handleSubmit = async (e:any)=>{

    e.preventDefault() // Evita reload da página

    /**
     * Envia os dados para o backend
     */
    await createUser(form)

    /**
     * Feedback ao usuário
     */
    alert("Usuário criado com sucesso")

    /**
     * Limpa o formulário após envio
     */
    setForm({
      name:"",
      login:"",
      password:"",
      role:""
    })

  }

  return(

    <div className="users-container">

      <div className="users-card">

        <h2>Cadastro de Usuário</h2>

        <p className="subtitle">
          Cadastre novos usuários no sistema
        </p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label>Nome</label>

            <input
              name="name"
              placeholder="Nome completo"
              value={form.name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Login</label>

            <input
              name="login"
              placeholder="Login de acesso"
              value={form.login}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Senha</label>

            <input
              type="password"
              name="password"
              placeholder="Mínimo 6 caracteres"
              value={form.password}
              onChange={handleChange}
              required
            />

          </div>

          <div className="form-group">

            <label>Nível de Permissão</label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >

              <option value="">
                Selecione a permissão
              </option>

              <option value="ADMIN">
                Administrador
              </option>

              <option value="REGISTRO">
                Registro
              </option>

              <option value="AUTORIZACAO">
                Autorização
              </option>

            </select>

          </div>

          <button className="user-button">
            Salvar
          </button>

        </form>

      </div>

    </div>

  )

}