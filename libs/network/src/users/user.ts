import { User as UserDB } from "@artsell/database"

export type User = Omit<UserDB, "password">
