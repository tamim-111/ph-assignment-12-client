import React from 'react'
import { Link } from 'react-router'

const CategoryCard = ({ id, name, image, count }) => {
    return (
        <Link
            to={`/categoryDetails/${id}`}
            className='bg-white rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.02] overflow-hidden border border-[#e0f7ff]'
        >
            <img src={image} alt={name} className='size-40 mx-auto py-5' />
            <div className='p-4 space-y-1'>
                <h3 className='text-xl font-bold text-[#25A8D6]'>{name}</h3>
                <p className='text-sm text-gray-600'>{count} medicines</p>
            </div>
        </Link>
    )
}

export default CategoryCard
