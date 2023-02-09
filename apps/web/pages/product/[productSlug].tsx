import network, { Product } from "@artsell/network"
import ReactMarkdown from "react-markdown"
import Image from "next/image"

interface Props {
  data: Product
}

const ProductPage = ({ data }: Props) => {
  return (
    <div>
      <h1>ProductPage</h1>
      <h3>
        {data.name}, {data.price} zł
      </h3>
      <Image src={data.image} alt={data.name} width={400} height={400} />
      <p>{data.description}</p>
      <p>Created at: {new Date(data.createdAt).toDateString()}</p>
      <p>Updated at at: {new Date(data.updatedAt).toDateString()}</p>
      <br />
      <ReactMarkdown>{data.content}</ReactMarkdown>
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
