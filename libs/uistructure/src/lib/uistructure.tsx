import styled from "styled-components"

/* eslint-disable-next-line */
export interface UistructureProps {}

const StyledUistructure = styled.div`
  color: pink;
`

export function Uistructure(props: UistructureProps) {
  return (
    <StyledUistructure>
      <h1>Welcome to Uistructure!</h1>
    </StyledUistructure>
  )
}

export default Uistructure
