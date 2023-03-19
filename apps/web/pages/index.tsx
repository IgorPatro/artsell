import { Auction, fetchAuctions } from "@artsell/network"
import { AuctionCard, Breadcrumb } from "@artsell/ui"

interface Props {
  data: Auction[]
}

const IndexPage = ({ data }: Props) => {
  return (
    <>
      <Breadcrumb data={[]} />
      <div className="flex gap-4 flex-wrap">
        {data.map((auction) => (
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
