import { User as UserDB } from "@artsell/database"

export type Session = Omit<UserDB, "password">
