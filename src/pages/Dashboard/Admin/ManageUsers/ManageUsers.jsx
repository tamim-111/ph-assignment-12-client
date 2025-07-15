import { useState } from 'react'
import { FaUserShield, FaUserTie, FaUserAltSlash } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import Button from '../../../../components/Button/Button'
import CustomTable from '../../../../components/CustomTable/CustomTable'

const ManageUsers = () => {
    const [users, setUsers] = useState([
        { id: '1', name: 'Tamim', email: 'tamim@example.com', role: 'customer' },
        { id: '2', name: 'Karim', email: 'karim@example.com', role: 'seller' },
        { id: '3', name: 'Admin Mia', email: 'admin@example.com', role: 'admin' },
    ])

    // Handle role update
    const updateRole = (id, newRole) => {
        const updatedUsers = users.map(user =>
            user.id === id ? { ...user, role: newRole } : user
        )
        setUsers(updatedUsers)
        toast.success(`User role updated to "${newRole}"`)
        // TODO: Send role update to backend via PATCH or PUT
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
            accessorKey: 'id', // we'll use this to access the row
            cell: info => {
                const row = info.row.original
                return (
                    <div className='flex gap-2'>
                        {row.role !== 'admin' && (
                            <>
                                {row.role !== 'seller' && (
                                    <Button
                                        label={
                                            <span className='flex items-center gap-1 text-sm'>
                                                <FaUserTie /> Make Seller
                                            </span>
                                        }
                                        onClick={() => updateRole(row.id, 'seller')}
                                        className='btn-xs'
                                    />
                                )}
                                {row.role !== 'admin' && (
                                    <Button
                                        label={
                                            <span className='flex items-center gap-1 text-sm'>
                                                <FaUserShield /> Make Admin
                                            </span>
                                        }
                                        onClick={() => updateRole(row.id, 'admin')}
                                        className='btn-xs btn-outline'
                                    />
                                )}
                            </>
                        )}
                        {row.role === 'seller' && (
                            <Button
                                label={
                                    <span className='flex items-center gap-1 text-sm'>
                                        <FaUserAltSlash /> Downgrade
                                    </span>
                                }
                                onClick={() => updateRole(row.id, 'customer')}
                                className='btn-xs btn-warning'
                            />
                        )}
                    </div>
                )
            },
        },
    ]

    return (
        <div className='p-4 md:p-6'>
            <h2 className='text-2xl font-bold text-[#25A8D6] mb-4'>Manage Users</h2>
            <CustomTable data={users} columns={columns} />
        </div>
    )
}

export default ManageUsers
