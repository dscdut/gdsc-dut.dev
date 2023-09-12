/**
 * @param {import("knex")} knex
 */

exports.seed = knex => knex('users')
    .del()
    .then(() => knex('users').insert([
        {
            email: 'tuyenpham1104.dev@gmail.com',
        },
        {
            email: 'nguyenthang230203@gmail.com',
        }
    ]));
