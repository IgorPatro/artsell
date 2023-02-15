import styled from "styled-components";

export const InputTest = styled.input`
  background-color: ${({ theme }) => theme.palette.primary};
  border: 2px solid ${({ theme }) => theme.palette.black};
  color: ${({ theme }) => theme.palette.primary};
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.palette.secondary};
  }
`