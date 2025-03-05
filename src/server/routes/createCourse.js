import { Router } from "express";
import { connect } from "../config/dbConfig.js";
import { Course } from "../models/Course.js";

connect();

const createCourseRouter = Router();

createCourseRouter.post("/", async (req, res, next) => {
  const { title, description, category } = req.body;
  try {
    // validate admin cookie
    // console.log(title, description, category );
    // console.log(req.body);

    const course = await Course.create({ title, description, category });
    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default createCourseRouter;
