export default (mongoose) => {
    var schema = mongoose.Schema(
      {
        username: { type: String, required: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        contactDetails: { type: String, required: true },
        isAdmin: { type: Boolean, required: true }
      },
      { timestamps: true }
    );
  
    const User = mongoose.model("User", schema);
  
    return User;
  };