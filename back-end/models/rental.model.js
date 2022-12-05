export default mongoose => {
    const Rental = mongoose.model(
      "rental",
      mongoose.Schema(
        {
          title: String,
          description: String,
        },
        { timestamps: true }
      )
    );
  
    return Rental;
  };