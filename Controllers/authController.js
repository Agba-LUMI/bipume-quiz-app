const jwt = require("jsonwebtoken");
const User = require("./../Models/userModel");
const { promisify } = require("util");
const dotenv = require("dotenv");
const catchAsync = require("./../utilities/catchAsync");
dotenv.config({ path: "./config.env" });
const Email = require("./../utilities/email");

exports.signup = catchAsync(async (req, res) => {
  if (
    !req.body.fullName ||
    !req.body.activeEmail ||
    !req.body.activeNumber ||
    !req.body.desireJambScore ||
    !req.body.onBipume ||
    !req.body.joinBipume
  ) {
    return res.status(400).json({
      status: "fail",
      message: "All fields are required",
    });
  }
  const user = await User.create({
    fullName: req.body.fullName,
    activeEmail: req.body.activeEmail,
    activeNumber: req.body.activeNumber,
    desireJambScore: req.body.desireJambScore,
    onBipume: req.body.onBipume,
    joinBipume: req.body.joinBipume,
  });

  await new Email(user).sendWelcome();
  res.status(200).json({
    status: "success",
    data: user,
  });
});
exports.sendReminderMail = async (req, res) => {
  try {
    const users = await User.find();

    const emailPromises = users.map((user) =>
      new Email(user).sendReminderMail()
    );

    await Promise.all(emailPromises);

    res.status(200).json({
      status: "success",
      message: "Reminder emails sent successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "An error occurred while sending reminder emails",
    });
  }
};
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.locals.users = users;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "An error occured",
    });
  }
};
