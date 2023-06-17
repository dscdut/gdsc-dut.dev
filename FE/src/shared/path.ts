import { Route } from 'src/interface/app'

// contanst url
const PATH_URL = {
  home: '/',
  homeDepartment: '/department',
  homeEvents: '/events',
  homeProducts: '/products',
  homeActivities: '/activities',
  admin: '/admin',
  login: '/admin/login',
  members: '/admin/members',
  events: '/admin/events',
  sponsors: '/admin/sponsors',
  gens: '/admin/gens',
  memberDetail: ':memberID',
  department: '/admin/department',
  products: '/admin/products'
} as const

// private routes (path, component)
export const PRIVATE_ROUTE: Route[] = [
  {
    path: '',
    element: () => import('src/pages/admin/members')
  },
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
      },
      {
        path: ':id',
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
      },
      {
        path: ':id',
        element: () => import('src/pages/admin/members/AddMember')
      }
    ]
  },
  {
    path: PATH_URL.products,
    element: () => import('src/pages/admin/product'),
    children: [
      {
        path: '',
        element: () => import('src/pages/admin/product/Products')
      },
      {
        path: 'form',
        element: () => import('src/pages/admin/product/AddProduct')
      },
      {
        path: ':id',
        element: () => import('src/pages/admin/product/AddProduct')
      }
    ]
  }
]

export const PUBLIC_ROUTE: Route[] = [
  {
    path: '',
    element: () => import('src/pages/public/Home')
  },
  {
    path: PATH_URL.homeDepartment,
    element: () => import('src/pages/public/Department')
  },
  {
    path: PATH_URL.homeEvents,
    element: () => import('src/pages/public/Events')
  },
  {
    path: PATH_URL.homeProducts,
    element: () => import('src/pages/public/Products')
  },
  {
    path: PATH_URL.homeActivities,
    element: () => import('src/pages/public/Activities')
  }
]

export default PATH_URL
