import React from 'react'
import LoadingSpinner from '../../../../components/Spinner/LoadingSpinner'
import useRole from '../../../../hooks/useRole'

const CustomerDashboardHome = () => {
    const { isLoading } = useRole()

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-t from-[#6BDCF6] to-[#25A8D6] text-white px-4">
            <h1 className="text-4xl font-bold mb-4">
                Welcome to Customer Dashboard
            </h1>
            <p className="text-lg">
                We’re glad to have you here.
            </p>
        </div>
    )
}

export default CustomerDashboardHome
