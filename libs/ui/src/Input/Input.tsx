import React from "react"
import styled from "styled-components"

const InputTest = styled.input`
  background-color: ${({ theme }) => theme.color.primary};
  border: none;
  color: ${({ theme }) => theme.color.foggedwhite};
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.color.foggedwhite};
  }
`

export const Input = () => {
  return <InputTest />
}

export default Input
