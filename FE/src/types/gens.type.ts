export type Gen = {
  id: number
  name: string
}

export type GenType = Gen & {
  created_at: string
  updated_at: string | null
  deleted_at: string | null
}

export type GenMember = {
  gen_id: number
  departments_id: number
  positions_id: number
  products_id: number[]
}
