import express from "express";
// import server from "https"
const app = express();
import http from "http";
import createError from "http-errors";
import cors from "cors";
import dotenv from "dotenv";
import { connect } from "./config/dbConfig.js";
import getCourseDetailsRouter from "./routes/getCourseDetails.js";
import createCourseRouter from "./routes/createCourse.js";
import editCourseRouter from "./routes/editCourse.js";
import cookieParser from "cookie-parser";

dotenv.config();
const server = http.createServer(app);
import { log } from "console";
import getCoursesRouter from "./routes/getCourses.js";
import signupRouter from "./routes/signup.js";
import loginRouter from "./routes/login.js";
import getCourseMaterialRouter from "./routes/getCourseMaterial.js";
import enrollCourseRouter from "./routes/enrollCourse.js";
import getRelatedcourseRouter from "./routes/getRelatedCourse.js";
import getQuizRouter from "./routes/getQuiz.js";
import submitQuizRouter from "./routes/submitQuiz.js";
import getEnrolledStudentRouter from "./routes/getEnrolledStudents.js";
import getStudentDetailsRouter from "./routes/getStudentDetails.js";
import getAllDiscussionRouter from "./routes/getAllDiscussions.js";
import postCommentRouter from "./routes/postComment.js";
import postReplyRouter from "./routes/postReply.js";
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(cookieParser());
// app.use(connect())
connect()

app.use("/signup", signupRouter)
app.use("/login", loginRouter)
app.use("/create-new-course", createCourseRouter);
app.use("/get-course-details", getCourseDetailsRouter);
app.use("/get-courses", getCoursesRouter);
app.use("/edit-course", editCourseRouter);
app.use("/get-course-material", getCourseMaterialRouter)
app.use("/enroll-course", enrollCourseRouter)
app.use("/get-related-course", getRelatedcourseRouter)
app.use("/get-quiz", getQuizRouter)
app.use("/submit-quiz", submitQuizRouter)
app.use("/get-enrolled-students", getEnrolledStudentRouter)
app.use("/get-student-details", getStudentDetailsRouter)
app.use("/get-discussions", getAllDiscussionRouter)
app.use("/post-comment", postCommentRouter)
app.use("/post-reply", postReplyRouter)
// app.use()
// app.use()
// app.use()
// app.use()
// app.use()
// app.use()
// app.use()
// app.use()

app.use(function (req, res, next) {
  console.log(req.url);
  next(createError(404));
});

try {
  const port = 3001;
  server.listen(port, async () => {
    // connect()
    log(`Server is listening on port ${port}...`);
  });
} catch (error) {
  console.log(error);
}

export default app;
