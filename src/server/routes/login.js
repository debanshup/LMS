import { Router } from "express";
import { connect } from "../config/dbConfig.js";
import bcryptjs from "bcryptjs";
import Student from "../models/Student.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const loginRouter = Router();

// connect with mongodb
connect();

// @ts-ignore
loginRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  // console.log(email);
  console.log(req.body);

  try {
    const student = await User.findOne({ email, role: "student" });

    if (!student || !(await student.comparePassword(password))) {
      console.log("No user found");

      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // generate cookie
    const payload = { id: student._id, email: student.email };
    const token = jwt.sign(payload, "student", {
      expiresIn: "1d",
    });

    // console.log(token);

    res.cookie("student", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res
      .status(200)
      .json({ message: "logged in successfully", success: true, student });
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({ error: error.message, success: false });
  }
});

export default loginRouter;
