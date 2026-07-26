import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Bot, Award, BarChart3 } from 'lucide-react';
import { cn } from '@/utils/cn';

export const MobileNav: React.FC = () => {
  const location = useLocation();

  const mobileItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Courses', href: '/marketplace', icon: BookOpen },
    { name: 'AI Mentor', href: '/ai-mentor', icon: Bot, isAi: true },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Readiness', href: '/placement-readiness', icon: Award },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/10 px-3 py-2 flex items-center justify-around">
      {mobileItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.href;

        return (
          <NavLink
            key={item.href}
            to={item.href}
            className={cn(
              'flex flex-col items-center gap-1 text-[10px] font-medium transition-colors py-1 px-2.5 rounded-xl',
              isActive
                ? 'text-purple-400 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <Icon
              className={cn(
                'w-5 h-5',
                isActive && 'text-purple-400 scale-110 transition-transform'
              )}
            />
            <span>{item.name}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};
