import { AppProps } from "next/app"
import { ThemeProvider, DefaultTheme } from "styled-components"
import { GlobalStyles } from "@art-nx/ui"
import { Poppins } from "@next/font/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Navigation from "../src/components/Navigation"

const theme: DefaultTheme = {
  colors: {
    primary: "#111",
    secondary: "#0070f3",
  },
}

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
})

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <main className={`main ${poppins.className}`}>
            <Navigation />
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
