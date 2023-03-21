import React from "react"
import ReactMarkdown from "react-markdown"
import Image from "next/image"
import { ReactComponent as LocationIcon } from "../../../assets/icons/location.svg"
import { ReactComponent as PhoneIcon } from "../../../assets/icons/phone.svg"
import { ReactComponent as UserIcon } from "../../../assets/icons/user.svg"
import { ReactComponent as EmailIcon } from "../../../assets/icons/email.svg"
import { Auction } from "@artsell/network"

interface Props {
  data: Auction
}

export const AuctionDescription = ({ data }: Props) => {
  return (
    <div className="w-8/12 grow">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden relative w-full">
        <div className="w-full h-64 relative m-4">
          <Image
            src={data.image}
            alt={data.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="max-w-3xl px-10 py-6">
          <ReactMarkdown
            className="mt-6"
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-2xl text-dark-text mt-5 mb-2" {...props}>
                  {props.children}
                </h1>
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-xl text-dark-text mt-5 mb-2" {...props}>
                  {props.children}
                </h2>
              ),
              p: ({ node, ...props }) => (
                <p className="text-[#5F5F5F]" {...props}>
                  {props.children}
                </p>
              ),
            }}
          >
            {data.content}
          </ReactMarkdown>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden relative px-10 py-6 w-full mt-4 flex gap-24">
        <div className="text-light-text mt-2 flex flex-col gap-1">
          <h2 className="text-xl text-dark-text mb-2">Sprzedaje</h2>
          <p className="flex gap-1 items-center">
            <UserIcon className="w-5 h-5" />
            {data.owner.firstName} {data.owner.lastName}
          </p>
          <p className="flex gap-1 items-center">
            <LocationIcon className="w-5 h-5" />
            Rzeszów, Podkarpacie
          </p>
          {data.owner.phone && (
            <p className="flex gap-1 items-center">
              <PhoneIcon className="w-5 h-5" />
              {data.owner.phone}
            </p>
          )}
          <p className="flex gap-1 items-center">
            <EmailIcon className="w-5 h-5" />
            {data.owner.email}
          </p>
        </div>
        <div className="text-light-text mt-2 flex flex-col gap-1">
          <h4 className="text-lg text-dark-text mb-2">Dostawa</h4>
          <div className="text-base text-light-text">
            <p>Paczkomaty InPost - 10,99 zł</p>
            <p>Kurier InPost - 14,99 zł</p>
            <p>Kurier DPD - 15,99 zł</p>
            <p>Odbiór osobisty (Rzeszów) - 0 zł</p>
          </div>
        </div>
      </div>
    </div>
  )
}
