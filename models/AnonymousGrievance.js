const mongoose = require("mongoose");

const anonymousGrievanceSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    trackingId: {
      type: String,
      required: true,
      unique: true,
    },
    staffAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Staff",
      required: true,
    },
    grievanceType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GrievanceType",
      required: true,
    },
    grievanceStatus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GrievanceStatus",
      default: "6418546972fb2e27a95fac25",
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

module.exports = mongoose.model("AnonymousGrievance", anonymousGrievanceSchema);
