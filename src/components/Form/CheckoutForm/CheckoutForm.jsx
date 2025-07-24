import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
// import './checkoutForm.css'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import useAuth from '../../../hooks/useAuth'
import { useNavigate } from 'react-router'
import Button from '../../../components/Button/Button'
import { ClipLoader } from 'react-spinners'

const CheckoutForm = ({ totalPrice, orderData }) => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    const [cardError, setCardError] = useState(null)
    const [processing, setProcessing] = useState(false)
    const [clientSecret, setClientSecret] = useState('')

    // for payment intent
    useEffect(() => {
        const getClientSecret = async () => {
            try {
                const { data } = await axiosSecure.post('/create-payment-intent', {
                    amount: totalPrice,
                })
                setClientSecret(data?.clientSecret)
            } catch (err) {
                console.error('Error creating payment intent:', err)
                toast.error('Failed to initialize payment.')
            }
        }

        getClientSecret()
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) return

        setProcessing(true)
        setCardError(null)

        const card = elements?.getElement(CardElement)
        if (!card) return

        const { error: paymentMethodError } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (paymentMethodError) {
            setCardError(paymentMethodError.message)
            setProcessing(false)
            return
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: user?.displayName || 'Anonymous',
                    email: user?.email || 'No email',
                },
            },
        })

        if (confirmError) {
            setCardError(confirmError.message)
            setProcessing(false)
            return
        }

        if (paymentIntent?.status === 'succeeded') {
            const paymentInfo = {
                userName: user?.displayName,
                userEmail: user?.email,
                transactionId: paymentIntent?.id,
                status: 'pending',
                amount: totalPrice,
                date: new Date(),
                items: orderData?.items || [],
            }

            try {
                const res = await axiosSecure.post('/payments', paymentInfo)
                if (res?.data?.insertedId) {
                    toast.success('Payment successful!')
                    navigate('/invoice')
                }
            } catch (err) {
                toast.error('Error saving payment')
            }
        }

        setProcessing(false)
    }

    return (
        <form onSubmit={handleSubmit} className='mt-6 space-y-4'>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': { color: '#aab7c4' },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />

            {cardError && <p className='text-red-500'>{cardError}</p>}

            <Button
                type='submit'
                label={processing ? <ClipLoader size={20} /> : `Pay ৳${totalPrice}`}
                wideFull
                disabled={!stripe || !clientSecret || processing}
            />
        </form>
    )
}

export default CheckoutForm
