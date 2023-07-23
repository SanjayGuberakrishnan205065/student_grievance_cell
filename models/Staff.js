const mongoose = require("mongoose");

const staffSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    staffId: {
      type: String,
      required: true,
      unique: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    approvedByAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Staff", staffSchema);
