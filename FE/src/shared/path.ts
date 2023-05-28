import { Route } from 'src/interface/app'

// contanst url
const PATH_URL = {
  home: '/',
  admin: '/admin',
  login: '/admin/login',
  members: '/admin/members',
  events: '/admin/events',
  sponsors: '/admin/sponsors',
  gens: '/admin/gens',
  memberDetail: ':memberID',
  department: '/admin/department'
} as const

// private routes (path, component)
export const PRIVATE_ROUTE: Route[] = [
  {
    path: PATH_URL.sponsors,
    element: () => import('src/pages/admin/sponsor'),
    children: [
      {
        path: '',
        element: () => import('src/pages/admin/sponsor/Sponsors')
      },
      {
        path: 'form',
        element: () => import('src/pages/admin/sponsor/AddSponsor')
      }
    ]
  },
  {
    path: PATH_URL.events,
    element: () => import('src/pages/admin/Events')
  },
  {
    path: PATH_URL.gens,
    element: () => import('src/pages/admin/gen')
  },
  {
    path: PATH_URL.department,
    element: () => import('src/pages/admin/department')
  },
  {
    path: PATH_URL.members,
    element: () => import('src/pages/admin/members'),
    children: [
      {
        path: '',
        element: () => import('src/pages/admin/members/Members')
      },
      {
        path: 'form',
        element: () => import('src/pages/admin/members/AddMember')
      }
    ]
  }
]

export default PATH_URL
