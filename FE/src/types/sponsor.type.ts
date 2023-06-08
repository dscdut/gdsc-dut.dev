import { Gen } from './gens.type'

export type SponsorType = {
  id: number
  name: string
  image: {
    url: string
    id: number | string
  }
  gens: Gen[]
  description: string
  infor_url: string
  deleted_at: string | null
  created_at: string | null
  updated_at: string | null
}

export type SponsorBody = Pick<SponsorType, 'name' | 'infor_url' | 'description'> & {
  image_id: number
  gen_ids: number[]
}
