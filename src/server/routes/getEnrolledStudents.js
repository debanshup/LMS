import { connect } from "../config/dbConfig.js";
import { Router } from "express";
import { Course } from "../models/Course.js";

const getEnrolledStudentRouter = Router();
connect();
getEnrolledStudentRouter.get("/", async (req, res) => {
  const { searchData } = req.query;
  try {
    const courseWithStudents = await Course.aggregate([
      {
        $lookup: {
          from: "students", // Collection name in MongoDB
          localField: "_id",
          foreignField: "enrolledCourses",
          as: "enrolledStudents",
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          enrolledStudents: {
            _id: 1,
            name: 1,
            email: 1,
          },
        },
      },
    ]);

    console.log(courseWithStudents.length);
    return res.status(200).json({ data: courseWithStudents, success: true });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
});

export default getEnrolledStudentRouter;
