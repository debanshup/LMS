import { connect } from "../config/dbConfig.js";
import { Router } from "express";
import { Quiz } from "../models/Quiz.js";
import mongoose from "mongoose";

const submitQuizRouter = Router();

connect();
submitQuizRouter.post("/", async (req, res) => {
  try {
    const { selectedOptions, courseId } = req.body;
    // console.log(selectedOptions, courseId);

    const quiz = await Quiz.findOne({
      course: new mongoose.Types.ObjectId(courseId),
    });

    if (!quiz) {
      return res.status(404).json({ success: false });
    }

    // console.log(quiz);
    let result = {};
    let correctCount = 0;

    quiz.questions.forEach((q, index) => {
      if (selectedOptions[index] !== undefined) {
        const isCorrect = selectedOptions[index] === q.correctAnswer;
        result[index] = isCorrect; // Store true or false
        if (isCorrect) correctCount++;
      }
    });

    // console.log( correctCount === quiz.questions.length);

    if (correctCount !== quiz.questions.length) {
      console.log("Not passed yet");

      res.status(200).json({ success: false, message: "Not passed!" });
      return;
    }

    // TODO: generate and return a certificate

    res.status(200).json({ success: true, message: "Passed" });
  } catch (error) {
    console.log(error.message);

    res.status(200).json({ success: false });
  }
});

export default submitQuizRouter;
