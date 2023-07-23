const {
  addGrievance,
  getStudentGrievances,
  getStaffGrievances,
  getGrievance,
  getAssignedAnonymousGrievances,
} = require("../controllers/grievance/grievance");
const { getGrievanceTypes } = require("../controllers/grievance/grievanceType");
const {
  modifyGrievanceStatus,
} = require("../controllers/grievance/grievanceStatus");
const protect = require("../middleware/auth");
const {
  protectStaff,
  protectStaffOrAdmin,
} = require("../middleware/checkUserRole");

const router = require("express").Router();

// create a new grievance
router.post("/", protect, addGrievance);

// get all grievance types
router.get("/types", getGrievanceTypes);

// get all grievances of a student
router.get("/student", protect, getStudentGrievances);

// get all grievances assigned to a staff
router.get("/staff", protect, protectStaff, getStaffGrievances);

router.get(
  "/staff/anonymous",
  protect,
  protectStaff,
  getAssignedAnonymousGrievances
);

// get details of a grievance
router.get("/:grievanceId", protect, getGrievance);

// modify a grievance status
router.patch("/status/:grievanceId", protect, modifyGrievanceStatus);

module.exports = router;
