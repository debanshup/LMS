import { Router } from "express";
import { connect } from "../config/dbConfig.js";
import { Course } from "../models/Course.js";
import mongoose from "mongoose";

connect();

const editCourseRouter = Router();

editCourseRouter.post("/", async (req, res, next) => {
  const { course, id } = req.body;

  try {
    console.log(course, id);

    // validate admin cookie

    const editedCourse = await Course.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      course
    );
    if (!editedCourse) {
      res.status(404).json({ success: false, message: "No course found..." });
      return;
    }
    res.status(200).json({ success: true, editedCourse });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ success: false, message: error.message });
  }
});

export default editCourseRouter;
