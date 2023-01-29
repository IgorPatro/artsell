import React from "react"
import { useQuery } from "@tanstack/react-query"
import { backendUrl } from "utils/constants"
import { parseCookies } from "nookies"
import { sessionCookieName } from "utils/constants"
import { User } from "bff"

const Navigation = () => {
  const { [sessionCookieName]: session } = parseCookies()

  const fetchUser = async () => {
    const res = await fetch(`${backendUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${session}`,
      },
    })
    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.message)
    }

    return data
  }

  // const { isSuccess, data, isLoading, isError, error } = useQuery<User, Error>({
  //   queryKey: ["user"],
  //   queryFn: fetchUser,
  //   retry: false,
  // })

  return (
    <div>
      <h3>Navigation</h3>
      {/* {isSuccess && <p>{`${data.firstName} ${data.lastName}`}</p>}
      {isError && <p>{error.message}</p>} */}
    </div>
  )
}

export default Navigation
