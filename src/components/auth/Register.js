import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Import the navigate hook

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        const userToken = Cookies.get('userToken'); // Retrieve the token from cookies
        if (userToken) {
            // If userToken exists, redirect to the landingPage
            navigate('/'); // Change 'landingPage' to the actual path of your landing page
        }
    }, [navigate]); // Dependency array ensures the effect runs only onc
    const { name, email, password, password2 } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        if (formData.password !== formData.password2) {
            setError("Passwords do not match");
            return;
        }
        const res = await fetch('https://expensetrackerb.onrender.com/user/register', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email: formData.email, password: formData.password, name: formData.name
            })
        })
        console.log(res);
        if (res.ok === true) {
            navigate('/login')
        }
        else {
            //toast
        }
        // console.log("Registering with", { name, email, password });

        setError(""); // Clear error on successful validation
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Register</h1>

                {error && (
                    <div className="text-red-500 text-center mb-4">
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div className="flex flex-col">
                        {/* <label htmlFor="name" className="text-gray-700 mb-2">Full Name</label> */}
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={onChange}
                            required
                            placeholder="Full Name"
                            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col">
                        {/* <label htmlFor="email" className="text-gray-700 mb-2">Email</label> */}
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                            placeholder="Email"
                            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="flex flex-col">
                        {/* <label htmlFor="password" className="text-gray-700 mb-2">Password</label> */}
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                            placeholder="Password"
                            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Confirm Password Input */}
                    <div className="flex flex-col">
                        {/* <label htmlFor="password2" className="text-gray-700 mb-2">Confirm Password</label> */}
                        <input
                            type="password"
                            id="password2"
                            name="password2"
                            value={password2}
                            onChange={onChange}
                            required
                            placeholder="Confirm your Password"
                            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>

                    {/* Sign In Link */}
                    <div className="text-center mt-4">
                        <span className="text-sm text-gray-600">Already have an account?</span>
                        <a href="/login" className="text-blue-500 hover:underline ml-1">Sign In</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
