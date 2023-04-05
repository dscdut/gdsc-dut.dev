// component
import Events from 'src/pages/Admin/Events'
import { AddSponsor, Sponsors } from 'src/pages/Admin/sponsor'

// contanst url
const PATH_URL = {
  home: '/',
  admin: '/admin',
  login: '/admin/login',
  events: '/admin/events',
  sponsors: '/admin/sponsors',
  memberDetail: ':memberID'
} as const

// private routes (path, component)
export const PRIVATE_ROUTE: { path: string; component: React.FC }[] = [
  {
    path: PATH_URL.sponsors,
    component: Sponsors
  },
  {
    path: `${PATH_URL.sponsors}/create`,
    component: AddSponsor
  },
  {
    path: PATH_URL.events,
    component: Events
  }
]

export default PATH_URL
