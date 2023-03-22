import React from "react"
import { Product } from "@artsell/network"
import { ReactComponent as StopwatchIcon } from "../../../assets/icons/stopwatch.svg"
import { ReactComponent as UserIcon } from "../../../assets/icons/user.svg"
import { ReactComponent as HeartIcon } from "../../../assets/icons/heart.svg"

interface Props {
  data: Product
}

export const ProductData = ({ data }: Props) => {
  return (
    <div className="bg-white w-80 shadow-lg rounded-xl overflow-hidden p-4 sticky top-10">
      <button className="absolute top-3 right-3 z-10 w-8 h-8">
        <HeartIcon fill="#D0974F" />
      </button>
      <h1 className="text-xl">{data.name}</h1>
      <div className="flex items-end gap-2 mt-2">
        <h2 className="text-dark-text font-semibold text-4xl">{data.price}</h2>
        <span className="text-primary text-3xl">zł</span>
      </div>
      <div className="text-light-text mt-2">
        <p className="flex gap-1 items-center">
          <StopwatchIcon className="w-5 h-5" />
          12:35
        </p>
        {/* {data.location && (
          <p className="flex gap-1 items-center">
            <LocationIcon className="w-5 h-5" />
            {data.location?.city}, {data.location?.state}
          </p>
        )} */}
        <p className="flex gap-1 items-center">
          <UserIcon className="w-5 h-5" />
          {/* {data.owner.firstName} {data.owner.lastName} */}
        </p>
      </div>
      <div className="mt-4">
        <h4 className="text-lg text-dark-text mb-2">Dostawa</h4>
        <div className="text-base text-light-text">
          <p>Paczkomaty InPost - 10,99 zł</p>
          <p>Kurier InPost - 14,99 zł</p>
          <p>Kurier DPD - 15,99 zł</p>
          <p>Odbiór osobisty (Rzeszów) - 0 zł</p>
        </div>
      </div>
    </div>
  )
}
