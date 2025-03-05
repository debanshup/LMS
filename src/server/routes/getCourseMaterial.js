import { Router } from "express";
import { connect } from "../config/dbConfig.js";
import { validateStudentCookie } from "../helper/cookieManager.js";
import Student from "../models/Student.js";
import mongoose from "mongoose";
import { Course } from "../models/Course.js";
const getCourseMaterialRouter = Router();

connect();
getCourseMaterialRouter.get("/", async (req, res, next) => {
  try {
    // validate student cookie
    const { courseId } = req.query;
    // get data from cookie
    // console.log(courseId);

    const { email } = await validateStudentCookie(req);
    // console.log(id);
    
    const student = await Student.findOne({
      email: email,
      enrolledCourses: { $in: [new mongoose.Types.ObjectId(courseId)] },
    });

    // console.log(email, student);
    

    if (!student) {
      res.status(403).json({ success: false, message: "not enrolled" });
      return;
    }

    const material = await Course.find({ _id: courseId }).select("material");
    // console.log(material);

    if (!material) {
      res
        .status(404)
        .json({ success: false, message: "Course material not found" });
      return;
    }
    console.log("student already enrolled");

    res.status(200).json({ success: true, material });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ success: false, message: error.message });
  }
});

export default getCourseMaterialRouter;
