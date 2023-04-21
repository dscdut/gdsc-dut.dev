// @ts-check
/**
 * @param {import("knex")} knex
 */
const tableName = 'members';
exports.up = async knex => {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').unsigned().primary();
        table.integer('image_id').unsigned().references('id').inTable('images')
            .notNullable();
        table.string('full_name');
        table.dateTime('birthday');
        table.string('phone');
        table.string('email');
        table.string('horoscope_sign');
        table.string('philosophy');
        table.string('feelings');
        table.string('infor_url');
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
