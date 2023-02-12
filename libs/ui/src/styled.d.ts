import { StringDecoder } from "string_decoder"
import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    palette: {
      primary: string
      secondary: string
      black: string
      white: string
      grey: string
    },
    MQ: {
      phone: string
      tablet: string
      laptop: string
      desktop: string
    }
  }
}
