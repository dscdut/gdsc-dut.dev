import { useRoutes } from 'react-router-dom'
import PATH_URL, { PRIVATE_ROUTE } from './shared/path'
import PrivateRoute from './routes/PrivateRoutes'

// component
import Home from './pages/Home'
import NotFoundPage from './pages/NotFoundPage'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '*',
      element: <NotFoundPage />
    },
    ...PRIVATE_ROUTE.map((item) => ({
      path: item.path,
      element: (
        <PrivateRoute>
          <item.component />
        </PrivateRoute>
      )
    }))
  ])
  return routeElements
}
