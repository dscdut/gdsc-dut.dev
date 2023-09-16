import { Gen } from './gens.type'
import { Member } from './member.type'
import { SponsorBody, SponsorDetailType } from './sponsor.type'

export type ProductType = Omit<SponsorDetailType, 'gens'> & {
  members: Member[]
  gens: Gen
}

export type ProductBody = Omit<SponsorBody, 'gen_ids'> & {
  member_ids: number[]
  gen_id: number
}
