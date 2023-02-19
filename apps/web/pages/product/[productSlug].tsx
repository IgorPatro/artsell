import React from "react"
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import { Button } from "@artsell/ui"
import { useAuthContext } from "@artsell/context"
import { useMutation } from "@tanstack/react-query"
import network, { CartItemRequest, CartItem, Product } from "@artsell/network"

interface Props {
  data: Product
}

const ProductPage = ({ data }: Props) => {
  const { cartId } = useAuthContext()

  const { mutate: addToCart } = useMutation({
    mutationFn: async (data: CartItemRequest) =>
      network.post<CartItem, CartItemRequest>(
        cartId ? `/carts/${cartId}` : `/carts/`,
        data,
      ),
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  })

  return (
    <div>
      <h1>ProductPage</h1>
      <h3>
        {data.name}, {data.price} zł
      </h3>
      <Image src={data.image} alt={data.name} width={400} height={400} />
      <p>{data.description}</p>
      <p>Created at: {new Date(data.createdAt).toDateString()}</p>
      <p>Updated at at: {new Date(data.updatedAt).toDateString()}</p>
      <Button>Buy</Button>
      <br />
      <Button onClick={() => addToCart({ productId: data.id, quantity: 1 })}>
        Add to cart
      </Button>
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
    },
  }
}
