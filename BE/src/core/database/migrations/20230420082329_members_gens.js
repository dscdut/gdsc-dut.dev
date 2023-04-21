/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tableName = 'members_gens';
exports.up = async knex => {
    await knex.schema.createTable(tableName, table => {
        table.increments('id').unsigned().primary();
        table.integer('member_id').unsigned().references('id').inTable('members')
            .notNullable();
        table.integer('gen_id').unsigned().references('id').inTable('gens')
            .notNullable();
        table.integer('department_id').unsigned().references('id').inTable('departments')
            .notNullable();
        table.integer('position_id').unsigned().references('id').inTable('positions')
            .notNullable();
        table.integer('product_id').unsigned().references('id').inTable('products');
        table.unique(['member_id', 'gen_id', 'department_id']);
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
