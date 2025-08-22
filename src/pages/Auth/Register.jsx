// src/pages/Auth/Register.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Register = ({ setPage }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(name, email, password);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex flex-col md:flex-row items-center justify-center min-h-screen md:-mt-24">
            <div className="md:w-1/2 p-8">
                <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
                    Join the <span className="text-green-400">Learning Revolution</span>
                </h1>
                <p className="mt-4 text-xl text-gray-300">
                    Create your account to unlock exclusive courses and start your journey.
                </p>
            </div>
            <div className="md:w-1/2 w-full p-8 md:p-12 bg-slate-800 rounded-3xl shadow-2xl backdrop-blur-sm bg-opacity-70 border-slate-700 border transform transition-all hover:scale-[1.02] duration-300">
                <h2 className="text-4xl font-bold mb-6 text-center text-white">Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 font-semibold mb-2" htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            className="w-full px-5 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all placeholder-gray-400"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-300 font-semibold mb-2" htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-5 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all placeholder-gray-400"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 font-semibold mb-2" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-5 py-3 bg-slate-700 text-white border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-all placeholder-gray-400"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            required
                        />
                    </div>
                    {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-500 transition-all transform hover:-translate-y-1 shadow-lg shadow-green-500/30"
                    >
                        Register
                    </button>
                </form>
                <p className="mt-6 text-center text-gray-400">
                    Already have an account?{' '}
                    <button onClick={() => setPage('login')} className="text-green-400 font-semibold hover:underline">
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
