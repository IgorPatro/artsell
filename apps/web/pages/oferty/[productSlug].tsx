import React from "react"
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import { GetServerSideProps } from "next"
import { useMutation } from "@tanstack/react-query"
import network, {
  CartItemRequest,
  CartItem,
  Product as ProductInterface,
} from "@artsell/network"
import { useCartId, saveCartId } from "@artsell/hooks"
import { Product, Breadcrumb } from "@artsell/ui"
import { pageMap } from "@artsell/constants"

interface Props {
  data: ProductInterface
}

const ProductPage = ({ data }: Props) => {
  // const cartId = useCartId()

  // const { mutate: addToCart } = useMutation({
  //   mutationFn: async (data: CartItemRequest) =>
  //     network.post<CartItem, CartItemRequest>(
  //       cartId ? `/carts/${cartId}` : `/carts/`,
  //       data,
  //     ),
  //   onSuccess: (data) => !cartId && saveCartId(data.id),
  //   onError: (error) => console.log(error),
  // })

  return (
    <>
      <Breadcrumb
        data={[
          {
            label: "Produkty",
            href: pageMap.products,
          },
          {
            label: data.name,
            href: `${pageMap.product}${data.slug}`,
          },
        ]}
      />
      <Product data={data} />
    </>
  )
}

export default ProductPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { productSlug } = query
  const data = await network.get<ProductInterface>(`/products/${productSlug}`)

  return {
    props: {
      data,
    },
  }
}
