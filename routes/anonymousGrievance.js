const router = require("express").Router();
const {
  createAnonymousGrievance,
  getAnonymousGrievance,
  modifyAnonymousGrievanceStatus,
} = require("../controllers/grievance/anonymousGrievance");
const vaildateRecaptcha = require("../middleware/validateRecaptcha");

// create a new anonymous grievance
router.post("/", vaildateRecaptcha, createAnonymousGrievance);

// get details of a grievance using tracking id
router.get("/:trackingId", vaildateRecaptcha, getAnonymousGrievance);

// get details of a grievance using id
router.get("/id/:grievanceId", getAnonymousGrievance);

// modify status of a anonymous grievance
router.patch("/status/:grievanceId", modifyAnonymousGrievanceStatus);

module.exports = router;
