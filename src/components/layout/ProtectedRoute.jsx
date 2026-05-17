import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PageLoader from '../ui/PageLoader'

const ProtectedRoute = () => {
  const { sessionChecked, user } = useSelector((state) => state.auth)
  const location = useLocation()

  if (!sessionChecked) {
    return <PageLoader label="Loading account..." />
  }

  if (!user) {
    return <Navigate replace state={{ from: location }} to="/auth/login" />
  }

  return <Outlet />
}

export default ProtectedRoute
