import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"

/**
 *  Interface que define o modelo do usuário autenticado
 */
interface User {
  id: number
  name: string
  role: string
}

/**
 *  Tipagem do contexto de autenticação
 * Define tudo que será compartilhado globalmente
 */
interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

/**
 *  Criação do contexto de autenticação
 * Inicialmente undefined para forçar uso dentro do Provider
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 *  Provider responsável por envolver a aplicação
 * e disponibilizar os dados de autenticação globalmente
 */
export function AuthProvider({ children }: { children: ReactNode }) {

  /**
   *  Estado que armazena o usuário autenticado
   */
  const [user, setUser] = useState<User | null>(null)

  /**
   *  Recupera o usuário salvo no localStorage ao iniciar a aplicação
   * Isso mantém o usuário logado mesmo após atualizar a página
   */
  useEffect(() => {
    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  /**
   *  Função responsável por realizar logout
   * - Remove token e usuário do localStorage
   * - Limpa estado global
   * - Redireciona para página inicial
   */
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    setUser(null)

    window.location.href = "/"
  }

  /**
   *  Provider que disponibiliza os dados para toda aplicação
   */
  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 *  Hook customizado para acessar o contexto de autenticação
 * Garante que só será usado dentro do AuthProvider
 */
export function useAuth() {

  const context = useContext(AuthContext)

  /**
   *  Proteção contra uso fora do Provider
   */
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context
}