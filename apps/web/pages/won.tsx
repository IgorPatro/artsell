import React from "react"
import { GetServerSideProps } from "next"
import { getServerSession } from "@artsell/hooks"
import { WonAuctions } from "@artsell/ui"

const WonAuctionsPage = () => {
  return <WonAuctions />
}

export default WonAuctionsPage

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
