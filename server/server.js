import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import userRouter from "./routers/userRouter.js";
import uploadRouter from "./routers/uploadRouter.js";

dotenv.config({ path: path.resolve("../.env") });

//initiate express
const app = express();

//parsing incoming JSON requests
app.use(express.json());

//parsing string and array
app.use(express.urlencoded({ extended: true }));

//enabled access from different servers
app.use(cors());

//Connect mongodb
mongoose.connect(
  process.env.MONGODB_URL || "mongodb://localhost/ecommerce",
  {},
  () => console.log("Mongodb Connected")
);

//API routers
app.use("/api/users", userRouter);
app.use("/api/uploads", uploadRouter);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/client/build/index.html"))
);

//Error handling
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//server port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`This server is running at ${port}`);
});
