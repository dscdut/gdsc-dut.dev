import { Route } from 'src/interface/app'

// contanst url
const PATH_URL = {
  home: '/',
  admin: '/admin',
  login: '/admin/login',
  events: '/admin/events',
  sponsors: '/admin/sponsors',
  gens: '/admin/gens',
  memberDetail: ':memberID'
} as const

// private routes (path, component)
export const PRIVATE_ROUTE: Route[] = [
  {
    path: PATH_URL.sponsors,
    element: () => import('src/pages/Admin/sponsor'),
    children: [
      {
        path: '',
        element: () => import('src/pages/Admin/sponsor/Sponsors')
      },
      {
        path: 'form',
        element: () => import('src/pages/Admin/sponsor/AddSponsor')
      }
    ]
  },
  {
    path: PATH_URL.events,
    element: () => import('src/pages/Admin/Events')
  },
  {
    path: PATH_URL.gens,
    element: () => import('src/pages/Admin/gen')
  }
]

export default PATH_URL
