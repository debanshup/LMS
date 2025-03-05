import mongoose from "mongoose";

const discussionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Question title
    authors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true,
      },
    ],
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    }, // Reference to Course
    instructors: [{ type: mongoose.Schema.Types.ObjectId, ref: "instructor" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }], // Question body
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reply" }], // Linked answers
  },
  { timestamps: true }
);

const Discussion = mongoose.model("Discussion", discussionSchema);
export default Discussion;
