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
import Shop from '../pages/Shop/Shop'
import Cart from '../pages/Cart/Cart'
import UpdateProfile from '../pages/Auth/UpdateProfile/UpdateProfile'
import Checkout from '../pages/Checkout/Checkout'
import Invoice from '../pages/Invoice/Invoice'
import PrivateRoute from './PrivateRoute'

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
                path: '/categoryDetails/:id',
                element: <PrivateRoute><CategoryDetails /></PrivateRoute>,
            },
            {
                path: '/shop',
                element: <PrivateRoute><Shop /></PrivateRoute>
            },
            {
                path: '/cart',
                element: <PrivateRoute><Cart /></PrivateRoute>,
            },
            {
                path: '/checkout',
                element: <PrivateRoute><Checkout /></PrivateRoute>,
            },
            {
                path: '/invoice',
                element: <PrivateRoute><Invoice /></PrivateRoute>,
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <SignUp />
            },
            {
                path: '/update-profile',
                element: <PrivateRoute><UpdateProfile /></PrivateRoute>
            },
        ],
    },
    {
        path: '/dashboard',
        element: <DashboardLayout />,
        children: [
            {
                index: true,
                element: <PrivateRoute><DashboardHome /></PrivateRoute> // Show Role based home for customer/seller/admin
            },
            // customer Dashboard
            {
                path: 'customer/payment-history',
                element: <PrivateRoute><PaymentHistory /></PrivateRoute>
            },
            // admin Dashboard
            {
                path: 'admin/manage-users',
                element: <PrivateRoute><ManageUsers /></PrivateRoute>
            },
            {
                path: 'admin/manage-category',
                element: <PrivateRoute><ManageCategory /></PrivateRoute>
            },
            {
                path: 'admin/payment-management',
                element: <PrivateRoute><PaymentManagement /></PrivateRoute>
            },
            {
                path: 'admin/sales-report',
                element: <PrivateRoute><SalesReport /></PrivateRoute>
            },
            {
                path: 'admin/manage-banner-advertise',
                element: <PrivateRoute><ManageBannerAdvertise /></PrivateRoute>
            },
            // seller dashboard
            {
                path: 'seller/manage-medicines',
                element: <PrivateRoute><ManageMedicines /></PrivateRoute>
            },
            {
                path: 'seller/purchase-history',
                element: <PrivateRoute><PurchaseHistory /></PrivateRoute>
            },
            {
                path: 'seller/ask-for-advertisement',
                element: <PrivateRoute><AskForAdvertisement /></PrivateRoute>
            },
        ],
    },
])
