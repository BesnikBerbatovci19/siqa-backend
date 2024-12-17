/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("surname").notNullable();
    table.string("email").unique().notNullable();
    table.string("phone").notNullable();
    table.string("password").notNullable();
    table.enum("role", ["admin", "user", "guest"]).defaultTo("guest");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
