import React, { useState } from 'react'
import { FaCheckCircle, FaClock, FaInfoCircle } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import CustomTable from '../../../../components/CustomTable/CustomTable'
import PaymentStatusInfoModal from '../../../../components/Modals/PaymentStatusInfoModal'
import useAuth from '../../../../hooks/useAuth'
import LoadingSpinner from '../../../../components/Spinner/LoadingSpinner'
import { Helmet } from 'react-helmet'

const PaymentHistory = () => {
    const { user } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const axiosSecure = useAxiosSecure() // 

    // Fetch payment history
    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}&type=buyer`)
            return res.data
        },
    })

    // Table columns
    const columns = [
        {
            header: 'Transaction ID',
            accessorKey: 'transactionId',
            cell: info => info.getValue(),
        },
        {
            header: 'Date',
            accessorKey: 'date',
            cell: info => new Date(info.getValue()).toLocaleString(), // Format ISO date
        },
        {
            header: 'Amount (Tk)',
            accessorKey: 'amount',
            cell: info => `Tk ${info.getValue()}`,
        },
        {
            header: 'Status',
            accessorKey: 'status',
            cell: info => {
                const value = info.getValue()
                const isPaid = value === 'paid'
                return (
                    <div className="flex items-center gap-1">
                        <span className={`inline-flex items-center font-semibold ${isPaid ? 'text-green-600' : 'text-yellow-600'}`}>
                            {isPaid ? (
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
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="cursor-pointer text-[#25A8D6] hover:text-[#1d95c3] transition"
                            title="Why is this status?"
                        >
                            <FaInfoCircle />
                        </button>
                    </div>
                )
            },
        },
    ]

    return (
        <>
            <Helmet><title>MedEasy | Dashboard | PaymentHistory</title></Helmet>
            <div className="p-4 md:p-6">
                <h2 className="text-2xl font-bold text-[#25A8D6] mb-4">My Payment History</h2>

                {isLoading ? (
                    <LoadingSpinner />
                ) : payments.length === 0 ? (
                    <p className='text-gray-500 font-medium text-center mt-6'>
                        No payments found.
                    </p>
                ) : (
                    <CustomTable data={payments} columns={columns} showPriceSort={true} />
                )}

                <PaymentStatusInfoModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
            </div>
        </>
    )
}

export default PaymentHistory
