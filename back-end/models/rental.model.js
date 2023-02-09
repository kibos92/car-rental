import { Schema } from "mongoose";

export default mongoose => {
    const Rental = mongoose.model(
      "Rental",
      mongoose.Schema(
        {
            title: { type: String, required: true },
            headquarters: { type: String, required: true },
            contactDetails: { type: String, required: true },
            deparments: [{ type: Schema.Types.ObjectId, ref: "Department" }], 
        },
        { timestamps: true },
      )
    );
  
    return Rental;
  };