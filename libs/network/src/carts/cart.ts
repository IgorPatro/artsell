import {
  Cart as CartDB,
  CartItem as CartItemDB,
  Product as ProductDB,
} from "@artsell/database"

export interface CartItem extends CartItemDB {
  product: ProductDB
}

export interface Cart extends CartDB {
  items: CartItem[]
}
