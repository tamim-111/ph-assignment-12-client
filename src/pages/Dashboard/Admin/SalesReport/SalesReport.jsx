import { useState } from 'react'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import Button from '../../../../components/Button/Button'
import CustomTable from '../../../../components/CustomTable/CustomTable'

const SalesReport = () => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    const [salesData] = useState([
        {
            id: '1',
            date: '2025-07-10',
            medicine: 'Napa 500mg',
            seller: 'seller1@example.com',
            buyer: 'buyer1@example.com',
            totalPrice: 200,
        },
        {
            id: '2',
            date: '2025-07-12',
            medicine: 'Seclo 20mg',
            seller: 'seller2@example.com',
            buyer: 'buyer2@example.com',
            totalPrice: 350,
        },
        {
            id: '3',
            date: '2025-07-05',
            medicine: 'Maxpro 40mg',
            seller: 'seller1@example.com',
            buyer: 'buyer3@example.com',
            totalPrice: 120,
        },
    ])

    const filteredSales = salesData.filter(sale => {
        if (!startDate && !endDate) return true
        const saleDate = new Date(sale.date)
        const start = startDate ? new Date(startDate) : null
        const end = endDate ? new Date(endDate) : null

        return (!start || saleDate >= start) && (!end || saleDate <= end)
    })

    const handleDownload = () => {
        const dataToExport = filteredSales.map(sale => ({
            Date: sale.date,
            'Medicine Name': sale.medicine,
            'Seller Email': sale.seller,
            'Buyer Email': sale.buyer,
            'Total Price (Tk)': sale.totalPrice,
        }))

        const worksheet = XLSX.utils.json_to_sheet(dataToExport)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'SalesReport')

        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
        const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
        saveAs(blob, 'sales-report.xlsx')
    }

    const columns = [
        { header: 'Date', accessorKey: 'date', cell: info => info.getValue() },
        { header: 'Medicine Name', accessorKey: 'medicine', cell: info => info.getValue() },
        { header: 'Seller Email', accessorKey: 'seller', cell: info => info.getValue() },
        { header: 'Buyer Email', accessorKey: 'buyer', cell: info => info.getValue() },
        {
            header: 'Total Price',
            accessorKey: 'totalPrice',
            cell: info => `Tk ${info.getValue()}`,
        },
    ]

    return (
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

            {/* Report Table */}
            <CustomTable data={filteredSales} columns={columns} />
        </div>
    )
}

export default SalesReport
