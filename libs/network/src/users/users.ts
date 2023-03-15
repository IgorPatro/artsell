import { User as UserDB, Cart as CartDB } from "@artsell/database"
import { useQuery } from "@tanstack/react-query"
import network from ".."

export type Session = Omit<UserDB, "password">

type OmmitedUser = Omit<UserDB, "password">

export interface User extends OmmitedUser {
  cart: CartDB
}

export const fetchUser = async (userId: string) => {
  return await network.get<User>(`/users/${userId}`)
}

export const useUserQuery = (userId: string) =>
  useQuery({ queryKey: ["user"], queryFn: () => fetchUser(userId) })

export const fetchMe = async () => {
  return await network.get<User>("/users/me")
}

export const useMeQuery = () =>
  useQuery({ queryKey: ["me"], queryFn: () => fetchMe() })

// TODO: Stworzyć ogromny interface user i z niego pickować odpowiednie dane do innych fetchy
