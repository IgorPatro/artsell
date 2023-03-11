import React from "react"
import network, { Product } from "@artsell/network"
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import { Button } from "@artsell/ui"
import { useSocket } from "@artsell/hooks"
import Bidder from "../../src/Bidder"

interface Props {
  data: Product
  productSlug: string
}

const ProductPage = ({ data, productSlug }: Props) => {
  const [currentPrice, setCurrentPrice] = React.useState<number>()

  const socket = useSocket(productSlug)

  React.useEffect(() => {
    socket.on("connect", () => console.log("Connected"))
    socket.on("disconnect", () => console.log("Disconnected"))

    socket.on("hello", (currentPrice) => setCurrentPrice(Number(currentPrice)))
    socket.on("bid-success", (newPrice) => setCurrentPrice(newPrice))
    socket.on("bid-fail", (data) => console.log(data))

    return () => {
      socket.disconnect()
    }
  }, [socket])

  const Bid = (newPrice: number) => {
    socket.emit("bid", newPrice)
  }

  return (
    <div>
      <h1>{data.name}</h1>
      <h2>Current price: {currentPrice} zł</h2>
      <Bidder onBid={Bid} />
      <Image src={data.image} alt={data.name} width={400} height={400} />
      <p>{data.description}</p>
      <p>Created at: {new Date(data.createdAt).toDateString()}</p>
      <p>Updated at at: {new Date(data.updatedAt).toDateString()}</p>
      <Button>Buy</Button>
      <br />
      <ReactMarkdown>{data.content}</ReactMarkdown>
    </div>
  )
}

export default ProductPage

export const getServerSideProps = async ({ query }) => {
  const { productSlug } = query
  const data = await network.get<Product>(`/products/${productSlug}`)

  return {
    props: {
      data,
      productSlug,
    },
  }
}
