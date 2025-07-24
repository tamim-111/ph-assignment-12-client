import { useState, Fragment } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { imageUpload } from '../../../../api/utils'
import Button from '../../../../components/Button/Button'
import CustomTable from '../../../../components/CustomTable/CustomTable'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../../../components/Spinner/LoadingSpinner'
import { Helmet } from 'react-helmet'

const ManageCategory = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [editId, setEditId] = useState(null)
    const { register, handleSubmit, reset, setValue } = useForm()
    const [selectedCategory, setSelectedCategory] = useState(null)
    const axiosSecure = useAxiosSecure()

    const { data: categories = [], refetch, isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/categories')
            return res.data
        },
    })

    const onSubmit = async (data) => {
        try {
            let imageUrl = ''

            const imageInput = data.image

            // Check if new file is uploaded
            if (imageInput && imageInput[0] instanceof File) {
                imageUrl = await imageUpload(imageInput[0]) // ✅ Upload new image
            } else if (isEditMode) {
                imageUrl = selectedCategory.image // ✅ Keep old image
            }

            const categoryData = {
                name: data.name,
                image: imageUrl,
            }

            if (isEditMode) {
                await axiosSecure.patch(`/categories/${editId}`, categoryData)
                toast.success('Category updated')
            } else {
                await axiosSecure.post('/categories', categoryData)
                toast.success('Category added')
            }

            refetch()
            reset()
            setIsOpen(false)
            setIsEditMode(false)
            setEditId(null)
        } catch (err) {
            console.error(err)
            toast.error('Failed to save category')
        }
    }

    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/categories/${id}`)
            toast.success('Category deleted')
            refetch()
        } catch {
            toast.error('Failed to delete')
        }
    }

    const handleUpdate = (category) => {
        setEditId(category._id)
        setIsEditMode(true)
        setSelectedCategory(category)
        reset({
            name: category.name,
            image: '',
        })
        setIsOpen(true)
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
            accessorKey: '_id',
            cell: info => {
                const category = info.row.original
                return (
                    <div className='flex items-center gap-2'>
                        <Button
                            className='btn-xs'
                            onClick={() => handleUpdate(category)}
                            label={<FaEdit />}
                        />
                        <Button
                            className='btn-xs btn-error'
                            onClick={() => handleDelete(category._id)}
                            label={<FaTrash />}
                        />
                    </div>
                )
            },
        },
    ]

    return (
        <>
            <Helmet><title>MedEasy | DashBoard | ManageCategory</title></Helmet>
            <div className='p-4 md:p-6'>
                <div className='text-center md:flex md:justify-between md:items-center mb-4'>
                    <h2 className='text-2xl font-bold text-[#25A8D6]'>Manage Categories</h2>
                    <Button
                        label={
                            <span className='flex items-center gap-2'>
                                <FaPlus /> Add Category
                            </span>
                        }
                        onClick={() => {
                            reset()
                            setIsEditMode(false)
                            setIsOpen(true)
                        }}
                    />
                </div>

                {isLoading ? (
                    <LoadingSpinner />
                ) : categories.length === 0 ? (
                    <p className='text-gray-500 font-medium text-center mt-6'>
                        No Categories found.
                    </p>
                ) : (
                    <CustomTable data={categories} columns={columns} />
                )}


                {/* Add/Edit Category Modal */}
                <Transition show={isOpen} as={Fragment}>
                    <Dialog as='div' className='relative z-50' onClose={() => setIsOpen(false)}>
                        <div className='fixed inset-0 bg-black/30 backdrop-blur-sm' />
                        <div className='fixed inset-0 flex items-center justify-center p-4'>
                            <DialogPanel className='w-full max-w-md rounded-xl bg-white p-6 shadow-xl'>
                                <DialogTitle className='text-lg font-semibold text-[#25A8D6] mb-4'>
                                    {isEditMode ? 'Update Category' : 'Add New Category'}
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
                                            type='file'
                                            {...register('image')}
                                            accept='image/*'
                                            className=' file:bg-[#6BDCF6] file:text-white file:px-4 file:py-2 file:rounded-md file:font-semibold hover:file:bg-[#25A8D6]  w-full max-w-sm'
                                        />
                                    </div>
                                    <div className='text-right'>
                                        <Button type='submit' label={isEditMode ? 'Update' : 'Add Category'} />
                                    </div>
                                </form>
                            </DialogPanel>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    )
}

export default ManageCategory
