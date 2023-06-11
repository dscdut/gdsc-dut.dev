import { SponsorType } from './sponsor.type'

export type ProductType = SponsorType & {
  members: {
    id: number
    name: string
  }[]
}
