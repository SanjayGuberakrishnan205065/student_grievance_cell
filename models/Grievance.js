const mongoose = require("mongoose");

const grievanceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    grievanceType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GrievanceType",
    },
    grievanceStatus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GrievanceStatus",
      default: "6418546972fb2e27a95fac25",
    },
    staffAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Grievance", grievanceSchema);
