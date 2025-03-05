import { connect } from "../config/dbConfig.js";
import { Router } from "express";
import Reply from "../models/Reply.js";
import {
  validateAdminCookie,
  validateInstructorCookie,
  validateStudentCookie,
} from "../helper/cookieManager.js";
import mongoose from "mongoose";
const postReplyRouter = Router();
connect();
postReplyRouter.post("/", async (req, res) => {
  try {
    const { content, commentId } = req.body;
    const author =
      (await validateAdminCookie(req)) ||
      (await validateInstructorCookie(req)) ||
      (await validateStudentCookie(req));

    // console.log("Line ",author); // Check if it's null

    if (!author) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // console.log(content, commentId);

    const reply = await Reply.create({
      content,
      author: new mongoose.Types.ObjectId(author.id),
      comment: new mongoose.Types.ObjectId(commentId),
    });

    console.log(reply);
    

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: true });
  }
});

export default postReplyRouter;
