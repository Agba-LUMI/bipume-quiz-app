const mongoose = require("mongoose");
const UserModel = require("./../Models/userModel");

//Question Schema
const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
});

// Subject Schema with a Map and improved validation
const SubjectSchema = new mongoose.Schema({
  subjects: {
    type: Map,
    of: new mongoose.Schema({
      questions: { type: [QuestionSchema], required: true, default: [] },
    }),
    required: true,
    default: {},
    validate: {
      validator: async function (value) {
        const allowedSubjects =
          UserModel.schema.paths.selectedSubjects.options.validate
            .message()
            .split(":")[1]
            .replace(/[\[\].]/g, "")
            .split(",") // Convert to an array
            .map((s) => s.trim()); // Trim spaces

        // Ensure subjects in the map are valid
        return Object.keys(Object.fromEntries(value)).every((key) =>
          allowedSubjects.includes(key)
        );
      },
      message: (props) =>
        `Invalid subject name(s): ${Object.keys(Object.fromEntries(props.value))
          .filter((key) => !allowedSubjects.includes(key))
          .join(", ")}. Allowed subjects are from UserModel.`,
    },
  },
});

const SubjectModel = mongoose.model("Subjects", SubjectSchema);

module.exports = SubjectModel;
