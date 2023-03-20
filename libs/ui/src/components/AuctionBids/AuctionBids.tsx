import React from "react"
import { useBidsHistoryQuery } from "@artsell/network"
import { Skeleton } from "@chakra-ui/react"

interface Props {
  auctionId: string
}

export const AuctionBids = ({ auctionId }: Props) => {
  const bidsHistoryQuery = useBidsHistoryQuery(auctionId)

  if (bidsHistoryQuery.isLoading)
    return (
      <>
        <Skeleton height="20px" width="80%" />
        <Skeleton height="20px" width="80%" />
        <Skeleton height="20px" width="80%" />
        <Skeleton height="20px" width="80%" />
      </>
    )

  return (
    <div className="flex flex-col gap-1">
      {bidsHistoryQuery.data?.map((bid) => (
        <p key={bid.id}>
          {bid.user.firstName}, {bid.price}{" "}
          <span className="text-slate-300">{`(${bid.createdAt.toLocaleString()})`}</span>
        </p>
      ))}
    </div>
  )
}
