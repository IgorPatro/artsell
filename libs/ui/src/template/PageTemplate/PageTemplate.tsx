import React from "react"

interface Props {
  children: React.ReactNode
}

export const PageTemplate = ({ children }: Props) => {
  return (
    <div className="p-6 sm:px-16 sm:py-10 xl:px-32 xl:py-16 flex justify-center">
      <div className="max-w-[1340px]">{children}</div>
    </div>
  )
}
