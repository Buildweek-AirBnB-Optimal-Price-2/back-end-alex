exports.seed = async function (knex) {
  await knex("users").insert([
    {
      username: "testing1",
      password: "testing1",
      email: "testing1@email.com",
      name: "testing1",
    },
    {
      username: "testing2",
      password: "testing2",
      email: "testing2@email.com",
      name: "testing2",
    },
    {
      username: "testing3",
      password: "testing3",
      email: "testing3@email.com",
      name: "testing3",
    },
  ]);
};
