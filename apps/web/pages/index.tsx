import network, { Product } from "@artsell/network"
import Link from "next/link"
import { Navigation } from "@artsell/ui"

interface Props {
  data: Product[]
}

const IndexPage = ({ data }: Props) => {
  return (
    <>
      {/* <Navigation /> */}
      <h1>Index Page</h1>
      {data.map((product) => (
        <div key={product.id}>
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </div>
      ))}
    </>
  )
}

export default IndexPage

export const getServerSideProps = async () => {
  const data = await network.get<Product[]>("/products")

  return {
    props: {
      data,
    },
  }
}
