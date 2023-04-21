/**
 * @param {import("knex")} knex
 */

exports.seed = knex => knex('events')
    .del()
    .then(() => knex('events').insert([
        {
            name: 'Infor Session',
            image_id: 1,
            description: 'Description Of Infor Session',
        },
        {
            name: 'Photoshoot',
            image_id: 1,
            description: 'Description Of Photoshoot',
        }
    ]));
