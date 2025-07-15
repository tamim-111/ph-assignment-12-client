import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button/Button'
import { Link } from 'react-router'

const Checkout = () => {
    const { register, handleSubmit, reset } = useForm()
    const total = 120 // You can replace this with props or context later

    const onSubmit = (data) => {
        console.log('Checkout Info:', data)
        alert('Checkout Successful! (Demo)')
        reset()
    }

    return (
        <div className='min-h-screen flex items-center justify-center px-4 py-10'>
            <div className='w-full max-w-3xl bg-white rounded-xl shadow-xl p-8'>
                <h2 className='text-3xl font-bold text-center mb-8 text-[#25A8D6]'>Checkout</h2>

                <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    {/* User Info Column */}
                    <div className='space-y-4'>
                        <div>
                            <label className='block text-sm font-medium mb-1 text-gray-700'>Full Name</label>
                            <input
                                type='text'
                                {...register('name')}
                                className='input input-bordered w-full'
                                placeholder='John Doe'
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium mb-1 text-gray-700'>Email Address</label>
                            <input
                                type='email'
                                {...register('email')}
                                className='input input-bordered w-full'
                                placeholder='john@example.com'
                                required
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium mb-1 text-gray-700'>Phone Number</label>
                            <input
                                type='tel'
                                {...register('phone')}
                                className='input input-bordered w-full'
                                placeholder='+880123456789'
                            />
                        </div>
                        <div>
                            <label className='block text-sm font-medium mb-1 text-gray-700'>Shipping Address</label>
                            <textarea
                                {...register('address')}
                                className='textarea textarea-bordered w-full'
                                placeholder='Your full shipping address'
                                required
                            ></textarea>
                        </div>
                    </div>

                    {/* Order Summary Column */}
                    <div className='bg-gray-50 p-6 rounded-lg shadow-md space-y-4'>
                        <h3 className='text-xl font-semibold text-[#25A8D6] mb-2'>Order Summary</h3>

                        <div className='flex justify-between'>
                            <span>Subtotal:</span>
                            <span>৳{total}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span>Shipping:</span>
                            <span>৳0</span>
                        </div>
                        <div className='flex justify-between font-semibold text-lg border-t pt-2'>
                            <span>Total:</span>
                            <span className='text-[#25A8D6]'>৳{total}</span>
                        </div>

                        <Link to={'/invoice'}><Button type='submit' wideFull label='Pay Now' /></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Checkout
