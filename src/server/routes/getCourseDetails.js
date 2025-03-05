import { Router } from "express";
import { connect } from "../config/dbConfig.js";
import { Course } from "../models/Course.js";
import mongoose from "mongoose";

connect();

const getCourseDetailsRouter = Router();

getCourseDetailsRouter.get("/", async (req, res, next) => {
  const { id } = req.query;
  try {
    // console.log(req.query);
    // console.log(req.body);

    // check if student is already enrolled

    const course = await Course.findById(new mongoose.Types.ObjectId(id));
    if (!course) {
      res.status(404).json({ success: false, message: "No course found..." });
      return;
    }

    res.status(200).json({ success: true, course });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ success: false, message: error.message });
  }
});

export default getCourseDetailsRouter;
