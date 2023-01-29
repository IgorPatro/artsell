import { zodResolver as resolver } from "@hookform/resolvers/zod"

export const zodResolver = (schema: any) => resolver(schema)
