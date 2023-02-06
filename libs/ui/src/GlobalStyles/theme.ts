const breakpoints = {
    phone: 26.25, // 420px
    tablet: 48, // 768px
    laptop: 64, // 1024px
    desktop: 96, // 1536px
}

export const theme = {
    weight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extraBold: 800
    },
    color: {
      primary: "#FD7E14",
      white: "#FFFFFF",
      black: "#000000",
      grey: "#868E96",
      foggedwhite: "#F5F5F5"
    },
    MQ: {
      phone: `@media (min-width: ${breakpoints.phone}em)`,
      tablet: `@media (min-width: ${breakpoints.tablet}em)`,
      laptop: `@media (min-width: ${breakpoints.laptop}em)`,
      desktop: `@media (min-width: ${breakpoints.desktop}em)`,
    }
  }

