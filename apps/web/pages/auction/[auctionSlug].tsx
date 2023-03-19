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
import { GetServerSideProps } from "next"
import { Breadcrumb } from "@artsell/ui"

interface Props {
  auctionSlug: string
  data: Auction
}

const AuctionPage = ({ data, auctionSlug }: Props) => {
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
    <>
      <Breadcrumb
        data={[
          {
            label: "Aukcje",
            href: "/auction",
          },
          {
            label: data.name,
            href: `/auction/${auctionSlug}`,
          },
        ]}
      />
      <div className="w-full">
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
    </>
  )
}

export default AuctionPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { auctionSlug } = ctx.query
  const data = await network.get(`/auctions/${auctionSlug}`)

  return {
    props: {
      data,
      auctionSlug,
    },
  }
}
