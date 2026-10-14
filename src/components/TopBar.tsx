'use client';

import React from 'react';
import { Menu, BookOpen, Sparkles, Cpu, Database } from 'lucide-react';
import { NavDestination } from './AppSidebar';

interface TopBarProps {
  onToggleSidebar: () => void;
  onOpenLearn: () => void;
  activeDestination: NavDestination;
  isMockAdapter: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({
  onToggleSidebar,
  onOpenLearn,
  activeDestination,
  isMockAdapter,
}) => {
  const titles: Record<NavDestination, { title: string; subtitle: string }> = {
    quest: {
      title: 'Quest Dashboard',
      subtitle: 'Plan. Coordinate. Complete.',
    },
    agents: {
      title: 'Agent Workers',
      subtitle: 'Coordinated specialized agents with graph-backed state.',
    },
    graph: {
      title: 'Knowledge Graph',
      subtitle: 'Interactive FalkorDB entities, relationships, and provenances.',
    },
    memory: {
      title: 'Persistent Memory',
      subtitle: 'Structured findings, decisions, and atomic procedures.',
    },
    activity: {
      title: 'Activity Log & Recovery',
      subtitle: 'Chronological events, handoffs, and checkpoint resumes.',
    },
    learn: {
      title: 'Learn while building',
      subtitle: 'Interactive curriculum on graph reasoning and multi-agent systems.',
    },
    achievements: {
      title: 'Milestones & Benchmarks',
      subtitle: 'Verified test results, idempotency metrics, and achievements.',
    },
  };

  const current = titles[activeDestination] || titles.quest;

  return (
    <header className="sticky top-0 z-30 bg-[#FAF9FD]/95 backdrop-blur-md border-b border-[#E2DEEB] px-4 lg:px-8 py-3.5">
      <div className="flex items-center justify-between">
        {/* Left: Mobile hamburger & title */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 -ml-2 rounded-lg text-[#716C84] hover:bg-[#E9E4FF] hover:text-[#5145E5] lg:hidden transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg lg:text-xl font-extrabold text-[#211D3B] tracking-tight">
                {current.title}
              </h1>
              <span className="hidden sm:inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#E9E4FF] text-[#5145E5]">
                <Cpu className="w-3 h-3 mr-0.5" />
                3 Agents Coordinated
              </span>
            </div>
            <p className="text-xs text-[#716C84] hidden sm:block font-medium">
              {current.subtitle}
            </p>
          </div>
        </div>

        {/* Right: FalkorDB system status & Learning drawer trigger */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Adapter status badge */}
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white border border-[#E2DEEB] text-xs">
            <Database className="w-3.5 h-3.5 text-[#10B981]" />
            <span className="font-semibold text-[#211D3B]">FalkorDB Layer:</span>
            <span className="text-[#10B981] font-bold flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mr-1.5 game-dot-pulse" />
              {isMockAdapter ? 'Demo Adapter' : 'Live Graph'}
            </span>
          </div>

          {/* Quick Learn Trigger */}
          <button
            onClick={onOpenLearn}
            className="flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-[#FFF9F0] border border-[#FDE7C7] text-amber-900 hover:bg-[#FEF3E2] transition-colors text-xs font-bold shadow-2xs"
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">Learn Guide</span>
            <Sparkles className="w-3 h-3 text-amber-500" />
          </button>
        </div>
      </div>
    </header>
  );
};
