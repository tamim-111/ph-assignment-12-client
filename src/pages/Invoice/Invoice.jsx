import React from 'react'
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'
import Button from '../../components/Button/Button'

// Styles for PDF document
const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontSize: 12,
        fontFamily: 'Helvetica',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    logo: {
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        color: '#25A8D6',
    },
    section: {
        marginBottom: 12,
    },
    table: {
        display: 'table',
        width: 'auto',
        marginTop: 10,
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCellHeader: {
        width: '25%',
        fontWeight: 'bold',
        padding: 4,
        backgroundColor: '#6BDCF6',
        color: 'white',
    },
    tableCell: {
        width: '25%',
        padding: 4,
        borderBottom: '1px solid #ccc',
    },
})

// PDF Document
const InvoiceDocument = ({ invoiceData }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Image src='/logo.png' style={styles.logo} />
                <Text>Invoice #{invoiceData.id}</Text>
            </View>

            <Text style={styles.title}>MedEasy Invoice</Text>

            <View style={styles.section}>
                <Text><Text style={{ fontWeight: 'bold' }}>Customer:</Text> {invoiceData.customer.name}</Text>
                <Text><Text style={{ fontWeight: 'bold' }}>Email:</Text> {invoiceData.customer.email}</Text>
                <Text><Text style={{ fontWeight: 'bold' }}>Date:</Text> {invoiceData.date}</Text>
            </View>

            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCellHeader}>Medicine</Text>
                    <Text style={styles.tableCellHeader}>Company</Text>
                    <Text style={styles.tableCellHeader}>Qty</Text>
                    <Text style={styles.tableCellHeader}>Total</Text>
                </View>
                {invoiceData.items.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{item.name}</Text>
                        <Text style={styles.tableCell}>{item.company}</Text>
                        <Text style={styles.tableCell}>{item.quantity}</Text>
                        <Text style={styles.tableCell}>TK {item.price * item.quantity}</Text>
                    </View>
                ))}
            </View>

            <View style={{ marginTop: 20 }}>
                <Text style={{ textAlign: 'right', fontSize: 14, fontWeight: 'bold' }}>
                    Grand Total: TK {invoiceData.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                </Text>
            </View>
        </Page>
    </Document>
)

// Frontend Page
const Invoice = () => {
    const invoiceData = {
        id: 'INV-1001',
        customer: {
            name: 'Tamim Hossain',
            email: 'tamim@example.com',
        },
        date: new Date().toLocaleDateString(),
        items: [
            { name: 'Napa Extra', company: 'Beximco', price: 8, quantity: 3 },
            { name: 'Maxpro 20mg', company: 'Square', price: 13, quantity: 2 },
        ],
    }

    return (
        <div className='min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4'>
            <div className='bg-white p-8 rounded-lg shadow max-w-3xl w-full'>
                <div className='flex justify-between items-center mb-6'>
                    <div className='flex items-center gap-2'>
                        <img src='/logo.png' alt="MedEasy" className='w-10 h-10' />
                        <h2 className='text-xl font-bold text-[#25A8D6]'>MedEasy</h2>
                    </div>
                    <span className='text-sm text-gray-500'>Invoice #{invoiceData.id}</span>
                </div>

                <div className='mb-6'>
                    <p><span className='font-medium'>Customer:</span> {invoiceData.customer.name}</p>
                    <p><span className='font-medium'>Email:</span> {invoiceData.customer.email}</p>
                    <p><span className='font-medium'>Date:</span> {invoiceData.date}</p>
                </div>

                <table className='w-full table-auto border'>
                    <thead className='bg-gradient-to-r from-[#6BDCF6] to-[#25A8D6] text-white'>
                        <tr>
                            <th className='py-2 px-4 text-left'>Medicine</th>
                            <th className='py-2 px-4 text-left'>Company</th>
                            <th className='py-2 px-4 text-left'>Qty</th>
                            <th className='py-2 px-4 text-left'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoiceData.items.map((item, index) => (
                            <tr key={index} className='border-t'>
                                <td className='py-2 px-4'>{item.name}</td>
                                <td className='py-2 px-4'>{item.company}</td>
                                <td className='py-2 px-4'>{item.quantity}</td>
                                <td className='py-2 px-4'>৳{item.price * item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className='mt-6 text-right'>
                    <p className='text-lg font-semibold'>
                        Grand Total:{' '}
                        <span className='text-[#25A8D6]'>
                            ৳{invoiceData.items.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                        </span>
                    </p>
                </div>

                <div className='mt-6'>
                    <PDFDownloadLink
                        document={<InvoiceDocument invoiceData={invoiceData} />}
                        fileName={`invoice-${invoiceData.id}.pdf`}
                    >
                        {({ loading }) => (
                            <Button
                                label={loading ? 'Preparing PDF...' : 'Download Invoice PDF'}
                                wideFull
                            />
                        )}
                    </PDFDownloadLink>
                </div>
            </div>
        </div>
    )
}

export default Invoice
