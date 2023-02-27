import { Schema } from "mongoose";

export default mongoose => {
    var schema = mongoose.Schema(
        {
            carId: { type: Schema.Types.ObjectId, ref: "Car" },
            userId: { type: Schema.Types.ObjectId, ref: "User" },
            startDate: { type: Date, required: true },
            EndDate: { type: Date, required: true },
            insurerName: { type: String, required: true },
            claimNumber: { type: String, required: true },
        },
        { timestamps: true }
    );
    
    const Reservation = mongoose.model("Reservation", schema)
  
    return Reservation;
  };