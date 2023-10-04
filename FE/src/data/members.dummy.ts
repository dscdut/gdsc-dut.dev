import { MemberType } from 'src/types/member.type'

export const MEMBERS: MemberType[] = [
  {
    id: 1,
    full_name: 'Nguyen Van Thang',
    birthday: '2003-02-22T17:00:00.000Z',
    phone: '0363442302',
    email: 'nguyenthang230203@gmail.com',
    horoscope_sign: 'Nhan Ma',
    philosophy: 'Song De Fix Bug',
    feelings: 'GDSC_DUT',
    infor_url: 'https://www.facebook.com/thang.230203',
    createdAt: '2023-09-12T15:05:21.468Z',
    updatedAt: '2023-09-12T15:05:21.468Z',
    deletedAt: null,
    image: {
      id: 1,
      url: 'https://res.cloudinary.com/dpmvdkxzf/image/upload/v1680761795/gdsc/cyapvfh4nqsoscrzzfbm.jpg?fbclid=IwAR2RlJc_S_71AiL8QdtFkwXwqIdTDKKurbbZ6zfAXGejYLnn37iEWPHtsow'
    },
    gens: [
      {
        gen: {
          gen_id: 1,
          gen_name: 'Gen 4'
        },
        department: {
          department_id: 4,
          department_name: 'Maketting'
        },
        position: {
          position_id: 1,
          position_name: 'Lead'
        },
        products: [
          {
            product_id: 1,
            product_name: 'Smart Food'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    full_name: 'Hoang Quang hung',
    birthday: '2001-08-30T17:00:00.000Z',
    phone: '0123456789',
    email: 'hunie123@gmail.com',
    horoscope_sign: 'Xu Nu',
    philosophy: 'Leader BackEnd',
    feelings: 'GDSC_DUT',
    infor_url: 'https://www.facebook.com/hqh.2001',
    createdAt: '2023-09-12T15:05:21.468Z',
    updatedAt: '2023-09-12T15:05:21.468Z',
    deletedAt: null,
    image: {
      id: 1,
      url: 'https://res.cloudinary.com/dpmvdkxzf/image/upload/v1680761795/gdsc/cyapvfh4nqsoscrzzfbm.jpg?fbclid=IwAR2RlJc_S_71AiL8QdtFkwXwqIdTDKKurbbZ6zfAXGejYLnn37iEWPHtsow'
    },
    gens: [
      {
        gen: {
          gen_id: 31,
          gen_name: 'Gen 4'
        },
        department: {
          department_id: 134,
          department_name: 'Backend'
        },
        position: {
          position_id: 24,
          position_name: 'Lead'
        },
        products: [
          {
            product_id: 1,
            product_name: 'Smart Food'
          }
        ]
      }
    ]
  }
]

export const MEMBER: MemberType = {
  id: 1,
  full_name: 'Nguyen Van Thang',
  birthday: '2003-02-22T17:00:00.000Z',
  phone: '0363442302',
  email: 'nguyenthang230203@gmail.com',
  horoscope_sign: 'Nhan Ma',
  philosophy: 'Song De Fix Bug',
  feelings: 'GDSC_DUT',
  infor_url: 'https://www.facebook.com/thang.230203',
  createdAt: '2023-09-12T15:05:21.468Z',
  updatedAt: '2023-09-12T15:05:21.468Z',
  deletedAt: null,
  image: {
    id: 1,
    url: 'https://res.cloudinary.com/dpmvdkxzf/image/upload/v1680761795/gdsc/cyapvfh4nqsoscrzzfbm.jpg?fbclid=IwAR2RlJc_S_71AiL8QdtFkwXwqIdTDKKurbbZ6zfAXGejYLnn37iEWPHtsow'
  },
  gens: [
    {
      gen: {
        gen_id: 31,
        gen_name: 'Gen 4'
      },
      department: {
        department_id: 137,
        department_name: 'Maketting'
      },
      position: {
        position_id: 24,
        position_name: 'Lead'
      },
      products: [
        {
          product_id: 1,
          product_name: 'Smart Food'
        }
      ]
    }
  ]
}
