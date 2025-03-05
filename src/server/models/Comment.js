import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true }, // Comment text
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Comment author
    discussion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discussion",
      required: true,
    }, // Parent discussion
  },
  { timestamps: true }
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);
export default Comment;
