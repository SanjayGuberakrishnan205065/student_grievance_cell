const router = require("express").Router();
const {
  getDepartments,
  getDepartmentById,
} = require("../controllers/department/department");

// get all departments
router.get("/", getDepartments);

// get a single department by id
router.get("/:id", getDepartmentById);

module.exports = router;
