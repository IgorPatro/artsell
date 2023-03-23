import React from "react"
import { ReactComponent as LogoSvg } from "../../assets/icons/logo.svg"
import Link from "next/link"
import { pageMap } from "@artsell/constants"

export const Logo = (props: React.HTMLAttributes<HTMLElement>) => {
  return (
    <Link {...props} href={pageMap.home}>
      <LogoSvg />
    </Link>
  )
}
