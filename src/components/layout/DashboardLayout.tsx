import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

export const DashboardLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-slate-100 flex flex-col font-sans transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar 
        showSidebarToggle={true} 
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)} 
      />

      {/* Main Body Grid */}
      <div className="flex flex-1 relative">
        {/* Desktop Collapsible Sidebar */}
        <div className="hidden md:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Overlay Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="md:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm"
              />
              
              {/* Drawer */}
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-white/10 shadow-2xl overflow-y-auto"
                onClick={(e) => {
                  // Close if they click a link inside the sidebar
                  if ((e.target as HTMLElement).closest('a')) {
                    setMobileMenuOpen(false);
                  }
                }}
              >
                {/* Clone the sidebar but override its hidden classes via children wrapper or passing a prop.
                    Since Sidebar has its own classes, we can just render it directly here if we remove 'hidden md:flex' from Sidebar.tsx 
                    Wait, instead of cloning Sidebar, let's just make Sidebar itself handle mobile layout, 
                    OR render a modified Sidebar block here.
                    Actually, it's cleaner to just render Sidebar here, but Sidebar has 'hidden md:flex' hardcoded.
                    Let's just change Sidebar.tsx to accept an 'isMobileDrawer' prop or a className override.
                 */}
                <Sidebar isMobileDrawer />
              </motion.div>
            </>
          )}
        </AnimatePresence>

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
