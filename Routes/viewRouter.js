const express = require("express");
const viewController = require("./../Controllers/viewController");
const authController = require("./../Controllers/authController");
const router = express.Router();
router.get("/signup", viewController.getSignUpForm);
router.get("/", authController.getAllUsers, viewController.getOverView);
module.exports = router;
