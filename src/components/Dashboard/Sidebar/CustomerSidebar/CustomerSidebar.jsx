import React from 'react';
import SidebarLink from '../SidebarLink';
import { FaMoneyBillWave } from 'react-icons/fa'

const CustomerSidebar = () => {
    return (
        <div className='space-y-2 mt-4'>
            <SidebarLink to='/dashboard/customer/payment-history' icon={<FaMoneyBillWave />} label='Payment History' />
        </div>
    );
};

export default CustomerSidebar;