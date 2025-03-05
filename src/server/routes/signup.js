import { Router } from "express";
import { connect } from "../config/dbConfig.js"; 
import Student from "../models/Student.js";
const signupRouter = Router();

connect();
signupRouter.post("/", async (req, res) => {
  const { fullname, email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
  }
  try {
    const student = await Student.findOne({ email });
    if (student) {
      return res
        .status(403)
        .json({ message: "User already exists", success: false });
    }
    const newStudent = await Student.create({ name:fullname, email, password });
    return res
      .status(200)
      .json({ newStudent, message: "New user created", success: true });
  } catch (error) {
    console.log(error.message);
    
    return res.status(500).json({ success: false });
  }
});

export default signupRouter;
