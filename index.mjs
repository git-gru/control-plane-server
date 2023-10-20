import { createServer } from "http";
import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import "./loadEnvironment.mjs";
import "express-async-errors";
import activities from "./routes/activities.mjs";

const PORT = process.env.PORT || 5050;
const app = express();

const http = createServer(app);

app.use(cors());
app.use(express.json());

// Load the /posts routes
app.use("/activities", activities);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.");
});

// start the Express server
http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const socketIO = new Server(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let sockets = [];

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  sockets.push({
    id: socket.id,
    socket,
  });

  socket.emit("greet_from_user", "Hello Client");

  socket.on("disconnect", (socket) => {
    console.log("🔥: A user disconnected");
    sockets = sockets.filter(({ id }) => id !== socket.id);
  });

  socket.on("content_changed_from_client", (msg) => {
    console.log(msg, sockets.length);
    socketIO.emit("set_content", {
      id: socket.id,
      msg,
    });
  });

  socket.on("add_row", (data) => {
    socketIO.emit("add_row", data);
  });

  socket.on("delete_row", (data) => {
    socketIO.emit("delete_row", data);
  });
});
