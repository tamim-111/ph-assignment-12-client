import React from 'react'
import { NavLink } from 'react-router'

const SidebarLink = ({ to, icon, label }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300 ${isActive
                    ? 'bg-white text-[#25A8D6] font-semibold shadow-md'
                    : 'hover:bg-white/20 hover:scale-[1.01] text-white'
                }`
            }
        >
            <span className='text-lg'>{icon}</span>
            <span>{label}</span>
        </NavLink>
    )
}

export default SidebarLink
