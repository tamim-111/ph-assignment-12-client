import React, { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { FaEye, FaPlus } from 'react-icons/fa'
import CustomTable from '../../../components/CustomTable/CustomTable'

const demoMedicines = [
    {
        id: '1',
        name: 'Paracetamol 500mg',
        type: 'Tablet',
        manufacturer: 'ACI Limited',
        stock: 120,
        price: 8,
        image: 'https://shorturl.at/4m3CW',
        description: 'Effective for fever and mild to moderate pain.',
    },
    {
        id: '2',
        name: 'Napa Extra',
        type: 'Tablet',
        manufacturer: 'Beximco Pharma',
        stock: 60,
        price: 10,
        image: 'https://shorturl.at/Q5C8s',
        description: 'Combines paracetamol and caffeine for fast relief.',
    },
]

const CategoryDetails = () => {
    const [selectedMedicine, setSelectedMedicine] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = (row) => {
        setSelectedMedicine(row)
        setIsModalOpen(true)
    }

    const columns = [
        { header: 'Name', accessorKey: 'name', cell: info => info.getValue() },
        { header: 'Type', accessorKey: 'type', cell: info => info.getValue() },
        { header: 'Manufacturer', accessorKey: 'manufacturer', cell: info => info.getValue() },
        { header: 'Stock', accessorKey: 'stock', cell: info => info.getValue() },
        { header: 'Price (৳)', accessorKey: 'price', cell: info => info.getValue() },
        {
            header: 'Actions',
            cell: ({ row }) => (
                <div className='flex gap-2'>
                    <button className='btn btn-sm btn-outline btn-info' onClick={() => openModal(row.original)}>
                        <FaEye />
                    </button>
                    <button className='btn btn-sm btn-outline btn-success' onClick={() => alert(`Added ${row.original.name} to cart`)}>
                        <FaPlus />
                    </button>
                </div>
            ),
        },
    ]

    return (
        <section className='my-10 px-4'>
            <h2 className='text-3xl font-bold text-center mb-6 text-[#25A8D6]'>
                Medicines in Selected Category
            </h2>

            <CustomTable columns={columns} data={demoMedicines} />

            {/* Headless UI Modal */}
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
                                <p><strong>Type:</strong> {selectedMedicine.type}</p>
                                <p><strong>Manufacturer:</strong> {selectedMedicine.manufacturer}</p>
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
    )
}

export default CategoryDetails
