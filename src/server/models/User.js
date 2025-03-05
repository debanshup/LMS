import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    required: true,
  },
  image_src: { type: String, default: "" },
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  const result = await bcryptjs.compare(enteredPassword, this.password);

  return result;
};

const User = mongoose.model("User", userSchema);
export default User;
