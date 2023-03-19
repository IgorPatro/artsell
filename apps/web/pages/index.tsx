import { Auction, fetchAuctions, useAuctionsQuery } from "@artsell/network"
import { AuctionCard, Breadcrumb } from "@artsell/ui"

interface Props {
  data: Auction[]
}

const IndexPage = ({ data }: Props) => {
  const auctionsQuery = useAuctionsQuery(data)

  return (
    <>
      <Breadcrumb data={[]} />
      <div className="flex gap-4 flex-wrap">
        {auctionsQuery.data &&
          auctionsQuery.data.map((auction) => (
            <AuctionCard data={auction} key={auction.id} />
          ))}
      </div>
    </>
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
