/**
 * @param {import("knex")} knex
 */

exports.seed = knex => knex('gens')
    .del()
    .then(() => knex('gens').insert([
        {
            name: 'Gen 4',
        },
    ]));
