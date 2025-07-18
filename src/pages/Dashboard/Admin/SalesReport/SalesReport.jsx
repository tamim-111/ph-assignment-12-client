import { useState } from 'react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import Button from '../../../../components/Button/Button'
import CustomTable from '../../../../components/CustomTable/CustomTable'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { Helmet } from 'react-helmet'

const SalesReport = () => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const axiosSecure = useAxiosSecure()

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['sales-report'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments')
            return res.data
        }
    })

    // Filter payments by date range
    const filteredSales = payments.filter(sale => {
        if (sale.status !== 'paid') return false
        if (!startDate && !endDate) return true
        const saleDate = new Date(sale.date)
        const start = startDate ? new Date(startDate) : null
        const end = endDate ? new Date(endDate) : null
        return (!start || saleDate >= start) && (!end || saleDate <= end)
    })

    // Handle Excel download
    const handleDownload = () => {
        const dataToExport = filteredSales.map(sale => ({
            Date: new Date(sale.date).toLocaleDateString(),
            'Medicine Name(s)': sale.items.map(item => item.name).join(', '),
            'Seller Email': sale.items[0]?.seller || 'N/A', // Only one seller per product
            'Buyer Email': sale.userEmail,
            'Total Price (Tk)': sale.amount.toLocaleString()
        }))

        const worksheet = XLSX.utils.json_to_sheet(dataToExport)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'SalesReport')
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
        saveAs(blob, 'sales-report.xlsx')
    }

    const columns = [
        {
            header: 'Date',
            accessorKey: 'date',
            cell: info => new Date(info.row.original.date).toLocaleDateString()
        },
        {
            header: 'Medicine Name(s)',
            accessorKey: 'medicine',
            cell: info => info.row.original.items.map(item => item.name).join(', ')
        },
        {
            header: 'Seller Email',
            accessorKey: 'seller',
            cell: info => info.row.original.items[0]?.seller || 'N/A'
        },
        {
            header: 'Buyer Email',
            accessorKey: 'buyer',
            cell: info => info.row.original.userEmail
        },
        {
            header: 'Total Price',
            accessorKey: 'amount',
            cell: info => `Tk ${info.getValue().toLocaleString()}`
        }
    ]

    return (
        <>
            <Helmet><title>MedEasy | DashBoard | SalesReport</title></Helmet>
            <div className='p-4 md:p-6 space-y-4'>
                <h2 className='text-2xl font-bold text-[#25A8D6]'>Sales Report</h2>

                {/* Filter controls */}
                <div className='flex flex-col md:flex-row gap-4 items-center'>
                    <div className='flex items-center gap-2'>
                        <label className='text-sm'>Start Date:</label>
                        <input
                            type='date'
                            value={startDate}
                            onChange={e => setStartDate(e.target.value)}
                            className='input input-bordered'
                        />
                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='text-sm'>End Date:</label>
                        <input
                            type='date'
                            value={endDate}
                            onChange={e => setEndDate(e.target.value)}
                            className='input input-bordered'
                        />
                    </div>
                    <Button label='Download XLSX' onClick={handleDownload} />
                </div>

                {/* Data section */}
                {isLoading ? (
                    <p className='text-center text-gray-500'>Loading payment history...</p>
                ) : filteredSales.length === 0 ? (
                    <p className='text-center text-gray-500'>No payments found.</p>
                ) : (
                    <CustomTable data={filteredSales} columns={columns} showPriceSort={true} />
                )}
            </div>
        </>
    )
}

export default SalesReport
