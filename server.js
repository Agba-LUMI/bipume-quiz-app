const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
dotenv.config({ path: "/config.env" });
const userModel = require("./Models/userModel");
const DB = process.env.DATABASE.replace(
  "<db_password>",
  process.env.DATABASE_PASSWORD
);

(async () => {
  try {
    await mongoose.connect(DB);

    console.log("Database connected successfully");

    // Drop the existing index for activeEmail to remove duplicate issues
    await UserModel.collection.dropIndex("activeEmail_1").catch((err) => {
      console.log(
        "No existing index to drop or already deleted. Proceeding..."
      );
    });

    // Recreate indexes defined in your schema
    await UserModel.createIndexes();

    console.log("Indexes recreated successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error during index recreation:", error);
    process.exit(1);
  }
})();
const port = process.env.PORT || 4000;
const server = app.listen(port, () =>
  console.log(`Server is running on port ${port}`)
);
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  F;
  console.log("Shutting down...");

  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM
process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Cleaning up...");

  // Close database connection
  await mongoose.connection.close();
  console.log("Database connection closed.");

  // Close server gracefully
  server.close(() => {
    console.log("HTTP server closed.");
    process.exit(0);
  });

  // Force exit if cleanup takes too long
  setTimeout(() => {
    console.error("Forced shutdown due to timeout.");
    process.exit(1);
  }, 5000);
});
