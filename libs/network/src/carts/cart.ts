import { Cart as CartDB, CartItem as CartItemDB } from "@artsell/database"

export interface Cart extends CartDB {
  items: CartItemDB[]
}
