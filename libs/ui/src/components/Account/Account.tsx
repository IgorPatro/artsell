import React from "react"
import { useMeQuery } from "@artsell/network"
import Image from "next/image"
import { Button } from "@chakra-ui/react"
import { destroyCookie } from "nookies"
import { sessionCookieName } from "@artsell/constants"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { Breadcrumb } from "@artsell/ui"

export const Account = () => {
  const meQuery = useMeQuery()
  const router = useRouter()
  const queryClient = useQueryClient()

  const handleLogout = () => {
    destroyCookie(null, sessionCookieName)
    router.reload()
    queryClient.invalidateQueries({ queryKey: ["me"] })
  }

  if (meQuery.isLoading) return <div>Loading...</div>

  if (meQuery.isError) return <div>Error</div>

  return (
    <>
      <Breadcrumb
        data={[
          {
            label: "Konto",
            href: "/account",
          },
        ]}
      />
      <div className="w-full bg-white p-10 rounded-lg">
        <div className="flex gap-4">
          {meQuery.data.avatar ? (
            <Image
              width={96}
              height={96}
              className="object-cover rounded-full aspect-square w-24 h-24"
              src={meQuery.data.avatar}
              alt={`${meQuery.data.firstName} ${meQuery.data.lastName}`}
            />
          ) : (
            <div className="">{`${meQuery.data.firstName[0]}${meQuery.data.lastName[0]}`}</div>
          )}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold">
              {meQuery.data.firstName} {meQuery.data.lastName}
            </h2>
            <p className="text-gray-500">{meQuery.data.email}</p>
            <p className="text-gray-500">{meQuery.data.phone}</p>
            <Button onClick={handleLogout}>Wyloguj</Button>
          </div>
        </div>
      </div>
    </>
  )
}
