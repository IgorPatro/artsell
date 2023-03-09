import { Product as ProductDB } from "@artsell/database"
import { useQuery } from "@tanstack/react-query"
import network from ".."

export type Product = ProductDB

export const fetchProducts = async () => {
  const data = await network.get<Product[]>("/products")
  return data
}

export const useProductsQuery = () =>
  useQuery({ queryKey: ["products"], queryFn: () => fetchProducts() })
