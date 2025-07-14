import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'react-hot-toast'
import { getAuth } from 'firebase/auth'
import useAuth from '../../../hooks/useAuth'
import LoadingSpinner from '../../../components/Spinner/LoadingSpinner'
import { imageUpload } from '../../../api/utils'
import Button from '../../../components/Button/Button'

const UpdateProfile = () => {
    const { user, updateUserProfile, setUser, loading } = useAuth()
    const auth = getAuth()
    const navigate = useNavigate()

    const { register, handleSubmit } = useForm({
        defaultValues: {
            name: user?.displayName || '',
        },
    })

    if (loading) return <LoadingSpinner />

    const onSubmit = async (data) => {
        try {
            let imageUrl = user?.photoURL

            if (data.image?.length > 0) {
                imageUrl = await imageUpload(data.image[0])
            }

            await updateUserProfile(data.name, imageUrl)
            await auth.currentUser.reload()
            setUser({ ...auth.currentUser })

            toast.success('Profile updated successfully!')
            navigate('/')
        } catch (error) {
            console.error(error)
            toast.error('Failed to update profile')
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-white">
            <div className="flex flex-col max-w-md w-full p-6 rounded-lg shadow-md bg-gray-100 text-gray-900">
                <h1 className="mb-6 text-3xl font-bold text-center">Update Profile</h1>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm">
                            Name
                        </label>
                        <input
                            type="text"
                            {...register('name', { required: true })}
                            className="w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#25A8D6] bg-gray-200"
                            placeholder={user?.displayName || 'Your Name'}
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="block mb-2 text-sm">
                            Profile Image (optional)
                        </label>
                        <input
                            type="file"
                            {...register('image')}
                            accept="image/*"
                            className="bg-gray-200 file:bg-[#6BDCF6] file:text-white file:px-4 file:py-2 file:rounded-md file:font-semibold hover:file:bg-[#25A8D6]"
                        />
                    </div>

                    <Button
                        type="submit"
                        wideFull={true}
                        label={
                            loading ? (
                                <span className="flex items-center justify-center">
                                    Updating...
                                </span>
                            ) : (
                                'Update'
                            )
                        }
                    />
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile
