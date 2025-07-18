import { useState, Fragment } from 'react'
import { Dialog, DialogPanel, DialogTitle, Transition } from '@headlessui/react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { FaBullhorn, FaCheckCircle } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import Button from '../../../../components/Button/Button'
import CustomTable from '../../../../components/CustomTable/CustomTable'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import useAuth from '../../../../hooks/useAuth'
import LoadingSpinner from '../../../../components/Spinner/LoadingSpinner'
import { Helmet } from 'react-helmet'

const AskForAdvertisement = () => {
    const { user } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const [selectedMedicine, setSelectedMedicine] = useState(null)
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient()

    // 1️⃣ Get medicines using TanStack Query
    const { data: medicines = [], isLoading } = useQuery({
        queryKey: ['medicines', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/medicines?seller=${user.email}`);
            return res.data;
        },
    });

    // 2️⃣ PATCH request to update requested status
    const { mutateAsync: requestAd } = useMutation({
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/medicines/request/${id}`)
            return res.data
        },
        onSuccess: () => {
            toast.success('Advertisement request submitted!')
            queryClient.invalidateQueries(['medicines']) // Refetch medicines
            setIsOpen(false)
        },
        onError: () => toast.error('Something went wrong'),
    })

    const openModal = (medicine) => {
        setSelectedMedicine(medicine)
        setIsOpen(true)
    }

    const handleConfirm = async () => {
        if (selectedMedicine) {
            await requestAd(selectedMedicine._id)
        }
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
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${isAdvertised ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                        <FaCheckCircle className={`mr-1 ${isAdvertised ? 'text-green-500' : 'text-gray-400'}`} />
                        {isAdvertised ? 'Advertised' : 'Not Advertised'}
                    </span>
                )
            },
        },
        {
            header: 'Action',
            accessorKey: '_id',
            cell: info => {
                const row = info.row.original
                if (row.requested) {
                    return <span className="text-green-600 font-medium">Requested</span>
                }
                return (
                    <Button
                        size="sm"
                        label={<span className="flex items-center gap-1 text-sm"><FaBullhorn /> Ask for Advertise</span>}
                        onClick={() => openModal(row)}
                    />
                )
            },
        },
    ]

    return (
        <>
            <Helmet><title>MedEasy | DashBoard | AskForAdvertisement</title></Helmet>
            <div className='p-4 md:p-6'>
                <h2 className='text-2xl font-bold text-[#25A8D6] mb-4'>Ask For Advertisement</h2>

                {isLoading ? (
                    <LoadingSpinner />
                ) : medicines.length === 0 ? (
                    <p className='text-gray-500 font-medium text-center mt-6'>
                        No ads found.
                    </p>
                ) : (
                    <CustomTable data={medicines} columns={columns} />
                )}

                {/* Modal */}
                <Transition show={isOpen} as={Fragment}>
                    <Dialog as='div' className='relative z-50' onClose={() => setIsOpen(false)}>
                        <div className='fixed inset-0 bg-black/30 backdrop-blur-sm' />
                        <div className='fixed inset-0 flex items-center justify-center p-4'>
                            <DialogPanel className='w-full max-w-lg rounded-xl bg-white p-6 shadow-xl'>
                                <DialogTitle className='text-lg font-semibold text-[#25A8D6] mb-4'>
                                    Review Advertisement Request
                                </DialogTitle>

                                {selectedMedicine && (
                                    <div className='space-y-4'>
                                        <div>
                                            <h4 className='text-sm text-gray-700 font-medium'>Medicine Name</h4>
                                            <p className='text-base text-gray-800'>{selectedMedicine.name}</p>
                                        </div>

                                        <div>
                                            <h4 className='text-sm text-gray-700 font-medium'>Image</h4>
                                            <img
                                                src={selectedMedicine.image}
                                                alt='medicine'
                                                className='w-32 h-32 rounded-lg border mt-1'
                                            />
                                        </div>

                                        <div>
                                            <h4 className='text-sm text-gray-700 font-medium'>Description</h4>
                                            <p className='text-sm text-gray-800'>
                                                {selectedMedicine.description || 'No description provided.'}
                                            </p>
                                        </div>

                                        <div className='text-right'>
                                            <Button label='Confirm Request' onClick={handleConfirm} />
                                        </div>
                                    </div>
                                )}
                            </DialogPanel>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </>
    )
}

export default AskForAdvertisement
