// src/App.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Dashboard from './pages/Dashboard';
import MainContainer from './components/MainContainer';

const App = () => {
    const [page, setPage] = useState('login');
    const { isLoggedIn, loading } = useAuth();

    useEffect(() => {
        if (isLoggedIn && (page === 'login' || page === 'register')) {
            setPage('dashboard');
        } else if (!isLoggedIn && page === 'dashboard') {
            setPage('login');
        }
    }, [isLoggedIn, page]);

    const renderPage = () => {
        switch (page) {
            case 'login':
                return <Login setPage={setPage} />;
            case 'register':
                return <Register setPage={setPage} />;
            case 'dashboard':
                return <Dashboard setPage={setPage} />;
            default:
                return <Login setPage={setPage} />;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 text-gray-200 text-lg">
                <svg className="animate-spin h-8 w-8 text-blue-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
            </div>
        );
    }

    return (
        <MainContainer setPage={setPage}>
            {renderPage()}
        </MainContainer>
    );
};

export default App;
