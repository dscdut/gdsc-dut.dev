import { QueryFilter } from 'src/interface'
import http from 'src/utils/http'

const MEMBERS_URL = '/members'

export const MemberAPI = {
  getMembers: () => http.get(MEMBERS_URL),
  filterMembers: (query: QueryFilter) =>
    http.get(MEMBERS_URL, {
      params: query
    })
}
