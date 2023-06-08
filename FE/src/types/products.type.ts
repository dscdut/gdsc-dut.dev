import { SponsorType } from './sponsor.type'

export type ProductType = Omit<SponsorType, 'gens'> & {
  gen: {
    id: number
    name: string
  }
  members: {
    id: number
    name: string
  }[]
}
