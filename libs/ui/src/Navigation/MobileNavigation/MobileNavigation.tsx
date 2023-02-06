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
        <SS.NavigationItem>ContentTest</SS.NavigationItem>
        <button>Contact</button>
      </S.NavigationList>
    </S.MobileNavigationWrapper>
  )
}

export default MobileNavigation
