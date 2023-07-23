const protectAdmin = (req, res, next) => {
  if (req.user.userType !== "admin") {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }
  next();
};

const protectStaff = (req, res, next) => {
  if (req.user.userType !== "staff") {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }
  next();
};

const protectStudent = (req, res, next) => {
  if (req.user.userType !== "student") {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }
  next();
};

const protectStaffOrAdmin = (req, res, next) => {
  if (req.user.userType !== "staff" && req.user.userType !== "admin") {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }
  next();
};

module.exports = {
  protectAdmin,
  protectStaff,
  protectStudent,
  protectStaffOrAdmin,
};
