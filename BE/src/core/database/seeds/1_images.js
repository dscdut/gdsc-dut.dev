/**
 * @param {import("knex")} knex
 */

exports.seed = knex => knex('images')
    .del()
    .then(() => knex('images').insert([
        {
            url: 'https://res.cloudinary.com/dpmvdkxzf/image/upload/v1680761795/gdsc/cyapvfh4nqsoscrzzfbm.jpg?fbclid=IwAR2RlJc_S_71AiL8QdtFkwXwqIdTDKKurbbZ6zfAXGejYLnn37iEWPHtsow',
            public_id: 'gdsc/cyapvfh4nqsoscrzzfbm',
            original_filename: 'gdsc-1680761790321',
        },
    ]));
