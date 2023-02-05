const breakpoints = {
    xs: 25, // 400px
    sm: 31.25, // 500px
    s: 48, // 768px
    m: 64, // 1024px
    l: 80, // 1280px
    xl: 96, // 1536px
    xxl: 110, // 1760px
    xxxl: 150, //2400
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
      xs: `@media (min-width: ${breakpoints.xs}em)`,
      s: `@media (min-width: ${breakpoints.s}em)`,
      m: `@media (min-width: ${breakpoints.m}em)`,
      l: `@media (min-width: ${breakpoints.l}em)`,
      xl: `@media (min-width: ${breakpoints.xl}em)`,
      xxl: `@media (min-width: ${breakpoints.xxl}em)`,
      xxxl: `@media (min-width: ${breakpoints.xxxl}em)`
    }
  }

