import { Auction as AuctionDB } from "@artsell/database"
import { useQuery } from "@tanstack/react-query"
import network from ".."

export type Auction = AuctionDB

export const fetchAuctions = async () => {
  return await network.get<Auction[]>("/auctions")
}

export const useAuctionsQuery = () =>
  useQuery({ queryKey: ["auctions"], queryFn: () => fetchAuctions() })
