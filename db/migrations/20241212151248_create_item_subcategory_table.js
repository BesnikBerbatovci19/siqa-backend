/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("item_subcategory", (table) => {
    table.increments("id").primary();
    table.integer("subcategory_id").notNullable();
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
  return knex.schema.dropTable("item_subcategory");
};
