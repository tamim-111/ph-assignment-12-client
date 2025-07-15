import { useState, Fragment } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { imageUpload } from '../../../../api/utils'
import Button from '../../../../components/Button/Button'
import CustomTable from '../../../../components/CustomTable/CustomTable'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'

const ManageCategory = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { register, handleSubmit, reset } = useForm()

    const [categories, setCategories] = useState([
        {
            id: '1',
            name: 'Tablet',
            image: 'https://i.ibb.co/N1kRYPF/tablet.jpg',
        },
        {
            id: '2',
            name: 'Syrup',
            image: 'https://i.ibb.co/VtyLSKM/syrup.jpg',
        },
    ])

    const onSubmit = async (data) => {
        const imageFile = data.image[0]
        const imageUrl = await imageUpload(imageFile)

        const newCategory = {
            id: Date.now().toString(),
            name: data.name,
            image: imageUrl,
        }

        setCategories([...categories, newCategory])
        toast.success('Category added successfully!')
        reset()
        setIsOpen(false)
    }

    const handleDelete = (id) => {
        const filtered = categories.filter(category => category.id !== id)
        setCategories(filtered)
        toast.success('Category deleted')
    }

    const handleUpdate = (id) => {
        toast('Update functionality goes here')
    }

    const columns = [
        {
            header: 'Image',
            accessorKey: 'image',
            cell: info => (
                <img
                    src={info.getValue()}
                    alt='category'
                    className='w-12 h-12 object-cover rounded-md'
                />
            ),
        },
        {
            header: 'Name',
            accessorKey: 'name',
            cell: info => (
                <span className='font-semibold text-[#25A8D6]'>{info.getValue()}</span>
            ),
        },
        {
            header: 'Actions',
            accessorKey: 'id',
            cell: info => {
                const { id } = info.row.original
                return (
                    <div className='flex items-center gap-2'>
                        <Button
                            className='btn-xs'
                            onClick={() => handleUpdate(id)}
                            label={<FaEdit />}
                        />
                        <Button
                            className='btn-xs btn-error'
                            onClick={() => handleDelete(id)}
                            label={<FaTrash />}
                        />
                    </div>
                )
            },
        },
    ]

    return (
        <div className='p-4 md:p-6'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl font-bold text-[#25A8D6]'>Manage Categories</h2>
                <Button
                    label={
                        <span className='flex items-center gap-2'>
                            <FaPlus /> Add Category
                        </span>
                    }
                    onClick={() => setIsOpen(true)}
                />
            </div>

            <CustomTable data={categories} columns={columns} />

            {/* Add Category Modal */}
            <Transition show={isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-50' onClose={() => setIsOpen(false)}>
                    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm' />
                    <div className='fixed inset-0 flex items-center justify-center p-4'>
                        <DialogPanel className='w-full max-w-md rounded-xl bg-white p-6 shadow-xl'>
                            <DialogTitle className='text-lg font-semibold text-[#25A8D6] mb-4'>
                                Add New Category
                            </DialogTitle>

                            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                                <div>
                                    <label className='text-sm text-gray-700'>Category Name</label>
                                    <input
                                        {...register('name')}
                                        className='input input-bordered w-full'
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='text-sm text-gray-700'>Upload Image</label>
                                    <input
                                        {...register('image')}
                                        type='file'
                                        accept='image/*'
                                        className='file-input file-input-bordered w-full'
                                        required
                                    />
                                </div>
                                <div className='text-right'>
                                    <Button type='submit' label='Add Category' />
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default ManageCategory
