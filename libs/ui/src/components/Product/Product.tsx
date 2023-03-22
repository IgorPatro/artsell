import React from "react"
import { Product as ProductDataProps } from "@artsell/network"
import { ProductDescription } from "./ProductDescription/ProductDescription"
import { ProductData } from "./ProductData/ProductData"

interface Props {
  data: ProductDataProps
}

export const Product = ({ data }: Props) => {
  return (
    <div className="flex gap-4 w-full items-start">
      <ProductDescription data={data} />
      <ProductData data={data} />
    </div>
  )
}
