import { Link, Navigate, useLocation, useNavigate } from 'react-router'
import { FcGoogle } from 'react-icons/fc'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import Button from '../../../components/Button/Button'
import useAuth from '../../../hooks/useAuth'
import LoadingSpinner from '../../../components/Spinner/LoadingSpinner'
import { saveUserInDb } from '../../../api/utils'
import { Helmet } from 'react-helmet'

const Login = () => {
    const { signIn, signInWithGoogle, loading, user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state?.from?.pathname || '/'

    // If already logged in, redirect to previous page or homepage
    if (user) return <Navigate to={from} replace={true} />
    if (loading) return <LoadingSpinner />

    const handleSubmit = async event => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value
        const password = form.password.value

        try {
            await signIn(email, password)
            toast.success('Login Successful')
            navigate(from, { replace: true })
        } catch (err) {
            console.log(err)
            toast.error(err?.message)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithGoogle()
            const user = result.user
            // send user data in server
            await saveUserInDb({
                name: user.displayName,
                email: user.email,
                role: 'customer',
            })
            toast.success('Login Successful')
            navigate(from, { replace: true })
        } catch (err) {
            console.log(err)
            toast.error(err?.message)
        }
    }

    return (
        <>
            <Helmet><title>MedEasy | LogIn</title></Helmet>
            <div className='flex justify-center items-center min-h-screen bg-white'>
                <div className='flex flex-col max-w-md w-full p-6 rounded-lg shadow-md bg-gray-100 text-gray-900'>
                    <h1 className='mb-6 text-4xl font-bold text-center'>Log In</h1>

                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>Email address</label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                required
                                placeholder='example@email.com'
                                className='w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#25A8D6] bg-gray-200'
                            />
                        </div>

                        <div>
                            <label htmlFor='password' className='block mb-2 text-sm'>Password</label>
                            <input
                                type='password'
                                name='password'
                                id='password'
                                required
                                placeholder='********'
                                className='w-full px-3 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#25A8D6] bg-gray-200'
                            />
                            <div className='text-xs mt-1 text-gray-400 hover:underline hover:text-[#25A8D6] cursor-pointer'>
                                Forgot password?
                            </div>
                        </div>

                        <Button
                            type='submit'
                            wideFull={true}
                            label={loading ? <TbFidgetSpinner className='animate-spin m-auto' /> : 'Log In'}
                        />
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
                        Don&apos;t have an account?{' '}
                        <Link to='/signup' className='font-medium text-[#25A8D6] hover:underline'>Sign Up</Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login
