const Grievance = require("../../models/Grievance");
const GrievanceStatus = require("../../models/GrievanceStatus");

// development only
const addGrievanceStatus = async (req, res) => {
  const { title, description } = req.body;
  const newGrievanceStatus = await GrievanceStatus.create({
    title,
    description,
  });
  res.status(201).json({
    success: true,
    newGrievanceStatus,
  });
};

const modifyGrievanceStatus = async (req, res) => {
  try {
    const { grievanceId } = req.params;
    const { grievanceStatus } = req.body;
    const grievanceStatusId = await GrievanceStatus.findOne({
      title: grievanceStatus,
    });
    if (!grievanceStatusId) {
      return res.status(400).json({
        success: false,
        message: "Invalid grievance status",
      });
    }
    const updatedGrievance = await Grievance.findOneAndUpdate(
      { _id: grievanceId },
      { grievanceStatus: grievanceStatusId },
      { new: true }
    )
      .populate("grievanceStatus", "title")
      .populate("grievanceType", "name")
      .populate("staffAssigned", ["name", "designation"])
      .populate({
        path: "student",
        populate: ["name", "department", "registerNo"],
      });
    res.status(200).json({
      success: false,
      message: "Grievance status updated successfully",
      grievance: updatedGrievance,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

module.exports = {
  addGrievanceStatus,
  modifyGrievanceStatus,
};
