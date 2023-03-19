import React from "react"
import { IconButton } from "@chakra-ui/react"
import { Search } from "../../common/Search/Search"
import { ReactComponent as HeartIcon } from "../../assets/icons/heart.svg"
import { ReactComponent as AuctionIcon } from "../../assets/icons/auction.svg"
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg"

export const NavigationContent = () => {
  return (
    <>
      <div className="lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
        <Search />
      </div>
      <div className="flex gap-2 flex-col items-center lg:flex-row lg:gap-4">
        <div className="flex gap-1">
          <IconButton aria-label="Aukcje" icon={<AuctionIcon />} />
          <IconButton aria-label="Ulubione" icon={<HeartIcon />} />
          <IconButton aria-label="Konto" icon={<UserIcon />} />
        </div>
        <button className="bg-primary rounded-3xl text-white font-bold py-2 px-10">
          WYSTAW
        </button>
      </div>
    </>
  )
}
