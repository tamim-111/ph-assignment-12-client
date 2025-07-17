import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';

const AdminDashboardHome = () => {
    const axiosSecure = useAxiosSecure();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['all-payments'],
        queryFn: async () => {
            const res = await axiosSecure.get('/payments');
            return res.data;
        }
    });

    if (isLoading) {
        return <div className="text-center py-20 text-gray-600">Loading sales data...</div>;
    }

    // Calculate totals
    const paidTotal = payments
        .filter(payment => payment.status === 'paid')
        .reduce((sum, p) => sum + p.amount, 0);

    const pendingTotal = payments
        .filter(payment => payment.status === 'pending')
        .reduce((sum, p) => sum + p.amount, 0);

    const chartData = [
        { name: 'Paid', amount: paidTotal },
        { name: 'Pending', amount: pendingTotal },
    ];

    return (
        <div className="min-h-screen px-6 py-10 bg-gradient-to-t from-[#6BDCF6] to-[#25A8D6] text-white">
            <h2 className="text-3xl font-bold mb-6">Welcome to Admin Dashboard</h2>
            <p className="text-lg mb-10">Here's a summary of website sales revenue:</p>

            <div className="bg-white rounded-xl p-6 shadow-lg text-gray-800 max-w-4xl mx-auto">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
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
    );
};

export default AdminDashboardHome;
