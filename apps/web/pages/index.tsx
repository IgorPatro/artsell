import network, { Product } from "@artsell/network"
import Link from "next/link"

interface Props {
  data: Product[]
}

const IndexPage = ({ data }: Props) => {
  return (
    <>
      <h1>Index Page</h1>
      <Link href="/cart">Koszyk</Link>
      <br />
      <br />
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
