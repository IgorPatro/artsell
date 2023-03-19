import React from "react"
import { Navigation } from "../Navigation/Navigation"

interface Props {
  children: React.ReactNode
}

export const MainTemplate = ({ children }: Props) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  )
}
