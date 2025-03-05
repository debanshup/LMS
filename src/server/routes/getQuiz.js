import { connect } from "../config/dbConfig.js";
import { Router } from "express";
import { Quiz } from "../models/Quiz.js";
import mongoose from "mongoose";

connect();
const getQuizRouter = Router();
getQuizRouter.get("/", async (req, res) => {
  const { courseId } = req.query;
  try {
    console.log(courseId);

    const quiz = await Quiz.findOne({
      course: new mongoose.Types.ObjectId(courseId),
    });
    // console.log(quiz.length);

    res.status(200).json({ success: true, quiz });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ success: false });
  }
});
export default getQuizRouter;
