import multer from "multer";
import express from "express";
import { isAuth } from "../utils.js";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve("../../.env") });
const uploadRouter = express.Router();
dotenv.config();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

uploadRouter.post("/", isAuth, upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

const s3 = new aws.S3({
  region: process.env.AW_REGION,
  accessKeyId: process.env.AW_ACCESS_KEY,
  secretAccessKey: process.env.AW_SECRET_ACCESS_KEY,
  AWS_SDK_LOAD_CONFIG: 1,
});

const storageS3 = multerS3({
  s3,
  bucket: "shukhrat-ecommerce",
  acl: "public-read",
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key(req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadS3 = multer({ storage: storageS3 });
uploadRouter.post("/s3", uploadS3.single("image"), (req, res) => {
  res.send(req.file.location);
});

export default uploadRouter;
