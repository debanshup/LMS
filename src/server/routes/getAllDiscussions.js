import { connect } from "../config/dbConfig.js";
import { Router } from "express";
import { Course } from "../models/Course.js";
import Discussion from "../models/Discussion.js";
import mongoose from "mongoose";
import Comment from "../models/Comment.js";
import {
  validateAdminCookie,
  validateInstructorCookie,
  validateStudentCookie,
} from "../helper/cookieManager.js";
import Student from "../models/Student.js";
const getAllDiscussionRouter = Router();

getAllDiscussionRouter.get("/", async (req, res) => {
  const { courseId } = req.query;
  // console.log(courseId);

  connect();

  try {
    const author =
      (await validateAdminCookie(req)) ||
      (await validateInstructorCookie(req)) ||
      (await validateStudentCookie(req));

    // console.log("Line ",author); // Check if it's null

    if (!author) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    // const author = await Comment.findOne({ author: author1 });
    // console.log(author);

    //check if enrolled in course

    const student = await Student.findOne({
      email: author.email,
      enrolledCourse: { $nin: [courseId] },
    });

    if (!student) {
      return res.status(404).json({ success: false });
    }

    const discussions = await Discussion.aggregate([
      { $match: { course: new mongoose.Types.ObjectId(courseId) } },

      // Lookup Comments
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "discussion",
          as: "comments",
        },
      },

      // Sort comments by latest createdAt
      {
        $addFields: {
          comments: {
            $sortArray: { input: "$comments", sortBy: { createdAt: -1 } },
          },
        },
      },

      // Unwind comments for separate processing
      { $unwind: { path: "$comments", preserveNullAndEmptyArrays: true } },

      // Lookup Replies for each Comment
      {
        $lookup: {
          from: "replies",
          localField: "comments._id",
          foreignField: "comment",
          as: "comments.replies",
        },
      },
      {
        $addFields: {
          "comments.replies": {
            $sortArray: {
              input: "$comments.replies",
              sortBy: { createdAt: -1 },
            },
          },
        },
      },

      // Lookup Author for each Comment
      {
        $lookup: {
          from: "users",
          localField: "comments.author",
          foreignField: "_id",
          as: "commentAuthor",
        },
      },

      // Lookup Author for each Reply
      {
        $lookup: {
          from: "users",
          localField: "comments.replies.author",
          foreignField: "_id",
          as: "replyAuthors",
        },
      },

      // Transform comments
      {
        $addFields: {
          "comments.author": { $arrayElemAt: ["$commentAuthor", 0] },
          "comments.replies": {
            $map: {
              input: "$comments.replies",
              as: "reply",
              in: {
                _id: "$$reply._id",
                content: "$$reply.content",
                createdAt: "$$reply.createdAt",
                author: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$replyAuthors",
                        as: "author",
                        cond: { $eq: ["$$author._id", "$$reply.author"] },
                      },
                    },
                    0,
                  ],
                },
              },
            },
          },
        },
      },

      // Group back comments into the discussion object
      {
        $group: {
          _id: "$_id",
          title: { $first: "$title" },
          comments: { $push: "$comments" },
        },
      },

      // Remove unnecessary fields
      {
        $project: { commentAuthor: 0, replyAuthors: 0 },
      },
    ]);

    console.log(JSON.stringify(discussions[0]));

    res.status(200).json({ success: true, discussions: discussions[0] });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ success: false, error: error.message });
  }
});

export default getAllDiscussionRouter;
