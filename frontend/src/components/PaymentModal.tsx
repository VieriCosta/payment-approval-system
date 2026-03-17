import { useState } from "react"
import { authorizePayment,rejectPayment } from "../services/paymentService"

export default function PaymentModal({payment,close,reload}:any){

  const [reason,setReason] = useState("")

  const handleApprove = async()=>{

    await authorizePayment(payment.id)

    reload()
    close()

  }

  const handleReject = async()=>{

    if(!reason){

      alert("Informe o motivo da rejeição")
      return

    }

    await rejectPayment(payment.id,reason)

    reload()
    close()

  }

  return(

    <div className="modal-overlay">

      <div className="modal">

        <h3>Detalhes do Pagamento</h3>

        <p className="modal-subtitle">
          Revise os dados e autorize ou rejeite
        </p>

        <div className="modal-grid">

          <div>
            <label>CNPJ</label>
            <p>{payment.cnpj}</p>
          </div>

          <div>
            <label>Razão Social</label>
            <p>{payment.name}</p>
          </div>

          <div>
            <label>Valor</label>
            <p className="value">
              R$ {payment.value}
            </p>
          </div>

          <div>
            <label>Data Registro</label>
            <p>{payment.date}</p>
          </div>

          <div>
            <label>Solicitante</label>
            <p>{payment.requester}</p>
          </div>

        </div>


        <div className="description">

          <label>Descrição do Serviço</label>

          <p>{payment.description}</p>

        </div>


        <div className="reject-box">

          <label>
            Motivo da Rejeição
          </label>

          <textarea
            placeholder="Informe o motivo caso vá rejeitar..."
            value={reason}
            onChange={(e)=>setReason(e.target.value)}
          />

        </div>


        <div className="modal-buttons">

          <button 
            className="approve"
            onClick={handleApprove}
          >
            ✔ Autorizar
          </button>

          <button 
            className="reject"
            onClick={handleReject}
          >
            ✖ Rejeitar
          </button>

        </div>

      </div>

    </div>

  )

}