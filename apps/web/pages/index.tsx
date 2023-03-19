import { Auction, fetchAuctions } from "@artsell/network"
import { AuctionCard, Breadcrumb } from "@artsell/ui"

interface Props {
  data: Auction[]
}

const IndexPage = ({ data }: Props) => {
  return (
    <div className="px-64 py-16">
      <Breadcrumb data={[]} />
      <div className="flex gap-4">
        {data.map((auction) => (
          <AuctionCard data={auction} key={auction.id} />
        ))}
      </div>
    </div>
  )
}

export default IndexPage

export const getServerSideProps = async () => {
  const data = await fetchAuctions()

  return {
    props: {
      data,
    },
  }
}
