import { AxiosResponse } from 'axios'
import { IGen, IGenResponse } from 'src/interface/gens'
import { GenType } from 'src/types/gens.type'
import http from 'src/utils/http'

//Todo: Compose to 1 obj

export const postGen = (body: IGen) => http.post('/gens/', body)

export const getGens = () => http.get<IGenResponse[], AxiosResponse<IGenResponse[]>>('/gens/')

export const getGenById = (id: string | number) => http.get<IGenResponse>(`/gens/${id}`)

export const deleteGen = (id: string | number) => http.delete(`/gens/${id}`)

export const updateGen = (body: GenType) => http.put(`/gens/${body.id}`, { name: body.name })

const GEN_URL = '/gens'

export const GenAPI = {
  getGens: () => http.get(GEN_URL),
  deleteGen: (id: string) => http.delete(`${GEN_URL}/${id}`),
  updateGen: (body: Pick<GenType, 'id' | 'name'>) => http.put(`${GEN_URL}/${body.id}`, { name: body.name }),
  createGen: (body: IGen) => http.post(GEN_URL, body)
}
