import { useState } from 'react'
import { FaCheckCircle, FaClock, FaInfoCircle } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import CustomTable from '../../../../components/CustomTable/CustomTable'
import PaymentStatusInfoModal from '../../../../components/Modals/PaymentStatusInfoModal'
import useAuth from '../../../../hooks/useAuth'
import LoadingSpinner from '../../../../components/Spinner/LoadingSpinner'
import { Helmet } from 'react-helmet'

const PurchaseHistory = () => {
    const { user } = useAuth()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const axiosSecure = useAxiosSecure()

    // Fetch payments from DB
    const { data: paymentsRaw = [], isLoading } = useQuery({
        queryKey: ['payments', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}&type=seller`)
            return res.data
        },
    })

    // Flatten the payments data to extract needed fields for table
    const payments = paymentsRaw.map(payment => {
        const items = payment.items || []

        // Medicine names joined by comma
        const medicineNames = items.map(item => item.name).join(', ')

        // Quantities joined by comma
        const quantities = items.map(item => item.quantity).join(', ')

        return {
            id: payment._id,
            transactionId: payment.transactionId,
            medicine: medicineNames || 'N/A',
            buyer: payment.userEmail || 'N/A',
            quantity: quantities || 'N/A',
            total: payment.amount || 0,
            date: payment.date,
            status: payment.status || 'pending',
        }
    })

    const columns = [
        { header: 'Transaction ID', accessorKey: 'transactionId' },
        { header: 'Medicine', accessorKey: 'medicine' },
        { header: 'Buyer', accessorKey: 'buyer' },
        { header: 'Quantity', accessorKey: 'quantity' },
        { header: 'Total (Tk)', accessorKey: 'total', cell: info => `Tk ${info.getValue()}` },
        { header: 'Date', accessorKey: 'date', cell: info => new Date(info.getValue()).toLocaleString() },
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
            <Helmet><title>MedEasy | DashBoard | PurchaseHistory</title></Helmet>
            <div className='p-4 md:p-6'>
                <h2 className='text-2xl font-bold text-[#25A8D6] mb-4'>Payment History</h2>
                {isLoading ? (
                    <LoadingSpinner></LoadingSpinner>
                ) : payments.length === 0 ? (
                    <p className='text-center text-gray-500'>No payments found.</p>
                ) : (
                    <CustomTable data={payments} columns={columns} showPriceSort={true} />
                )}
                <PaymentStatusInfoModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
            </div>
        </>
    )
}

export default PurchaseHistory
