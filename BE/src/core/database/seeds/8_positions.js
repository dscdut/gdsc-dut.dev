/**
 * @param {import("knex")} knex
 */

exports.seed = knex => knex('positions')
    .del()
    .then(() => knex('positions').insert([
        {
            name: 'Lead',
        },
        {
            name: 'Member',
        }
    ]));
