export type Department = {
  id: number
  name: string
}
export type DepartmentType = Department & {
  total_members: number | string
}
export type DepartmentDetailType = Department & {
  deleted_at: string
  created_at: string
  updated_at: string
}
