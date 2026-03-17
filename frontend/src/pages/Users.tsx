import { useState } from "react"
import { createUser } from "../services/userService"

import "../styles/users.css"

export default function Users(){

  const [form,setForm] = useState({
    name:"",
    login:"",
    password:"",
    role:""
  })


  const handleChange = (e:any)=>{

    setForm({
      ...form,
      [e.target.name]:e.target.value
    })

  }


  const handleSubmit = async (e:any)=>{

    e.preventDefault()

    await createUser(form)

    alert("Usuário criado com sucesso")

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