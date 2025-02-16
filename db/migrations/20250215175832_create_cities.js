/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("cities", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("code").nullable();
    table
      .integer("country_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("country")
      .onDelete("CASCADE");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("cities");
};
