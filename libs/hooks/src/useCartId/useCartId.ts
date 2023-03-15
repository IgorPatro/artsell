import { useMeQuery } from "@artsell/network"
import { cartCookieName } from "@artsell/constants"
import { parseCookies, setCookie } from "nookies"

export const useCartId = () => {
  const meQuery = useMeQuery()
  const { [cartCookieName]: cookiesCartId } = parseCookies()

  if (meQuery.isLoading) return
  if (meQuery.isError) return cookiesCartId
  return meQuery.data.cart.id
}

export const saveCartId = (cartId: string) => {
  const { [cartCookieName]: cookiesCartId } = parseCookies()

  if (cookiesCartId) return
  return setCookie(null, cartCookieName, cartId)
}
