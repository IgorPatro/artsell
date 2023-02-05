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

interface inputProps {
  placeholder?: string
}

export const Input = (props: inputProps) => {
  return <InputTest placeholder={props.placeholder} />
}

export default Input
