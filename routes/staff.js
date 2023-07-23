const router = require("express").Router();
const { getStaffs, getStaffProfile } = require("../controllers/staff/staff");
const { login, register } = require("../controllers/staff/staffAuth");
const protect = require("../middleware/auth");
const { protectStaff } = require("../middleware/checkUserRole");
const validateRecaptcha = require("../middleware/validateRecaptcha");

router.post("/login", validateRecaptcha, login);

router.post("/register", validateRecaptcha, register);

// get staffs from any of the chosen departments
router.get("/department/:departmentId", getStaffs);

router.get("/profile", protect, protectStaff, getStaffProfile);

module.exports = router;
