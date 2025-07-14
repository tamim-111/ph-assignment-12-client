import React from 'react';
import SidebarLink from '../SidebarLink';
import { FaPills, FaHistory, FaBullhorn } from 'react-icons/fa'

const SellerSidebar = () => {
    return (
        <div className='space-y-2 mt-4'>
            <SidebarLink to='/dashboard/seller/manage-medicines' icon={<FaPills />} label='Manage Medicines' />
            <SidebarLink to='/dashboard/seller/purchase-history' icon={<FaHistory />} label='Purchase History' />
            <SidebarLink to='/dashboard/seller/ask-for-advertisement' icon={<FaBullhorn />} label='Advertise Request' />
        </div>
    );
};

export default SellerSidebar;