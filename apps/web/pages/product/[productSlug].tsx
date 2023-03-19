import React from "react"
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import { Button } from "@artsell/ui"
import { GetServerSideProps } from "next"
import { useMutation } from "@tanstack/react-query"
import network, { CartItemRequest, CartItem, Product } from "@artsell/network"
import { useCartId, saveCartId } from "@artsell/hooks"

interface Props {
  data: Product
}

const ProductPage = ({ data }: Props) => {
  const cartId = useCartId()

  const { mutate: addToCart } = useMutation({
    mutationFn: async (data: CartItemRequest) =>
      network.post<CartItem, CartItemRequest>(
        cartId ? `/carts/${cartId}` : `/carts/`,
        data,
      ),
    onSuccess: (data) => !cartId && saveCartId(data.id),
    onError: (error) => console.log(error),
  })

  return (
    <div>
      <h1>{data.name}</h1>
      <Image src={data.image} alt={data.name} width={400} height={400} />
      <p>{data.description}</p>
      <p>Created at: {new Date(data.createdAt).toDateString()}</p>
      <p>Updated at: {new Date(data.updatedAt).toDateString()}</p>
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

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { productSlug } = query
  const data = await network.get<Product>(`/products/${productSlug}`)

  return {
    props: {
      data,
    },
  }
}
