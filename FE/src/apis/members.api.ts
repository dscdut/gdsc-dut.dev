import { QueryFilter } from 'src/interface'
import { MemberBody } from 'src/types/member.type'
import http from 'src/utils/http'

const MEMBERS_URL = '/members'

export const MemberAPI = {
  getMembers: () => http.get(MEMBERS_URL),
  createMember: (data: MemberBody) => http.post(MEMBERS_URL, data),
  getMemberById: (id: string | number) => http.get(`${MEMBERS_URL}/${id}`),
  deleteMember: (id: string | number) => http.delete(`${MEMBERS_URL}/${id}`),
  updateMember: (data: MemberBody, id: number) => http.put(`${MEMBERS_URL}/${id}`, data),
  filterMembers: (query: QueryFilter) =>
    http.get(MEMBERS_URL, {
      params: query
    })
}
