import { User as UserDB, Cart as CartDB } from "@artsell/database"

type OmmitedUser = Omit<UserDB, "password">

export interface User extends OmmitedUser {
  cart: CartDB
}
