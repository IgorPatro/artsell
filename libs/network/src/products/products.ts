import { Product as ProductDB } from "@artsell/database"
import { useQuery } from "@tanstack/react-query"
import network from ".."

export type Product = ProductDB

export const fetchProducts = async () => {
  return await network.get<Product[]>("/products")
}

export const useProductsQuery = () =>
  useQuery({ queryKey: ["products"], queryFn: () => fetchProducts() })
