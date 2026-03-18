import { useEffect, useState } from "react"
import {
  getPayments,
  authorizePayment,
  rejectPayment
} from "../services/paymentService"

import "../styles/authorize.css"

/**
 * Interface que representa um pagamento
 */
interface Payment{
  id:number
  cnpj:string
  razaoSocial:string
  valor:number
  descricao:string
  status:string
  dataRegistro:string
  solicitante?:{
    name:string
  }
}

/**
 * Componente responsável pela autorização de pagamentos
 * Permite:
 * - Listar pagamentos pendentes
 * - Visualizar detalhes
 * - Autorizar ou rejeitar pagamentos
 * - Paginação dos resultados
 */
export default function AuthorizePayments(){

  /**
   * Lista de pagamentos
   */
  const [payments,setPayments] = useState<Payment[]>([])

  /**
   * Pagamento selecionado (modal)
   */
  const [selected,setSelected] = useState<Payment | null>(null)

  /**
   * Motivo da rejeição
   */
  const [reason,setReason] = useState("")

  /**
   * Estados de controle
   */
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState("")

  /**
   * Controle de paginação
   */
  const [page,setPage] = useState(1)
  const [limit] = useState(5)
  const [total,setTotal] = useState(0)

  /**
   * Total de páginas calculado
   */
  const totalPages = Math.ceil(total / limit)

  /* ================= LOAD ================= */

  /**
   * Carrega pagamentos pendentes do backend
   */
  const loadPayments = async () => {

    setLoading(true)
    setError("")

    try{

      const response = await getPayments({
        status:"PENDENTE",
        page,
        limit
      })

      const res = response.data

      setPayments(res.data)
      setTotal(res.total)

    } catch {
      setError("Erro ao carregar pagamentos")
    } finally{
      setLoading(false)
    }
  }

  /**
   * Executa ao montar e ao mudar de página
   */
  useEffect(()=>{
    loadPayments()
  },[page])

  /* ================= AÇÕES ================= */

  /**
   * Autoriza um pagamento selecionado
   */
  const authorize = async () => {

    if(!selected) return

    if(selected.status !== "PENDENTE"){
      alert("Esse pagamento já foi processado")
      return
    }

    const confirm = window.confirm("Deseja autorizar este pagamento?")
    if(!confirm) return

    try{
      await authorizePayment(selected.id)
      alert("Pagamento autorizado com sucesso")
      setSelected(null)
      loadPayments()
    } catch {
      alert("Erro ao autorizar pagamento")
    }
  }

  /**
   * Rejeita um pagamento selecionado
   */
  const reject = async () => {

    if(!selected) return

    if(selected.status !== "PENDENTE"){
      alert("Esse pagamento já foi processado")
      return
    }

    if(!reason){
      alert("Informe o motivo da rejeição")
      return
    }

    const confirm = window.confirm("Deseja rejeitar este pagamento?")
    if(!confirm) return

    try{
      await rejectPayment(selected.id,reason)
      alert("Pagamento rejeitado com sucesso")
      setSelected(null)
      setReason("")
      loadPayments()
    } catch {
      alert("Erro ao rejeitar pagamento")
    }
  }

  /* ================= UI ================= */

  return(

    <div className="authorize-container">

      <h1>Autorizar Pagamentos</h1>

      <p className="subtitle">
        Pagamentos pendentes de aprovação
      </p>

      <div className="page-center">

        <div className="card">

          <h2>Pagamentos Pendentes</h2>

          <p>{payments.length} pagamento(s) aguardando aprovação</p>

          {error && <p style={{color:"red"}}>{error}</p>}

          {loading ? (

            <p>Carregando...</p>

          ) : (

            <table className="table">

              <thead>
                <tr>
                  <th>Data</th>
                  <th>Favorecido</th>
                  <th>Valor</th>
                  <th>Solicitante</th>
                </tr>
              </thead>

              <tbody>

                {payments.length === 0 ? (

                  <tr>
                    <td colSpan={4} style={{textAlign:"center"}}>
                      Nenhum pagamento pendente
                    </td>
                  </tr>

                ) : (

                  payments.map(p=>(

                    <tr key={p.id} onClick={()=>setSelected(p)}>

                      <td>
                        {new Date(p.dataRegistro).toLocaleDateString("pt-BR")}
                      </td>

                      <td>{p.razaoSocial}</td>

                      <td>
                        R$ {p.valor.toLocaleString("pt-BR",{
                          minimumFractionDigits:2
                        })}
                      </td>

                      <td>{p.solicitante?.name || "-"}</td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          )}

          {/* Paginação */}

          <div style={{
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            marginTop:"15px"
          }}>

            <button
              className="btn-pagination"
              disabled={page === 1}
              onClick={()=>setPage(page - 1)}
            >
              Anterior
            </button>

            <span>
              Página {page} de {totalPages || 1}
            </span>

            <button
              className="btn-pagination"
              disabled={page === totalPages || totalPages === 0}
              onClick={()=>setPage(page + 1)}
            >
              Próximo
            </button>

          </div>

        </div>

      </div>

      {/* Modal de detalhes */}

      {selected && (

        <div className="modal-overlay">

          <div className="modal-box">

            <div className="modal-header">
              <h2>Detalhes do Pagamento</h2>
              <button onClick={()=>setSelected(null)}>X</button>
            </div>

            <p className="modal-subtitle">
              Revise os dados e autorize ou rejeite
            </p>

            <div className="modal-grid">

              <div>
                <strong>CNPJ</strong>
                <p>{selected.cnpj}</p>
              </div>

              <div>
                <strong>Razão Social</strong>
                <p>{selected.razaoSocial}</p>
              </div>

              <div>
                <strong>Valor</strong>
                <p>R$ {selected.valor}</p>
              </div>

              <div>
                <strong>Data</strong>
                <p>{new Date(selected.dataRegistro).toLocaleDateString()}</p>
              </div>

              <div>
                <strong>Solicitante</strong>
                <p>{selected.solicitante?.name}</p>
              </div>

              <div>
                <strong>Status</strong>
                <p>{selected.status}</p>
              </div>

            </div>

            <div className="modal-description">
              <strong>Descrição</strong>
              <p>{selected.descricao}</p>
            </div>

            {selected.status !== "PENDENTE" && (
              <p style={{
                color:"#ef4444",
                fontSize:"14px",
                marginTop:"10px"
              }}>
                Este pagamento já foi processado e não pode ser alterado.
              </p>
            )}

            <textarea
              placeholder="Informe o motivo da rejeição..."
              value={reason}
              onChange={(e)=>setReason(e.target.value)}
              disabled={selected.status !== "PENDENTE"}
            />

            <div className="modal-actions">

              <button
                className="btn-primary"
                disabled={selected.status !== "PENDENTE"}
                onClick={authorize}
              >
                Autorizar
              </button>

              <button
                className="btn-danger"
                disabled={selected.status !== "PENDENTE"}
                onClick={reject}
              >
                Rejeitar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  )
}