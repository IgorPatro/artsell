import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import network, { type User } from "@artsell/network"
import { cartCookieName } from "@artsell/constants"
import { parseCookies } from "nookies"

interface AuthState {
  isAuthenticated: boolean
  user?: User
  cartId?: string
  setCartId: (cartId: string) => void
}

interface Props {
  children: React.ReactNode
}

const AuthContext = React.createContext<AuthState>({} as AuthState)

export const AuthContextProvider = (props: Props) => {
  const { data, isSuccess } = useQuery({
    queryKey: ["/users/me"],
    queryFn: () => network.get<User>("/users/me"),
  })
  const { [cartCookieName]: cookiesCartId } = parseCookies()
  const [cartId, setCartId] = React.useState(
    isSuccess ? data?.cart.id : cookiesCartId,
  )

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isSuccess,
        user: data,
        cartId,
        setCartId,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => React.useContext(AuthContext)
