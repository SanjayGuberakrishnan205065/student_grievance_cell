require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const requestIp = require("request-ip");

// import all the models
require("./models/Student");
require("./models/Staff");
require("./models/Grievance");
require("./models/GrievanceType");
require("./models/GrievanceStatus");
require("./models/Department");
require("./models/Comment");

const staffRouter = require("./routes/staff");
const studentRouter = require("./routes/student");
const adminRouter = require("./routes/admin");
const grienvaceRouter = require("./routes/grievance");
const anonymousGrievanceRouter = require("./routes/anonymousGrievance");
const departmentRouter = require("./routes/department");
const authRouter = require("./routes/auth");
const commentRouter = require("./routes/comment");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  req.ip = requestIp.getClientIp(req);
  console.log(req.ip, req.method, req.url);
  next();
});

app.use("/api/staff", staffRouter);
app.use("/api/student", studentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/grievance", grienvaceRouter);
app.use("/api/anonymousGrievance", anonymousGrievanceRouter);
app.use("/api/department", departmentRouter);
app.use("/api/auth", authRouter);
app.use("/api/comment", commentRouter);

// development mode routes
if (process.env.NODE_ENV === "development") {
  const devRouter = require("./routes/dev");
  app.use("/api/dev", devRouter);
}

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/dist"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Connected to MongoDB\nServer running on port ${process.env.PORT}`
    );
  });
});

module.exports = app;
