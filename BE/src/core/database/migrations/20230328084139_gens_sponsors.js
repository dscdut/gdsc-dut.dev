/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tableName = 'gens_sponsors';
exports.up = async knex => {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').unsigned().primary();
        table.primary(['gen_id', 'sponsor_id']);
        table.integer('gen_id').unsigned();
        table.integer('sponsor_id').unsigned();
        table.dateTime('deleted_at').defaultTo(null);
        table.timestamps(false, true);
    });

    await knex.raw(`
       CREATE TRIGGER update_timestamp
       BEFORE UPDATE
       ON ${tableName}
       FOR EACH ROW
       EXECUTE PROCEDURE update_timestamp();
     `);
};

exports.down = knex => knex.schema.dropTable(tableName);
