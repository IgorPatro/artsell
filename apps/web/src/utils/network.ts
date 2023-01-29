import { backendUrl } from "constants"

interface Options {
  headers?: Record<string, string>
}

export const requestData = async <Res, Payload>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  payload?: Payload,
  options?: Options,
) => {
  const res = await fetch(`${backendUrl}${url}`, {
    method,
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message)
  }

  return data as Res
}

export const network = {
  get: <Res>(url: string, options?: Options) =>
    requestData<Res, undefined>(url, "GET", undefined, options),
  post: <Res, Payload>(url: string, payload: Payload, options?: Options) =>
    requestData<Res, Payload>(url, "POST", payload, options),
  put: <Res, Payload>(url: string, payload: Payload, options?: Options) =>
    requestData<Res, Payload>(url, "PUT", payload, options),
  delete: <Res, Payload>(url: string, payload: Payload, options?: Options) =>
    requestData<Res, Payload>(url, "DELETE", payload, options),
}
