import React from 'react'
import { useQuery } from '@tanstack/react-query'
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts'
import useAuth from '../../../../hooks/useAuth'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'

const SellerDashboardHome = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['seller-payments', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data
        }
    })

    if (loading || isLoading) {
        return <div className="text-center py-20 text-gray-600">Loading sales data...</div>
    }

    // Filter payments to those where ANY item belongs to current seller
    const sellerPayments = payments.filter(payment =>
        payment.items.some(item => item.seller === user.email)
    )

    // Sum totals for paid and pending, only counting items sold by this seller
    const paidTotal = sellerPayments.reduce((sum, payment) => {
        if (payment.status !== 'paid') return sum

        // Sum only items sold by seller
        const sellerSum = payment.items
            .filter(item => item.seller === user.email)
            .reduce((acc, item) => acc + item.subtotal, 0)

        return sum + sellerSum
    }, 0)

    const pendingTotal = sellerPayments.reduce((sum, payment) => {
        if (payment.status !== 'pending') return sum

        const sellerSum = payment.items
            .filter(item => item.seller === user.email)
            .reduce((acc, item) => acc + item.subtotal, 0)

        return sum + sellerSum
    }, 0)

    const chartData = [
        { name: 'Paid', amount: paidTotal },
        { name: 'Pending', amount: pendingTotal },
    ]

    return (
        <div className="min-h-screen px-6 py-10 bg-gradient-to-t from-[#6BDCF6] to-[#25A8D6] text-white">
            <h2 className="text-3xl font-bold mb-6">Welcome to Seller Dashboard</h2>
            <p className="text-lg mb-10">Here's a summary of your medicine sales revenue:</p>

            <div className="bg-white rounded-xl p-6 shadow-lg text-gray-800 max-w-4xl mx-auto">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => `৳${value.toLocaleString()}`} />
                        <Legend />
                        <Bar dataKey="amount" fill="#25A8D6" radius={[10, 10, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>

                <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                    <div className="bg-green-100 rounded-lg p-4">
                        <p className="text-green-700 font-semibold">Total Paid</p>
                        <p className="text-2xl font-bold">৳{paidTotal.toLocaleString()}</p>
                    </div>
                    <div className="bg-yellow-100 rounded-lg p-4">
                        <p className="text-yellow-700 font-semibold">Total Pending</p>
                        <p className="text-2xl font-bold">৳{pendingTotal.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SellerDashboardHome
