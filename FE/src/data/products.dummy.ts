import { ProductType } from 'src/types/products.type'

export const PRODUCTS: ProductType[] = [
  {
    id: 1,
    name: 'Smart Food',
    description: 'Dead',
    infor_url: 'Link Smart Food',
    deleted_at: null,
    created_at: '2023-09-12T15:05:21.465Z',
    updated_at: '2023-09-12T15:05:21.465Z',
    image: {
      id: 1,
      url: 'https://res.cloudinary.com/dpmvdkxzf/image/upload/v1680761795/gdsc/cyapvfh4nqsoscrzzfbm.jpg?fbclid=IwAR2RlJc_S_71AiL8QdtFkwXwqIdTDKKurbbZ6zfAXGejYLnn37iEWPHtsow'
    },
    gens: {
      id: 1,
      name: 'Gen 4'
    },
    members: [
      {
        id: 1,
        name: 'Nguyen Van Thang'
      },
      {
        id: 2,
        name: 'Hoang Quang hung'
      }
    ]
  }
]

export const PRODUCT: ProductType = {
  id: 1,
  name: 'Smart Food',
  description: 'Dead',
  infor_url: 'Link Smart Food',
  deleted_at: null,
  created_at: '2023-09-12T15:05:21.465Z',
  updated_at: '2023-09-12T15:05:21.465Z',
  image: {
    id: 1,
    url: 'https://res.cloudinary.com/dpmvdkxzf/image/upload/v1680761795/gdsc/cyapvfh4nqsoscrzzfbm.jpg?fbclid=IwAR2RlJc_S_71AiL8QdtFkwXwqIdTDKKurbbZ6zfAXGejYLnn37iEWPHtsow'
  },
  gens: {
    id: 1,
    name: 'Gen 4'
  },
  members: [
    {
      id: 1,
      name: 'Nguyen Van Thang'
    },
    {
      id: 2,
      name: 'Hoang Quang hung'
    }
  ]
}
