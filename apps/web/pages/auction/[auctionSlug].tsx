import React from "react"
import { useSocket } from "@artsell/hooks"
import network from "@artsell/network"
import Bidder from "../../src/Bidder"
import ReactMarkdown from "react-markdown"
import Image from "next/image"

interface Props {
  auctionSlug: string
  data: any
}

const AuctionPage = ({ data, auctionSlug }: Props) => {
  const [currentPrice, setCurrentPrice] = React.useState<number>()
  const socket = useSocket(auctionSlug)

  React.useEffect(() => {
    socket.on("connect", () => console.log("Connected"))
    socket.on("disconnect", () => console.log("Disconnected"))

    socket.on("hello", (currentPrice) => setCurrentPrice(Number(currentPrice)))
    socket.on("bid-success", (newPrice) => setCurrentPrice(newPrice))
    socket.on("bid-fail", (data) => console.log(data))

    return () => {
      socket.disconnect()
    }
  }, [])

  const bid = (newPrice: number) => {
    socket.emit("bid", newPrice)
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <h2>Current price: {currentPrice} zł</h2>
      <h3>Buy now price: {data.buyNowPrice} zł</h3>
      <Bidder onBid={bid} />
      <Image src={data.image} alt={data.name} width={400} height={400} />
      <p>{data.description}</p>
      <p>Created at: {new Date(data.createdAt).toDateString()}</p>
      <p>Updated at at: {new Date(data.updatedAt).toDateString()}</p>
      <br />
      <ReactMarkdown>{data.content}</ReactMarkdown>
    </div>
  )
}

export default AuctionPage

export const getServerSideProps = async ({ query }) => {
  const { auctionSlug } = query
  const data = await network.get(`/auctions/${auctionSlug}`)

  return {
    props: {
      data,
      auctionSlug,
    },
  }
}
