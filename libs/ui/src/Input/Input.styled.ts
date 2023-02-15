import styled from "styled-components";

export const InputTest = styled.input`
  border: 2px solid ${({ theme }) => theme.palette.black};
  color: ${({ theme }) => theme.palette.black};
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;
  padding: 2px 5px;

  &:hover,:focus {
    background-color: ${({ theme }) => theme.palette.secondary};
  }
`