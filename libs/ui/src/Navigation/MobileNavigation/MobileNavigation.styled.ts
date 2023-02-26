import styled from "styled-components"

interface MobileNavigationProps {
  isOpen: boolean
}

export const MobileNavigationWrapper = styled.nav<MobileNavigationProps>`
  width: 100%;
  height: 120vh;
  position: fixed;
  top: 50%;
  left: -120%;
  background-color: black;
  transform: ${({ isOpen }) => (isOpen ? "translateX(120%)" : "translateX(0)")}
    translateY(-50%);
  z-index: ${({ theme }) => theme.levels.firstAbove};
  transition: transform 0.3s ease-in-out;
`

export const NavigationList = styled.ul`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  list-style-type: none;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  margin: 0;
  padding: 0;
`
