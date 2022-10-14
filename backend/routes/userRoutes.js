const express = require("express");
const router = express.Router();
const {
  registerUSer,
  authUSer,
  allUsers,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(registerUSer).get(protect, allUsers);
router.post("/login", authUSer);

module.exports = router;
