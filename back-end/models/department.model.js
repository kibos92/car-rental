export default mongoose => {
    const Department = mongoose.model(
      "department",
      mongoose.Schema(
        {
          title: String,
          description: String,
        },
        { timestamps: true }
      )
    );
  
    return Department;
  };