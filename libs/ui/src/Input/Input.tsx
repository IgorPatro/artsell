import React from "react"
import styled from "styled-components"

const InputTest = styled.input`
  background-color: ${({ theme }) => theme.palette.primary};
  border: 2px solid ${({ theme }) => theme.palette.secondary};
  color: ${({ theme }) => theme.palette.primary};
  cursor: pointer;
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.palette.secondary};
  }
`

interface inputProps {
  placeholder?: string
}

export const Input = (props: inputProps) => {
  return <InputTest placeholder={props.placeholder} />
}

export default Input
