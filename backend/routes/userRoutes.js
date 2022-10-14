const express = require("express");
const router = express.Router();
const { registerUSer, authUSer } = require("../controllers/userControllers");

router.route("/").post(registerUSer);
router.post("/login", authUSer);

module.exports = router;
