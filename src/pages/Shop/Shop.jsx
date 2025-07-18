import React, { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FaEye, FaPlus } from 'react-icons/fa'
import Container from '../../components/container/Container'
import CustomTable from '../../components/CustomTable/CustomTable'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../hooks/useAxiosSecure' // assumes you created this
import toast from 'react-hot-toast'
import LoadingSpinner from '../../components/Spinner/LoadingSpinner'
import useAuth from '../../hooks/useAuth'

const Shop = () => {
    const { user } = useAuth()
    const [selectedMedicine, setSelectedMedicine] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [addedToCartIds, setAddedToCartIds] = useState([])
    const axiosSecure = useAxiosSecure()

    const { data: medicines = [], isLoading } = useQuery({
        queryKey: ['medicines'],
        queryFn: async () => {
            const res = await axiosSecure.get('/medicines')
            return res.data
        },
    })

    const openModal = (row) => {
        setSelectedMedicine(row)
        setIsModalOpen(true)
    }

    const handleAddToCart = async (medicine) => {
        const cartItem = {
            ...medicine,
            medicineId: medicine._id,
            userEmail: user?.email,
            quantity: 0,
            subtotal: 0,
        }
        delete cartItem._id

        try {
            const res = await axiosSecure.post('/carts', cartItem)
            if (res.data.insertedId) {
                toast.success(`${medicine.name} added to cart`)
                setAddedToCartIds(prev => [...prev, medicine._id]) // <- add to disabled list
            }
        } catch (err) {
            toast.error('Failed to add to cart')
        }
    }


    const columns = [
        { header: 'Name', accessorKey: 'name' },
        { header: 'Type', accessorKey: 'category' },
        { header: 'Manufacturer', accessorKey: 'company' },
        { header: 'Stock', accessorKey: 'stock' },
        { header: 'Price (৳)', accessorKey: 'price' },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <div className='flex gap-2'>
                    <button className='btn btn-sm btn-outline btn-info' onClick={() => openModal(row.original)}>
                        <FaEye />
                    </button>
                    <button
                        className='btn btn-sm btn-outline btn-success'
                        onClick={() => handleAddToCart(row.original)}
                        disabled={addedToCartIds.includes(row.original._id)}
                    >
                        <FaPlus />
                    </button>
                </div>
            ),
        },
    ]

    return (
        <Container>
            <section className='my-10 px-4'>
                <h2 className='text-3xl font-bold text-center mb-6 text-[#25A8D6]'>
                    All Medicines
                </h2>

                {isLoading ? (
                    <LoadingSpinner />
                ) : medicines.length === 0 ? (
                    <p className='text-gray-500 text-center mt-10'>
                        No medicines found. Click "Add Medicine" to create your first entry.
                    </p>
                ) : (
                    <CustomTable data={medicines} columns={columns} showPriceSort={true} />
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
                                    <p><strong>Stock:</strong> {selectedMedicine.stock}</p>
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
        </Container>
    )
}

export default Shop
