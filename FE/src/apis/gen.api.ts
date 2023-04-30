import { IGen } from 'src/interface/gens'
import { GenType } from 'src/types/gens.type'
import http from 'src/utils/http'

const GEN_URL = '/gens'

export const GenAPI = {
  getGens: () => http.get(GEN_URL),
  deleteGen: (id: string) => http.delete(`${GEN_URL}/${id}`),
  updateGen: (body: Pick<GenType, 'id' | 'name'>) => http.put(`${GEN_URL}/${body.id}`, { name: body.name }),
  createGen: (body: IGen) => http.post(GEN_URL, body)
}
