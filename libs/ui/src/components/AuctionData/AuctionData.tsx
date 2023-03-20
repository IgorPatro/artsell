import React from "react"
import { Auction } from "@artsell/network"
import { ReactComponent as LocationIcon } from "../../assets/icons/location.svg"
import { ReactComponent as StopwatchIcon } from "../../assets/icons/stopwatch.svg"
import { ReactComponent as UserIcon } from "../../assets/icons/user.svg"
import { ReactComponent as HeartIcon } from "../../assets/icons/heart.svg"
import { useSocket } from "@artsell/hooks"
import { parseCookies } from "nookies"
import { sessionCookieName } from "@artsell/constants"
import { useToast } from "@chakra-ui/react"

interface Props {
  data: Auction
}

export const AuctionData = ({ data }: Props) => {
  const { [sessionCookieName]: session } = parseCookies()
  const socket = useSocket(data.slug)
  const [bid, setBid] = React.useState(data.currentPrice)
  const [currentPrice, setCurrentPrice] = React.useState<number>()
  const toast = useToast()

  React.useEffect(() => {
    socket.on("connect", () => console.log("Connected", socket.id))
    socket.on("disconnect", () => console.log("Disconnected"))

    socket.on("hello", (currentPrice) => setCurrentPrice(Number(currentPrice)))
    socket.on("bid-success", (newPrice) => {
      setCurrentPrice(Number(newPrice))
      toast({
        title: "Licytacja",
        description: "Twoja oferta została zaakceptowana",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      })
    })
    socket.on("bid-fail", (data) => {
      toast({
        title: "Licytacja",
        description: data,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      })
    })

    socket.on("auction-finished", (data) => {
      toast({
        title: "Aukcja",
        description: "Aukcja została zakończona",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      })
    })

    socket.on("auction-winner", (data) => console.log("WYGRAŁEŚ AUKCJE!", data))

    return () => {
      socket.disconnect()
    }
  }, [socket, toast])

  const handleBid = (newPrice: number) => {
    socket.emit("bid", {
      session,
      newPrice,
    })
  }

  return (
    <div className="bg-white w-80 shadow-lg rounded-xl overflow-hidden relative p-4">
      <button className="absolute top-3 right-3 z-10 w-8 h-8">
        <HeartIcon fill="#D0974F" />
      </button>
      <h1 className="text-xl">{data.name}</h1>
      <div className="flex items-end gap-2 mt-2">
        <h2 className="text-dark-text font-semibold text-4xl">
          {currentPrice}
        </h2>
        <span className="text-primary text-3xl">zł</span>
      </div>
      <div className="text-light-text mt-2">
        <p className="flex gap-1 items-center">
          <StopwatchIcon className="w-5 h-5" />
          {data.expiresAt.toLocaleString()}
        </p>
        <p className="flex gap-1 items-center">
          <LocationIcon className="w-5 h-5" />
          Rzeszów, Podkarpacie
        </p>
        <p className="flex gap-1 items-center">
          <UserIcon className="w-5 h-5" />
          John Walker
        </p>
      </div>
      <div className="flex mt-4 max-w-[200px]">
        <button
          className="border border-slate-200 text-primary w-12 h-12 text-2xl rounded-l-xl hover:bg-slate-50 transition-colors"
          onClick={() => setBid((prev) => (prev -= 1))}
        >
          -
        </button>
        <input
          type="number"
          className="border border-slate-200 w-full text-center"
          placeholder="Twoja oferta"
          value={bid}
          onChange={(e) => setBid(e.target.valueAsNumber)}
        />
        <button
          className="border border-slate-200 text-primary w-12 h-12 text-2xl rounded-r-xl hover:bg-slate-50 transition-colors"
          onClick={() => setBid((prev) => (prev += 1))}
        >
          +
        </button>
      </div>
      <button
        className="bg-primary rounded-3xl text-white font-bold py-2 px-10 mt-2"
        onClick={() => handleBid(bid)}
      >
        LICYTUJ
      </button>
      <div className="mt-4">
        <h4 className="text-lg text-dark-text">Dostawa</h4>
        <div className="text-base text-light-text">
          <p>Paczkomaty InPost - 10,99 zł</p>
          <p>Kurier InPost - 14,99 zł</p>
          <p>Kurier DPD - 15,99 zł</p>
          <p>Odbiór osobisty (Rzeszów) - 0 zł</p>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="text-lg text-dark-text">Historia licytacji</h4>
        <div className="text-base text-light-text">
          <p>
            Ty, 430 zł <span className="text-slate-300">(15:43)</span>
          </p>
          <p>
            Jan, 420 zł <span className="text-slate-300">(14:03)</span>
          </p>
          <p>
            Tomasz, 415 zł <span className="text-slate-300">(13:46)</span>
          </p>
          <p>
            Joanna, 390 zł <span className="text-slate-300">(13:33)</span>
          </p>
        </div>
      </div>
    </div>
  )
}
