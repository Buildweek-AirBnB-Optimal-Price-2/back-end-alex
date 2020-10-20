const db = require("../../../config");

async function add(user) {
  const [id] = await db("users").insert(user);
  return findById(id);
}

function find() {
  return db("users").select("id", "username").orderBy("id");
}

function findBy(filter) {
  return db("users").select("id", "username", "password").where(filter);
}

function findById(id) {
  return db("users").select("id", "username").where({ id }).first();
}

function deleteUserById(id) {
  return db("users").select("id", "username").where({ id }).del();
}

module.exports = {
  add,
  find,
  findBy,
  findById,
  deleteUserById,
};
