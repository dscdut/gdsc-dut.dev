import { useRoutes } from 'react-router-dom'
import Home from './pages/Home'
import Events from './pages/Admin/Events'
import PrivateRoute from './routes/PrivateRoutes'
import PATH_URL from './shared/path'
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
    }
  ])
  return routeElements
}
