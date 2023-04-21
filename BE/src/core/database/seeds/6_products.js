/**
 * @param {import("knex")} knex
 */

exports.seed = knex => knex('products')
    .del()
    .then(() => knex('products').insert([
        {
            name: 'Smart Food',
            image_id: 1,
            description: 'Dead',
            infor_url: 'Link Smart Food'
        },
    ]));
