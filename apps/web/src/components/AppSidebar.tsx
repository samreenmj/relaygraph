'use client';

import React from 'react';
import {
  Compass,
  Users,
  Network,
  Brain,
  History,
  BookOpen,
  Trophy,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export type NavDestination =
  | 'quest'
  | 'agents'
  | 'graph'
  | 'memory'
  | 'activity'
  | 'learn'
  | 'achievements';

interface AppSidebarProps {
  currentDest: NavDestination;
  onNavigate: (dest: NavDestination) => void;
  isOpen?: boolean;
  onClose?: () => void;
  completedLessonsCount?: number;
  totalLessonsCount?: number;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  currentDest,
  onNavigate,
  isOpen = false,
  onClose,
  completedLessonsCount = 4,
  totalLessonsCount = 10,
}) => {
  const navItems: {
    id: NavDestination;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }[] = [
    { id: 'quest', label: 'Quest', icon: Compass },
    { id: 'agents', label: 'Agents', icon: Users, badge: '3 Active' },
    { id: 'graph', label: 'Knowledge Graph', icon: Network },
    { id: 'memory', label: 'Memory', icon: Brain, badge: '5 Records' },
    { id: 'activity', label: 'Activity Log', icon: History },
    {
      id: 'learn',
      label: 'Learn',
      icon: BookOpen,
      badge: `${completedLessonsCount}/${totalLessonsCount}`,
    },
    { id: 'achievements', label: 'Achievements', icon: Trophy, badge: '5/6' },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-indigo-950/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-[#FAF9FD] border-r border-[#E2DEEB] flex flex-col z-50 transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* App Wordmark Header */}
        <div className="p-5 border-b border-[#E2DEEB] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#5145E5] to-[#818CF8] flex items-center justify-center text-white shadow-xs">
              <Zap className="w-5 h-5 fill-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-lg tracking-tight text-[#211D3B]">
                  Relay<span className="text-[#5145E5]">Graph</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-[#E9E4FF] text-[#5145E5]">
                  FalkorDB
                </span>
              </div>
              <p className="text-[11px] text-[#716C84] font-medium leading-none mt-0.5">
                Multi-Agent Persistent Graph
              </p>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-[#716C84]">
            Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentDest === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  if (onClose) onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-[#5145E5] text-white shadow-xs shadow-indigo-200 font-bold'
                    : 'text-[#211D3B] hover:bg-[#F0EDF8] hover:text-[#5145E5]'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-white' : 'text-[#716C84] group-hover:text-[#5145E5]'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#E9E4FF] text-[#5145E5]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Hackathon Context Footer */}
        <div className="p-4 m-3 rounded-2xl bg-[#FFF9F0] border border-[#FDE7C7]">
          <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>FalkorDB Graph Hacks</span>
          </div>
          <p className="text-[11px] text-amber-800/80 mt-1 leading-snug">
            Persistent context layer powering autonomous multi-agent state machines.
          </p>
          <div className="mt-2 pt-2 border-t border-[#FEE6C4] flex items-center justify-between text-[10px] text-amber-900">
            <span className="font-medium">Mode: Demo Adapter</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 game-dot-pulse" title="Mock client active" />
          </div>
        </div>
      </aside>
    </>
  );
};
