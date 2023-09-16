export type Position = {
  id: number
  name: string
}
export type PositionType = Position & {
  deleted_at: string | null
  created_at: string | null
  updated_at: string | null
}
