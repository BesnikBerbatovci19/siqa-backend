/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("product", (table) => {
    table.increments("id").primary();
    table.integer("user_id").nullable();
    table.integer("category_id");
    table.string("category_slug");
    table.integer("subcategory_id");
    table.string("subcategory_slug");
    table.integer("itemsubcategory_id");
    table.string("itemsubcategory_slug");
    table.string("slug").nullable();
    table.integer("manufacter_id").nullable();
    table.string("name").nullable();
    table.text("description").nullable();
    table.integer("price").nullable();
    table.integer("purchase_price").nullable();
    table.string("SKU").nullable();
    table.string("barcode").nullable();
    table.tinyint("status").nullable();
    table.integer("inStock").nullable();
    table.integer("warranty").nullable();
    table.integer("discount").nullable();
    table.text("path").nullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("product");
};
