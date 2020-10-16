require("dotenv").config({ silent: process.env.NODE_ENV === "production" });

const server = require("./server");

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`listening on ${port}`);
});
