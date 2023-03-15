import React from "react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button = ({ children, ...rest }: Props) => {
  return (
    <button
      className="text-base font-bold text-white uppercase rounded-full px-12 py-3 bg-primary-400 hover:bg-primary-500 transition-colors"
      {...rest}
    >
      {children}
    </button>
  )
}
