import { useAuth } from "../context/AuthContext"

export default function Header(){

  const { user, logout } = useAuth()

  const roleLabel:any = {
    ADMIN: "Administrador",
    REGISTRO: "Registro",
    AUTORIZACAO: "Autorização"
  }

  return(

    <header className="header">

      <div className="header-left">
        ☰
      </div>

      <div className="header-right">

        {user && (
          <>
            <span className="header-name">
              {user.name}
            </span>

            <span className="header-role">
              {roleLabel[user.role]}
            </span>
          </>
        )}

        <button
          className="logout"
          onClick={logout}
        >
          ↪
        </button>

      </div>

    </header>

  )
}