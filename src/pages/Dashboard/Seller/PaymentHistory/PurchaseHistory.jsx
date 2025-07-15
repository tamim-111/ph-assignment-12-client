import { useState } from 'react'
import CustomTable from '../../../../components/CustomTable/CustomTable'
import PaymentStatusInfoModal from '../../../../components/Modals/PaymentStatusInfoModal'
import { FaCheckCircle, FaClock, FaInfoCircle } from 'react-icons/fa'

const PurchaseHistory = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    // Demo payment data
    const [paymentHistory, setPaymentHistory] = useState([
        {
            id: 'TXN001',
            medicine: 'Napa',
            buyer: 'rahim@example.com',
            quantity: 10,
            total: 200,
            date: '2025-07-10',
            status: 'paid',
        },
        {
            id: 'TXN002',
            medicine: 'Maxpro',
            buyer: 'karim@example.com',
            quantity: 5,
            total: 125,
            date: '2025-07-12',
            status: 'pending',
        },
        {
            id: 'TXN003',
            medicine: 'Fexo',
            buyer: 'salma@example.com',
            quantity: 3,
            total: 72,
            date: '2025-07-13',
            status: 'paid',
        },
    ])

    // Columns for the CustomTable
    const columns = [
        { header: 'Transaction ID', accessorKey: 'id', cell: info => info.getValue() },
        { header: 'Medicine', accessorKey: 'medicine', cell: info => info.getValue() },
        { header: 'Buyer', accessorKey: 'buyer', cell: info => info.getValue() },
        { header: 'Quantity', accessorKey: 'quantity', cell: info => info.getValue() },
        { header: 'Total (Tk)', accessorKey: 'total', cell: info => `Tk ${info.getValue()}` },
        { header: 'Date', accessorKey: 'date', cell: info => info.getValue() },
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
        <div className='p-4 md:p-6'>
            <h2 className='text-2xl font-bold text-[#25A8D6] mb-4'>Payment History</h2>
            <CustomTable data={paymentHistory} columns={columns} />
            <PaymentStatusInfoModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </div>
    )
}

export default PurchaseHistory
