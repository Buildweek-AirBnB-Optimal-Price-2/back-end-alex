exports.seed = async function (knex) {
  await knex("users").insert([
    { username: "testing1", password: "testing1" },
    { username: "testing2", password: "testing2" },
    { username: "testing3", password: "testing3" },
  ]);
};
