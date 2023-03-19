import React from "react"
import { Auction } from "@artsell/network"
import Image from "next/image"
import Link from "next/link"
import { ReactComponent as LocationIcon } from "../../assets/icons/location.svg"
import { ReactComponent as StopwatchIcon } from "../../assets/icons/stopwatch.svg"
import { ReactComponent as AuctionIcon } from "../../assets/icons/auction.svg"
import { ReactComponent as HeartIcon } from "../../assets/icons/heart.svg"

interface Props {
  data: Auction
}

export const AuctionCard = ({ data }: Props) => {
  return (
    <div className="min-w-xs max-w-xs w-full bg-white shadow-lg rounded-xl overflow-hidden relative">
      <button
        className="absolute top-2 right-2 z-10"
        onClick={() => console.log("LIKE")}
      >
        <HeartIcon />
      </button>
      <Link href={`/auction/${data.slug}`}>
        <div className="w-full h-64 relative">
          <Image
            src={data.image}
            alt={data.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-4">
          <div className="flex items-end gap-2">
            <h2 className="text-dark-text font-semibold text-3xl">
              {data.currentPrice}
            </h2>
            <span className="text-primary text-2xl">zł</span>
          </div>
          <h3 className="text-dark-text text-lg">{data.name}</h3>
          <div className="text-light-text mt-2">
            <p className="flex gap-1 items-center">
              <LocationIcon className="w-5 h-5" />
              Rzeszów, Podkarpacie
            </p>
            <p className="flex gap-1 items-center">
              <StopwatchIcon className="w-5 h-5" />
              12:03 do końca
            </p>
            <p className="flex gap-1 items-center">
              <AuctionIcon className="w-5 h-5" />
              10 osób licytuje
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
