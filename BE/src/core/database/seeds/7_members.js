/**
 * @param {import("knex")} knex
 */

exports.seed = knex => knex('members')
    .del()
    .then(() => knex('members').insert([
        {
            image_id: 1,
            full_name: 'Nguyen Van Thang',
            birthday: '2003-02-23',
            phone: '0363442302',
            email: 'nguyenthang230203@gmail.com',
            horoscope_sign: 'Nhan Ma',
            philosophy: 'Song De Fix Bug',
            feelings: 'GDSC_DUT',
            infor_url: 'https://www.facebook.com/thang.230203'
        },
        {
            image_id: 1,
            full_name: 'Hoang Quang hung',
            birthday: '2001-08-31',
            phone: '0123456789',
            email: 'hunie123@gmail.com',
            horoscope_sign: 'Xu Nu',
            philosophy: 'Leader BackEnd',
            feelings: 'GDSC_DUT',
            infor_url: 'https://www.facebook.com/hqh.2001'
        }
    ]));
