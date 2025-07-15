import React, { useState } from 'react'
import { FaCheckCircle, FaClock, FaInfoCircle } from 'react-icons/fa'
import CustomTable from '../../../../components/CustomTable/CustomTable'
import PaymentStatusInfoModal from '../../../../components/Modals/PaymentStatusInfoModal'


const PaymentHistory = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const data = [
        { id: 'TXN001', date: '2025-07-12', amount: 120, status: 'paid' },
        { id: 'TXN002', date: '2025-07-10', amount: 75, status: 'pending' },
        { id: 'TXN003', date: '2025-07-05', amount: 230, status: 'paid' },
    ]

    const columns = [
        { header: 'Transaction ID', accessorKey: 'id', cell: info => info.getValue() },
        { header: 'Date', accessorKey: 'date', cell: info => info.getValue() },
        { header: 'Amount (Tk)', accessorKey: 'amount', cell: info => `Tk ${info.getValue()}` },
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
            <h2 className='text-2xl font-bold text-[#25A8D6] mb-4'>My Payment History</h2>
            <CustomTable data={data} columns={columns} />
            <PaymentStatusInfoModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </div>
    )
}

export default PaymentHistory
