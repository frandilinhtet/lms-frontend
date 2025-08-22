// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = ({ setPage }) => {
    const { user, api } = useAuth();
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loadingCourses, setLoadingCourses] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const res = await api.get('/enrollments/my-courses');
                setEnrolledCourses(res.data);
                setLoadingCourses(false);
            } catch (err) {
                setError('Failed to fetch courses. Please try again.');
                setLoadingCourses(false);
            }
        };

        fetchEnrolledCourses();
    }, []);

    return (
        <div className="bg-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-700">
            <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                <h2 className="text-4xl font-extrabold text-white">
                    Hello, <span className="text-blue-400">{user?.name.split(' ')[0] || 'User'}!</span>
                </h2>
                <span className="text-sm text-gray-400 hidden sm:block">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
            </div>

            <h3 className="text-2xl font-bold mb-6 text-gray-200">Your Enrolled Courses</h3>
            {loadingCourses ? (
                <div className="text-center text-gray-500 p-8">Loading courses...</div>
            ) : error ? (
                <div className="text-red-400 text-center p-8">{error}</div>
            ) : enrolledCourses.length === 0 ? (
                <div className="text-gray-500 text-center p-8">
                    You are not enrolled in any courses yet.
                </div>
            ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {enrolledCourses.map(course => (
                        <div key={course._id} className="bg-slate-700 p-6 rounded-2xl shadow-lg border border-slate-600 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <h4 className="text-xl font-bold text-gray-50 mb-2">{course.title}</h4>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{course.description}</p>
                            <p className="text-xs text-blue-400 font-semibold uppercase tracking-wide">Instructor: {course.instructor.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
