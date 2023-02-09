import React from "react"
import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { getServerSession } from "../src/hooks/getServerSession"
import { sessionCookieName } from "../src/utils/constants"
import { setCookie } from "nookies"
import { Button } from "@artsell/ui"
import { backendUrl } from "@artsell/network"

const LoginPage = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch(`${backendUrl}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      return console.log("error")
    }

    const { Authorization } = await res.json()
    setCookie(null, sessionCookieName, Authorization)
    router.push("/")
  }

  return (
    <form
      style={{
        padding: "30px",
        display: "flex",
        flexDirection: "column",
        width: "300px",
      }}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="email"
        style={{ border: "1px solid black" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="hasło"
        style={{ border: "1px solid black" }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit">Zaloguj</Button>
    </form>
  )
}

export default LoginPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx)

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
