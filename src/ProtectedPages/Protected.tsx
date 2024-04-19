import useAuthStore from '@/store/auth'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoutes = () => {
    const {user , isLoggedIn} = useAuthStore()

    return isLoggedIn ? <Outlet/> : <Navigate to="/login"/>
}

export default ProtectedRoutes