import { AppProps } from "next/app"
import { ThemeProvider } from "styled-components"
import { GlobalStyles } from "@artsell/ui"
import { theme } from "@artsell/ui"
import { Poppins } from "@next/font/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ChakraProvider } from "@chakra-ui/react"

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ThemeProvider theme={theme}> */}
      <ChakraProvider>
        {/* <GlobalStyles /> */}
        <main className={`main ${poppins.className}`}>
          <Component {...pageProps} />
        </main>
      </ChakraProvider>
      {/* </ThemeProvider> */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
