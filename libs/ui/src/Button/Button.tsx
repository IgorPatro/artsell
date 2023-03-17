import React from "react"
import cover from "../assets/cover.png"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button = ({ children, ...rest }: Props) => {
  return (
    <>
      <img src={cover.src} alt="Cover" />
      <div className={`w-10 h-10 bg-[url('${cover.src}')]`}></div>
      <button
        className="text-base font-bold text-white uppercase rounded-full px-12 py-3 bg-primary-400 hover:bg-primary-500 transition-colors"
        {...rest}
      >
        {children}
      </button>
    </>
  )
}
