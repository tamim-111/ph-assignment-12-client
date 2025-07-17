import { Navigate } from 'react-router'
import useRole from '../hooks/useRole'
import LoadingSpinner from '../components/Spinner/LoadingSpinner'

const AdminRoute = ({ children }) => {
    const { role, isLoading } = useRole()

    if (isLoading) return <LoadingSpinner />
    if (role === 'admin') return children

    return <Navigate to='/' replace />
}

export default AdminRoute
