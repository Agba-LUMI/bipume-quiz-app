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
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const users = await User.find();
    const totalPages = Math.ceil((await User.countDocuments()) / limit);
    const results = {
      totalPages,
    };
    if (endIndex <= users.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex >= 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.result = users.slice(startIndex, endIndex);

    res.locals.results = results;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "error",
      message: "An error occured",
    });
  }
};
