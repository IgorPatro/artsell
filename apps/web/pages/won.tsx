import React from "react"
import { GetServerSideProps } from "next"
import { Breadcrumb } from "@artsell/ui"
import { useMyWonAuctionsQuery } from "@artsell/network"
import { Skeleton } from "@chakra-ui/react"
import { AuctionCard } from "@artsell/ui"
import { getServerSession } from "@artsell/hooks"

const WonAuctionsPage = () => {
  const myWonAuctionsQuery = useMyWonAuctionsQuery()

  return (
    <>
      <Breadcrumb
        data={[
          {
            label: "Wygrane aukcje",
            href: "/won",
          },
        ]}
      />
      <div className="w-full">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden relative w-full p-4">
          <h1 className="text-2xl mb-5">Wygrane aukcje</h1>
          <div className="flex gap-2 grow-0">
            {myWonAuctionsQuery.isLoading && (
              <div className="flex flex-col gap-2">
                <Skeleton width={320} height={30} className="grow-0" />
                <Skeleton width={320} height={30} className="grow-0" />
                <Skeleton width={320} height={30} className="grow-0" />
                <Skeleton width={320} height={30} className="grow-0" />
                <Skeleton width={320} height={30} className="grow-0" />
                <Skeleton width={320} height={30} className="grow-0" />
                <Skeleton width={320} height={30} className="grow-0" />
                <Skeleton width={320} height={30} className="grow-0" />
              </div>
            )}
            {myWonAuctionsQuery.isSuccess &&
              myWonAuctionsQuery.data.map((auction) => (
                <AuctionCard key={auction.id} data={auction} />
              ))}
          </div>
        </div>
      </div>
    </>
  )
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
