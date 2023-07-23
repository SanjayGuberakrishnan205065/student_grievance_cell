const Grievance = require("../../models/Grievance");
const AnonymousGrievance = require("../../models/AnonymousGrievance");

// get all grievances
const getAllGrievances = async (req, res) => {
  try {
    const grievances = await Grievance.find()
      .populate({
        path: "student",
        select: "name email registerNo department",
        populate: { path: "department" },
      })
      .populate({
        path: "staffAssigned",
        select: "name email department designation",
        populate: { path: "department" },
      })
      .populate("grievanceStatus")
      .populate("grievanceType")
      .sort({ updatedAt: -1 });
    res.status(200).json({
      success: true,
      message: "Grievances fetched successfully",
      grievances,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get a single grievance by id
const getGrievanceById = async (req, res) => {
  try {
    const grievance = await Grievance.findById(req.params.id)
      .populate("student")
      .populate({
        path: "staffAssigned",
        populate: { path: "department" },
      })
      .populate("grievanceStatus")
      .populate("grievanceType");
    res.status(200).json({
      success: true,
      message: "Grievance fetched successfully",
      grievance,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get all anonymous grievances
const getAllAnonymousGrievances = async (req, res) => {
  try {
    const grievances = await AnonymousGrievance.find()
      .populate("staffAssigned")
      .populate("grievanceStatus")
      .populate("grievanceType")
      .sort({ updatedAt: -1 });
    res.status(200).json({
      success: true,
      message: "Grievances fetched successfully",
      grievances,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get a single anonymous grievance by id
const getAnonymousGrievanceById = async (req, res) => {
  try {
    const grievance = await AnonymousGrievance.findById(req.params.id)
      .populate("staffAssigned")
      .populate("grievanceStatus")
      .populate("grievanceType");
    res.status(200).json({
      success: true,
      message: "Grievance fetched successfully",
      grievance,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllGrievances,
  getGrievanceById,
  getAllAnonymousGrievances,
  getAnonymousGrievanceById,
};
