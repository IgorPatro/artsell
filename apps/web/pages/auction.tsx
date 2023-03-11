import React from "react"
import { useSocket } from "@artsell/hooks"

const AuctionPage = () => {
  const [value, setValue] = React.useState("")
  const socket = useSocket()

  React.useEffect(() => {
    socket.on("connect", () => console.log("Connected"))
    socket.on("disconnect", () => console.log("Disconnected"))
    socket.on("auction", (data) => console.log(data))

    return () => {
      socket.disconnect()
    }
  }, [])

  const emit = () => {
    socket.emit("bid", value)
  }

  const disconnect = () => {
    socket.disconnect()
  }

  return (
    <div>
      <h1>Auction</h1>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={emit}>EMIT</button>
      <button onClick={disconnect}>DISCONNECT</button>
    </div>
  )
}

export default AuctionPage
