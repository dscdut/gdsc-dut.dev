/**
 * @param {import("knex")} knex
 */

exports.seed = knex => knex('members_gens')
    .del()
    .then(() => knex('members_gens').insert([
        {
            member_id: 1,
            gen_id: 1,
            department_id: 4,
            position_id: 1,
            product_id: 1
        },
        {
            member_id: 2,
            gen_id: 1,
            department_id: 1,
            position_id: 1,
            product_id: 1
        },
    ]));
