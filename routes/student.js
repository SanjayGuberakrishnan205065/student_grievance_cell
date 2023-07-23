const router = require("express").Router();
const protect = require("../middleware/auth");
const { login, register } = require("../controllers/student/studentAuth");
const { getStudentProfile } = require("../controllers/student/student");
const { protectStudent } = require("../middleware/checkUserRole");
const vaildateRecaptcha = require("../middleware/validateRecaptcha");

router.post("/login", vaildateRecaptcha, login);

router.post("/register", vaildateRecaptcha, register);

router.get("/profile", protect, protectStudent, getStudentProfile);

module.exports = router;
