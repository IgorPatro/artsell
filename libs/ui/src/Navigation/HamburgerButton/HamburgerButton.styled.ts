import styled, { css } from "styled-components"

const SharedBarStyles = css`
  content: "";
  width: 100%;
  background-color: ${({theme}) => theme.palette.black};
  height: 0.5rem;
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;
`

interface HamburgerProps {
  isOpen: boolean
}

export const Button = styled.button<HamburgerProps>`
  width: 4rem;
  height: 4rem;
  border: none;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  margin: 0;
  padding: 0;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  z-index: ${({ theme }) => theme.levels.secondAbove};

  ${({ theme }) => theme.MQ.laptop} {
    display: none;
  }

  &::before {
    ${SharedBarStyles};
    transform: ${({isOpen}) =>
      isOpen ? "translateY(300%) rotate(45deg)" : "rotate(0)"};
    background-color: ${({isOpen}) =>
      isOpen ? `#FFFFFF` : "#000000"};
  }

  &::after {
    ${SharedBarStyles};
    transform: ${({isOpen}) =>
      isOpen ? "translateY(-300%) rotate(-45deg)" : "rotate(0)"};
    background-color: ${({isOpen}) =>
      isOpen ? `#FFFFFF` : "#000000"};
  }
`

export const ButtonBar = styled.div<HamburgerProps>`
  ${SharedBarStyles};
  opacity: ${({isOpen}) => (isOpen ? "0" : "1")};
`
