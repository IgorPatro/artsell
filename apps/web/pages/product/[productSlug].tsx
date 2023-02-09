import network, { Product } from "@artsell/network"

interface Props {
  data: Product
}

const ProductPage = ({ data }: Props) => {
  return (
    <div>
      <h1>ProductPage</h1>
      <h3>
        {data.name}, {data.price}
      </h3>
    </div>
  )
}

export default ProductPage

export const getServerSideProps = async ({ query }) => {
  const { productSlug } = query

  const data = await network.get<Product>(`/products/${productSlug}`)

  return {
    props: {
      data,
    },
  }
}
