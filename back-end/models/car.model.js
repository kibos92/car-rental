export default mongoose => {
    var schema = mongoose.Schema(
        {
            brand: { type: String, required: true },
            model: { type: String, required: true },
            plateNumber: { type: String, required: true },
            year: { type: String, required: true },
            departmentId: {type: String, required: true}
        },
        { timestamps: true }
    );
    
    const Car = mongoose.model("Car", schema)
  
    return Car;
  };