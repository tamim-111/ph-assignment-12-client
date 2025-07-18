import { useQuery } from '@tanstack/react-query'
import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'

const useRole = () => {
    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()

    const { data: role = null, isLoading } = useQuery({
        queryKey: ['user-role', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user.email}`)
            return res.data?.role
        }
    })
    console.log(role)
    return { role, isLoading }
}

export default useRole
