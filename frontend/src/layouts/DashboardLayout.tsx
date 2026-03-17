import type { ReactNode } from "react";
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"

import "../styles/layout.css"

interface Props{
  children:ReactNode
}

export default function DashboardLayout({children}:Props){

  return(

    <div className="layout">

      <Sidebar/>

      <div className="main">

        <Header/>

        <div className="content">
          {children}
        </div>

      </div>

    </div>

  )

}