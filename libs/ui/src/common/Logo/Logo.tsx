import React from "react"
import { ReactComponent as LogoSvg } from "../../assets/icons/logo.svg"
import Link from "next/link"

export const Logo = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <Link {...props} href="/">
      <LogoSvg />
    </Link>
  )
}
