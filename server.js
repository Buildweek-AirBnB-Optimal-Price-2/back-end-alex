const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const userRouter = require("./API/user-api/Routers/user-router");

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use("/api/users", userRouter);
server.use(userRouter);
server.get("/", (req, res) => {
  res.json({ api: "Open" });
});

module.exports = server;
