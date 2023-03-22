import React from "react"
import { Logo } from "../../common/Logo/Logo"
import { IconButton } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import { MobileNavigation } from "./MobileNavigation"
import { useMeQuery } from "@artsell/network"
import { Search } from "../../common/Search/Search"
import { ReactComponent as HeartIcon } from "../../assets/icons/heart.svg"
import { ReactComponent as AuctionIcon } from "../../assets/icons/auction.svg"
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg"
import Link from "next/link"
import { Button } from "@chakra-ui/react"

export const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleOpenMenu = () => setIsOpen(true)

  const handleCloseMenu = () => setIsOpen(false)

  const meQuery = useMeQuery()

  return (
    <>
      <nav className="p-4 bg-white shadow-md flex justify-between items-center relative md:px-8 md:py-6 xl:px-16 2xl:px-20 xl:py-8">
        <Logo />
        <div className="hidden lg:flex">
          <div className="lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2">
            <Search />
          </div>
          <div className="flex gap-2 flex-col items-center lg:flex-row lg:gap-4">
            <div className="flex gap-1">
              <Link href={meQuery.isSuccess ? "/won" : "/login"}>
                <IconButton
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  aria-label="Aukcje"
                  icon={<AuctionIcon />}
                />
              </Link>
              <Link href="/favourites">
                <IconButton
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  aria-label="Ulubione"
                  icon={<HeartIcon fill="transparent" stroke="#A9ADAC" />}
                />
              </Link>
              <Link href={meQuery.isSuccess ? "/account" : "/login"}>
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
        <div className="block lg:hidden">
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            className="bg-transparent"
            onClick={handleOpenMenu}
          />
        </div>
      </nav>
      <MobileNavigation
        isOpen={isOpen}
        handleCloseMenu={handleCloseMenu}
        isAuthed={meQuery.isSuccess}
      />
    </>
  )
}
