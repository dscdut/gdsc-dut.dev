import { Dayjs } from 'dayjs'
import { GenMember } from 'src/types/gens.type'

export interface Member {
  image: Blob
  full_name: string
  birthday: string | Dayjs
  phone: string
  email: string
  infor_url: string
  horoscope_sign: string
  philosophy: string
  feelings: string
  gens: GenMember[]
}
