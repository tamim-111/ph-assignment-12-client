import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { FaUserShield, FaUser, FaStore } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import Button from '../../../../components/Button/Button'
import CustomTable from '../../../../components/CustomTable/CustomTable'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../../components/Spinner/LoadingSpinner'
import { Helmet } from 'react-helmet'

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient()

    // Fetch all users
    const { data: users = [], isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        },
    })

    // Update role mutation
    const { mutateAsync: updateUserRole } = useMutation({
        mutationFn: async ({ id, role }) => {
            const res = await axiosSecure.patch(`/users/role/${id}`, { role })
            return res.data
        },
        onSuccess: (_, { role }) => {
            toast.success(`User role updated to "${role}"`)
            queryClient.invalidateQueries(['users'])
        },
    })

    const handleRoleChange = (id, role) => {
        updateUserRole({ id, role })
    }

    const columns = [
        { header: 'Name', accessorKey: 'name', cell: info => info.getValue() },
        { header: 'Email', accessorKey: 'email', cell: info => info.getValue() },
        {
            header: 'Current Role',
            accessorKey: 'role',
            cell: info => (
                <span className='capitalize font-semibold text-[#25A8D6]'>
                    {info.getValue()}
                </span>
            ),
        },
        {
            header: 'Actions',
            accessorKey: '_id',
            cell: info => {
                const row = info.row.original

                if (row.role === 'admin') {
                    return (
                        <span className='text-sm font-semibold text-green-600'>
                            WEBSITE ADMIN
                        </span>
                    )
                }

                return (
                    <div className="flex flex-col sm:flex-row flex-wrap gap-2 max-w-xs">
                        {row.role !== 'seller' && (
                            <Button
                                label={
                                    <span className='flex items-center gap-1 text-sm whitespace-nowrap'>
                                        <FaStore /> Seller
                                    </span>
                                }
                                onClick={() => handleRoleChange(row._id, 'seller')}
                                className='btn-xs'
                            />
                        )}
                        {row.role !== 'customer' && (
                            <Button
                                label={
                                    <span className='flex items-center gap-1 text-sm whitespace-nowrap'>
                                        <FaUser /> Customer
                                    </span>
                                }
                                onClick={() => handleRoleChange(row._id, 'customer')}
                                className='btn-xs btn-warning'
                            />
                        )}
                        <Button
                            label={
                                <span className='flex items-center gap-1 text-sm whitespace-nowrap'>
                                    <FaUserShield /> Admin
                                </span>
                            }
                            onClick={() => handleRoleChange(row._id, 'admin')}
                            className='btn-xs btn-outline'
                        />
                    </div>
                )
            },
        },
    ]

    return (
        <>
            <Helmet><title>MedEasy | DashBoard | ManageUsers</title></Helmet>
            <div className='p-4 md:p-6'>
                <h2 className='text-2xl font-bold text-[#25A8D6] mb-4'>Manage Customers</h2>
                {isLoading ? (
                    <LoadingSpinner />
                ) : users.length === 0 ? (
                    <p className='text-gray-500 font-medium text-center mt-6'>
                        No users found.
                    </p>
                ) : (
                    <CustomTable data={users} columns={columns} />
                )}
            </div>
        </>
    )
}

export default ManageUsers
