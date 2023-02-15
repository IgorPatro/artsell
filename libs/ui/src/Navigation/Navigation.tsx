import React from "react"
import HamburgerButton from "./HamburgerButton/HamburgerButton"
import MobileNavigation from "./MobileNavigation/MobileNavigation"
import Input from "../Input/Input"
import * as S from "./Navigation.styled"
import NavigationIcon from "./NavigationIcons/NavigationIcon"
import UserIcon from ""

export const Navigation = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false)

  const toggleNavigation = () => {
    setIsMobileNavOpen((prevState) => !prevState)
  }

  return (
    <S.NavigationWrapper>
      <S.NavigationContent>
        <S.LogoParagraph href="/">ArtSell</S.LogoParagraph>
        <S.NavigationList>
          <Input placeholder="Szukaj..." />
          <S.NavigationItem>
            <NavigationIcon
              src="../assets//icons//UserIcon.svg"
              alt={""}
              description={"test"}
              width={30}
              height={30}
            />
          </S.NavigationItem>
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
