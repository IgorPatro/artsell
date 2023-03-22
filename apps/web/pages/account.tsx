import React from "react"
import { GetServerSideProps } from "next"
import { Account } from "@artsell/ui"
import { getServerSession } from "@artsell/hooks"

const AccountPage = () => {
  return <Account />
}

export default AccountPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx)

  if (!session) {
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
