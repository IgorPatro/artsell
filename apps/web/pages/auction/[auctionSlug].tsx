import React from "react"
import { Auction as AuctionDataProps, fetchAuction } from "@artsell/network"
import { GetServerSideProps } from "next"
import { Breadcrumb, Auction } from "@artsell/ui"

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
            href: "/auction",
          },
          {
            label: data.name,
            href: `/auction/${data.slug}`,
          },
        ]}
      />
      <div className="w-full">
        <Auction data={data} />
      </div>
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
