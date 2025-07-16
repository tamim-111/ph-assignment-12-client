import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Container from '../../container/Container'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import LoadingSpinner from '../../Spinner/LoadingSpinner'

const Slider = () => {
    const axiosSecure = useAxiosSecure()

    // ✅ Fetch advertised medicines
    const { data: slides = [], isLoading } = useQuery({
        queryKey: ['advertised-medicines'],
        queryFn: async () => {
            const res = await axiosSecure.get('/medicines/advertised')
            return res.data
        },
    })

    return (
        <Container>
            <div className='bg-gradient-to-r from-[#6BDCF6] to-[#25A8D6] rounded-xl shadow-lg py-8 px-4'>
                {isLoading ? (
                    <LoadingSpinner></LoadingSpinner>
                ) : (
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 4000 }}
                        loop
                        className='rounded-lg'
                    >
                        {slides.map((slide) => (
                            <SwiperSlide key={slide._id}>
                                <div className='flex flex-col md:flex-row items-center gap-6 bg-white rounded-lg p-4 shadow-md'>
                                    <img
                                        src={slide.image}
                                        alt={slide.name}
                                        className='w-full md:w-1/3 rounded-lg object-cover'
                                    />
                                    <div className='flex-1 text-center md:text-left space-y-6'>
                                        <h3 className='text-2xl lg:text-5xl font-semibold text-[#25A8D6]'>
                                            {slide.name}
                                        </h3>
                                        <p className='text-base lg:text-xl text-gray-700 leading-relaxed'>
                                            {slide.description || 'No description provided.'}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </Container>
    )
}

export default Slider
