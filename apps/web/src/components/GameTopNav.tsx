import React from 'react';
import { NavDestination } from './AppSidebar';
import { PixelCatMascot } from './PixelGameMascot';
import { BookOpen, Network, Users, Trophy, Sparkles, Database } from 'lucide-react';

interface GameTopNavProps {
  currentDest: NavDestination;
  onNavigate: (dest: NavDestination) => void;
  onOpenLearn: () => void;
  isMockAdapter: boolean;
}

export const GameTopNav: React.FC<GameTopNavProps> = ({
  currentDest,
  onNavigate,
  onOpenLearn,
  isMockAdapter,
}) => {
  return (
    <div className="w-full bg-[#3B336A] border-b-3 border-[#2A2353] px-4 sm:px-8 py-3 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
      {/* Brand & Mascot */}
      <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('quest')}>
        <div className="relative">
          <PixelCatMascot size={42} />
          <div className="absolute -bottom-1 -right-1 text-amber-300 text-xs">⭐</div>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Relay<span className="text-[#A5B4FC]">Graph</span>
            </h1>
          </div>
          <p className="text-[11px] font-bold text-[#C7D2FE] leading-none mt-0.5">
            Plan · Coordinate · Complete
          </p>
        </div>
      </div>

      {/* Center Nav Pills (Exact match to Reference 1: Quest, Graph, Agents, Learn, Achievements) */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 bg-[#2E2757]/80 p-1.5 rounded-2xl border-2 border-[#4338CA]">
        <button
          onClick={() => onNavigate('quest')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 cursor-pointer ${
            currentDest === 'quest'
              ? 'bg-white text-[#1E1B4B] shadow-sm'
              : 'text-[#C7D2FE] hover:bg-[#4338CA]/60 hover:text-white'
          }`}
        >
          <span>📖 Quest</span>
        </button>

        <button
          onClick={() => onNavigate('graph')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 cursor-pointer ${
            currentDest === 'graph'
              ? 'bg-white text-[#1E1B4B] shadow-sm'
              : 'text-[#C7D2FE] hover:bg-[#4338CA]/60 hover:text-white'
          }`}
        >
          <Network className="w-3.5 h-3.5" />
          <span>Graph</span>
        </button>

        <button
          onClick={() => onNavigate('agents')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 cursor-pointer ${
            currentDest === 'agents'
              ? 'bg-white text-[#1E1B4B] shadow-sm'
              : 'text-[#C7D2FE] hover:bg-[#4338CA]/60 hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Agents</span>
        </button>

        <button
          onClick={() => {
            onNavigate('learn');
            onOpenLearn();
          }}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 cursor-pointer ${
            currentDest === 'learn'
              ? 'bg-white text-[#1E1B4B] shadow-sm'
              : 'text-[#C7D2FE] hover:bg-[#4338CA]/60 hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Learn</span>
        </button>

        <button
          onClick={() => onNavigate('achievements')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center space-x-1.5 cursor-pointer ${
            currentDest === 'achievements'
              ? 'bg-white text-[#1E1B4B] shadow-sm'
              : 'text-[#C7D2FE] hover:bg-[#4338CA]/60 hover:text-white'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Achievements</span>
        </button>
      </div>

      {/* Right FalkorDB System Online Badge */}
      <div className="flex items-center space-x-2 bg-[#251F49] px-3.5 py-1.5 rounded-2xl border-2 border-[#4338CA]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping" />
        <div className="text-left">
          <div className="text-[11px] font-black text-white leading-none">
            System Online
          </div>
          <div className="text-[9px] font-bold text-[#86EFAC] leading-none mt-0.5">
            Powered by FalkorDB
          </div>
        </div>
      </div>
    </div>
  );
};
