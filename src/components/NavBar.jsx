// src/components/Navbar.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ setPage }) => {
    const { isLoggedIn, logout, user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // SVG icon for a user avatar
    const userIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.935 13.935 0 0112 16c2.81 0 5.433.805 7.424 2.224a1 1 0 00.908-1.554C19.347 14.28 15.82 13 12 13c-3.82 0-7.347 1.28-9.332 3.27a1 1 0 00.908 1.554zM12 12a4 4 0 100-8 4 4 0 000 8z" />
        </svg>
    );

    return (
        <nav className="fixed top-0 w-full z-10 bg-slate-800/80 backdrop-blur-md shadow-md p-4 flex justify-between items-center rounded-b-xl transition-all">
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => setPage(isLoggedIn ? 'dashboard' : 'login')}
                    className="text-3xl font-extrabold text-blue-400 hover:text-blue-300 transition-colors"
                >
                    LMS
                </button>
            </div>
            <div className="relative">
                {isLoggedIn ? (
                    <div className="flex items-center space-x-4">
                        <span className="text-sm font-medium text-gray-300 hidden md:inline">
                            Welcome, {user?.name.split(' ')[0] || 'User'}
                        </span>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                        >
                            {userIcon}
                        </button>
                    </div>
                ) : (
                    <div className="space-x-4">
                        <button
                            onClick={() => setPage('login')}
                            className="bg-blue-600 text-white font-bold px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => setPage('register')}
                            className="bg-green-600 text-white font-bold px-5 py-2 rounded-lg hover:bg-green-700 transition-colors"
                        >
                            Register
                        </button>
                    </div>
                )}
                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg py-2 ring-1 ring-black ring-opacity-5">
                        <button
                            onClick={logout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-slate-700 hover:text-white transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
