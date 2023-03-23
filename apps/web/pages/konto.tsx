import React from "react"
import { GetServerSideProps } from "next"
import { Account } from "@artsell/ui"
import { getServerSession } from "@artsell/hooks"
import { pageMap } from "@artsell/constants"

const AccountPage = () => {
  return <Account />
}

export default AccountPage

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: pageMap.home,
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}
