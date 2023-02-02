import React from "react"
import styled from "styled-components"

const InputTest = styled.input`
  background-color: ${({ theme }) => theme.color.black};
  border: none;
  /* border: 2px solid ${({ theme }) => theme.color.black}; */
  /* color: ${({ theme }) => theme.color.foggedwhite}; */
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: #868e96;
  }
`

export const Input = () => {
  return <InputTest />
}

export default Input
