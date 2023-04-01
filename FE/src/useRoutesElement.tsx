import { useRoutes } from 'react-router-dom'
import PATH_URL from './shared/path'
import PrivateRoute from './routes/PrivateRoutes'

// component
import Home from './pages/Home'
import Events from './pages/Admin/Events'
import NotFoundPage from './pages/NotFoundPage'

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: PATH_URL.events,
      element: (
        <PrivateRoute>
          <Events />
        </PrivateRoute>
      )
    },
    {
      path: '*',
      element: <NotFoundPage />
    }
  ])
  return routeElements
}
