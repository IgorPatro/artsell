import styled from "styled-components"
import Link from "next/link"

export const NavigationWrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
  align-items: center;
  padding: 2rem;
  z-index: 5;
  transition-timing-function: ease-in;
  transition: 0.2s;

  ${({ theme }) => theme.MQ.phone} {
    padding: 2rem 3rem;
  }
`

export const NavigationContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 180rem;
  margin: auto;
  ${({ theme }) => theme.MQ.laptop} {
    margin: 3rem auto;
  }

`

export const Logo = styled.img`
  height: 100%;
  max-height: 5.5rem;
  width: 4.5rem;
  max-width: 50vw;
  z-index: 5;
  ${({ theme }) => theme.MQ.laptop} {
    width: 6rem;
  }
`

export const LogoParagraph = styled(Link)`
text-decoration: none;
font-size: 3rem;
`

export const NavigationList = styled.ul`
  display: none;
  margin: 0;
  padding: 0;

  ${({ theme }) => theme.MQ.laptop} {
    display: flex;
    align-items: center;
    gap: 4rem;
    list-style-type: none;
  }
`

export const NavigationItem = styled.li`
  text-decoration: none;
  color: #cecece;
  font-size: 1.8rem;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: 0.1s ease-in-out;
  transition-property: color transform;

  &:hover {
    transform: scale(1.1);
  }
`
