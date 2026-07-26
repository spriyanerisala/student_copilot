import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { MAIN_NAV_ITEMS, BOTTOM_NAV_ITEMS } from '@/utils/constants';
import { cn } from '@/utils/cn';

interface SidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed: externalCollapsed }) => {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed = externalCollapsed ?? internalCollapsed;
  const location = useLocation();

  const toggleCollapse = () => setInternalCollapsed(!internalCollapsed);

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col justify-between glass-panel border-r border-white/10 h-[calc(100vh-65px)] sticky top-[65px] transition-all duration-300 z-30 select-none',
        isCollapsed ? 'w-20 px-2 py-4' : 'w-64 p-4'
      )}
    >
      {/* Top Nav List */}
      <div className="space-y-6">
        {/* Toggle Collapse Button */}
        <div className="flex items-center justify-between px-2">
          {!isCollapsed && (
            <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              Main Menu
            </span>
          )}
          <button
            onClick={toggleCollapse}
            className="p-1.5 rounded-lg bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors ml-auto"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {MAIN_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group relative',
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/30 to-indigo-600/30 text-white border border-purple-500/40 shadow-lg shadow-purple-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                )}
              >
                <Icon
                  className={cn(
                    'w-4 h-4 shrink-0 transition-transform group-hover:scale-110',
                    isActive ? 'text-purple-400' : 'text-slate-400 group-hover:text-slate-200',
                    item.isAi && !isActive && 'text-indigo-400'
                  )}
                />
                {!isCollapsed && (
                  <span className="truncate flex-1">{item.name}</span>
                )}

                {/* AI / Hot Badges */}
                {!isCollapsed && item.badge && (
                  <span
                    className={cn(
                      'px-1.5 py-0.5 text-[9px] font-bold tracking-wide rounded-md uppercase',
                      item.isAi
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    )}
                  >
                    {item.badge}
                  </span>
                )}

                {/* Tooltip when collapsed */}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-[11px] rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl z-50">
                    {item.name}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Goal Widget & Utilities */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        {/* Weekly Goal Progress Widget (Shown when expanded) */}
        {!isCollapsed && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-900/90 to-purple-950/40 border border-purple-500/20 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-200 flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5 text-amber-400" /> Weekly Study Goal
              </span>
              <span className="text-[10px] font-mono text-purple-300">14 / 20 hrs</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full w-[70%] rounded-full transition-all duration-500" />
            </div>
            <p className="text-[10px] text-slate-400 mt-2">
              6 hours remaining to earn Placement Readiness boost!
            </p>
          </div>
        )}

        {/* Bottom Nav Items (Settings, Help) */}
        <div className="space-y-1">
          {BOTTOM_NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all group',
                  isActive
                    ? 'text-white bg-slate-800'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
