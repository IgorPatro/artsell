import * as S from "./MobileNavigation.styled"
import * as SS from "../Navigation.styled"

interface Props {
  isMobileNavOpen: boolean
  disableNavigation: () => void
}

const MobileNavigation = (props: Props) => {
  return (
    <S.MobileNavigationWrapper isOpen={props.isMobileNavOpen}>
      <S.NavigationList>
        <SS.NavigationItem>
          <SS.NavigationButton>Zaloguj się</SS.NavigationButton>
        </SS.NavigationItem>
        <SS.NavigationItem>
          <SS.NavigationButton>Ulubione</SS.NavigationButton>
        </SS.NavigationItem>
        <SS.NavigationItem>
          <SS.NavigationButton>Koszyk</SS.NavigationButton>
        </SS.NavigationItem>
      </S.NavigationList>
    </S.MobileNavigationWrapper>
  )
}

export default MobileNavigation
