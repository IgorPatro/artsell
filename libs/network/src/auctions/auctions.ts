import {
  Auction as AuctionDB,
  BidHistory as BidHistoryDB,
} from "@artsell/database"
import { useQuery } from "@tanstack/react-query"
import network from ".."
import { safeUserData } from "@artsell/utils"

export type Auction = AuctionDB & { owner: ReturnType<typeof safeUserData> }

export type BidHistory = BidHistoryDB & {
  user: ReturnType<typeof safeUserData>
}

export const fetchAuctions = async () => {
  return await network.get<Auction[]>("/auctions")
}

export const useAuctionsQuery = (initialData?: Auction[]) =>
  useQuery({
    queryKey: ["auctions"],
    queryFn: () => fetchAuctions(),
    initialData,
    refetchInterval: 30 * 1000,
  })

export const fetchBids = async (auctionId: string) => {
  return await network.get<BidHistory[]>(`/auctions/${auctionId}/bids`)
}

export const useBidsHistoryQuery = (auctionId: string) =>
  useQuery({
    queryKey: [`auctions/${auctionId}/bids`],
    queryFn: () => fetchBids(auctionId),
    refetchInterval: 30 * 1000,
  })
