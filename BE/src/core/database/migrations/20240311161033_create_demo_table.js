/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tableName = "demo"
exports.up = async (knex) => {
     await knex.schema.createTable(tableName, table => {
        table.increments('id').unsigned().primary();
        table.string('name');
        table.string('url');
        table.string('public_id');
        table.string('original_filename');
     })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => {
    knex.schema.dropTable(tableName)
};
