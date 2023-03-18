import React from "react"
import cover from "../assets/cover.png"
import Image from "next/image"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button = ({ children, ...rest }: Props) => {
  return (
    <>
      <img src={cover.src} alt="Cover" />
      <Image src={cover} alt="COVEERRR" />
      <div
        style={{
          backgroundImage: `url('${cover.src}')`,
          width: 300,
          height: 300,
          backgroundSize: "contain",
        }}
      ></div>
      <button
        className="text-base font-bold text-white uppercase rounded-full px-12 py-3 bg-primary-400 hover:bg-primary-500 transition-colors"
        {...rest}
      >
        {children}
      </button>
    </>
  )
}
