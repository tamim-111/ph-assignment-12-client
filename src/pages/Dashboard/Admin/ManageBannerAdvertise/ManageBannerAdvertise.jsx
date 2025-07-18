import { Switch } from '@headlessui/react'
import CustomTable from '../../../../components/CustomTable/CustomTable'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import useAxiosSecure from '../../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../../../components/Spinner/LoadingSpinner'
import { Helmet } from 'react-helmet'

const ManageBannerAdvertise = () => {
    const axiosSecure = useAxiosSecure()
    const queryClient = useQueryClient()

    // ✅ Get all requested medicines
    const { data: ads = [], isLoading } = useQuery({
        queryKey: ['requested-medicines'],
        queryFn: async () => {
            const res = await axiosSecure.get('/medicines/requested')
            return res.data
        },
    })

    // ✅ Toggle advertised status
    const { mutateAsync: toggleAdvertisedStatus } = useMutation({
        mutationFn: async ({ id, advertised }) => {
            const res = await axiosSecure.patch(`/medicines/advertise/${id}`, { advertised })
            return res.data
        },
        onSuccess: () => {
            toast.success('Advertise status updated')
            queryClient.invalidateQueries(['requested-medicines'])
        },
        onError: () => toast.error('Failed to update advertised status'),
    })

    const toggleAdStatus = async (ad) => {
        await toggleAdvertisedStatus({ id: ad._id, advertised: !ad.advertised })
    }

    const columns = [
        {
            header: 'Image',
            accessorKey: 'image',
            cell: info => (
                <img
                    src={info.getValue()}
                    alt='medicine'
                    className='w-14 h-14 object-cover rounded-md'
                />
            ),
        },
        { header: 'Medicine Name', accessorKey: 'name', cell: info => info.getValue() },
        { header: 'Description', accessorKey: 'description', cell: info => info.getValue() },
        { header: 'Company', accessorKey: 'company', cell: info => info.getValue() },
        {
            header: 'Show in Slider',
            accessorKey: '_id',
            cell: info => {
                const ad = info.row.original
                return (
                    <Switch
                        checked={ad.advertised}
                        onChange={() => toggleAdStatus(ad)}
                        className={`${ad.advertised ? 'bg-[#25A8D6]' : 'bg-gray-300'
                            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                    >
                        <span
                            className={`${ad.advertised ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                    </Switch>
                )
            },
        },
    ]

    return (
        <>
            <Helmet><title>MedEasy | DashBoard | ManageBannerAdvertise</title></Helmet>
            <div className='p-4 md:p-6'>
                <h2 className='text-2xl font-bold text-[#25A8D6] mb-4'>
                    Manage Banner Advertise
                </h2>

                {isLoading ? (
                    <LoadingSpinner />
                ) : ads.length === 0 ? (
                    <p className='text-gray-500 font-medium text-center mt-6'>
                        No ads found.
                    </p>
                ) : (
                    <CustomTable data={ads} columns={columns} />
                )}
            </div>
        </>
    )
}

export default ManageBannerAdvertise
