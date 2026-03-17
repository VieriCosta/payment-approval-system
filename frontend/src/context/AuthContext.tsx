import { createContext, useContext, useState, useEffect } from "react"
import type { ReactNode } from "react"

interface User {
  id: number
  name: string
  role: string
}

interface AuthContextType {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {

  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {

    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

  }, [])

  const logout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    setUser(null)

    window.location.href = "/"

  }

  return (

    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>

  )

}

export function useAuth() {

  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }

  return context

}