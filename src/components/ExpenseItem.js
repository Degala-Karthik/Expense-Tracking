import React, { useState } from "react";
import Cookies from 'js-cookie';
import { Link, useNavigate } from 'react-router-dom'; // Import the navigate hook

const ExpenseItem = () => {
    const [expense, setExpense] = useState({
        userId: Cookies.get("userId"),
        title: "",
        amount: "",
        date: "",
        category: "",
        paymentMethod: "",
        location: "",
        subLocation: "",
        currency: ""
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setExpense((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send the data to an API
        const res = await fetch('https://expensetrackerb.onrender.com/expenseItem', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                ...expense
            })

        })
        if (res.ok === true) {
            setExpense({
                userId: Cookies.get("userId"),
                title: "",
                amount: "",
                date: "",
                category: "",
                paymentMethod: "",
                location: "",
                subLocation: "",
                currency: ""
            })
            navigate('/visuals')
        }
        else {
            //toast
        }
        // console.log(expense)
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Add Expense</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Expense Title"
                            id="title"
                            name="title"
                            value={expense.title}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <input
                            type="number"
                            placeholder="Amount"
                            id="amount"
                            name="amount"
                            value={expense.amount}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <select
                            id="category"
                            name="category"
                            value={expense.category}
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Category</option>
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Entertainment">Entertainment</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <input
                            type="datetime-local"
                            id="date"
                            name="date"
                            value={expense.date}
                            placeholder="Date"
                            onChange={handleInputChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <select
                            id="paymentMethod"
                            name="paymentMethod"
                            value={expense.paymentMethod}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Payment Method</option>
                            <option value="cash">Cash</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="Debit Card">Debit Card</option>
                            <option value="Online">Online Payment</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <input
                            type="text"
                            name="subLocation"
                            value={expense.subLocation}
                            onChange={handleInputChange}
                            placeholder="Sub Location"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={expense.location}
                            onChange={handleInputChange}
                            placeholder="Location"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <select
                            id="currency"
                            name="currency"
                            value={expense.currency}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                            <option value="RUP">RUP</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Add Expense
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ExpenseItem;
