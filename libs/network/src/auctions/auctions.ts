import {
  Auction as AuctionDB,
  BidHistory as BidHistoryDB,
} from "@artsell/database"
import { useQuery, type UseQueryOptions } from "@tanstack/react-query"
import network from ".."
import { SafeLocationData, SafeUserData } from "@artsell/utils"

export type Auction = AuctionDB & { owner: SafeUserData } & {
  location: SafeLocationData
} & { bidders: number }

export type BidHistory = BidHistoryDB & {
  user: SafeUserData
}

export const fetchAuctions = async () => {
  return await network.get<Auction[]>("/auctions")
}

export const useAuctionsQuery = (options: UseQueryOptions<Auction[]>) =>
  useQuery({
    queryKey: ["auctions"],
    queryFn: () => fetchAuctions(),
    refetchInterval: 30 * 1000,
    ...options,
  })

export const fetchAuction = async (auctionSlugOrId: string) => {
  return await network.get<Auction>(`/auctions/${auctionSlugOrId}`)
}

export const useAuctionQuery = (auctionSlugOrId: string) =>
  useQuery({
    queryKey: ["auctions"],
    queryFn: () => fetchAuction(auctionSlugOrId),
  })

export const fetchBids = async (auctionId: string) => {
  return await network.get<BidHistory[]>(`/auctions/${auctionId}/bids`)
}

export const useBidsHistoryQuery = (auctionId: string) =>
  useQuery({
    queryKey: [`auctions/${auctionId}/bids`],
    queryFn: () => fetchBids(auctionId),
  })
