import React, { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FaEye, FaPlus } from 'react-icons/fa'
import { useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import CustomTable from '../../components/CustomTable/CustomTable'
import { axiosSecure } from '../../hooks/useAxiosSecure'
import Container from '../../components/container/Container'

const Shop = () => {
    const [selectedMedicine, setSelectedMedicine] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Fetch all medicines
    const {
        data: medicines = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['medicines'],
        queryFn: async () => {
            const res = await axiosSecure.get('/medicines')
            return res.data
        },
    })

    // Handle Add to Cart
    const handleAddToCart = async (medicine) => {
        try {
            const res = await axiosSecure.post('/cart', medicine)
            if (res.data.success) {
                toast.success(`Added "${medicine.name}" to cart`)
                refetch() // Update stock in table
            }
            console.log(medicine)
        } catch (err) {
            console.error(err)
            toast.error('Failed to add to cart')
        }
    }

    // Handle modal open
    const openModal = (row) => {
        setSelectedMedicine(row)
        setIsModalOpen(true)
    }
    console.log(medicines)
    // Table columns
    const columns = [
        { header: 'Name', accessorKey: 'name', cell: info => info.getValue() },
        { header: 'Type', accessorKey: 'category', cell: info => info.getValue() },
        { header: 'Manufacturer', accessorKey: 'company', cell: info => info.getValue() },
        { header: 'Stock', accessorKey: 'stock', cell: info => info.getValue() },
        {
            header: 'Price (৳)',
            accessorKey: 'price',
            cell: info => `৳${info.getValue()}`,
        },
        {
            header: 'Actions',
            cell: ({ row }) => {
                const medicine = row.original
                return (
                    <div className='flex gap-2'>
                        <button
                            className='btn btn-sm btn-outline btn-info'
                            onClick={() => openModal(medicine)}
                        >
                            <FaEye />
                        </button>
                        <button
                            className='btn btn-sm btn-outline btn-success'
                            disabled={medicine.stock <= 0}
                            onClick={() => handleAddToCart(medicine)}
                        >
                            <FaPlus />
                        </button>
                    </div>
                )
            },
        },
    ]

    return (
        <Container>
            <section className='my-10 px-4'>
                <h2 className='text-3xl font-bold text-center mb-6 text-[#25A8D6]'>
                    All Medicines
                </h2>

                {isLoading ? (
                    <div className='text-center'>Loading...</div>
                ) : medicines.length === 0 ? (
                    <div className='text-center text-gray-500'>
                        No medicines found. Please check back later.
                    </div>
                ) : (
                    <CustomTable columns={columns} data={medicines} />
                )}

                {/* Medicine Details Modal */}
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
                                        className='w-full h-60 object-contain rounded-md mb-4'
                                    />
                                    <p><strong>Type:</strong> {selectedMedicine.category}</p>
                                    <p><strong>Manufacturer:</strong> {selectedMedicine.company}</p>
                                    <p><strong>Stock:</strong> {selectedMedicine.stock}</p>
                                    <p><strong>Price:</strong> ৳{selectedMedicine.price}</p>
                                    <p className='mt-2 text-gray-700'>
                                        {selectedMedicine.description}
                                    </p>
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
        </Container>
    )
}

export default Shop
