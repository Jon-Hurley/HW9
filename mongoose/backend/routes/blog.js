import express from "express";
import mongoose from 'mongoose';
import {BlogModel} from "../schema/blog.js";

const router = express.Router();
const CLUSTER_URL = 'mongodb+srv://jon:DQK35v6te5hutvcQ@cluster0.me0gp13.mongodb.net/test'
 // const {MongoClient, ObjectId} = require('mongodb');

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
  await mongoose.connect(CLUSTER_URL);
  } catch (e) {
    mongoose.connection.close();
    console.log("BROKE")
    console.log(e);
  }
  // find blogs based on no condition==> get all blogs
  const blogs = await BlogModel.find({});
  // convert each blog to an object and send an array to client
  await mongoose.connection.close();
  console.log("DONE WITH VIEW");
  return res.send(blogs.map((blog) => blog.toObject()));
});

router.post("/create-post/", async (req, res) => {
  // body should be JSON
  console.log(req);
  try {
  await mongoose.connect(CLUSTER_URL);
  } catch (e) {
    mongoose.connection.close();
    console.log("BROKEN")
  }
  const body = req.body;
  // create blog model with the request body
  const blog = new BlogModel({content: body.content, title: body.title});
  // remember to await .save();
  // save to mongodb
  console.log("Made it 1")
  await blog.save();
  console.log("Made it here")
  // get an object representation and send it back to the client
  await mongoose.connection.close();
  console.log("DONE WITH CREATE")
  return res.send(blog.toObject());
});

export default router;
