import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { FaCartPlus } from 'react-icons/fa'
import Container from '../../container/Container'
import { Autoplay } from 'swiper/modules'
import Button from '../../Button/Button'
import { Link } from 'react-router'

const demoDiscountProducts = [
    {
        id: '1',
        name: 'Napa Extra',
        image: 'https://shorturl.at/ps2HJ',
        price: 8,
        discountPercentage: 33, // Seller-defined
    },
    {
        id: '2',
        name: 'Maxpro 20mg',
        image: 'https://shorturl.at/ps2HJ',
        price: 13,
        discountPercentage: 27,
    },
    {
        id: '3',
        name: 'Ceevit Vitamin C',
        image: 'https://shorturl.at/ps2HJ',
        price: 7,
        discountPercentage: 30,
    },
    {
        id: '4',
        name: 'Ceevit Vitamin C',
        image: 'https://shorturl.at/ps2HJ',
        price: 7,
        discountPercentage: 30,
    },
    {
        id: '5',
        name: 'Ceevit Vitamin C',
        image: 'https://shorturl.at/ps2HJ',
        price: 7,
        discountPercentage: 30,
    },
    {
        id: '6',
        name: 'Ceevit Vitamin C',
        image: 'https://shorturl.at/ps2HJ',
        price: 7,
        discountPercentage: 30,
    },
]

const DiscountProducts = () => {
    return (
        <>
            <Container>
                <section className='my-32'>
                    <h2 className='text-3xl font-bold text-center mb-6 text-[#25A8D6]'>Discounted Medicines</h2>

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
                            delay: 2500, // ms
                            disableOnInteraction: false,
                        }}
                        modules={[Autoplay]}
                    >
                        {demoDiscountProducts.map(product => {
                            const discount = product.discountPercentage
                            const newPrice = product.price
                            const oldPrice = Math.round(newPrice / (1 - discount / 100))

                            return (
                                <SwiperSlide key={product.id}>
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

                                        <Link to='/cart'>
                                            <Button wideFull={true} label={
                                                <span className='flex items-center justify-center gap-2'>
                                                    <FaCartPlus />
                                                    Add To Cart
                                                </span>
                                            }
                                            />
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </section>
            </Container>
        </>
    )
}

export default DiscountProducts