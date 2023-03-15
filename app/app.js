const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const actorsRouter = require("../api/routes/actors");
const moviesRouter = require("../api/routes/movies");
require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (res.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT PATCH, DELETE");
  }
  next();
});

app.get("/", (req, res, next) => {
  res.status(200).json({ message: "Service is up", method: req.method });
});

app.use("/actors", actorsRouter);
app.use("/movies", moviesRouter);

app.use((req, res, next) => {
  const err = new Error("NOT FOUND!");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      message: err.message,
      status: err.status,
      method: req.method,
    },
  });
});

mongoose.connect(process.env.mongoDBURL);

module.exports = app;