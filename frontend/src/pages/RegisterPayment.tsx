import { useState } from "react"
import { createPayment } from "../services/paymentService"
import "../styles/register.css"

export default function RegisterPayment(){

  const [form,setForm] = useState({

    cnpj:"",
    razaoSocial:"",
    valor:"",
    descricao:""

  })

  const handleSubmit = async (e:any)=>{

    e.preventDefault()

    await createPayment({

      cnpj:form.cnpj,
      razaoSocial:form.razaoSocial,
      valor:Number(form.valor),
      descricao:form.descricao

    })

    alert("Pagamento registrado")

    setForm({

      cnpj:"",
      razaoSocial:"",
      valor:"",
      descricao:""

    })
  }

  return(

    <div className="form-container">

      <h1>Registrar Pagamento</h1>

      <p>Preencha os dados do pagamento ao fornecedor</p>

      <form onSubmit={handleSubmit}>

        <label>CNPJ</label>

        <input
          placeholder="00.000.000/0000-00"
          value={form.cnpj}
          onChange={(e)=>setForm({...form,cnpj:e.target.value})}
        />

        <label>Razão Social</label>

        <input
          placeholder="Nome da empresa"
          value={form.razaoSocial}
          onChange={(e)=>setForm({...form,razaoSocial:e.target.value})}
        />

        <label>Valor</label>

        <input
          placeholder="0.00"
          value={form.valor}
          onChange={(e)=>setForm({...form,valor:e.target.value})}
        />

        <label>Descrição</label>

        <textarea
          placeholder="Descreva o serviço"
          value={form.descricao}
          onChange={(e)=>setForm({...form,descricao:e.target.value})}
        />

        <button type="submit">
          Enviar
        </button>

      </form>

    </div>

  )
}