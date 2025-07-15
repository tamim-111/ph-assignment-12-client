import { useState } from 'react'
import { Switch } from '@headlessui/react'
import CustomTable from '../../../../components/CustomTable/CustomTable'
import toast from 'react-hot-toast'

const ManageBannerAdvertise = () => {
    const [ads, setAds] = useState([
        {
            id: '1',
            name: 'Napa Extra',
            description: 'Best for headache & fever.',
            sellerEmail: 'seller1@example.com',
            image: 'https://i.ibb.co/N1kRYPF/tablet.jpg',
            isActive: true,
        },
        {
            id: '2',
            name: 'Maxpro 40mg',
            description: 'Treats acid reflux & ulcers.',
            sellerEmail: 'seller2@example.com',
            image: 'https://i.ibb.co/VtyLSKM/syrup.jpg',
            isActive: false,
        },
    ])

    const toggleAdStatus = (id) => {
        const updated = ads.map(ad =>
            ad.id === id ? { ...ad, isActive: !ad.isActive } : ad
        )
        setAds(updated)
        const toggledAd = updated.find(ad => ad.id === id)
        toast.success(
            toggledAd.isActive
                ? `"${toggledAd.name}" added to homepage slider.`
                : `"${toggledAd.name}" removed from homepage slider.`
        )
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
        { header: 'Seller Email', accessorKey: 'sellerEmail', cell: info => info.getValue() },
        {
            header: 'Show in Slider',
            accessorKey: 'id',
            cell: info => {
                const ad = info.row.original
                return (
                    <Switch
                        checked={ad.isActive}
                        onChange={() => toggleAdStatus(ad.id)}
                        className={`${ad.isActive ? 'bg-[#25A8D6]' : 'bg-gray-300'
                            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                    >
                        <span
                            className={`${ad.isActive ? 'translate-x-6' : 'translate-x-1'
                                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                        />
                    </Switch>
                )
            },
        },
    ]

    return (
        <div className='p-4 md:p-6'>
            <h2 className='text-2xl font-bold text-[#25A8D6] mb-4'>
                Manage Banner Advertise
            </h2>
            <CustomTable data={ads} columns={columns} />
        </div>
    )
}

export default ManageBannerAdvertise
