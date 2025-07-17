import React from 'react';
import useRole from '../../../hooks/useRole';
import CustomerDashboardHome from '../Customer/CustomerDashboardHome/CustomerDashboardHome';
import LoadingSpinner from '../../../components/Spinner/LoadingSpinner';
import AdminDashboardHome from '../Admin/AdminDashboardHome/AdminDashboardHome';
import SellerDashboardHome from '../Seller/SellerDashboardHome/SellerDashboardHome';

const DashboardHome = () => {
    const { role, isLoading } = useRole()

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (role === 'customer') {
        return <CustomerDashboardHome />
    }

    if (role === 'seller') {
        return <SellerDashboardHome />
    }

    if (role === 'admin') {
        return <AdminDashboardHome />
    }
    return (
        <div className="min-h-screen flex items-center justify-center text-red-500 font-semibold">
            Unauthorized or unknown role.
        </div>
    );
};

export default DashboardHome;