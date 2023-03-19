import React from "react"

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
      <button onClick={() => onBid(Number(value))}>Złóż ofertę</button>
    </div>
  )
}

export default Bidder
