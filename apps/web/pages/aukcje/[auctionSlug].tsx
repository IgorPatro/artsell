import React from "react"
import { Auction as AuctionDataProps, fetchAuction } from "@artsell/network"
import { GetServerSideProps } from "next"
import { Breadcrumb, Auction } from "@artsell/ui"
import { pageMap } from "@artsell/constants"

interface Props {
  data: AuctionDataProps
}

const AuctionPage = ({ data }: Props) => {
  return (
    <>
      <Breadcrumb
        data={[
          {
            label: "Aukcje",
            href: pageMap.auctions,
          },
          {
            label: data.name,
            href: `${pageMap.auction}${data.slug}`,
          },
        ]}
      />
      <Auction data={data} />
    </>
  )
}

export default AuctionPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { auctionSlug } = ctx.query
  const data = await fetchAuction(auctionSlug as string)

  return {
    props: {
      data,
    },
  }
}
