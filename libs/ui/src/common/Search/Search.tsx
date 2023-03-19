import React from "react"
import { SearchIcon } from "@chakra-ui/icons"

export const Search = () => {
  return (
    <div className="relative">
      <input
        placeholder="Czego szukasz?"
        className="rounded-3xl border-[#A9ADAC] border py-2 px-4 min-w-0 w-full xl:min-w-[500px]"
      />
      <SearchIcon
        onClick={() => console.log("TEST")}
        className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
        color="#D0974F"
        w={5}
        h={5}
      />
    </div>
  )
}
