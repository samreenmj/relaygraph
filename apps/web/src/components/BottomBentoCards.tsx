import React from 'react';
import { ArrowRight, Lightbulb, Star, ShieldCheck, Heart } from 'lucide-react';
import { SleepingCat } from './PixelGameMascot';

interface BottomBentoCardsProps {
  onStartLearning: () => void;
  onViewAchievements: () => void;
}

export const BottomBentoCards: React.FC<BottomBentoCardsProps> = ({
  onStartLearning,
  onViewAchievements,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* 1. Quick Learn Card (Book icon, pixel spellbook) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-[#2A2353] shadow-md flex flex-col justify-between">
        <div>
          <div className="flex items-center space-x-2 text-[#1E1B4B] font-black text-sm mb-3">
            <span>🎓 Quick Learn</span>
          </div>

          <div className="flex items-start space-x-3.5">
            {/* Pixel Spellbook Graphic */}
            <svg
              width="50"
              height="58"
              viewBox="0 0 20 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ shapeRendering: 'crispEdges' }}
              className="shrink-0 drop-shadow-sm"
            >
              <rect x="2" y="2" width="16" height="20" rx="3" fill="#4F46E5" stroke="#1E1B4B" strokeWidth="2" />
              <rect x="4" y="4" width="12" height="16" fill="#C7D2FE" />
              {/* Graph inside book */}
              <circle cx="8" cy="9" r="1.5" fill="#4338CA" />
              <circle cx="13" cy="8" r="1.5" fill="#4338CA" />
              <circle cx="10" cy="14" r="1.5" fill="#4338CA" />
              <line x1="8" y1="9" x2="13" y2="8" stroke="#4338CA" strokeWidth="1" />
              <line x1="8" y1="9" x2="10" y2="14" stroke="#4338CA" strokeWidth="1" />
              <line x1="13" y1="8" x2="10" y2="14" stroke="#4338CA" strokeWidth="1" />
            </svg>

            <div>
              <h4 className="text-xs sm:text-sm font-black text-[#1E1B4B]">
                What is a Graph Database?
              </h4>
              <p className="text-[11px] text-[#64748B] mt-1 leading-snug">
                A graph stores entities and relationships. Learn how FalkorDB helps agents make better decisions.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onStartLearning}
          className="mt-4 w-fit px-4 py-1.5 rounded-xl bg-[#6366F1] text-white hover:bg-[#4F46E5] transition-colors text-xs font-black flex items-center space-x-1.5 shadow-2xs cursor-pointer"
        >
          <span>Start Learning</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Achievements Card (+XP, badges) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-[#2A2353] shadow-md flex flex-col justify-between">
        <div className="flex items-center space-x-2 text-[#1E1B4B] font-black text-sm mb-3">
          <span>🏆 Achievements</span>
        </div>

        {/* 3 Medals */}
        <div className="grid grid-cols-3 gap-2 text-center">
          {/* Medal 1 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] border-2 border-[#F59E0B] flex items-center justify-center text-amber-500 shadow-xs">
              <Star className="w-6 h-6 fill-amber-400 text-amber-600" />
            </div>
            <span className="text-[10px] font-black text-[#1E1B4B] mt-1.5 leading-tight">
              First Query
            </span>
            <span className="text-[9px] font-bold text-[#F59E0B]">+50 XP</span>
          </div>

          {/* Medal 2 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#EDE9FE] border-2 border-[#818CF8] flex items-center justify-center text-indigo-600 shadow-xs">
              <span className="text-xl">🤝</span>
            </div>
            <span className="text-[10px] font-black text-[#1E1B4B] mt-1.5 leading-tight">
              Agent Handoff
            </span>
            <span className="text-[9px] font-bold text-[#6366F1]">+100 XP</span>
          </div>

          {/* Medal 3 */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#DCFCE7] border-2 border-[#22C55E] flex items-center justify-center text-emerald-600 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-[10px] font-black text-[#1E1B4B] mt-1.5 leading-tight">
              Reliable Recovery
            </span>
            <span className="text-[9px] font-bold text-[#15803D]">+100 XP</span>
          </div>
        </div>

        <button
          onClick={onViewAchievements}
          className="mt-3 text-[11px] font-extrabold text-[#4F46E5] hover:underline self-center cursor-pointer"
        >
          View all 6 badges →
        </button>
      </div>

      {/* 3. Key Takeaway Card with Sleeping Cat & Heart */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-[#2A2353] shadow-md flex flex-col justify-between">
        <div className="flex items-center space-x-2 text-[#1E1B4B] font-black text-sm mb-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>Key Takeaway</span>
        </div>

        <div className="bg-[#FAF9FD] rounded-2xl p-3 border border-[#E2DEEB] text-xs font-semibold text-[#1E1B4B] leading-relaxed">
          &ldquo;A graph is not just memory. It helps agents decide what happens next through topological unblocking.&rdquo;
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-1 text-[#F43F5E] text-xs font-black">
            <Heart className="w-4 h-4 fill-[#F43F5E]" />
            <span className="text-[10px] text-[#64748B]">Persistent Love</span>
          </div>
          {/* Sleeping Cat Loaf */}
          <SleepingCat size={60} />
        </div>
      </div>
    </div>
  );
};
