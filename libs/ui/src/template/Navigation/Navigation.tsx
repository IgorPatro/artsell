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
import { destroyCookie } from "nookies"
import { sessionCookieName } from "@artsell/constants"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"
import Link from "next/link"
import { Button } from "@chakra-ui/react"
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react"
import { pageMap } from "@artsell/constants"

export const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()

  const handleOpenMenu = () => setIsOpen(true)

  const handleCloseMenu = () => setIsOpen(false)

  const meQuery = useMeQuery()

  const handleLogout = async () => {
    destroyCookie(null, sessionCookieName)
    await queryClient.invalidateQueries({ queryKey: ["me"] })
    router.push("/")
  }

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
              <Link
                href={
                  meQuery.isSuccess ? pageMap.currentAuctions : pageMap.login
                }
              >
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
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  _active={{ bg: "transparent" }}
                  icon={<UserIcon />}
                />
                <MenuList>
                  <MenuItem as={Link} href={pageMap.account}>
                    Moje konto
                  </MenuItem>
                  <MenuItem as={Link} href={pageMap.myAuctions}>
                    Moje aukcje
                  </MenuItem>
                  <MenuItem as={Link} href={pageMap.myProducts}>
                    Moje produkty
                  </MenuItem>
                  {meQuery.isSuccess ? (
                    <MenuItem onClick={handleLogout}>Wyloguj</MenuItem>
                  ) : (
                    <MenuItem as={Link} href={pageMap.login}>
                      Zaloguj się
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
            </div>
            <Link href={pageMap.new}>
              <Button px="10">WYSTAW</Button>
            </Link>
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
