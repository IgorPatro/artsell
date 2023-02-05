import React from "react"
import { type User } from "@art-nx/network"
import { Button } from "@art-nx/ui"
import { Input } from "@art-nx/ui"
import { backendUrl } from "../src/utils/constants"

const user: User = {
  id: "888141-asfaf-15fasd-551",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@gmail.com",
  createdAt: new Date(),
  updatedAt: new Date(),
}

const IndexPage = () => {
  const [count, setCount] = React.useState(0)

  console.log(backendUrl)

  return (
    <>
      <Button onClick={() => setCount((prev) => (prev += 1))}>
        Click me! {user.firstName}
      </Button>
      <br />
      {count}
      <Input placeholder="Search Test" />
    </>
  )
}

export default IndexPage
