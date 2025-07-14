import { createBrowserRouter } from 'react-router'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home/CategoryDetails/Home'
import CategoryDetails from '../pages/Home/CategoryDetails/CategoryDetails'
import Login from '../pages/Auth/Login/Login'
import SignUp from '../pages/Auth/SignUp/SignUp'
import DashboardLayout from '../layouts/DashboardLayout'
import DashboardHome from '../pages/Dashboard/DashboardHome/DashboardHome'
import ManageBannerAdvertise from '../pages/Dashboard/Admin/ManageBannerAdvertise/ManageBannerAdvertise'
import ManageCategory from '../pages/Dashboard/Admin/ManageCategory/ManageCategory'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers/ManageUsers'
import PaymentManagement from '../pages/Dashboard/Admin/PaymentManagement/PaymentManagement'
import SalesReport from '../pages/Dashboard/Admin/SalesReport/SalesReport'
import AskForAdvertisement from '../pages/Dashboard/Seller/AskForAdvertisement/AskForAdvertisement'
import ManageMedicines from '../pages/Dashboard/Seller/ManageMedicines/ManageMedicines'
import PaymentHistory from '../pages/Dashboard/Customer/PaymentHistory/PaymentHistory'
import PurchaseHistory from '../pages/Dashboard/Seller/PaymentHistory/PurchaseHistory'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/plant/:id',
                element: <CategoryDetails />,
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
        ],
    },
    {
        path: '/dashboard',
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: (
                    <PrivateRoute>
                        <DashboardHome /> // Show Role based home for customer/seller/admin
                    </PrivateRoute>
                ),
            },
            // customer Dashboard
            {
                path: 'customer/payment-history',
                element: <PaymentHistory />
            },
            // admin Dashboard
            {
                path: 'admin/manage-banner-advertise',
                element: <ManageBannerAdvertise />
            },
            {
                path: 'admin/manage-category',
                element: <ManageCategory />
            },
            {
                path: 'admin/manage-users',
                element: <ManageUsers />
            },
            {
                path: 'admin/payment-management',
                element: <PaymentManagement />
            },
            {
                path: 'admin/sales-report',
                element: <SalesReport />
            },
            // seller dashboard
            {
                path: 'seller/ask-for-advertisement',
                element: <AskForAdvertisement />
            },
            {
                path: 'seller/manage-medicines',
                element: <ManageMedicines />
            },
            {
                path: 'seller/purchase-history',
                element: <PurchaseHistory />
            },
        ],
    },
])
