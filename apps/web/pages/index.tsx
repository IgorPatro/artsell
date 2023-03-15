import { Product, fetchProducts } from "@artsell/network"
import Link from "next/link"
import { Button } from "@artsell/ui"

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
      <div className="bg-blue-500 w-96 h-96" />
      <Button onClick={() => console.log("TEST")}>Child</Button>
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
  const data = await fetchProducts()

  return {
    props: {
      data,
    },
  }
}
