import mongoose from "mongoose";
import Discussion from "./Discussion.js";

const MaterialSchema = new mongoose.Schema({
  content: String, // For text-based content
  file: [
    {
      filename: String,
      fileUrl: String,
    },
  ],
});

// Course Schema
const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  materials: [MaterialSchema],
});

CourseSchema.post("save", async (doc, next) => {
  try {
    await Discussion.create({
      title: doc.title,
      tags: [doc.category],
      course: doc._id,
      instructors: doc?.instructors || [],
    });

    next();
  } catch (error) {
    console.log(error.message);
  }
});

// export const Chapter = models.Chapter || model("Chapter", ChapterSchema);
export const Course =
  mongoose.models.Course || mongoose.model("Course", CourseSchema);
