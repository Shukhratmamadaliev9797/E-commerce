import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, requeired: true },
    lastName: { type: String, requeired: true },
    email: { type: String, requeired: true },
    phone: { type: String, requeired: true },
    gender: { type: String, requeired: true },
    address: { type: String, requeired: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, requeired: true },
    isSeller: { type: Boolean, requeired: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
