const db = require("../../../config");

async function add(airbnb) {
  const id = await db("airbnb_rental").insert(airbnb);
  return findById(id);
}

function find() {
  return db("airbnb_rental")
    .select(
      "id",
      "country",
      "city",
      "home_type",
      "rooms",
      "min_nights",
      "user_id"
    )
    .orderBy("id");
}

function findById(id) {
  return db("airbnb_rental")
    .select(
      "id",
      "country",
      "city",
      "home_type",
      "rooms",
      "min_nights",
      "user_id"
    )
    .where({ id })
    .first();
}

function findByUser(id) {
  return db("airbnb_rental").where("user_id", "=", id);
}

function update(id, house) {
  return db("airbnb_rental").select("id").where({ id }).update(house);
}

function deleteHouseById(id) {
  return db("airbnb_rental").select("id").where({ id }).del();
}

module.exports = {
  add,
  find,
  findById,
  deleteHouseById,
  update,
  findByUser,
};
