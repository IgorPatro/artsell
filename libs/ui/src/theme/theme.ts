import { DefaultTheme } from "styled-components"

const breakpoints = {
  phone: 26.25, // 420px
  tablet: 48, // 768px
  laptop: 64, // 1024px
  desktop: 96, // 1536px
}

export const theme: DefaultTheme = {
  palette: {
    primary: "#FD7E14",
    secondary: "#F5F5F5",
    black: "#000000",
    white: "#FFFFFF",
    grey: "#868E96"
  },
  MQ: {
    phone: `@media (min-width: ${breakpoints.phone}em)`,
    tablet: `@media (min-width: ${breakpoints.tablet}em)`,
    laptop: `@media (min-width: ${breakpoints.laptop}em)`,
    desktop: `@media (min-width: ${breakpoints.desktop}em)`,
  }
}
