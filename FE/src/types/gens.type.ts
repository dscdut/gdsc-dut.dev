export type Gen = {
  id: number
  name: string
}

export type GenType = {
  id: string | number
  name: string
  created_at: string
  updated_at: string | null
  deleted_at: string | null
}
