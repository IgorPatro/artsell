import { GetServerSidePropsContext } from "next"
import { destroyCookie } from "nookies"
import { sessionCookieName } from "@artsell/constants"
import { Session, backendUrl } from "@artsell/network"

export const getServerSession = async (ctx: GetServerSidePropsContext) => {
  const sessionCookie = ctx.req.cookies[sessionCookieName]
  if (!sessionCookie) return false

  const response = await fetch(`${backendUrl}/users/session`, {
    headers: {
      Authorization: `Bearer ${sessionCookie}`,
    },
  })
  const data = await response.json()

  if (response.ok && data) return data as Session

  destroyCookie(ctx, sessionCookieName)
  return false
}
