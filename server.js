require("dotenv").config();
const express = require("express");
const server = express();
const helmet = require("helmet");
const cors = require("cors");
const userRouter = require("./API/user-api/Routers/user-router");
const airbnbRouter = require("./API/airbnb-api/Routers/airbnb_router");
const authenticate = require("./API/middleware/airbnb-middleware");
server.use(express.json());
const jsonErrorHandler = async (err, req, res, next) => {
  res.status(500).json({ error: err });
};
server.use(jsonErrorHandler);
server.use(helmet());
server.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
server.use("/api/users", userRouter);
server.use("/api/airbnb", authenticate, airbnbRouter);
server.get("/", (req, res) => {
  return res.json({ Message: "Welcome" });
});

module.exports = server;
