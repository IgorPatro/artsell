import React from "react"
import { IconButton } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"
import { Logo } from "../../common/Logo/Logo"
import { Search } from "../../common/Search/Search"
import { ReactComponent as HeartIcon } from "../../assets/icons/heart.svg"
import { ReactComponent as AuctionIcon } from "../../assets/icons/auction.svg"
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg"
import Link from "next/link"
import { Button } from "@chakra-ui/react"
import { pageMap } from "@artsell/constants"

interface Props {
  isOpen: boolean
  handleCloseMenu: () => void
  isAuthed: boolean
}

export const MobileNavigation = ({
  isOpen,
  handleCloseMenu,
  isAuthed,
}: Props) => {
  return (
    <nav
      className={`fixed top-0 left-0 w-full h-full bg-white p-4 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 flex flex-col items-center lg:hidden z-50 md:px-8 md:py-6`}
    >
      <IconButton
        aria-label="Close menu"
        icon={<CloseIcon />}
        className="grow-0 self-end"
        onClick={handleCloseMenu}
      />
      <div className="mt-8 flex flex-col gap-4 items-center">
        <Logo className="mb-4" />
        <div className="lg:absolute lg:top-1/2 lg:left-1/2">
          <Search />
        </div>
        <div className="flex gap-2 flex-col items-center">
          <div className="flex gap-1">
            <Link href={isAuthed ? pageMap.currentAuctions : pageMap.login}>
              <IconButton
                bg="transparent"
                _hover={{ bg: "transparent" }}
                aria-label="Aukcje"
                icon={<AuctionIcon />}
              />
            </Link>
            <Link href={pageMap.favourites}>
              <IconButton
                bg="transparent"
                _hover={{ bg: "transparent" }}
                aria-label="Ulubione"
                icon={<HeartIcon fill="transparent" stroke="#A9ADAC" />}
              />
            </Link>
            <Link href={isAuthed ? pageMap.account : pageMap.login}>
              <IconButton
                bg="transparent"
                _hover={{ bg: "transparent" }}
                aria-label="Konto"
                icon={<UserIcon />}
              />
            </Link>
          </div>
          <Button px="10">WYSTAW</Button>
        </div>
      </div>
    </nav>
  )
}
