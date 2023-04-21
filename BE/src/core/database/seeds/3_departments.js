/**
 * @param {import("knex")} knex
 */

exports.seed = knex => knex('departments')
    .del()
    .then(() => knex('departments').insert([
        {
            name: 'Backend',
        },
    ]));
