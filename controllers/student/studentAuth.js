const Student = require("../../models/Student");
const { createToken } = require("../../utils/userToken");
const { hashPassword, verifyPassword } = require("../../utils/hashPassword");

const login = async (req, res) => {
  const { registerNo, password } = req.body;
  try {
    const student = await Student.findOne({ registerNo });
    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const isPasswordCorrect = await verifyPassword(password, student.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    res.cookie(
      "token",
      createToken({ userId: student.id, userType: "student" }),
      {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
        sameSite: "strict",
      }
    );
    // remove password from response
    student.password = undefined;
    return res.status(200).json({
      success: true,
      message: "Student logged in successfully",
      student,
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
    const { registerNo, password, name, email, department, phone } = req.body;
    const hasedPassword = await hashPassword(password);
    const student = await Student.create({
      name,
      email,
      phone,
      registerNo,
      department,
      password: hasedPassword,
    });
    res.cookie(
      "token",
      createToken({ userId: student.id, userType: "student" }),
      {
        maxAge: 1000 * 60 * 60 * 24 * 14,
        httpOnly: true,
        sameSite: "strict",
      }
    );
    student.password = undefined;
    res.status(201).json({
      success: true,
      message: "Student registered successfully",
      student,
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: err.keyPattern.phone
          ? "Phone number already exists"
          : err.keyPattern.email
          ? "Email already exists"
          : "Register number already exists",
      });
    }
    console.log(err);
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
