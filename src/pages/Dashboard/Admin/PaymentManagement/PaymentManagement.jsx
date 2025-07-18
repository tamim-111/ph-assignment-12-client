import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { FaCheckCircle, FaClock } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import CustomTable from '../../../../components/CustomTable/CustomTable'
import Button from '../../../../components/Button/Button'
import LoadingSpinner from '../../../../components/Spinner/LoadingSpinner'
import { Helmet } from 'react-helmet'

const PaymentManagement = () => {
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient()

    // Fetch all payments
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments')
            return res.data
        }
    })

    // Mutation to update payment status
    const { mutate: acceptPayment } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/payments/${id}`, { status: 'paid' })
            return res.data
        },
        onSuccess: (_, id) => {
            toast.success(`Payment ${id} marked as Paid`)
            queryClient.invalidateQueries(['payments'])
        },
        onError: () => toast.error('Failed to update payment')
    })

    const columns = [
        {
            header: 'Transaction ID',
            accessorKey: 'transactionId',
            cell: info => info.getValue()
        },
        {
            header: 'User Email',
            accessorKey: 'userEmail',
            cell: info => info.getValue()
        },
        {
            header: 'Amount (Tk)',
            accessorKey: 'amount',
            cell: info => `Tk ${info.getValue()}`,
        },
        {
            header: 'Date',
            accessorKey: 'date',
            cell: info => new Date(info.getValue()).toLocaleString()
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: info => {
                const value = info.getValue()
                return (
                    <span
                        className={`inline-flex items-center px-2 py-1 text-xs rounded font-medium ${value === 'paid'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-yellow-100 text-yellow-700'
                            }`}
                    >
                        {value === 'paid' ? (
                            <>
                                <FaCheckCircle className="text-green-500 mr-1" />
                                Paid
                            </>
                        ) : (
                            <>
                                <FaClock className="text-yellow-500 mr-1" />
                                Pending
                            </>
                        )}
                    </span>
                )
            },
        },
        {
            header: 'Action',
            accessorKey: '_id',
            cell: info => {
                const { _id, status } = info.row.original
                if (status === 'paid') return <span className='text-gray-400 text-sm'>Paid</span>
                return (
                    <Button
                        className='btn-xs'
                        onClick={() => acceptPayment(_id)}
                        label='Accept Payment'
                    />
                )
            },
        },
    ]

    return (
        <>
            <Helmet><title>MedEasy | DashBoard | PaymentManagement</title></Helmet>
            <div className='p-4 md:p-6'>
                <h2 className='text-2xl font-bold text-[#25A8D6] mb-4'>Payment Management</h2>
                {isLoading ? (
                    <LoadingSpinner />
                ) : payments.length === 0 ? (
                    <p className='text-gray-500 text-center mt-10'>
                        No payments found.
                    </p>
                ) : (
                    <CustomTable data={payments} columns={columns} showPriceSort={true} />
                )}
            </div>
        </>
    )
}

export default PaymentManagement