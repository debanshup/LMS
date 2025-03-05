import { connect } from "../config/dbConfig.js";
import { Router } from "express";
import { validateStudentCookie } from "../helper/cookieManager.js";
import { Course } from "../models/Course.js";
import Student from "../models/Student.js";
const enrollCourseRouter = Router();

connect();
enrollCourseRouter.post("/", async (req, res) => {
  const { courseId } = req.body;
  console.log(courseId);

  try {
    //  validate cookie
    const { id, email } = await validateStudentCookie(req);
    console.log(id, email);

    const course = await Course.findOne({ _id: courseId });

    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "No course found" });
    }

    const student = await Student.findOneAndUpdate(
      {
        email,
        enrolledCourses: { $nin: [course._id] },
      },
      { $addToSet: { enrolledCourses: course._id } },
      { new: true }
    );
    if (!student) {
      console.log("Already enrolled");
      
      return res
        .status(400)
        .json({ success: false, message: "Already enrolled in this course" });
    }
    res
      .status(200)
      .json({ success: true, message: "Enrolled successfully", student });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
export default enrollCourseRouter;
