import React from "react"
import { io } from "socket.io-client"

export const socketUrl = process.env.NEXT_PUBLIC_API_URL

export const useSocket = (auctionSlug: string) =>
  React.useMemo(() => {
    return io(socketUrl || "http://localhost:5000", {
      query: {
        auctionSlug,
      },
    })
  }, [auctionSlug])
