import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'; // Import the navigate hook

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate(); // Initialize the navigate function

    useEffect(() => {
        const userToken = Cookies.get('userToken'); // Retrieve the token from cookies
        if (userToken) {
            // If userToken exists, redirect to the landingPage
            navigate('/'); // Change 'landingPage' to the actual path of your landing page
        }
    }, [navigate]); // Dependency array ensures the effect runs only onc

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Both fields are required");
            return;
        }

        // Call login function or API here
        const res = await fetch('https://expensetrackerb.onrender.com/user/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                email, password
            })
        })
        const dataFetched = await res.json();
        if (res.status === 200) {
            Cookies.set('userToken', dataFetched.token, { expires: 7, secure: true, sameSite: 'Strict' })
            Cookies.set('userId', dataFetched.userId, { expires: 7, secure: true, sameSite: 'Strict' })
            navigate('/')
        }
        else {
            setError(dataFetched.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 py-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>

                {error && (
                    <div className="text-red-500 text-center mb-4">
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col">
                        {/* <label htmlFor="email" className="text-gray-700 mb-2">Email</label> */}
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email"
                            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        {/* <label htmlFor="password" className="text-gray-700 mb-2">Password</label> */}
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>

                    <div className="text-center mt-4">
                        <span className="text-sm text-gray-600">Don't have an account?</span>
                        <a href="/register" className="text-blue-500 hover:underline ml-1">Sign Up</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
