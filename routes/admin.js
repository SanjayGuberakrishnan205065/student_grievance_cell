const router = require("express").Router();
const {
  getAllGrievances,
  getGrievanceById,
  getAllAnonymousGrievances,
  getAnonymousGrievanceById,
} = require("../controllers/admin/grievances");
const {
  getStaffsFromDepartment,
  getStaffById,
  getUnapprovedStaffs,
  approveStaff,
} = require("../controllers/admin/staff");
const protect = require("../middleware/auth");
const { protectAdmin } = require("../middleware/checkUserRole");

router.get("/grievances/view", protect, protectAdmin, getAllGrievances);

router.get("/grievances/view/:id", protect, protectAdmin, getGrievanceById);

router.get(
  "/anonymous-grievances/view",
  protect,
  protectAdmin,
  getAllAnonymousGrievances
);

router.get(
  "/anonymous-grievances/view/:id",
  protect,
  protectAdmin,
  getAnonymousGrievanceById
);

// get all staffs from a department
router.get(
  "/staffs/view/department/:deptId",
  protect,
  protectAdmin,
  getStaffsFromDepartment
);

// get a single staff by id
router.get(
  "/staffs/view/details/:staffId",
  protect,
  protectAdmin,
  getStaffById
);

// get unapproved staffs
router.get(
  "/staffs/view/unapproved",
  protect,
  protectAdmin,
  getUnapprovedStaffs
);

// approve a staff with id
router.put("/staffs/approve/:staffId", protect, protectAdmin, approveStaff);

module.exports = router;
