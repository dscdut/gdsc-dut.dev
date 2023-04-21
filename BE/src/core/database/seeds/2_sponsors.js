/**
 * @param {import("knex")} knex
 */

exports.seed = knex => knex('sponsors')
    .del()
    .then(() => knex('sponsors').insert([
        {
            name: 'Paradox',
            image_id: 1,
            description: 'Cong ty phan mem tai Da Nang',
            infor_url: 'https://careers.paradox.ai/da-nang'
        },
    ]));
