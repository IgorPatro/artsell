import styled from 'styled-components';

/* eslint-disable-next-line */
export interface UiProps {
  children: React.ReactNode | React.ReactNode[];
}

const StyledUi = styled.div`
  color: red;
  font-weight: bold;
  font-size: 3rem;
`;

export function Ui({ children }: UiProps) {
  return (
    <>
      <StyledUi>
        <h1>Welcome to Ui!</h1>
      </StyledUi>
      {children}
    </>
  );
}

export default Ui;
