exports.up = async function (knex) {
  await knex.schema.createTable("users", (table) => {
    table.increments("id");
    table.text("username").unique().notNullable();
    table.text("password").notNullable();
    table.text("email").notNullable();
    table.text("name").notNullable();
  });

  await knex.schema.createTable("airbnb_rental", (table) => {
    table.increments("id");
    table.text("country").notNullable();
    table.text("city").notNullable();
    table.text("home_type").notNullable();
    table.integer("rooms").notNullable();
    table.integer("min_nights").notNullable();
    table
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("users.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("airbnb_rental");
  await knex.schema.dropTableIfExists("users");
};
