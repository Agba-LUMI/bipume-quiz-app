const jwt = require("jsonwebtoken");
const User = require("./../Models/userModel");
const { promisify } = require("util");
const dotenv = require("dotenv");
const catchAsync = require("./../utilities/catchAsync");
dotenv.config({ path: "./config.env" });
const Email = require("./../utilities/email");

exports.signup = catchAsync(async () => {
  const user = User.create({
    fullName: req.body.fullName,
    activeEmail: req.body.activeEmail,
    activeNumber: req.body.activeNumber,
    desireJambScore: req.body.desireJambScore,
    onBipume: req.body.onBipume,
    joinBipume: req.body.joinBipume,
  });
  const signToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  await new Email(user).sendWelcome();
  res.status(200).json({
    status: "success",
    data: user,
  });
});
