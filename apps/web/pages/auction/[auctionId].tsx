import React from "react"
import { useSocket } from "@artsell/hooks"

interface Props {
  auctionId: string
}

const AuctionPage = ({ auctionId }: Props) => {
  const [value, setValue] = React.useState("")
  const socket = useSocket(auctionId)

  React.useEffect(() => {
    socket.on("connect", () => console.log("Connected"))
    socket.on("disconnect", () => console.log("Disconnected"))
    socket.on("auction", (data) => console.log(data))
    socket.on("hello", (data) => console.log(data))

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
      <h1>Auction - {auctionId}</h1>
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

export const getServerSideProps = async ({ query }) => {
  const { auctionId } = query

  return {
    props: {
      auctionId,
    },
  }
}
