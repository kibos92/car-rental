import { Schema } from "mongoose"

export default interface IUserData {
    _id?: any | null,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    contactDetails: string,
    isAdmin: boolean,
    reservations: Schema.Types.ObjectId[]
  }