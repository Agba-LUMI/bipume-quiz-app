const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: [
      true,
      "Your Name is required to be registered for this free Mock Exercise",
    ],
  },
  activeEmail: {
    type: String,
    required: [
      true,
      "Your Email is required to be registered for this free Mock Exercise",
    ],
    unique: [
      true,
      "You cannot register more than once for this mock Exam, kindly check your mail for your registration details",
    ],
  },
  activeNumber: {
    type: Number,
    required: [true, "Please Enter Your Active WhatsApp Number"],
  },
  desireJambScore: Number,
  onBipume: {
    type: String,
    required: [true, "This is important, kindly fill in"],
  },
  joinBipume: {
    type: Boolean,
    required: [true, "This is important, kindly fill in"],
  },
});
const UserModel = mongoose.model("userModel", userSchema);

module.exports = UserModel;
