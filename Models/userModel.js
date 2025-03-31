const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [
      true,
      "Your Name is required to be registered for this free Mock Exercise",
    ],
    trim: true,
  },
  activeEmail: {
    type: String,
    required: [
      true,
      "Your Email is required to be registered for this free Mock Exercise",
    ],
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (val) {
        // Simple regex for basic email validation
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val);
      },
      message: "Please provide a valid email address",
    },
  },
  activeNumber: {
    type: String, // Changed from Number to String
    required: [true, "Please Enter Your Active WhatsApp Number"],
    trim: true,
  },
  desireJambScore: {
    type: Number,
    required: [true, "Please provide your desired JAMB score"],
  },
  onBipume: {
    type: String,
    required: [true, "This is important, kindly fill in"],
  },
  joinBipume: {
    type: String,
    required: [true, "This is important, kindly fill in"],
  },
});

const UserModel = mongoose.model("UserModel", userSchema); // Note: Capitalized the model name to follow convention
module.exports = UserModel;
