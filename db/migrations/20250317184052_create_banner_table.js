/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("banner", (table) => {
    table.increments("id").primary();
    table.string("photo_md", 1000).nullable();
    table.string("photo_sm", 1000).nullable();
    table.text("link").nullable();
    table.integer("order").nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("banner");
};
