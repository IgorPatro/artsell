import { io } from "socket.io-client"

export const useSocket = () => io("http://localhost:5000")
