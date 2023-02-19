import React from "react"
import { useAuthContext } from "@artsell/context"
import Link from "next/link"
import { useQuery, useMutation } from "@tanstack/react-query"
import network, {
  Cart,
  CartItemRequest,
  CartItem,
  DeleteCartItemRequest,
} from "@artsell/network"
import Image from "next/image"
import { Button } from "@artsell/ui"

const CartPage = () => {
  const { cartId } = useAuthContext()

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["/carts/:cartId"],
    queryFn: () => network.get<Cart>(`/carts/${cartId}`),
    enabled: !!cartId,
  })

  const { mutate: deleteCartItem } = useMutation({
    mutationFn: async (data: DeleteCartItemRequest) =>
      network.delete<CartItem, DeleteCartItemRequest>(`/carts/${cartId}`, data),
    onSuccess: () => refetch(),
    onError: (error) => console.log(error),
  })

  const { mutate: updateCartItem } = useMutation({
    mutationFn: async (data: CartItemRequest) =>
      network.put<CartItem, CartItemRequest>(`/carts/${cartId}`, data),
    onSuccess: () => refetch(),
    onError: (error) => console.log(error),
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
          {data?.items.length ? (
            data.items.map((item) => (
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
                    defaultValue={item.quantity}
                    disabled={isLoading}
                    onChange={(e) =>
                      updateCartItem({
                        productId: item.productId,
                        quantity: e.target.valueAsNumber,
                      })
                    }
                  />
                  <Button
                    disabled={isLoading}
                    onClick={() =>
                      deleteCartItem({ productId: item.productId })
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
