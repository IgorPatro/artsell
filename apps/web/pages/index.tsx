import {
  Auction,
  fetchAuctions,
  useAuctionsQuery,
  Product,
  fetchProducts,
} from "@artsell/network"
import { AuctionCard, ProductCard, Breadcrumb } from "@artsell/ui"

interface Props {
  auctions: Auction[]
  products: Product[]
}

const IndexPage = ({ auctions, products }: Props) => {
  const auctionsQuery = useAuctionsQuery({
    initialData: auctions,
  })

  return (
    <>
      <Breadcrumb data={[]} />
      <h1 className="text-4xl mb-2">Aukcje:</h1>
      <div className="flex gap-4 flex-wrap">
        {auctionsQuery.isSuccess &&
          auctionsQuery.data.map((auction) => (
            <AuctionCard data={auction} key={auction.id} />
          ))}
      </div>
      <h1 className="text-4xl mt-10 mb-2">Produkty:</h1>
      <div className="flex gap-4 flex-wrap">
        {products.map((product) => (
          <ProductCard data={product} key={product.id} />
        ))}
      </div>
    </>
  )
}

export default IndexPage

export const getServerSideProps = async () => {
  const auctions = await fetchAuctions()
  const products = await fetchProducts()

  return {
    props: {
      auctions,
      products,
    },
  }
}
