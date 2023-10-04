import { GenMember } from './gens.type'

export type Member = {
  id: number
  name: string
}

export type MemberType = {
  id: number
  full_name: string
  birthday: string
  phone: string
  email: string
  horoscope_sign: string
  philosophy: string
  feelings: string
  infor_url: string
  image: {
    id: number
    url: string
  }
  gens: {
    department: {
      department_id: number
      department_name: string
    }
    position: {
      position_id: number
      position_name: string
    }
    gen: {
      gen_id: number
      gen_name: string
    }
    products: {
      product_id: number
      product_name: string
    }[]
  }[]
  deletedAt: string | null
  createdAt: string | null
  updatedAt: string | null
}

export type MemberBody = Pick<
  MemberType,
  'full_name' | 'birthday' | 'phone' | 'email' | 'horoscope_sign' | 'philosophy' | 'feelings' | 'infor_url'
> & {
  image_id: number
  gens: GenMember[]
}
