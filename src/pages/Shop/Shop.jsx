import React, { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FaEye, FaPlus } from 'react-icons/fa'
import CustomTable from '../../components/CustomTable/CustomTable'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const Shop = () => {
    const axiosSecure = useAxiosSecure()
    const [selectedMedicine, setSelectedMedicine] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Fetch medicines from DB
    const { data: medicines = [], isLoading } = useQuery({
        queryKey: ['medicines'],
        queryFn: async () => {
            const res = await axiosSecure.get('/medicines')
            return res.data
        }
    })

    const openModal = (row) => {
        setSelectedMedicine(row)
        setIsModalOpen(true)
    }

    const handleAddToCart = async (medicine) => {
        try {
            const { data: existingCartItems } = await axiosSecure.get('/cart')
            const alreadyExists = existingCartItems.find(item => item._id === medicine._id)

            if (alreadyExists) {
                toast.error('Already in cart')
                return
            }

            const cartItem = {
                ...medicine,
                quantity: 1,
                subtotal: medicine.price,
            }

            const res = await axiosSecure.post('/cart', cartItem)
            if (res.data.insertedId) {
                toast.success(`Added "${medicine.name}" to cart`)
            }
        } catch (error) {
            console.error(error)
            toast.error('Failed to add to cart')
        }
    }

    const columns = [
        { header: 'Name', accessorKey: 'name', cell: info => info.getValue() },
        { header: 'Type', accessorKey: 'category', cell: info => info.getValue() },
        { header: 'Manufacturer', accessorKey: 'company', cell: info => info.getValue() },
        { header: 'Stock', accessorKey: 'stock', cell: info => info.getValue() || 0 }, // default stock
        { header: 'Price (৳)', accessorKey: 'price', cell: info => info.getValue() },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <div className='flex gap-2'>
                    <button className='btn btn-sm btn-outline btn-info' onClick={() => openModal(row.original)}>
                        <FaEye />
                    </button>
                    <button className='btn btn-sm btn-outline btn-success' onClick={() => handleAddToCart(row.original)}>
                        <FaPlus />
                    </button>
                </div>
            ),
        },
    ]

    return (
        <section className='my-10 px-4'>
            <h2 className='text-3xl font-bold text-center mb-6 text-[#25A8D6]'>All medicines</h2>

            {isLoading ? (
                <p className='text-center'>Loading medicines...</p>
            ) : medicines.length === 0 ? (
                <p className='text-center text-gray-500'>No medicines available.</p>
            ) : (
                <CustomTable columns={columns} data={medicines} />
            )}

            {/* Modal */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className='relative z-50'>
                <div className='fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4'>
                    <DialogPanel className='w-full max-w-xl rounded-xl bg-white p-6 shadow-lg'>
                        {selectedMedicine && (
                            <>
                                <DialogTitle className='text-2xl font-semibold text-[#25A8D6] mb-4'>
                                    {selectedMedicine.name}
                                </DialogTitle>
                                <img
                                    src={selectedMedicine.image}
                                    alt={selectedMedicine.name}
                                    className='w-full h-60 object-fill rounded-md mb-4'
                                />
                                <p><strong>Type:</strong> {selectedMedicine.category}</p>
                                <p><strong>Manufacturer:</strong> {selectedMedicine.company}</p>
                                <p><strong>Stock:</strong> {selectedMedicine.stock || 0}</p>
                                <p><strong>Price:</strong> ৳{selectedMedicine.price}</p>
                                <p className='mt-2 text-gray-700'>{selectedMedicine.description}</p>
                                <div className='text-right mt-6'>
                                    <button
                                        className='btn btn-sm bg-[#25A8D6] text-white hover:bg-[#1d95c3]'
                                        onClick={() => setIsModalOpen(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </>
                        )}
                    </DialogPanel>
                </div>
            </Dialog>
        </section>
    )
}

export default Shop
