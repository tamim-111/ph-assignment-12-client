import React, { useState } from 'react'
import { FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa'
import Button from '../../components/Button/Button'
import CustomTable from '../../components/CustomTable/CustomTable'
import { Link } from 'react-router'
import Container from '../../components/container/Container'

const initialCartItems = [
    {
        id: '1',
        name: 'Napa Extra',
        company: 'Beximco Pharma',
        stock: 14,
        price: 8,
        quantity: 0,
    },
    {
        id: '2',
        name: 'Maxpro 20mg',
        company: 'Square Pharma',
        stock: 93,
        price: 13,
        quantity: 0,
    },
]

const Cart = () => {
    const [cartItems, setCartItems] = useState(initialCartItems)

    const handleIncrease = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id && item.stock > 0
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                        stock: item.stock - 1,
                    }
                    : item
            )
        )
    }

    const handleDecrease = (id) => {
        setCartItems(prev =>
            prev.map(item =>
                item.id === id && item.quantity > 0
                    ? {
                        ...item,
                        quantity: item.quantity - 1,
                        stock: item.stock + 1,
                    }
                    : item
            )
        )
    }

    const handleRemove = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id))
    }

    const handleClearCart = () => {
        setCartItems([])
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
                        onClick={() => handleDecrease(row.original.id)}
                        className='p-1 rounded bg-gray-200 hover:bg-gray-300'
                        disabled={row.original.quantity === 0}
                    >
                        <FaMinus size={12} />
                    </button>
                    <span>{row.original.quantity}</span>
                    <button
                        onClick={() => handleIncrease(row.original.id)}
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
            cell: ({ row }) => `৳${row.original.quantity * row.original.price}`,
        },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <button
                    onClick={() => handleRemove(row.original.id)}
                    className='btn btn-sm btn-outline btn-error'
                >
                    <FaTrashAlt />
                </button>
            ),
        },
    ]

    const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

    return (
        <Container>
            <div className='max-w-6xl mx-auto px-4 my-10'>
                <h2 className='text-3xl font-bold text-[#25A8D6] mb-6 text-center'>Your Cart</h2>

                {cartItems.length > 0 ? (
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
                                <Link to={'/checkout'}>
                                    <Button label='Proceed to Checkout' />
                                </Link>
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
