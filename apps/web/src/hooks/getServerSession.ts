import { GetServerSidePropsContext } from "next"
import { destroyCookie } from "nookies"
import { sessionCookieName } from "../utils/constants"
import { User, backendUrl } from "@artsell/network"

export const getServerSession = async (ctx: GetServerSidePropsContext) => {
  const sessionCookie = ctx.req.cookies[sessionCookieName]
  if (!sessionCookie) return false

  const response = await fetch(`${backendUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${sessionCookie}`,
    },
  })
  const data = await response.json()

  if (response.ok && data) return data as User

  destroyCookie(ctx, sessionCookieName)
  return false
}
