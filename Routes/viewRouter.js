const express = require("express");
const viewController = require("./../Controllers/viewController");
const router = express.Router();
router.get("/signup", viewController.getSignUpForm);
module.exports = router;
