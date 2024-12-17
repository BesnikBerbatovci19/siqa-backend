/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("subcategory", (table) => {
    table.increments("id").primary();
    table.integer("category_id").notNullable();
    table.string("name").notNullable();
    table.text("description").notNullable();
    table.string("slug").notNullable();
    table.integer("order").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("subcategory");
};
