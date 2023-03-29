import { useRoutes } from 'react-router-dom'
import Home from './pages/Home'
export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      element: <Home />
    }
  ])
  return routeElements
}
