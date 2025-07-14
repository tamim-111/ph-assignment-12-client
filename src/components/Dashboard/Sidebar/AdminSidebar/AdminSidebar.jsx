import React from 'react'
import { FaUsers, FaThList, FaMoneyCheckAlt, FaChartBar } from 'react-icons/fa'
import { RiAdvertisementLine } from 'react-icons/ri'
import SidebarLink from '../SidebarLink'

const AdminSidebar = () => {
    return (
        <div className='space-y-2 mt-4'>
            <SidebarLink to='/dashboard/admin/manage-users' icon={<FaUsers />} label='Manage Users' />
            <SidebarLink to='/dashboard/admin/manage-category' icon={<FaThList />} label='Manage Categories' />
            <SidebarLink to='/dashboard/admin/payment-management' icon={<FaMoneyCheckAlt />} label='Payment Management' />
            <SidebarLink to='/dashboard/admin/sales-report' icon={<FaChartBar />} label='Sales Report' />
            <SidebarLink to='/dashboard/admin/manage-banner-advertise' icon={<RiAdvertisementLine />} label='Banner Advertise' />
        </div>
    )
}

export default AdminSidebar
