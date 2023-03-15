import { Product, fetchProducts } from "@artsell/network"
import Link from "next/link"
import { Button, Search } from "@artsell/ui"
import Image from "next/image"
import avatar from "../src/assets/avatar.png"

interface Props {
  data: Product[]
}

const IndexPage = ({ data }: Props) => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Index Page</h1>
      <Link href="/cart">Koszyk</Link>
      <Image src={avatar} alt="avatar" width={100} height={100} />
      <br />
      <br />
      <Button onClick={() => console.log("TEST")}>Child</Button>
      <Search />
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
