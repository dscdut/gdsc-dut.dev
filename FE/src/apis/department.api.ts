import http from 'src/utils/http'

const DEPARTMENT_URL = '/departments'

export const DepartmentAPI = {
  getDepartments: () => http.get(DEPARTMENT_URL),
  createDepartment: (name: string) => http.post(DEPARTMENT_URL, { name }),
  deleteDepartment: (id: number) => http.delete(`${DEPARTMENT_URL}/${id}`)
}
