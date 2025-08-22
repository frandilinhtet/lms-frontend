// src/components/MainContainer.jsx
import React from 'react';
import Navbar from './NavBar';

const MainContainer = ({ children, setPage }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-gray-100 font-sans antialiased flex flex-col items-center pt-24">
      <Navbar setPage={setPage} />
      <div className="w-full max-w-5xl px-4 md:px-8 lg:px-12">
        {children}
      </div>
    </div>
  );
};

export default MainContainer;
