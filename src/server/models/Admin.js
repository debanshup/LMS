import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import User from "./User.js";

const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^([a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})$/i.test(v);
        },
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        // check if formatted  or not
        validator: function (v) {
          const passwordValidator = /^.{4,}$/;
          return passwordValidator.test(v);
        },
        message: "Invalid Password format",
      },
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
      require:true,
    },
    image_src: { type: String, default: "" },
  },
  { timestamps: true }
);

AdminSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    console.error("Error: ", error.message);
    next(error);
  }
});

AdminSchema.methods.comparePassword = async function (enteredPassword) {
  const result = await bcryptjs.compare(enteredPassword, this.password);

  return result;
};



AdminSchema.post("save", async (doc, next) => {
  try {
    await User.create({
      name: doc.name,
      email: doc.email,
      password: doc.password,
      role: "admin",
      image_src: doc.image_src
    });

    next();
  } catch (error) {
    console.log(error);
  }
});

const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);
export default Admin;
