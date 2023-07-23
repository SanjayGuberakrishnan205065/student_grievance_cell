const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Staff = require("../models/Staff");
const Admin = require("../models/Admin");

const protect = async (req, res, next) => {
  const token = req.cookies["token"];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized to access this route" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.userType === "student") {
      const userInfo = await Student.findById(decoded.userId).select(
        "-password"
      );
      req.user = {
        userInfo,
        userType: decoded.userType,
      };
      next();
      return;
    } else if (decoded.userType === "staff") {
      const userInfo = await Staff.findById(decoded.userId).select("-password");
      req.user = {
        userInfo,
        userType: decoded.userType,
      };
      next();
      return;
    } else if (decoded.userType === "admin") {
      const admin = await Admin.findById(decoded.userId).select("-password");
      req.user = {
        userType: decoded.userType,
        userInfo: admin,
      };
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized to access this route" });
  }
};

module.exports = protect;
