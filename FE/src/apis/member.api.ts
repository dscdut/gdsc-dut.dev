import { Member } from 'src/interface/member'
import http from 'src/utils/http'

const MEMBER_URL = '/members'

export const MemberAPI = {
  getMembers: () => http.get(MEMBER_URL),
  postMember: (data: Member) => http.post(MEMBER_URL, data),
  getMemberById: (id: string | number) => http.get(`${MEMBER_URL}/${id}`),
  deleteMember: (id: string | number) => http.delete(`${MEMBER_URL}/${id}`),
  updateMember: (data: Member) => http.post(MEMBER_URL, data)
}
