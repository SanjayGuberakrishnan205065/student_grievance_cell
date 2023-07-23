const jwt = require("jsonwebtoken");

const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "14 days" });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return {
      status: true,
      userType: decoded.userType,
      userId: decoded.userId,
    };
  } catch (err) {
    return {
      status: false,
    };
  }
};

module.exports = { createToken };
