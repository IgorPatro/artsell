import React from "react"
import { Navigation } from "../Navigation/Navigation"
import { Footer } from "../Footer/Footer"

interface Props {
  children: React.ReactNode
}

export const MainTemplate = ({ children }: Props) => {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <Navigation />
      {children}
      <Footer />
    </div>
  )
}
