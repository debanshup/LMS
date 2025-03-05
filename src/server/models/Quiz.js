import mongoose from "mongoose";

const QuizSchema = new mongoose.Schema({
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    title: { type: String, required: true },
    questions: [
      {
        question: String,
        options: [String],
        correctAnswer: Number,
      },
    ],
  });
  export const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);
  