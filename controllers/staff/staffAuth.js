const Admin = require("../../models/Admin");
const Staff = require("../../models/Staff");
const { hashPassword, verifyPassword } = require("../../utils/hashPassword");
const { createToken } = require("../../utils/userToken");

const login = async (req, res) => {
  try {
    const { staffId, password } = req.body;
    // check if staff is admin
    const admin = await Admin.findOne({ email: staffId });
    if (admin) {
      const isPasswordCorrect = await verifyPassword(password, admin.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({
          success: false,
          message: "Invalid credentials or not approved by admin",
        });
      }
      res.cookie(
        "token",
        createToken({ userId: admin.id, userType: "admin" }),
        {
          maxAge: 1000 * 60 * 60 * 24 * 14,
          httpOnly: true,
          sameSite: "strict",
        }
      );
      // remove password from response
      admin.password = undefined;
      return res.status(200).json({
        success: true,
        message: "Admin logged in successfully",
        admin,
      });
    }
    const staff = await Staff.findOne({ staffId, approvedByAdmin: true });
    if (!staff) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials or not approved by admin",
      });
    }
    const isPasswordCorrect = await verifyPassword(password, staff.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials or not approved by admin",
      });
    }
    res.cookie("token", createToken({ userId: staff.id, userType: "staff" }), {
      maxAge: 1000 * 60 * 60 * 24 * 14,
      httpOnly: true,
      sameSite: "strict",
    });
    // remove password from response
    staff.password = undefined;
    return res.status(200).json({
      success: true,
      message: "Staff logged in successfully",
      staff,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const register = async (req, res) => {
  try {
    const { staffId, password, name, email, department, phone, designation } =
      req.body;
    const hasedPassword = await hashPassword(password);
    const staff = await Staff.create({
      name,
      email,
      phone,
      staffId,
      department,
      password: hasedPassword,
      designation,
    });
    res.cookie(
      "token",
      await createToken({ userId: staff.id, userType: "staff" }),
      {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
        sameSite: "strict",
      }
    );
    // remove password from response
    staff.password = undefined;
    return res.status(201).json({
      success: true,
      message: "Staff registered successfully",
      staff,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: err.keyPattern.staffId
          ? "Staff ID already exists"
          : err.keyPattern.email
          ? "Email already exists"
          : "Phone number already exists",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  login,
  register,
};
