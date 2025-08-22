// src/context/AuthContext.js
import { useState, useEffect, useContext, createContext } from 'react';
import axios from 'axios';

// Create a context to provide auth data to all components
const AuthContext = createContext(null);

const api = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
});

// AuthProvider component to wrap your app and manage state
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Set up a request interceptor to attach the token to all authenticated requests
    useEffect(() => {
        if (token) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setIsLoggedIn(true);
            setLoading(false);
            fetchUserProfile(); // Fetch user profile on mount if token exists
        } else {
            setIsLoggedIn(false);
            setLoading(false);
        }
    }, [token]);

    const fetchUserProfile = async () => {
        try {
            const res = await api.get('/auth/me'); // A protected route to get current user details
            setUser(res.data.user);
        } catch (error) {
            console.error("Failed to fetch user profile", error);
            // If fetching profile fails, it might mean the token is invalid
            // We should log the user out in this case
            logout();
        }
    };

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            setToken(res.data.token);
            localStorage.setItem('token', res.data.token);
            setIsLoggedIn(true);
            await fetchUserProfile();
        } catch (error) {
            console.error('Login failed', error.response?.data?.message);
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    };

    const register = async (name, email, password) => {
        try {
            const res = await api.post('/auth/register', { name, email, password });
            setToken(res.data.token);
            localStorage.setItem('token', res.data.token);
            setIsLoggedIn(true);
            await fetchUserProfile();
        } catch (error) {
            console.error('Registration failed', error.response?.data?.message);
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUser(null);
    };

    const value = {
        isLoggedIn,
        user,
        loading,
        login,
        register,
        logout,
        api,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};