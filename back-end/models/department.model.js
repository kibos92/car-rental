export default mongoose => {
    const Department = mongoose.model(
      "Department",
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