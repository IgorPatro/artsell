import React from "react"
import HamburgerButton from "./HamburgerButton/HamburgerButton"
import MobileNavigation from "./MobileNavigation/MobileNavigation"
import Input from "../Input/Input"
import * as S from "./Navigation.styled"
import Link from "next/link"

export const Navigation = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false)

  const toggleNavigation = () => {
    setIsMobileNavOpen((prevState) => !prevState)
  }

  return (
    <S.NavigationWrapper>
      <S.NavigationContent>
        <Link href="/">ArtSell</Link>
        <S.NavigationList>
          <Input placeholder="Szukaj..." />
          <S.NavigationItem>TestContent</S.NavigationItem>
        </S.NavigationList>
        <HamburgerButton
          toggleNavigation={toggleNavigation}
          isMobileNavOpen={isMobileNavOpen}
        />
      </S.NavigationContent>
      <MobileNavigation
        isMobileNavOpen={isMobileNavOpen}
        disableNavigation={() => setIsMobileNavOpen(false)}
      />
    </S.NavigationWrapper>
  )
}
