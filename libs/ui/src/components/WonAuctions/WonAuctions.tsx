import React from "react"
import { useMyWonAuctionsQuery } from "@artsell/network"
import { Breadcrumb } from "@artsell/ui"
import Image from "next/image"
import { Button } from "@chakra-ui/react"
import { ReactComponent as LocationIcon } from "../../assets/icons/location.svg"

export const WonAuctions = () => {
  const myWonAuctionsQuery = useMyWonAuctionsQuery()

  if (myWonAuctionsQuery.isLoading) return <div>Loading...</div>

  if (myWonAuctionsQuery.isError) return <div>Error</div>

  return (
    <>
      <Breadcrumb
        data={[
          {
            label: "Wygrane aukcje",
            href: "/won",
          },
        ]}
      />
      <div className="w-full bg-white p-10 rounded-lg">
        <div className="flex gap-4">
          {myWonAuctionsQuery.data.map((auction) => (
            <div
              key={auction.id}
              className="bg-white shadow-lg rounded-lg w-96 overflow-hidden"
            >
              <div className="relative w-full aspect-video">
                <Image src={auction.image} alt={auction.name} fill />
              </div>
              <div className="p-6">
                <div className="flex items-end gap-2 mt-2">
                  <h2 className="text-dark-text font-semibold text-4xl">
                    {auction.currentPrice}
                  </h2>
                  <span className="text-primary text-3xl">zł</span>
                </div>
                <h2 className="text-xl">{auction.name}</h2>
                <p className="flex gap-1 items-center">
                  <LocationIcon className="w-5 h-5" />
                  {auction.location?.city}, {auction.location?.state}
                </p>
                <div className="flex gap-2 mt-4">
                  <Button>Odbierz</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
