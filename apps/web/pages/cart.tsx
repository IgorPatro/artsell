import React from "react"
import { useAuthContext } from "@artsell/context"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import network, { Cart } from "@artsell/network"
import Image from "next/image"

const CartPage = () => {
  const { cartId } = useAuthContext()

  const { data, isLoading } = useQuery({
    queryKey: ["/carts/:cartId"],
    queryFn: () => network.get<Cart>(`/carts/${cartId}`),
    enabled: !!cartId,
  })

  return (
    <div>
      <h1>Cart Page</h1>
      <Link href="/">Home</Link>
      <br />
      <br />
      <br />

      {!cartId || isLoading ? (
        <h2>Twój koszyk jest pusty!</h2>
      ) : (
        <>
          {data.items.length ? (
            data.items.map((item) => (
              <div key={item.id}>
                <Image
                  src={item.product.image}
                  alt={item.product.description}
                  width={200}
                  height={200}
                />
                <h3>{item.product.name}</h3>
                <h4>
                  {item.product.price} zł x {item.quantity}
                </h4>
              </div>
            ))
          ) : (
            <h2>Twój koszyk jest pusty!</h2>
          )}
        </>
      )}
    </div>
  )
}

export default CartPage
