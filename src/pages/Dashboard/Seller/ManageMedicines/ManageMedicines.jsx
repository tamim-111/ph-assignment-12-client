// ManageMedicines.jsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FaPlus } from 'react-icons/fa'
import { imageUpload } from '../../../../api/utils'
import Button from '../../../../components/Button/Button'
import CustomTable from '../../../../components/CustomTable/CustomTable'
import toast from 'react-hot-toast'

const ManageMedicines = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [medicines, setMedicines] = useState([
        {
            name: 'Napa',
            generic: 'Paracetamol',
            description: 'Pain reliever and fever reducer',
            image: 'https://i.ibb.co/MC5F5Sw/napa.jpg',
            category: 'Tablet',
            company: 'Beximco',
            unit: 'Mg',
            price: 2,
            discount: 0,
        },
        {
            name: 'Maxpro',
            generic: 'Esomeprazole',
            description: 'Used to treat acid reflux',
            image: 'https://i.ibb.co/vQ3Pv9W/maxpro.jpg',
            category: 'Capsule',
            company: 'Square',
            unit: 'Mg',
            price: 5,
            discount: 10,
        },
        {
            name: 'Fexo',
            generic: 'Fexofenadine',
            description: 'Antihistamine for allergy relief',
            image: 'https://i.ibb.co/XYJdW0c/fexo.jpg',
            category: 'Tablet',
            company: 'Incepta',
            unit: 'Mg',
            price: 8,
            discount: 5,
        },
    ])
    const { register, handleSubmit, reset } = useForm()

    const onSubmit = async (data) => {
        const image = data.image[0]
        const imageUrl = await imageUpload(image)

        const newMedicine = {
            ...data,
            image: imageUrl,
            discount: parseFloat(data.discount) || 0,
        }

        setMedicines([...medicines, newMedicine])
        toast.success('Medicine added successfully!')
        reset()
        setIsOpen(false)
    }

    const columns = [
        {
            header: 'Image', accessorKey: 'image', cell: info => (
                <img
                    src={info.getValue()}
                    alt='medicine'
                    className='w-12 h-12 object-cover rounded-md'
                />
            ),
        },
        { header: 'Name', accessorKey: 'name', cell: info => info.getValue() },
        { header: 'Generic', accessorKey: 'generic', cell: info => info.getValue() },
        { header: 'Company', accessorKey: 'company', cell: info => info.getValue() },
        { header: 'Category', accessorKey: 'category', cell: info => info.getValue() },
        { header: 'Mass Unit', accessorKey: 'unit', cell: info => info.getValue() },
        { header: 'Price (Tk)', accessorKey: 'price', cell: info => `Tk ${info.getValue()}` },
        { header: 'Discount (%)', accessorKey: 'discount', cell: info => `${info.getValue()}%` },
    ]

    return (
        <div className='p-4 md:p-6'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl font-bold text-[#25A8D6]'>Manage Medicines</h2>
                <Button
                    label={
                        <span className='flex items-center gap-2'>
                            <FaPlus /> Add Medicine
                        </span>
                    }
                    onClick={() => setIsOpen(true)}
                />
            </div>

            <CustomTable data={medicines} columns={columns} />

            <Transition show={isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-50' onClose={() => setIsOpen(false)}>
                    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm' />
                    <div className='fixed inset-0 flex items-center justify-center p-4'>
                        <DialogPanel className='w-full max-w-xl rounded-xl bg-white p-6 shadow-xl'>
                            <DialogTitle className='text-lg font-semibold text-[#25A8D6] mb-4'>Add New Medicine</DialogTitle>
                            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                    <div>
                                        <label className='text-sm'>Item Name</label>
                                        <input {...register('name')} className='input input-bordered w-full' required />
                                    </div>
                                    <div>
                                        <label className='text-sm'>Generic Name</label>
                                        <input {...register('generic')} className='input input-bordered w-full' required />
                                    </div>
                                    <div>
                                        <label className='text-sm'>Short Description</label>
                                        <input {...register('description')} className='input input-bordered w-full' required />
                                    </div>
                                    <div>
                                        <label className='text-sm'>Image</label>
                                        <input type='file' {...register('image')} required accept='image/*' />
                                    </div>
                                    <div>
                                        <label className='text-sm'>Category</label>
                                        <select {...register('category')} className='select select-bordered w-full'>
                                            <option value='Tablet'>Tablet</option>
                                            <option value='Syrup'>Syrup</option>
                                            <option value='Capsule'>Capsule</option>
                                            <option value='Injection'>Injection</option>
                                            <option value='Other'>Other</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className='text-sm'>Company</label>
                                        <select {...register('company')} className='select select-bordered w-full'>
                                            <option value='Square'>Square</option>
                                            <option value='Incepta'>Incepta</option>
                                            <option value='Beximco'>Beximco</option>
                                            <option value='ACME'>ACME</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className='text-sm'>Mass Unit</label>
                                        <select {...register('unit')} className='select select-bordered w-full'>
                                            <option value='Mg'>Mg</option>
                                            <option value='ML'>ML</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className='text-sm'>Per Unit Price</label>
                                        <input type='number' {...register('price')} className='input input-bordered w-full' required />
                                    </div>
                                    <div>
                                        <label className='text-sm'>Discount (%)</label>
                                        <input type='number' defaultValue={0} {...register('discount')} className='input input-bordered w-full' />
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <Button type='submit' label='Add Medicine' />
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default ManageMedicines
