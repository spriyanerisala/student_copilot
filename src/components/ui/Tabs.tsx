import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export interface TabItem {
  id: string;
  label: string;
  badge?: string | number;
  icon?: React.ReactNode;
}

export interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onChange, className }) => {
  return (
    <div className={cn('flex items-center gap-1 p-1.5 rounded-2xl glass-panel border border-white/10 w-fit', className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-colors duration-200 z-10 select-none',
              isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/50 to-indigo-600/50 border border-purple-400/30 shadow-md shadow-purple-500/20 -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span className={cn(
                'px-1.5 py-0.5 text-[9px] rounded-md font-mono',
                isActive ? 'bg-purple-500/30 text-purple-200' : 'bg-slate-800 text-slate-400'
              )}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
