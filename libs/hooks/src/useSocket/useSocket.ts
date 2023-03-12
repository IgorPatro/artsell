import React from "react"
import { io } from "socket.io-client"

export const useSocket = (auctionSlug: string) =>
  React.useMemo(() => {
    return io("http://localhost:5000", {
      query: {
        auctionSlug,
      },
    })
  }, [auctionSlug])
