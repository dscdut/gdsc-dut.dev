import { Navigate, Outlet, RouteObject, useRoutes } from 'react-router-dom'
import PATH_URL, { PRIVATE_ROUTE } from './shared/path'

// component
import { Suspense, lazy } from 'react'
import { Route } from './interface/app'
import NotFoundPage from './pages/NotFoundPage'
import PrivateRoute from './routes/PrivateRoutes'
import { Row, Spin } from 'antd'

interface RouteElement {
  routeElement: () => Promise<any>
  isPrivate?: boolean
}

interface LazyRouteProps {
  routes: Route[]
}

function LazyElement({ routeElement, isPrivate = false }: RouteElement) {
  const LazyComponent = lazy(routeElement)
  return (
    <Suspense fallback={<Row className="w-full h-screen"><Spin size='large' className='m-auto'/></Row>}>
      <LazyComponent />
    </Suspense>
  )
}

function wrapRoutesWithLazy({ routes }: LazyRouteProps) : RouteObject[] {
  return routes?.map(
    (route: Route) =>
      ({
        path: route.path,
        element: <LazyElement routeElement={route.element} />,
        ...(route.children && { children: wrapRoutesWithLazy({ routes: route.children }) })
      })
  )
}

export default function useRouteElements() {
  const routeElements = [
    {
      path: '/',
      element: <LazyElement routeElement={() => import('./pages/Home')} />
    },
    {
      path: '*',
      element: <NotFoundPage />
    },
    {
      path: 'admin',
      element: <PrivateRoute />,
      children: wrapRoutesWithLazy({ routes: PRIVATE_ROUTE })
    }
  ]
  return useRoutes(routeElements)
}
