import { Schema } from "mongoose"

export default interface IRentalData {
    _id?: any | null,
    title: string,
    headquarters: string,
    contactDetails: string,
    departments: Schema.Types.ObjectId[]
  }