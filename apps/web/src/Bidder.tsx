import React from "react"
import { Button } from "@artsell/ui"

interface Props {
  onBid: (newPrice: number) => void
}

const Bidder = ({ onBid }: Props) => {
  const [value, setValue] = React.useState("")

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Nowa cena..."
      />
      <Button onClick={() => onBid(Number(value))}>Place a BID</Button>
    </div>
  )
}

export default Bidder
