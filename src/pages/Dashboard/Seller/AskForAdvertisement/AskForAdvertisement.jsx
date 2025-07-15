import { useState, Fragment } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { useForm } from 'react-hook-form'
import { imageUpload } from '../../../../api/utils'
import Button from '../../../../components/Button/Button'
import CustomTable from '../../../../components/CustomTable/CustomTable'
import { FaBullhorn, FaCheckCircle } from 'react-icons/fa'
import { toast } from 'react-hot-toast'

const AskForAdvertisement = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { register, handleSubmit, reset } = useForm()

    // Sample medicines
    const [medicines, setMedicines] = useState([
        {
            id: '1',
            name: 'Napa',
            image: 'https://i.ibb.co/MC5F5Sw/napa.jpg',
            category: 'Tablet',
            company: 'Beximco',
            advertised: true,
        },
        {
            id: '2',
            name: 'Maxpro',
            image: 'https://i.ibb.co/vQ3Pv9W/maxpro.jpg',
            category: 'Capsule',
            company: 'Square',
            advertised: false,
        },
    ])

    const onSubmit = async (data) => {
        const image = data.image[0]
        const imageUrl = await imageUpload(image)

        const requestData = {
            image: imageUrl,
            name: data.name,
            description: data.description,
        }
        console.table(requestData)
        // TODO: Send `requestData` to your backend
        toast.success('Advertisement request submitted!')
        reset()
        setIsOpen(false)
    }

    const columns = [
        {
            header: 'Image',
            accessorKey: 'image',
            cell: info => (
                <img
                    src={info.getValue()}
                    alt='medicine'
                    className='w-12 h-12 object-cover rounded-md'
                />
            ),
        },
        { header: 'Name', accessorKey: 'name', cell: info => info.getValue() },
        { header: 'Category', accessorKey: 'category', cell: info => info.getValue() },
        { header: 'Company', accessorKey: 'company', cell: info => info.getValue() },
        {
            header: 'Status',
            accessorKey: 'advertised',
            cell: info => {
                const isAdvertised = info.getValue()
                return (
                    <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${isAdvertised ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                            }`}
                    >
                        <FaCheckCircle className={`mr-1 ${isAdvertised ? 'text-green-500' : 'text-gray-400'}`} />
                        {isAdvertised ? 'Advertised' : 'Not Advertised'}
                    </span>
                )
            },
        },
    ]

    return (
        <div className='p-4 md:p-6'>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-2xl font-bold text-[#25A8D6]'>Ask For Advertisement</h2>
                <Button
                    label={
                        <span className='flex items-center gap-2'>
                            <FaBullhorn /> Add Advertisement
                        </span>
                    }
                    onClick={() => setIsOpen(true)}
                />
            </div>

            <CustomTable data={medicines} columns={columns} />

            {/* Modal */}
            <Transition show={isOpen} as={Fragment}>
                <Dialog as='div' className='relative z-50' onClose={() => setIsOpen(false)}>
                    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm' />
                    <div className='fixed inset-0 flex items-center justify-center p-4'>
                        <DialogPanel className='w-full max-w-lg rounded-xl bg-white p-6 shadow-xl'>
                            <DialogTitle className='text-lg font-semibold text-[#25A8D6] mb-4'>
                                Request Advertisement
                            </DialogTitle>

                            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                                <div>
                                    <label className='text-sm text-gray-700'>Medicine Name</label>
                                    <input
                                        {...register('name')}
                                        className='input input-bordered w-full'
                                        required
                                    />
                                </div>
                                <div>
                                    <label className='text-sm text-gray-700'>Image</label>
                                    <input
                                        type='file'
                                        {...register('image')}
                                        required
                                        accept='image/*'
                                        className='file-input file-input-bordered w-full'
                                    />
                                </div>
                                <div>
                                    <label className='text-sm text-gray-700'>Description</label>
                                    <textarea
                                        {...register('description')}
                                        rows={3}
                                        className='textarea textarea-bordered w-full'
                                        required
                                    ></textarea>
                                </div>
                                <div className='text-right'>
                                    <Button type='submit' label='Submit Request' />
                                </div>
                            </form>
                        </DialogPanel>
                    </div>
                </Dialog>
            </Transition>
        </div>
    )
}

export default AskForAdvertisement
