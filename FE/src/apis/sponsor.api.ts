import { Sponsor } from 'src/interface/sponsor'
import { AuthResponse } from 'src/types/auth.type'
import http from 'src/utils/http'

export const postSponsor = (body: Sponsor) =>  http.post<AuthResponse>('/sponsor/', body)

export const getSponsor = () => http.get<AuthResponse>('/sponsor/')

export const getSponsorById = (id: string | number) => http.get<AuthResponse>(`/sponsor/${id}`)

export const deleteSponsor = (id: string | number) => http.delete<AuthResponse>(`/sponsor/${id}`)

export const updateSponsor = (body: Sponsor) => http.post<AuthResponse>('/sponsor/', body)