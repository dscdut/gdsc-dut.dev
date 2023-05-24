export type SponsorType = {
  id: number
  name: string
  image_url: string
  description: string
  infor_url: string
  deleted_at: string | null
  created_at: string | null
  updated_at: string | null
}

export type SponsorBodyCreate = Pick<SponsorType, 'name' | 'infor_url' | 'description'> & {
  image_id: number
  gen_id: number
}

export type SponsorBodyUpdate = Omit<SponsorBodyCreate, 'gen_id'>
