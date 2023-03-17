import { AppProps } from "next/app"
import { Poppins } from "@next/font/google"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
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

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className={`main ${poppins.className}`}>
        <Component {...pageProps} />
      </main>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
