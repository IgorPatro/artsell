import { AppProps } from "next/app"
import { ThemeProvider } from "styled-components"
import { GlobalStyles } from "@artsell/ui"
import { theme } from "@artsell/ui"
import { Poppins } from "@next/font/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

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
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
