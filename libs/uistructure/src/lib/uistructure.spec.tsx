import { render } from "@testing-library/react"

import Uistructure from "./uistructure"

describe("Uistructure", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<Uistructure />)
    expect(baseElement).toBeTruthy()
  })
})
