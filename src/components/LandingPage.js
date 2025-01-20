import ExpenseItem from './ExpenseItem';
import React, { useEffect } from "react";
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom'; // Import the navigate hook

const LandingPage = () => {

    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        const userToken = Cookies.get('userToken'); // Retrieve the token from cookies
        if (!userToken) {
            // If userToken exists, redirect to the landingPage
            navigate('/login'); // Change 'landingPage' to the actual path of your landing page
        }
    }, [navigate]); // Dependency array ensures the effect runs only once

    return (
        <div className="h-full bg-gray-100 px-4 flex flex-col">
            <div className="container mx-auto flex-grow">
                <div className="md:grid md:grid-cols-2 md:gap-8 md:items-center h-full space-y-8 md:space-y-0">
                    <div className="md:order-1 text-center">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Welcome to the Expense Tracker</h1>
                        <p className="text-gray-600 mt-2">Track your expenses efficiently and effectively.</p>
                        <Link to='/visuals'>
                            <button className="w-full md:w-auto px-6 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                Show Visuals
                            </button>
                        </Link>
                    </div>
                    <div className="md:order-2">
                        <ExpenseItem />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
