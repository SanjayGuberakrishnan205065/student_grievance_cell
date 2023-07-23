const Student = require("../../models/Student");

// get student profile
const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.userInfo._id)
      .select("-password")
      .populate("department", "name");
    return res.status(200).json({
      success: true,
      message: "Student profile fetched successfully",
      student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getStudentProfile,
};
