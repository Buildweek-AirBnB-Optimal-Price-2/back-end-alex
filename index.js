require("dotenv").config();

const server = require("./server");

const port = process.env.PORT || 5000;

server.set("port", port);
