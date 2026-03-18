import { useEffect, useState } from "react"
import { getPayments } from "../services/paymentService"
import "../styles/Records.css"

/**
 * Interface que representa um registro de pagamento
 */
interface Payment{
  id:number
  razaoSocial:string
  valor:number
  status:string
  dataRegistro:string
}

/**
 * Componente responsável pela consulta de pagamentos
 * Funcionalidades:
 * - Listagem paginada
 * - Filtros por status e período
 * - Ordenação por colunas
 * - Exportação CSV
 */
export default function Records(){

  /**
   * Lista de pagamentos
   */
  const [payments,setPayments] = useState<Payment[]>([])

  /**
   * Filtros aplicados na consulta
   */
  const [filters,setFilters] = useState({
    status:"",
    dataInicio:"",
    dataFim:""
  })

  /**
   * Controle de paginação
   */
  const [page,setPage] = useState(1)
  const [limit] = useState(5)
  const [total,setTotal] = useState(0)

  /**
   * Estado de carregamento
   */
  const [loading,setLoading] = useState(false)

  /**
   * Ordenação
   */
  const [sort,setSort] = useState("dataRegistro")
  const [order,setOrder] = useState("desc")

  /* =========================
     LOAD
  ========================= */

  /**
   * Busca os pagamentos no backend com base nos filtros, paginação e ordenação
   */
  const loadPayments = async () => {

    setLoading(true)

    try{

      const response = await getPayments({
        ...filters,
        page,
        limit,
        sort,
        order
      })

      const res = response.data

      setPayments(res.data)
      setTotal(res.total)

    } finally{
      setLoading(false)
    }
  }

  /**
   * Executa ao mudar página, ordenação ou direção
   */
  useEffect(()=>{
    loadPayments()
  },[page, sort, order])

  /* =========================
     FILTRO
  ========================= */

  /**
   * Aplica os filtros definidos pelo usuário
   */
  const handleFilter = () => {
    setPage(1)
    loadPayments()
  }

  /* =========================
     ORDENAÇÃO
  ========================= */

  /**
   * Alterna ordenação por coluna
   */
  const handleSort = (field:string) => {

    if(sort === field){
      setOrder(order === "asc" ? "desc" : "asc")
    } else {
      setSort(field)
      setOrder("asc")
    }

    setPage(1)
  }

  /* =========================
     EXPORTAÇÃO CSV
  ========================= */

  /**
   * Exporta os dados atuais da tabela para CSV
   */
  const exportCSV = () => {

    const headers = ["Data","Empresa","Valor","Status"]

    const rows = payments.map(p => [
      new Date(p.dataRegistro).toLocaleDateString("pt-BR"),
      p.razaoSocial,
      p.valor,
      p.status
    ])

    const csvContent =
      [headers, ...rows]
        .map(e => e.join(","))
        .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })

    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "pagamentos.csv"
    link.click()
  }

  /**
   * Total de páginas calculado
   */
  const totalPages = Math.ceil(total / limit)

  return(

    <div className="consulta">

      <h1>Consulta</h1>

      {/* =========================
          FILTROS
      ========================= */}

      <div className="filters">

        <select
          value={filters.status}
          onChange={(e)=>setFilters({...filters,status:e.target.value})}
        >
          <option value="">Todos</option>
          <option value="PENDENTE">Pendente</option>
          <option value="AUTORIZADO">Autorizado</option>
          <option value="REJEITADO">Rejeitado</option>
        </select>

        <input
          type="date"
          value={filters.dataInicio}
          onChange={(e)=>setFilters({...filters,dataInicio:e.target.value})}
        />

        <input
          type="date"
          value={filters.dataFim}
          onChange={(e)=>setFilters({...filters,dataFim:e.target.value})}
        />

        <button onClick={handleFilter}>
          Filtrar
        </button>

        <button className="export-btn" onClick={exportCSV}>
          CSV
        </button>

      </div>

      <p>{total} registros encontrados</p>

      {/* =========================
          LOADING / TABELA
      ========================= */}

      {loading ? (

        <p className="loading">Carregando...</p>

      ) : (

        <table className="table">

          <thead>

            <tr>
              <th onClick={()=>handleSort("dataRegistro")}>Data ⬍</th>
              <th onClick={()=>handleSort("razaoSocial")}>Empresa ⬍</th>
              <th onClick={()=>handleSort("valor")}>Valor ⬍</th>
              <th onClick={()=>handleSort("status")}>Status ⬍</th>
            </tr>

          </thead>

          <tbody>

            {payments.length === 0 ? (

              <tr>
                <td colSpan={4} style={{textAlign:"center"}}>
                  Nenhum registro encontrado
                </td>
              </tr>

            ) : (

              payments.map(p=>(

                <tr key={p.id}>

                  <td>
                    {p.dataRegistro
                      ? new Date(p.dataRegistro).toLocaleDateString("pt-BR")
                      : "-"
                    }
                  </td>

                  <td>{p.razaoSocial}</td>

                  <td>
                    R$ {p.valor.toLocaleString("pt-BR",{
                      minimumFractionDigits:2
                    })}
                  </td>

                  <td className={`status ${p.status.toLowerCase()}`}>
                    {p.status}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      )}

      {/* =========================
          PAGINAÇÃO
      ========================= */}

      <div className="pagination">

        <button
          disabled={page === 1}
          onClick={()=>setPage(page - 1)}
        >
          Anterior
        </button>

        <span>
          Página {page} de {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={()=>setPage(page + 1)}
        >
          Próximo
        </button>

      </div>

    </div>

  )
}