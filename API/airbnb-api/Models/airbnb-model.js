const db = require("../../../config");

async function add(airbnb) {
  const id = await db("airbnb_rental").insert(airbnb);
  return findById(id);
}

function find() {
  return db("airbnb_rental").select("");
}
