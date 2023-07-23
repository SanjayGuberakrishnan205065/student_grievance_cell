const {
  getComments,
  addComment,
  addAnonymousComment,
} = require("../controllers/comment/comment");
const protect = require("../middleware/auth");

const router = require("express").Router();

// get all comments for a grievance
router.get("/:grievanceId", protect, getComments);

router.get("/anonymous/:grievanceId", getComments);

// add a comment to a grievance
router.post("/:grievanceId", protect, addComment);

// add a anonymous comment to a grievance
router.post("/anonymous/:grievanceId", addAnonymousComment);

module.exports = router;
