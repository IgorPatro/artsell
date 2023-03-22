import React from "react"
import { Auction as AuctionDataProps } from "@artsell/network"
import { AuctionDescription } from "./AuctionDescription/AuctionDescription"
import { AuctionData } from "./AuctionData/AuctionData"

interface Props {
  data: AuctionDataProps
}

export const Auction = ({ data }: Props) => {
  return (
    <div className="flex gap-4 w-full items-start">
      <AuctionDescription data={data} />
      <AuctionData data={data} />
    </div>
  )
}
