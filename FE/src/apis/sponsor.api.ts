import { SponsorBodyCreate, SponsorBodyUpdate } from 'src/types/sponsor.type'
import http from 'src/utils/http'

const SPONSOR_URL = '/sponsors'

export const SponsorAPI = {
  getSponsors: () => http.get(SPONSOR_URL),
  postSponsor: (data: SponsorBodyCreate) => http.post(SPONSOR_URL, data),
  getSponsorById: (id: string | number) => http.get(`${SPONSOR_URL}/${id}`),
  deleteSponsor: (id: string | number) => http.delete(`${SPONSOR_URL}/${id}`),
  updateSponsor: (data: SponsorBodyUpdate) => http.post(SPONSOR_URL, data)
}
