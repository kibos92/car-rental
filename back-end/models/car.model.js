export default mongoose => {
    const Car = mongoose.model(
      "car",
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