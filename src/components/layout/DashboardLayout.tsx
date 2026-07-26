import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 flex flex-col font-sans transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Body Grid */}
      <div className="flex flex-1 relative">
        {/* Collapsible Left Sidebar */}
        <Sidebar />

        {/* Dynamic Page Content Viewport */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full pb-20 md:pb-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>

      {/* Mobile Navigation Bar */}
      <MobileNav />
    </div>
  );
};
