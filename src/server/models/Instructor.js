import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import User from "./User.js";

const InstructorSchema = new mongoose.Schema(
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
    image_src:{ type: String, default: ""},
    role: {
      type: String,
      enum: ["instructor"],
      default: "instructor",
      require: true,
    },
    image_src: { type: String, default: "" },
    assignedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

InstructorSchema.pre("save", async function (next) {
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

InstructorSchema.methods.comparePassword = async function (enteredPassword) {
  const result = await bcryptjs.compare(enteredPassword, this.password);

  return result;
};

InstructorSchema.post("save", async (doc, next) => {
  try {
    await User.create({
      name: doc.name,
      email: doc.email,
      password: doc.password,
      role: "instructor",
      image_src: doc.image_src
    });

    next();
  } catch (error) {
    console.log(error);
  }
});

const Instructor =
  mongoose.models.Instructor || mongoose.model("Instructor", InstructorSchema);
export default Instructor;
