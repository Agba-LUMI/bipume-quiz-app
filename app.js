const compression = require("compression");
const userRouter = require("./Routes/userRouter");
const express = require("express");
const dotenv = require(dotenv);
const cors = require(cors);
const helmet = require("helmet");
const globalErrorHandler = require("./Controllers/errorHandler");
const app = express();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "Views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.options("*", cors());
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ limit: "10kb" }));
app.use(compression());
app.enable("trust proxy");
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

app.use("/api/v1/users/signup", userRouter);
app.use("/", viewRouter);
app.use(globalErrorHandler);
module.exports = app;
