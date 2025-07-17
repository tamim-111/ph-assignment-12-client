// File: src/pages/Checkout.jsx
import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import useAuth from '../../hooks/useAuth'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import CustomTable from '../../components/CustomTable/CustomTable'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Container from '../../components/container/Container'
import Button from '../../components/Button/Button'
import CheckoutForm from '../../../src/components/Form/CheckoutForm/CheckoutForm'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK_KEY)

const Checkout = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    const { data: cartItems = [], isLoading } = useQuery({
        queryKey: ['cartItems', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user.email}`)
            return res.data
        },
    })

    const total = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    )

    const columns = [
        { header: 'Name', accessorKey: 'name', cell: info => info.getValue() },
        { header: 'Quantity', accessorKey: 'quantity', cell: info => info.getValue() },
        { header: 'Price (৳)', accessorKey: 'price', cell: info => `৳${info.getValue()}` },
        { header: 'Subtotal', cell: ({ row }) => `৳${row.original.quantity * row.original.price}` },
    ]

    return (
        <Container>
            <div className='min-h-screen py-10 px-4'>
                <div className='max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8'>
                    <h2 className='text-3xl font-bold text-center mb-6 text-[#25A8D6]'>Checkout</h2>

                    {/* User Info Summary */}
                    <div className='space-y-3'>
                        <div className='flex justify-between'>
                            <div>
                                <span className='font-medium text-gray-600'>Customer:</span>
                                <p className='text-lg'>{user?.displayName}</p>
                            </div>
                            <div>
                                <span className='font-medium text-gray-600'>Email:</span>
                                <p className='text-lg'>{user?.email}</p>
                            </div>
                        </div>
                        <div className='mt-6'>
                            <h3 className='text-xl font-semibold mb-2 text-[#25A8D6]'>Order Summary</h3>
                            {isLoading ? (
                                <p>Loading...</p>
                            ) : (
                                <CustomTable columns={columns} data={cartItems} />
                            )}
                            <div className='text-right mt-4 text-xl font-bold'>
                                Total: <span className='text-[#25A8D6]'>৳{total}</span>
                            </div>
                        </div>
                    </div>

                    <Elements stripe={stripePromise}>
                        <CheckoutForm
                            totalPrice={total}
                            orderData={{ items: cartItems }}
                        />
                    </Elements>

                </div>
            </div>
        </Container>
    )
}

export default Checkout
