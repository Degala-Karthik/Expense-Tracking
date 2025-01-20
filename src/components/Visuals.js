import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import ExpenseItemListCard from './ExpenseItemCard';
import ExpenseChart from './Charts';


const Visuals = () => {
    const [expenseItem, setexpenseItem] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const userToken = Cookies.get('userToken'); // Retrieve the token from cookies
            if (!userToken) {
                // Redirect to the login page if the userToken is not found
                navigate('/login');
                return;
            }

            try {
                const userId = Cookies.get("userId");
                const res = await fetch(`https://expensetrackerb.onrender.com/expenseItem/${userId}`, {
                    method: "GET",
                });

                if (res.ok) {
                    const data = await res.json();
                    setexpenseItem(data); // Assuming the response contains an array of expense items

                } else {
                    console.error('Failed to fetch expense items:', res.status);
                }
            } catch (error) {
                console.error('Error fetching expense items:', error);
            }
        };

        fetchData();
    }, [navigate]);
    const onDelete = async (id) => {
        try {
            const res = await fetch(`https://expensetrackerb.onrender.com/expenseItem/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    userId: Cookies.get("userId")
                })
            });

            if (res.ok) {
                // Directly update the state to remove the deleted item
                setexpenseItem((prevItems) => prevItems.filter(item => item._id !== id));
            } else {
                console.error('Failed to delete expense item:', res.status);
            }
        } catch (error) {
            console.error('Error deleting expense item:', error);
        }
    };

    return (
        <div className="h-auto  px-4 flex flex-col">
            <div className="container mx-auto flex-grow">
                <div className="grid grid-cols-1 gap-6 items-center h-full md:grid-cols-1 lg:gap-12">
                    {/* Left Section */}
                    <div className="order-1 text-center md:text-left md:col-span-1 space-y-4">
                        <ExpenseItemListCard data={expenseItem} onDelete={onDelete} />

                    </div>

                    {/* Right Section */}
                    <div className="order-2 h-full flex items-center justify-center">
                        <ExpenseChart data={expenseItem} />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Visuals;
