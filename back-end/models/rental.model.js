import { Schema } from "mongoose";

export default mongoose => {
    var schema = mongoose.Schema(
        {
            title: { type: String, required: true },
            headquarters: { type: String, required: true },
            contactDetails: { type: String, required: true },
            departments: [{ type: Schema.Types.ObjectId, ref: "Department" }], 
        },
        { timestamps: true }
    );
    
    const Rental = mongoose.model("Rental", schema)
  
    return Rental;
  };