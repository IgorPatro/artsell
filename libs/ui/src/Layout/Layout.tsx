import * as React from "react"
import * as S from "./Layout.styled"
import { Navigation } from "../Navigation/Navigation"

interface LayoutProps {
  children: React.ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navigation />
      <S.ContentWrapper>{children}</S.ContentWrapper>
    </>
  )
}
