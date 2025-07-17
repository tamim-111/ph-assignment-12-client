import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router'
import Button from '../../components/Button/Button'
import CustomTable from '../../components/CustomTable/CustomTable'
import Container from '../../components/container/Container'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'

const Cart = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    // Load cart data
    const { data: cartItems = [], isLoading } = useQuery({
        queryKey: ['cartItems', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`)
            return res.data
        },
    })

    // Update quantity
    const updateCartMutation = useMutation({
        mutationFn: async ({ id, quantity, stock, price }) => {
            const subtotal = quantity * price
            return axiosSecure.patch(`/carts/${id}`, { quantity, stock, subtotal })
        },
        onSuccess: () => queryClient.invalidateQueries(['cartItems'])
    })

    const handleIncrease = (item) => {
        if (item.stock > 0) {
            updateCartMutation.mutate({
                id: item._id,
                quantity: item.quantity + 1,
                stock: item.stock - 1,
                price: item.price
            })
        }
    }

    const handleDecrease = (item) => {
        if (item.quantity > 0) {
            updateCartMutation.mutate({
                id: item._id,
                quantity: item.quantity - 1,
                stock: item.stock + 1,
                price: item.price
            })
        }
    }

    // Delete one cart item
    const deleteCartMutation = useMutation({
        mutationFn: async (id) => axiosSecure.delete(`/carts/${id}`),
        onSuccess: () => queryClient.invalidateQueries(['cartItems'])
    })

    const handleRemove = (id) => {
        deleteCartMutation.mutate(id)
    }

    // Clear all cart items
    const clearCartMutation = useMutation({
        mutationFn: () => axiosSecure.delete('/carts'),
        onSuccess: () => queryClient.invalidateQueries(['cartItems'])
    })

    const handleClearCart = () => {
        clearCartMutation.mutate()
    }

    // Checkout/save cart
    const handleProceedToCheckout = async () => {
        try {
            // Send cart data to backend
            await axiosSecure.post('/checkout', {
                items: cartItems,
                total: totalPrice,
                date: new Date(),
            })
            // Navigate to checkout page
            navigate('/checkout')
        } catch (error) {
            console.error('Checkout failed:', error)
            toast.error('Failed to process checkout.')
        }
    }
    const columns = [
        { header: 'Name', accessorKey: 'name', cell: info => info.getValue() },
        { header: 'Company', accessorKey: 'company', cell: info => info.getValue() },
        { header: 'Stock', accessorKey: 'stock', cell: info => info.getValue() },
        {
            header: 'Price/Unit (৳)',
            accessorKey: 'price',
            cell: info => `৳${info.getValue()}`,
        },
        {
            header: 'Quantity',
            accessorKey: 'quantity',
            cell: ({ row }) => (
                <div className='flex items-center gap-2'>
                    <button
                        onClick={() => handleDecrease(row.original)}
                        className='p-1 rounded bg-gray-200 hover:bg-gray-300'
                        disabled={row.original.quantity === 0}
                    >
                        <FaMinus size={12} />
                    </button>
                    <span>{row.original.quantity}</span>
                    <button
                        onClick={() => handleIncrease(row.original)}
                        className='p-1 rounded bg-gray-200 hover:bg-gray-300'
                        disabled={row.original.stock === 0}
                    >
                        <FaPlus size={12} />
                    </button>
                </div>
            ),
        },
        {
            header: 'Subtotal',
            cell: ({ row }) => `৳${row.original.subtotal || 0}`,
        },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <button
                    onClick={() => handleRemove(row.original._id)}
                    className='btn btn-sm btn-outline btn-error'
                >
                    <FaTrashAlt />
                </button>
            ),
        },
    ]

    const totalPrice = cartItems.reduce((acc, item) => acc + item.subtotal, 0)

    return (
        <Container>
            <div className='max-w-6xl mx-auto px-4 my-10'>
                <h2 className='text-3xl font-bold text-[#25A8D6] mb-6 text-center'>Your Cart</h2>

                {isLoading ? (
                    <p className='text-center'>Loading...</p>
                ) : cartItems.length > 0 ? (
                    <>
                        <CustomTable columns={columns} data={cartItems} />

                        <div className='mt-6 flex flex-col md:flex-row justify-between items-center gap-4'>
                            <div className='flex gap-2'>
                                <Button label='Clear Cart' onClick={handleClearCart} />
                            </div>

                            <div className='text-right'>
                                <p className='text-xl font-semibold'>
                                    Total: <span className='text-[#25A8D6]'>৳{totalPrice}</span>
                                </p>
                                <Button label='Proceed to Checkout' onClick={handleProceedToCheckout} />
                            </div>
                        </div>
                    </>
                ) : (
                    <p className='text-center text-gray-500 text-lg'>Your cart is empty.</p>
                )}
            </div>
        </Container>
    )
}

export default Cart