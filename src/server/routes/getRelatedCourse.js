import { connect } from "../config/dbConfig.js";
import { Router } from "express";
import { Course } from "../models/Course.js";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Instructor from "../models/Instructor.js";
import { Quiz } from "../models/Quiz.js";
import Student from "../models/Student.js";

const getRelatedcourseRouter = Router();

connect();

getRelatedcourseRouter.get("/", async (req, res) => {
  const { category } = req.query;
  try {
    // console.log(category);

    const relatedCourse = await Course.find({ category }).select("title ");
    // console.log(relatedCourse);
    res.status(200).json({ success: true, relatedCourse });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});

export default getRelatedcourseRouter;
