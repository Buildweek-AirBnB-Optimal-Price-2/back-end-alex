const db = require("../../../config");
// console.log("db", db);
async function add(user) {
  try {
    const [id] = await db("users").insert(user);
    return findById(id);
  } catch (err) {
    console.log(err);
  }
}

function find() {
  return db("users").select("id", "username").orderBy("id");
}

function findBy(filter) {
  return db("users").select("id", "username", "password").where(filter).first();
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
