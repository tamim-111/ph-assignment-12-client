import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { FaCartPlus } from 'react-icons/fa'
import Container from '../../container/Container'
import { Autoplay } from 'swiper/modules'
import Button from '../../Button/Button'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../Spinner/LoadingSpinner'

const DiscountProducts = () => {
    const [addedToCartIds, setAddedToCartIds] = useState([])
    const axiosSecure = useAxiosSecure()

    // Fetch discounted products using TanStack Query
    const { data: discountProducts = [], isLoading } = useQuery({
        queryKey: ['discountedMedicines'],
        queryFn: async () => {
            const res = await axiosSecure.get('/medicines/discounted')
            return res.data
        }
    })

    const handleAddToCart = async (medicine) => {
        const cartItem = {
            ...medicine,
            medicineId: medicine._id,
            quantity: 0,
            subtotal: 0,
        }
        delete cartItem._id

        try {
            const res = await axiosSecure.post('/carts', cartItem)
            if (res.data.insertedId) {
                toast.success(`${medicine.name} added to cart`)
                setAddedToCartIds(prev => [...prev, medicine._id])
            }
        } catch (err) {
            toast.error('Failed to add to cart')
        }
    }

    return (
        <Container>
            <section className='my-32'>
                <h2 className='text-3xl font-bold text-center mb-6 text-[#25A8D6]'>Discounted Medicines</h2>

                {isLoading ? (
                    <LoadingSpinner></LoadingSpinner>
                ) : (
                    <Swiper
                        spaceBetween={16}
                        slidesPerView={1.2}
                        breakpoints={{
                            640: { slidesPerView: 2.2 },
                            1024: { slidesPerView: 3.2 },
                        }}
                        grabCursor={true}
                        loop={true}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                    >
                        {discountProducts.map(product => {
                            const discount = product.discount
                            const newPrice = product.price
                            const oldPrice = Math.round(newPrice / (1 - discount / 100))

                            return (
                                <SwiperSlide key={product._id}>
                                    <div className='my-3 relative p-4 group bg-white rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-[1.02] overflow-hidden border border-[#e0f7ff]'>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className='h-40 w-full object-fill rounded-md mb-3'
                                        />
                                        <h3 className='text-lg font-semibold text-gray-800'>{product.name}</h3>

                                        <div className='flex items-center gap-2 mt-1'>
                                            <p className='text-[#25A8D6] font-bold text-md'>৳{newPrice}</p>
                                            <p className='line-through text-gray-500 text-sm'>৳{oldPrice}</p>
                                        </div>

                                        <div className='absolute top-3 left-3 bg-gradient-to-r from-[#6BDCF6] to-[#25A8D6] text-white text-xs font-semibold px-2 py-1 rounded-full'>
                                            -{discount}%
                                        </div>

                                        <Button
                                            wideFull={true}
                                            onClick={() => handleAddToCart(product)}
                                            disabled={addedToCartIds.includes(product._id)}
                                            label={
                                                <span className='flex items-center justify-center gap-2'>
                                                    <FaCartPlus />
                                                    Add To Cart
                                                </span>
                                            }
                                        />
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                )}
            </section>
        </Container>
    )
}

export default DiscountProducts
