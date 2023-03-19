import React from "react"
import { IconButton } from "@chakra-ui/react"
import { CloseIcon } from "@chakra-ui/icons"
import { NavigationContent } from "./NavigationContent"

interface Props {
  isOpen: boolean
  handleCloseMenu: () => void
}

export const MobileNavigation = ({ isOpen, handleCloseMenu }: Props) => {
  return (
    <nav
      className={`fixed top-0 left-0 w-full h-full bg-white p-4 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 flex flex-col items-center lg:hidden`}
    >
      <IconButton
        aria-label="Close menu"
        icon={<CloseIcon />}
        className="grow-0 self-end"
        onClick={handleCloseMenu}
      />
      <div className="mt-8 flex flex-col gap-2 items-center">
        <NavigationContent />
      </div>
    </nav>
  )
}
