import mongoose from "mongoose";

const replySchema = new mongoose.Schema(
  {
    content: { type: String, required: true }, // Answer body
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // Answer author
    // discussion: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Discussion",
    //   required: true,
    // }, // Parent discussion
    comment: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", required: true }, // Linked comments
  },
  { timestamps: true }
);

const Reply = mongoose.model("Reply", replySchema);
export default Reply;
