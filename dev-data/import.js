const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const fs = require("fs");
const QuestionModel = require("./../Models/questionModel");
if (!process.env.DATABASE || !process.env.DATABASE_PASSWORD) {
  console.error("Error: Missing DATABASE or DATABASE_PASSWORD in .env file");
  process.exit(1);
}
const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

const uri = DB;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

mongoose
  .connect(DB, { serverSelectionTimeoutMS: 30000 })
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.log("Error Connecting to DATABASE"));
const questions = JSON.parse(
  fs.readFileSync(`${__dirname}/questions.json`, "utf-8")
);
const importQuestions = async () => {
  try {
    await QuestionModel.create(questions, { validateBeforeSave: false });
    console.log("Questions loaded successfully");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
const deleteQuestions = async () => {
  try {
    await QuestionModel.deleteMany();
    console.log("Questions deleted from the Database");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
if (process.argv[2] === "--import") {
  importQuestions();
} else if (process.argv[2] === "--delete") {
  deleteQuestions();
}
