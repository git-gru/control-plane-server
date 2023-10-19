import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "mongodb://localhost:27017";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);
}

let db = conn.db("control_plane");

export default db;
