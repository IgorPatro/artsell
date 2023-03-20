import React from "react"
import { IconButton } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"
import { NavigationContent } from "./NavigationContent"
import { Logo } from "../../common/Logo/Logo"

interface Props {
  isOpen: boolean
  handleCloseMenu: () => void
}

export const MobileNavigation = ({ isOpen, handleCloseMenu }: Props) => {
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
        <NavigationContent />
      </div>
    </nav>
  )
}
