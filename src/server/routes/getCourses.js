import { Router } from "express";
import { connect } from "../config/dbConfig.js";
import { Course } from "../models/Course.js";
import mongoose from "mongoose";

connect();

const getCoursesRouter = Router();

getCoursesRouter.get("/", async (req, res, next) => {
  try {
    const { category, searchTerm } = req.query;

    const filter = {};
    if (category && category !== "All") {
      filter.category = category;
    }
    if (searchTerm) {
      filter.title = { $regex: searchTerm, $options: "i" }; // Case-insensitive search
    }
    
    const courses = await Course.find(filter);
    const categories = await Course.distinct("category")


    res.status(200).json({ success: true, courses, categories });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default getCoursesRouter;
