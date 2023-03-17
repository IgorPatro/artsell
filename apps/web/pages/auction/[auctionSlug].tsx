import React from "react"
import { useSocket } from "@artsell/hooks"
import network from "@artsell/network"
import Bidder from "../../src/Bidder"
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import { parseCookies } from "nookies"
import { sessionCookieName } from "@artsell/constants"
import { AuctionStatus } from "@prisma/client"
import { Auction } from "@prisma/client"
import { getServerSession } from "@artsell/hooks"

interface Props {
  auctionSlug: string
  data: Auction
  user: any
}

const AuctionPage = ({ data, auctionSlug, user }: Props) => {
  const [currentPrice, setCurrentPrice] = React.useState<number>()
  const [status, setStatus] = React.useState<AuctionStatus>(data.status)
  const socket = useSocket(auctionSlug)
  const { [sessionCookieName]: session } = parseCookies()

  React.useEffect(() => {
    socket.on("connect", () => console.log("Connected", socket.id))
    socket.on("disconnect", () => console.log("Disconnected"))

    socket.on("hello", (currentPrice) => setCurrentPrice(Number(currentPrice)))
    socket.on("bid-success", (newPrice) => setCurrentPrice(newPrice))
    socket.on("bid-fail", (data) => console.log(data))

    socket.on("auction-finished", (data) => setStatus(data.status))

    socket.on("auction-winner", (data) => console.log("WYGRAŁEŚ AUKCJE!", data))

    return () => {
      socket.disconnect()
    }
  }, [socket])

  const bid = (newPrice: number) => {
    socket.emit("bid", {
      session,
      newPrice,
    })
  }

  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 200,
          height: 200,
          background: "blue",
          color: "white",
          padding: 10,
        }}
      >
        <h3>
          {user.firstName} {user.lastName}
        </h3>
        <h3>{user.email}</h3>
      </div>
      <h1>{data.name}</h1>
      <h2>Current price: {currentPrice} zł</h2>
      <h2>Status: {status}</h2>
      <h3>Buy now price: {data.buyNowPrice} zł</h3>
      <Bidder onBid={bid} />
      <Image src={data.image} alt={data.name} width={400} height={400} />
      <p>{data.description}</p>
      <p>Created at: {new Date(data.createdAt).toDateString()}</p>
      <p>Updated at at: {new Date(data.updatedAt).toDateString()}</p>
      <p>{data.endedAt?.toString()}</p>
      <br />
      <ReactMarkdown>{data.content}</ReactMarkdown>
    </div>
  )
}

export default AuctionPage

export const getServerSideProps = async (ctx: any) => {
  const { auctionSlug } = ctx.query
  const data = await network.get(`/auctions/${auctionSlug}`)
  const session = await getServerSession(ctx)

  return {
    props: {
      data,
      auctionSlug,
      user: session,
    },
  }
}
