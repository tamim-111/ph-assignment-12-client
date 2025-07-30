import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { FaPlus } from 'react-icons/fa'
import { imageUpload } from '../../../../api/utils'
import Button from '../../../../components/Button/Button'
import CustomTable from '../../../../components/CustomTable/CustomTable'
import toast from 'react-hot-toast'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../../components/Spinner/LoadingSpinner'
import useAuth from '../../../../hooks/useAuth'
import { Helmet } from 'react-helmet'

const ManageMedicines = () => {
    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const { register, handleSubmit, reset } = useForm()
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient()

    // GET all medicines
    const { data: medicines = [], isLoading } = useQuery({
        queryKey: ['medicines', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/medicines?seller=${user?.email}`)
            return res.data
        },
        enabled: !!user?.email // Wait for auth to load
    })

    // GET categories from DB
    const { data: categories = [], isLoading: isCategoryLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/categories')
            return res.data
        }
    })


    // POST new medicine
    const mutation = useMutation({
        mutationFn: async (newMedicine) => {
            const res = await axiosSecure.post('/medicines', newMedicine)
            return res.data
        },
        onSuccess: () => {
            toast.success('Medicine added successfully!')
            queryClient.invalidateQueries(['medicines'])
            reset()
            setIsOpen(false)
        },
        onError: () => toast.error('Failed to add medicine')
    })

    const onSubmit = async (data) => {
        const image = data.image[0]
        const imageUrl = await imageUpload(image)

        const newMedicine = {
            name: data.name,
            generic: data.generic,
            description: data.description,
            image: imageUrl,
            category: data.category,
            company: data.company,
            unit: data.unit,
            price: parseFloat(data.price),
            discount: parseFloat(data.discount || 0),
            stock: parseInt(data.stock),
            advertised: false,
            requested: false,
            seller: user?.email
        }

        mutation.mutate(newMedicine)
    }

    const columns = [
        {
            header: 'Image', accessorKey: 'image', cell: info => (
                <img src={info.getValue()} alt='medicine' className='w-12 h-12 object-cover rounded-md' />
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
        <>
            <Helmet><title>MedEasy | DashBoard | ManageMedicines</title></Helmet>
            <div className='p-4 md:p-6'>
                <div className='flex justify-between items-center mb-4'>
                    <h2 className='text-2xl font-bold text-[#25A8D6]'>Manage Medicines</h2>
                    <Button
                        label={<span className='flex items-center gap-2'><FaPlus /> Add Medicine</span>}
                        onClick={() => setIsOpen(true)}
                    />
                </div>

                {isLoading ? (
                    <LoadingSpinner></LoadingSpinner>
                ) : medicines.length === 0 ? (
                    <p className='text-gray-500 text-center mt-10'>No medicines found. Click "Add Medicine" to create your first entry.</p>
                ) : (
                    <CustomTable data={medicines} columns={columns} />
                )}

                {/* Modal Form */}
                <Transition show={isOpen} as={Fragment}>
                    <Dialog as='div' className='relative z-50' onClose={() => setIsOpen(false)}>
                        <div className='fixed inset-0 bg-black/30 backdrop-blur-sm' />
                        <div className='fixed inset-0 overflow-y-auto p-2 sm:p-4 flex items-center justify-center'>
                            <div className='w-full max-w-xl mx-auto'>
                                <DialogPanel className='w-full bg-white p-6 rounded-xl shadow-xl max-h-screen overflow-y-auto'>
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
                                                <input type='file' {...register('image')} required accept='image/*' className='border-gray-300 rounded-md border w-full file:bg-[#6BDCF6] file:text-white file:px-4 file:py-2 file:rounded-md file:font-semibold hover:file:bg-[#25A8D6]' />
                                            </div>
                                            <div>
                                                <label className='text-sm'>Category</label>
                                                <select {...register('category')} className='select select-bordered w-full' required>
                                                    <option value=''>Select a category</option>
                                                    {isCategoryLoading ? (
                                                        <option disabled>Loading...</option>
                                                    ) : (
                                                        categories.map(cat => (
                                                            <option key={cat._id} value={cat.name}>
                                                                {cat.name}
                                                            </option>
                                                        ))
                                                    )}
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
                                            <div>
                                                <label className='text-sm'>Stock Quantity</label>
                                                <input
                                                    type='number'
                                                    {...register('stock', { required: true })}
                                                    className='input input-bordered w-full'
                                                />
                                            </div>
                                        </div>
                                        <div className='flex justify-end gap-3'>
                                            <Button type='button' label='Cancel' onClick={() => setIsOpen(false)} variant='outline' />
                                            <Button type='submit' label='Add Medicine' />
                                        </div>
                                    </form>
                                </DialogPanel>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    )
}

export default ManageMedicines
