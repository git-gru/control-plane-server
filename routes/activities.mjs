import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Get a list of 50 activities
router.get("/", async (req, res) => {
  let collection = await db.collection("activity_records");
  let results = await collection.find({}).limit(50).toArray();

  res.send(results).status(200);
});

// Add a new document to the collection
router.post("/", async (req, res) => {
  let collection = await db.collection("activity_records");
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

// Delete an entry
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("activity_records");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;
