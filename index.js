require("dotenv").config({ silent: process.env.NODE_ENV === "production" });

const server = require("./server");

const port = process.env.PORT || 5000;

server.set("port", port);
