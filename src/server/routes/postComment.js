import { connect } from "../config/dbConfig.js";
import Comment from "../models/Comment.js";
import { Router } from "express";
import Discussion from "../models/Discussion.js";
import mongoose from "mongoose";
import {
  validateAdminCookie,
  validateInstructorCookie,
  validateStudentCookie,
} from "../helper/cookieManager.js";
const postCommentRouter = Router();
connect();
postCommentRouter.post("/", async (req, res, next) => {
  try {
    const author =
    await validateAdminCookie(req) ||
    await validateInstructorCookie(req) ||
    await validateStudentCookie(req)


  if (!author) {
    return res.status(403).json({ error: "Unauthorized" });
  }


    const { content, courseId } = req.body;

    console.log(content, courseId, author);

    const discussion = await Discussion.findOne({
      course: new mongoose.Types.ObjectId(courseId),
    });

    if (!discussion) {
      return res
        .status(404)
        .json({ success: false, message: "Discussion not found" });
    }

    console.log(author);

    const newComment = await Comment.create({
      content,
      author: new mongoose.Types.ObjectId(author?.id),
      discussion: discussion._id,
    });

    res.status(201).json({ success: true, data: newComment });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ success: false, message: error.message });
  }
});

export default postCommentRouter;
