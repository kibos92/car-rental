import { Schema } from "mongoose";

export default mongoose => {
    var schema = mongoose.Schema(
        {
            location: { type: String, required: true },
            address: { type: String, required: true },
            contactDetails: { type: String, required: true },
            cars: [{ type: Schema.Types.ObjectId, ref: "Car" }], 
        },
        { timestamps: true }
    );
    
    const Department = mongoose.model("Department", schema)
  
    return Department;
  };