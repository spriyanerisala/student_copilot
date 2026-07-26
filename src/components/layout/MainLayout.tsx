import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 flex flex-col font-sans">
      <Navbar showSidebarToggle={false} />
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};
