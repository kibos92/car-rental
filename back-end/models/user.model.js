import { Schema } from "mongoose";

export default mongoose => {
    var schema = mongoose.Schema(
        {
            username: { type: String, required: true },
            password: { type: String, required: true },
            //firstName: { type: String, required: true },
           // lastName: { type: String, required: true },
           // email: { type: String, required: true },
           // contactDetails: { type: String, required: true },
           // isAdmin: { type: Boolean, required: true },
            //reservations: [{ type: Schema.Types.ObjectId, ref: "Reservation" }], 
        },
        { timestamps: true }
    );
    
    const User = mongoose.model("User", schema)
  
    return User;
  };