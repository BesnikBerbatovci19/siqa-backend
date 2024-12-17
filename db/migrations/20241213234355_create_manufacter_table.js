/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("manufacter", (table) => {
    table.increments("id").primary();
    table.integer("category_id").notNullable();
    table.string("name").notNullable();
    table.string("slug").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("manufacter");
};
