import React from "react"

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export const Button = ({ children, ...rest }: Props) => {
  return (
    <button className="bg-emerald-500" {...rest}>
      {children}
    </button>
  )
}

export default Button
