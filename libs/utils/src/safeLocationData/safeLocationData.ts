import { Location } from "@prisma/client"

export const safeLocationData = (location: Location | null) => {
  if (!location) return null

  const { city, state, country } = location

  return {
    city,
    state,
    country,
  }
}

export type SafeLocationData = ReturnType<typeof safeLocationData>
