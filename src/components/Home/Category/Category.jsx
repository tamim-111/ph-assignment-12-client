import React from 'react'
import CategoryCard from './CategoryCard'
import Container from '../../container/Container'

const demoCategories = [
    {
        id: 'pain-relief',
        name: 'Pain Relief',
        image: 'https://tinyurl.com/2p9ke4vt',
        count: 32,
    },
    {
        id: 'vitamins',
        name: 'Vitamins',
        image: 'https://tinyurl.com/2p9ke4vt',
        count: 21,
    },
    {
        id: 'antibiotics',
        name: 'Antibiotics',
        image: 'https://tinyurl.com/2p9ke4vt',
        count: 18,
    },
    {
        id: 'allergy',
        name: 'Allergy Relief',
        image: 'https://tinyurl.com/2p9ke4vt',
        count: 14,
    },
    {
        id: 'skincare',
        name: 'Skin Care',
        image: 'https://tinyurl.com/2p9ke4vt',
        count: 27,
    },
    {
        id: 'diabetes',
        name: 'Diabetes',
        image: 'https://tinyurl.com/2p9ke4vt',
        count: 12,
    },
]

const Category = () => {
    return (
        <>
            <Container>
                <section className='my-32'>
                    <h2 className='text-3xl font-bold text-center text-[#25A8D6] mb-8'>
                        Explore Medicine Categories
                    </h2>

                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
                        {demoCategories.map((cat) => (
                            <CategoryCard
                                key={cat.id}
                                id={cat.id}
                                name={cat.name}
                                image={cat.image}
                                count={cat.count}
                            />
                        ))}
                    </div>
                </section>
            </Container>
        </>
    )
}

export default Category
