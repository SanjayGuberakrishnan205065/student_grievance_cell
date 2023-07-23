const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    authorType: {
      type: String,
      required: true,
      enum: ["staff", "student", "anonymous", "admin"],
    },
    grievance: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Grievance",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
