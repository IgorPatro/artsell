import React from "react"
import ReactMarkdown from "react-markdown"
import Image from "next/image"

interface Props {
  image: string
  name: string
  content: string
}

export const AuctionDescription = ({ image, name, content }: Props) => {
  return (
    <div className="bg-white shadow-lg rounded-xl overflow-hidden relative p-4 w-8/12">
      <div className="w-full h-64 relative">
        <Image src={image} alt={name} fill className="object-contain" />
      </div>
      <ReactMarkdown className="mt-6">{content}</ReactMarkdown>
    </div>
  )
}
