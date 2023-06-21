import { Position } from './positions.type'
import { Department } from './department.type'
import { Gen } from './gens.type'

export type MemberType = {
  id: number
  image: {
    url: string
    id: number | string
  }
  full_name: string
  birthday: string
  phone: string
  email: string
  horoscope_sign: string
  philosophy: string
  feelings: string
  infor_url: string
  department: Department
  position: Position
  gen: Gen
  createdAt: string | null
}

export type MemberBody = Pick<
  MemberType,
  'full_name' | 'birthday' | 'phone' | 'email' | 'horoscope_sign' | 'philosophy' | 'feelings' | 'infor_url'
> & {
  image_id: number
  gen_id: number
  department_id: number
  position_id: number
}
