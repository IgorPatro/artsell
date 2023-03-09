import { User as UserDB, Cart as CartDB } from "@artsell/database"

export type Session = Omit<UserDB, "password">

type OmmitedUser = Omit<UserDB, "password">

export interface User extends OmmitedUser {
  cart: CartDB
}

// TODO: Stworzyć ogromny interface user i z niego pickować odpowiednie dane do innych fetchy
