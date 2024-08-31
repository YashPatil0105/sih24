const express = require("express");
const router = express.Router();

const { login, signUp } = require("../controllers/authController");

router.route("/login").post(login);
router.route("/signUp").post(signUp);

module.exports = router;
