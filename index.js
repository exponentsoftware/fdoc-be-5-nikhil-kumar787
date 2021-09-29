// const express = require("express");
// const mongoose = require("mongoose");
import express from "express";
import mongoose from "mongoose";
import { errorHandler } from "./middlewares/errors";
import passport from "passport";
import path from "path";
import "./passport";

// const env = require("dotenv");
import env from "dotenv";
env.config();

import todoRoute from "./route/todoRoute.js";
import authRoute from "./route/authRoute.js";
import expressLayouts from "express-ejs-layouts";

const app = express();

app.use(express.json());

app.get("/", (req, res) => res.render("welcome"));

app.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json("Secret Data");
  }
);

app.use("/todo", todoRoute);
app.use("/auth", authRoute);

// DB conection
mongoose.connect(process.env.MONGO_DB_URI, {
  useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
});
mongoose.connection
  .once("open", function () {
    console.log("Connected to Mongo");
  })
  .on("error", function (err) {
    console.log("Mongo Error", err);
  });

// EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// app.use(notFound);
app.use(errorHandler);

app.listen(3001, () => {
  console.log("Server is up and running at the port 3001");
});
