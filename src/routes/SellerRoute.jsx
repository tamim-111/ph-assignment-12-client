import { Navigate } from 'react-router'
import useRole from '../hooks/useRole'
import LoadingSpinner from '../components/Spinner/LoadingSpinner'

const SellerRoute = ({ children }) => {
    const { role, isLoading } = useRole()

    if (isLoading) return <LoadingSpinner />
    if (role === 'seller') return children

    return <Navigate to='/' replace />
}

export default SellerRoute
