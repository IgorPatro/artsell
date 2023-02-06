import * as S from "./HamburgerButton.styled"

interface Props {
  isMobileNavOpen: boolean
  toggleNavigation: () => void
}

const HamburgerButton = (props: Props) => {
  return (
    <S.Button onClick={props.toggleNavigation} isOpen={props.isMobileNavOpen}>
      <S.ButtonBar isOpen={props.isMobileNavOpen} />
    </S.Button>
  )
}

export default HamburgerButton
