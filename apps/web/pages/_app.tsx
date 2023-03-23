import { AppProps } from "next/app"
import { Poppins } from "@next/font/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"
import { MainTemplate, PageTemplate } from "@artsell/ui"
// IF STYLES WON'T WORK CHECK THIS:
import "tailwindcss/tailwind.css"

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

const theme = extendTheme({
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  components: {
    Button: {
      baseStyle: {
        textTransform: "uppercase",
        borderRadius: "100rem",
      },
      defaultProps: {
        size: "md",
        colorScheme: "yellow",
      },
      variants: {
        solid: {
          color: "white",
        },
      },
    },
  },
})

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <main className={`main ${poppins.className}`}>
          <MainTemplate>
            <PageTemplate>
              <Component {...pageProps} />
            </PageTemplate>
          </MainTemplate>
        </main>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
