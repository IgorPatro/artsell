import React from "react"
import Link from "next/link"
import { useMutation } from "@tanstack/react-query"
import network, {
  CartItemRequest,
  CartItem,
  DeleteCartItemRequest,
  useCartQuery,
} from "@artsell/network"
import Image from "next/image"
import { Button } from "@artsell/ui"
import { useCartId } from "@artsell/hooks"

const CartPage = () => {
  const cartId = useCartId()
  const cartQuery = useCartQuery(!!cartId, cartId)

  const deleteMutation = useMutation({
    mutationFn: async (data: DeleteCartItemRequest) =>
      network.delete<CartItem, DeleteCartItemRequest>(`/carts/${cartId}`, data),
    onSuccess: () => cartQuery.refetch(),
    onError: (error) => console.log(error),
  })

  const updateMutation = useMutation({
    mutationFn: async (data: CartItemRequest) =>
      network.put<CartItem, CartItemRequest>(`/carts/${cartId}`, data),
    onSuccess: () => cartQuery.refetch(),
    onError: (error) => console.log(error),
  })

  return (
    <div>
      <h1>Cart Page</h1>
      <Link href="/">Home</Link>
      <br />
      <br />
      <br />
      {!cartId || cartQuery.isLoading ? (
        <h2>Twój koszyk jest pusty!</h2>
      ) : (
        <>
          {cartQuery.data?.items.length ? (
            cartQuery.data.items.map((item) => (
              <div key={item.id}>
                <Link href={`/product/${item.product.slug}`}>
                  <Image
                    src={item.product.image}
                    alt={item.product.description}
                    width={200}
                    height={200}
                  />
                </Link>
                <h3>{item.product.name}</h3>
                <h4>
                  {item.product.price} zł X
                  <input
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    disabled={cartQuery.isLoading}
                    onChange={(e) =>
                      updateMutation.mutate({
                        productId: item.productId,
                        quantity: e.target.valueAsNumber,
                      })
                    }
                  />
                  <Button
                    disabled={cartQuery.isLoading}
                    onClick={() =>
                      deleteMutation.mutate({ productId: item.productId })
                    }
                  >
                    Remove
                  </Button>
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
