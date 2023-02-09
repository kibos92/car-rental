export default mongoose => {
    const Car = mongoose.model(
      "Car",
      mongoose.Schema(
        {
          title: String,
          description: String,
        },
        { timestamps: true }
      )
    );
  
    return Car;
  };