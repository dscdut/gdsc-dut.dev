import { SponsorBody } from 'src/types/sponsor.type'
import http from 'src/utils/http'

const SPONSOR_URL = '/sponsors'

export const SponsorAPI = {
  getSponsors: () => http.get(SPONSOR_URL),
  createSponsor: (data: SponsorBody) => http.post(SPONSOR_URL, data),
  getSponsorById: (id: string | number) => http.get(`${SPONSOR_URL}/${id}`),
  deleteSponsor: (id: string | number) => http.delete(`${SPONSOR_URL}/${id}`),
  updateSponsor: (data: SponsorBody, id: number) => http.put(`${SPONSOR_URL}/${id}`, data)
}
