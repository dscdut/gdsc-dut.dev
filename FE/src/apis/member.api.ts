import { MemberBody} from 'src/types/member.type'
import http from 'src/utils/http'

const MEMBER_URL = '/members'

export const MemberAPI = {
  getMembers: () => http.get(MEMBER_URL),
  createMember: (data: MemberBody) => http.post(MEMBER_URL, data),
  getMemberById: (id: string | number) => http.get(`${MEMBER_URL}/${id}`),
  deleteMember: (id: string | number) => http.delete(`${MEMBER_URL}/${id}`),
  updateMember: (data: MemberBody, id: number) => http.put(`${MEMBER_URL}/${id}`, data)
}
