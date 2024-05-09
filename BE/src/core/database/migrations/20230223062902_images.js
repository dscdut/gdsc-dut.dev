// @ts-check
/**
 * @param {import("knex")} knex
 */
const tableName = 'images';
exports.up = async knex => {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').unsigned().primary();
        table.string('url');
        table.string('public_id');
        table.string('original_filename');
        table.dateTime('deleted_at').defaultTo(null);
        table.timestamps(false, true);
    });
   // raw is Sql queries
    await knex.raw(`
       CREATE TRIGGER update_timestamp
       BEFORE UPDATE
       ON ${tableName}
       FOR EACH ROW
       EXECUTE PROCEDURE update_timestamp();
     `);
};

exports.down = knex => knex.schema.dropTable(tableName);
