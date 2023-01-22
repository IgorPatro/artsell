import { User as UserDB } from "@art-nx/database"

export type User = Omit<UserDB, "password">
