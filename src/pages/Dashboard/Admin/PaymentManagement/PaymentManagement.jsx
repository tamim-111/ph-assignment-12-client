import { useState } from 'react'
import { FaCheckCircle, FaClock } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import CustomTable from '../../../../components/CustomTable/CustomTable'
import Button from '../../../../components/Button/Button'

const PaymentManagement = () => {
    const [payments, setPayments] = useState([
        { id: 'TXN001', date: '2025-07-12', amount: 120, status: 'paid' },
        { id: 'TXN002', date: '2025-07-10', amount: 75, status: 'pending' },
        { id: 'TXN003', date: '2025-07-05', amount: 230, status: 'pending' },
        { id: 'TXN004', date: '2025-07-03', amount: 99, status: 'paid' },
    ])

    const handleAccept = (id) => {
        const updated = payments.map(payment =>
            payment.id === id ? { ...payment, status: 'paid' } : payment
        )

        // Move paid items to bottom
        const sorted = [...updated].sort((a, b) => {
            if (a.status === b.status) return 0
            return a.status === 'pending' ? -1 : 1
        })

        setPayments(sorted)
        toast.success(`Payment ${id} marked as Paid`)
    }

    const columns = [
        { header: 'Transaction ID', accessorKey: 'id', cell: info => info.getValue() },
        { header: 'Date', accessorKey: 'date', cell: info => info.getValue() },
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
            accessorKey: 'id',
            cell: info => {
                const { id, status } = info.row.original
                if (status === 'paid') return <span className='text-gray-400 text-sm'>Paid</span>
                return (
                    <Button
                        className='btn-xs'
                        onClick={() => handleAccept(id)}
                        label='Accept Payment'
                    />
                )
            },
        },
    ]

    return (
        <div className='p-4 md:p-6'>
            <h2 className='text-2xl font-bold text-[#25A8D6] mb-4'>Payment Management</h2>
            <CustomTable data={payments} columns={columns} />
        </div>
    )
}

export default PaymentManagement
