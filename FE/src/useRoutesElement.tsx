import { Navigate, RouteObject, useRoutes } from 'react-router-dom'
import PATH_URL, { PRIVATE_ROUTE } from './shared/path'

// component
import NotFoundPage from './pages/NotFoundPage'
import React, { ReactElement, Suspense, lazy } from 'react'
import PrivateRoute from './routes/PrivateRoutes'

interface Route {
  path?: string
  element: (() => Promise<any>) | ReactElement
  end?: boolean
  children?: Route[]
  skipLazyLoad?: boolean
}
interface RouteElement {
  routeElement: () => Promise<any>
  isPrivate?: boolean
}

function LazyElement({ routeElement, isPrivate = false }: RouteElement) {
  const LazyComponent = lazy(routeElement)
  return (
    <Suspense fallback={<div>loading...</div>}>
      {isPrivate ? (
        <PrivateRoute>
          <LazyComponent />
        </PrivateRoute>
      ) : (
        <LazyComponent />
      )}
    </Suspense>
  )
}

function wrapRoutesWithLazy(routes: any, isPrivate: boolean = false) {
  return routes.map((route: any) => ({
    path: route.path,
    element: <LazyElement routeElement={route.element} isPrivate={isPrivate} />
  }))
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
      path: '/admin',
      element: <Navigate to={PATH_URL.sponsors} />
    },
    ...wrapRoutesWithLazy(PRIVATE_ROUTE, true)
  ]
  return useRoutes(routeElements)
}
