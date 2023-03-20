import React from "react"
import { Logo } from "../../common/Logo/Logo"
import { IconButton } from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import { MobileNavigation } from "./MobileNavigation"
import { NavigationContent } from "./NavigationContent"

export const Navigation = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleOpenMenu = () => setIsOpen(true)

  const handleCloseMenu = () => setIsOpen(false)

  return (
    <>
      <nav className="p-4 bg-white shadow-md flex justify-between items-center relative md:px-8 md:py-6 xl:px-16 2xl:px-20 xl:py-8">
        <Logo />
        <div className="hidden lg:flex">
          <NavigationContent />
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
      <MobileNavigation isOpen={isOpen} handleCloseMenu={handleCloseMenu} />
    </>
  )
}
