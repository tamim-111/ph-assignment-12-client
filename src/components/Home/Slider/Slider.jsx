import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Container from '../../container/Container';

const Slider = () => {
    // Temporary dummy slides
    const slides = [
        {
            id: 1,
            image: 'https://tinyurl.com/4afttn52',
            title: 'Pain Relief Medicine',
            description: 'Effective painkiller with fast results.',
        },
        {
            id: 2,
            image: 'https://tinyurl.com/4afttn52',
            title: 'Vitamin Supplements',
            description: 'Boost your immunity with essential vitamins.',
        },
        {
            id: 3,
            image: 'https://tinyurl.com/4afttn52',
            title: 'Allergy Relief Spray',
            description: 'Quick relief from seasonal allergies.',
        },
    ]
    return (
        <>
            <Container>
                <div className='bg-gradient-to-r from-[#6BDCF6] to-[#25A8D6] rounded-xl shadow-lg py-8 px-4'>
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
                            <SwiperSlide key={slide.id}>
                                <div className='flex flex-col md:flex-row items-center gap-6 bg-white rounded-lg p-4 shadow-md'>
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className='w-full md:w-1/3 rounded-lg object-cover'
                                    />
                                    <div className='flex-1 text-center md:text-left space-y-6'>
                                        <h3 className='text-2xl lg:text-7xl font-semibold text-[#25A8D6]'>
                                            {slide.title}
                                        </h3>
                                        <p className='text-base lg:text-2xl text-gray-700 leading-relaxed'>
                                            {slide.description}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </Container>
        </>
    );
};

export default Slider;