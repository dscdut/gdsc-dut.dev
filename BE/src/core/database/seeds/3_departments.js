/**
 * @param {import("knex")} knex
 */

exports.seed = knex => knex('departments')
    .del()
    .then(() => knex('departments').insert([
        {
            name: 'Backend',
        },
        {
            name: 'Frontend',
        },
        {
            name: 'Mobile'
        },
        {
            name: 'Maketting'
        },
        {
            name: 'Events'
        },
        {
            name: 'HR'
        },
        {
            name: 'Partnerships'
        }
    ]));
