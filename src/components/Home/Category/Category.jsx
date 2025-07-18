import React from 'react'
import Container from '../../container/Container'
import CategoryCard from './CategoryCard'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from '../../Spinner/LoadingSpinner'

const Category = () => {
    const axiosSecure = useAxiosSecure()

    // Get all categories
    const { data: categories = [], isLoading: loading1 } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosSecure.get('/categories')
            return res.data
        },
    })

    // Get all medicines
    const { data: medicines = [], isLoading: loading2 } = useQuery({
        queryKey: ['medicines'],
        queryFn: async () => {
            const res = await axiosSecure.get('/medicines')
            return res.data
        },
    })

    if (loading1 || loading2) return <LoadingSpinner></LoadingSpinner>

    // Match and count medicines per category
    const categoryWithCounts = categories.map((cat) => {
        const count = medicines.filter((med) => med.category === cat.name).length
        return { ...cat, count }
    })

    return (
        <Container>
            <section className="my-24">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-[#25A8D6] mb-4">
                    Explore Medicine Categories
                </h2>
                <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
                    Browse by category to quickly find the medicines you need.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {categoryWithCounts.map((cat) => (
                        <CategoryCard
                            key={cat._id}
                            id={cat.name}
                            name={cat.name}
                            image={cat.image}
                            count={cat.count}
                        />
                    ))}
                </div>
            </section>
        </Container>
    )
}

export default Category
