import { io } from "socket.io-client"

export const useSocket = (productSlug: string) =>
  io("http://localhost:5000", {
    query: {
      productSlug,
    },
  })
