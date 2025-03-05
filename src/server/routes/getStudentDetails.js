import { connect } from "../config/dbConfig.js";

import { Router } from "express";
import Student from "../models/Student.js";
// import Course from "../models/Course.js";
const getStudentDetailsRouter = Router();
connect();
getStudentDetailsRouter.get("/", async (req, res) => {
  const { studentId } = req.query;
  console.log(studentId);

  try {
    const student = await Student.findOne({ _id: studentId }).populate("enrolledCourses");
    console.log(student);
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ success: false });
  }
});

export default getStudentDetailsRouter;
