import React from 'react'
import {
    PDFDownloadLink,
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image,
} from '@react-pdf/renderer'
import Button from '../../components/Button/Button'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'

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

// PDF Document component
const InvoiceDocument = ({ payment }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Image src="/logo.png" style={styles.logo} />
                <View>
                    <Text>Invoice ID: {payment._id}</Text>
                    <Text>Transaction ID: {payment.transactionId}</Text>
                </View>
            </View>

            <Text style={styles.title}>MedEasy Invoice</Text>

            <View style={styles.section}>
                <Text>
                    <Text style={{ fontWeight: 'bold' }}>Customer:</Text>{' '}
                    {payment.userName}
                </Text>
                <Text>
                    <Text style={{ fontWeight: 'bold' }}>Email:</Text>{' '}
                    {payment.userEmail}
                </Text>
                <Text>
                    <Text style={{ fontWeight: 'bold' }}>Date & Time:</Text>{' '}
                    {new Date(payment.date).toLocaleString()}
                </Text>
            </View>

            <View style={styles.table}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCellHeader}>Medicine</Text>
                    <Text style={styles.tableCellHeader}>Company</Text>
                    <Text style={styles.tableCellHeader}>Qty</Text>
                    <Text style={styles.tableCellHeader}>Total</Text>
                </View>
                {payment.items.map((item, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{item.name}</Text>
                        <Text style={styles.tableCell}>{item.company}</Text>
                        <Text style={styles.tableCell}>{item.quantity}</Text>
                        <Text style={styles.tableCell}>TK {item.subtotal}</Text>
                    </View>
                ))}
            </View>

            <View style={{ marginTop: 20 }}>
                <Text
                    style={{
                        textAlign: 'right',
                        fontSize: 14,
                        fontWeight: 'bold',
                    }}
                >
                    Grand Total: TK {payment.amount}
                </Text>
            </View>
        </Page>
    </Document>
)

const Invoice = () => {
    const axiosSecure = useAxiosSecure()

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments')
            return res.data
        },
    })

    if (isLoading) return <p className="text-center py-10">Loading...</p>

    const payment = payments[0] // Latest payment

    if (!payment)
        return <p className="text-center py-10">No payment data available.</p>

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-10 px-4">
            <div className="bg-white p-8 rounded-lg shadow max-w-3xl w-full">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="MedEasy" className="w-10 h-10" />
                        <h2 className="text-xl font-bold text-[#25A8D6]">MedEasy</h2>
                    </div>
                    <div className="text-sm text-gray-500 text-right">
                        <p>
                            <strong>Invoice ID:</strong> {payment._id}
                        </p>
                        <p>
                            <strong>Transaction ID:</strong> {payment.transactionId}
                        </p>
                    </div>
                </div>

                <div className="mb-6">
                    <p>
                        <span className="font-medium">Customer:</span> {payment.userName}
                    </p>
                    <p>
                        <span className="font-medium">Email:</span> {payment.userEmail}
                    </p>
                    <p>
                        <span className="font-medium">Date & Time:</span>{' '}
                        {new Date(payment.date).toLocaleString()}
                    </p>
                </div>

                <table className="w-full table-auto border">
                    <thead className="bg-gradient-to-r from-[#6BDCF6] to-[#25A8D6] text-white">
                        <tr>
                            <th className="py-2 px-4 text-left">Medicine</th>
                            <th className="py-2 px-4 text-left">Company</th>
                            <th className="py-2 px-4 text-left">Qty</th>
                            <th className="py-2 px-4 text-left">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payment.items.map((item, index) => (
                            <tr key={index} className="border-t">
                                <td className="py-2 px-4">{item.name}</td>
                                <td className="py-2 px-4">{item.company}</td>
                                <td className="py-2 px-4">{item.quantity}</td>
                                <td className="py-2 px-4">৳{item.subtotal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="mt-6 text-right">
                    <p className="text-lg font-semibold">
                        Grand Total:{' '}
                        <span className="text-[#25A8D6]">৳{payment.amount}</span>
                    </p>
                </div>

                <div className="mt-6">
                    <PDFDownloadLink
                        document={<InvoiceDocument payment={payment} />}
                        fileName={`invoice-${payment._id}.pdf`}
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
