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
    },
    levels: {
      thirdUnder: number
      secondUnder: number
      firstUnder: number
      zero: number
      firstAbove: number
      secondAbove: number
      thirdAbove: number
    }
  }
}
