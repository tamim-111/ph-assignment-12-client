import React from 'react';
import { Link } from 'react-router';
import Button from '../../components/Button/Button';
import { Helmet } from 'react-helmet';

const ErrorPage = () => {
    return (
        <>
            <Helmet><title>MedEasy | ErrorPage</title></Helmet>
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-5">
                <img
                    src="https://i.ibb.co/N62d4GPC/medicine-Error-Page.jpg"
                    alt="Medicine Not Found"
                    className="w-80 mb-6"
                />
                <div className="max-w-xl">
                    <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
                    <p className="text-xl text-gray-700 mb-6">
                        Uh-oh! The medicine you're looking for isn't on this shelf. Let's go back to a healthier place.
                    </p>
                    <Link to="/">
                        <Button label={'Back To Home'}></Button>
                    </Link>
                </div>
            </div >
        </>
    );
};

export default ErrorPage;