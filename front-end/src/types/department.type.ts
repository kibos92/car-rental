import { Schema } from "mongoose"

export default interface IDepartmentData {
  _id?: any | null,
  location: string,
  address: string,
  contactDetails: string,
  cars: Schema.Types.ObjectId[]
  }