import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { getAuth } from 'firebase/auth'
import useAuth from '../../../hooks/useAuth'
import { imageUpload } from '../../../api/utils'
import Button from '../../../components/Button/Button'
import LoadingSpinner from '../../../components/Spinner/LoadingSpinner'

const SignUp = () => {
    const { createUser, updateUserProfile, signInWithGoogle, setUser, loading } = useAuth()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const auth = getAuth()

    if (loading) return <LoadingSpinner />

    const onSubmit = async data => {
        const image = data.image[0]
        const imageUrl = await imageUpload(image)

        try {
            await createUser(data.email, data.password)
            await updateUserProfile(data.name, imageUrl)
            await auth.currentUser.reload()
            setUser({ ...auth.currentUser })

            toast.success('Signup Successful')
            navigate('/')
        } catch (err) {
            console.log(err)
            toast.error(err?.message)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle()
            toast.success('Signup Successful')
            navigate('/')
        } catch (err) {
            console.log(err)
            toast.error(err?.message)
        }
    }

    return (
        <div className='flex justify-center items-center min-h-screen bg-white'>
            <div className='flex flex-col max-w-md w-full p-6 rounded-lg shadow-md bg-gray-100 text-gray-900'>
                <h1 className='mb-6 text-4xl font-bold text-center'>Sign Up</h1>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                    <div>
                        <label htmlFor='name' className='block mb-2 text-sm'>Name</label>
                        <input
                            type='text'
                            {...register('name', { required: true })}
                            className='w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#25A8D6] bg-gray-200'
                            placeholder='Your Name'
                        />
                    </div>

                    <div>
                        <label htmlFor='image' className='block mb-2 text-sm'>Profile Image</label>
                        <input
                            type='file'
                            {...register('image', { required: true })}
                            accept='image/*'
                            className='bg-gray-200 file:bg-[#6BDCF6] file:text-white file:px-4 file:py-2 file:rounded-md file:font-semibold hover:file:bg-[#25A8D6]'
                        />
                    </div>

                    <div>
                        <label htmlFor='email' className='block mb-2 text-sm'>Email address</label>
                        <input
                            type='email'
                            {...register('email', { required: true })}
                            className='w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#25A8D6] bg-gray-200'
                            placeholder='example@email.com'
                        />
                    </div>

                    <div>
                        <label htmlFor='password' className='block mb-2 text-sm'>Password</label>
                        <input
                            type='password'
                            {...register('password', { required: true })}
                            className='w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#25A8D6] bg-gray-200'
                            placeholder='********'
                        />
                    </div>

                    <Button type='submit' wideFull={true} label='Sign Up'></Button>

                </form>

                <div className='flex items-center my-4 space-x-2'>
                    <div className='flex-1 h-px bg-gray-300'></div>
                    <span className='text-gray-500 text-sm'>Or</span>
                    <div className='flex-1 h-px bg-gray-300'></div>
                </div>

                <Button
                    type='button'
                    onClick={handleGoogleSignIn}
                    wideFull={true}
                    label={
                        <span className='flex items-center justify-center gap-2'>
                            <FcGoogle size={24} />
                            Continue with Google
                        </span>
                    }
                />

                <p className='mt-4 text-sm text-center text-gray-500'>
                    Already have an account?{' '}
                    <Link to='/login' className='font-medium text-[#25A8D6] hover:underline'>Login</Link>
                </p>
            </div>
        </div>
    )
}

export default SignUp
