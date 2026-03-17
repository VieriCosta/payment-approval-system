import { useEffect, useState } from "react"
import { getDashboard } from "../services/paymentService"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts"

import "../styles/dashboard.css"

export default function Dashboard(){

  const [data,setData] = useState<any>(null)

  useEffect(()=>{
    loadDashboard()
  },[])

  const loadDashboard = async () => {
    const response = await getDashboard()
    setData(response.data)
  }

  if(!data){
    return <p>Carregando...</p>
  }

  /* =========================
     DADOS DIRETOS DO BACK
  ========================= */

  const pieData = [
    { name:"Pendentes", value: data.pending },
    { name:"Autorizados", value: data.approved },
    { name:"Rejeitados", value: data.rejected }
  ]

  const COLORS = ["#f59e0b","#10b981","#ef4444"]

  const formatCurrency = (value:number) =>
    value.toLocaleString("pt-BR",{
      style:"currency",
      currency:"BRL"
    })

  return(

    <div className="dashboard">

      <h1>Dashboard Financeiro</h1>

      {/* CARDS */}

      <div className="stats">

        <div className="stat-card">
          <span>Total Geral</span>
          <strong>{formatCurrency(data.total)}</strong>
        </div>

        <div className="stat-card green">
          <span>Aprovado</span>
          <strong>{formatCurrency(data.approved)}</strong>
        </div>

        <div className="stat-card yellow">
          <span>Pendente</span>
          <strong>{formatCurrency(data.pending)}</strong>
        </div>

        <div className="stat-card red">
          <span>Rejeitado</span>
          <strong>{formatCurrency(data.rejected)}</strong>
        </div>

      </div>

      {/* GRÁFICOS */}

      <div className="charts">

        {/* PIZZA */}

        <div className="chart-wrapper">

          <div className="chart-box">
            <h3>Distribuição Financeira</h3>

            <PieChart width={300} height={250}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
              >
                {pieData.map((_,index)=>(
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div className="chart-summary">

            <div className="summary-item yellow">
              <span>Pendentes</span>
              <strong>{data.count.pending}</strong>
            </div>

            <div className="summary-item green">
              <span>Autorizados</span>
              <strong>{data.count.approved}</strong>
            </div>

            <div className="summary-item red">
              <span>Rejeitados</span>
              <strong>{data.count.rejected}</strong>
            </div>

          </div>

        </div>

        {/* LINHA */}

        <div className="chart-wrapper">

          <div className="chart-box">
            <h3>Evolução Mensal (R$)</h3>

            <LineChart width={400} height={250} data={data.monthly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip /> 
              <Line type="monotone" dataKey="total" stroke="#6366f1" />
            </LineChart>
          </div>

          <div className="chart-summary single">
            <div className="summary-item">
              <span>Total de registros</span>
              <strong>
                {data.count.pending + data.count.approved + data.count.rejected}
              </strong>
            </div>
          </div>

        </div>

      </div>

    </div>

  )
}