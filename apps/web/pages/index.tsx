import { Product, fetchProducts } from "@artsell/network"
import Link from "next/link"
import { Button, Search } from "@artsell/ui"

interface Props {
  data: Product[]
}

const IndexPage = ({ data }: Props) => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Index Page</h1>
      <Link href="/cart">Koszyk</Link>
      <br />
      <br />
      <Search />
      {data.map((product) => (
        <div key={product.id}>
          <Link href={`/product/${product.slug}`}>{product.name}</Link>
        </div>
      ))}
      <Button onClick={() => console.log("TEST")}>Child</Button>
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
