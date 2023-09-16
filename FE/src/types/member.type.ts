import { Position } from './positions.type'
import { Department } from './department.type'
import { Gen, GenMember } from './gens.type'

export type Member = {
  id: number
  name: string
}

export type MemberType = {
  id: number
  avatar_url: string
  full_name: string
  birthday: string
  phone: string
  email: string
  horoscope_sign: string
  philosophy: string
  feelings: string
  infor_url: string
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
  deleted_at: string | null
  created_at: string | null
  updated_at: string | null
}

export type MemberDetailType = Omit<MemberType, 'avatar_url'> & {
  image: {
    id: number
    url: string
  }
}

export type MemberBody = Pick<
  MemberType,
  'full_name' | 'birthday' | 'phone' | 'email' | 'horoscope_sign' | 'philosophy' | 'feelings' | 'infor_url'
> & {
  image_id: number
  gens: GenMember[]
}
