import styled from 'styled-components';

/* eslint-disable-next-line */
export interface UiProps {}

const StyledUi = styled.div`
  color: red;
  font-weight: bold;
  font-size: 3rem;
`;

export function Ui(props: UiProps) {
  return (
    <StyledUi>
      <h1>Welcome to Ui!</h1>
    </StyledUi>
  );
}

export default Ui;
