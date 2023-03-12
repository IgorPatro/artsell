import { io } from "socket.io-client"

export const useSocket = (auctionSlug: string) =>
  io("http://localhost:5000", {
    query: {
      auctionSlug,
    },
  })
