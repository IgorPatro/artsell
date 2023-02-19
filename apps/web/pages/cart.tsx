import React from "react"
import { useAuthContext } from "@artsell/context"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import network, { Cart } from "@artsell/network"

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
                <h3>{item.id}</h3>
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
