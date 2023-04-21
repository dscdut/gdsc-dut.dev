/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async knex => knex.schema.alterTable('members', table => {
    table.integer('image_id').unsigned().notNullable().defaultTo(1)
        .alter();
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async knex => knex.schema.alterTable('members', table => {
    table.integer('image_id').unsigned().notNullable().alter();
});
