const Staff = require("../../models/Staff");

// get list of staffs from the student's department
const getStaffs = async (req, res) => {
  try {
    const { departmentId } = req.params;
    const staffs = await Staff.find({
      department: departmentId,
      approvedByAdmin: true,
    }).select(["-password", "-createdAt", "-updatedAt"]);
    res.status(200).json({
      success: true,
      message: "List of staffs",
      staffs,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// get staff profile
const getStaffProfile = async (req, res) => {
  try {
    const staff = await Staff.findById(req.user.userInfo._id)
      .select(["-password", "-createdAt", "-updatedAt"])
      .populate("department", "name");
    return res.status(200).json({
      success: true,
      message: "Staff profile fetched successfully",
      staff,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  getStaffs,
  getStaffProfile,
};
