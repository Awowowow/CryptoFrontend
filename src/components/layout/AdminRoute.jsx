import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminRoute = () => {
  const { user } = useSelector((state) => state.auth)

  if (user?.role !== 'ADMIN') {
    return <Navigate replace to="/exchange" />
  }

  return <Outlet />
}

export default AdminRoute
