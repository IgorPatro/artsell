import React from "react"
import styled from "styled-components"
import cover from "../assets/cover.png"
import Image from "next/image"

const Styled = styled.button`
  /* background-color: #222; */
  color: white;
  font-size: 2rem;
  padding: 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  /* transition: background-color 0.1s ease-in-out; */
  background-image: url("${cover.src}");
  background-size: cover;
  background-position: center;

  &:hover {
    background-color: black;
  }
`

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  onClick?: () => void
}

export const Button = ({ children, onClick }: Props) => {
  console.log(cover)

  return (
    <>
      <Image src={cover} alt="COVER" />
      <Styled onClick={onClick}>{children}</Styled>
    </>
  )
}

export default Button
