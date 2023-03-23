import React from "react"
import Link from "next/link"
import { ReactComponent as HomeIcon } from "../../assets/icons/home.svg"
import { pageMap } from "@artsell/constants"

interface BreadcrumbItemProps {
  label: string
  href: string
  isHome?: boolean
}

interface Props {
  data: BreadcrumbItemProps[]
}

export const Breadcrumb = ({ data }: Props) => {
  return (
    <div className="flex gap-1 mb-2">
      <BreadcrumbItem label="Home" href={pageMap.home} isHome />
      {data.map((item) => {
        return <BreadcrumbItem label={item.label} href={item.href} />
      })}
    </div>
  )
}

const BreadcrumbItem = ({ label, href, isHome }: BreadcrumbItemProps) => {
  return (
    <div className="flex gap-1 items-center text-light-text">
      {isHome ? <HomeIcon /> : <span>{">"}</span>}
      <Link href={href} className="hover:underline">
        {label}
      </Link>
    </div>
  )
}
