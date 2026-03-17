import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Sidebar(){

  const { user } = useAuth()

  return(

    <aside className="sidebar">

      <div className="sidebar-logo">
        Pagamentos
      </div>

      <p className="sidebar-title">
        Navegação
      </p>

      <nav>

        {/* DASHBOARD → todos */}
        <NavLink
          to="/dashboard"
          className={({isActive}) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          Dashboard
        </NavLink>


        {/* REGISTRAR PAGAMENTO */}
        {(user?.role === "ADMIN" || user?.role === "REGISTRO") && (

          <NavLink
            to="/payments/register"
            className={({isActive}) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            Registrar Pagamento
          </NavLink>

        )}


        {/* AUTORIZAR PAGAMENTO */}
        {(user?.role === "ADMIN" || user?.role === "AUTORIZACAO") && (

          <NavLink
            to="/payments/authorize"
            className={({isActive}) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            Autorizar Pagamentos
          </NavLink>

        )}


        {/* CONSULTA */}
        <NavLink
          to="/records"
          className={({isActive}) =>
            isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          Consulta
        </NavLink>


        {/* USUÁRIOS → somente ADMIN */}
        {user?.role === "ADMIN" && (

          <NavLink
            to="/users"
            className={({isActive}) =>
              isActive ? "sidebar-item active" : "sidebar-item"
            }
          >
            Usuários
          </NavLink>

        )}

      </nav>

    </aside>

  )

}