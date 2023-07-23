const { userLoggedIn, logout } = require("../controllers/auth/auth");
const protect = require("../middleware/auth");

const router = require("express").Router();

// run when user launches the app to check if they are logged in
router.get("/", protect, userLoggedIn);

router.post("/logout", logout);

module.exports = router;
