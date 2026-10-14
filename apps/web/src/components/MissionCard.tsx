import React from 'react';
import { MissionOverview } from '@/types/relaygraph';
import { Target, AlertTriangle, CheckSquare, Sparkles } from 'lucide-react';

interface MissionCardProps {
  mission: MissionOverview;
  onExploreGraph: () => void;
}

export const MissionCard: React.FC<MissionCardProps> = ({
  mission,
  onExploreGraph,
}) => {
  return (
    <div className="bg-gradient-to-br from-white to-[#F9F7FD] rounded-3xl p-6 lg:p-7 border border-[#E2DEEB] pixel-border relative overflow-hidden">
      {/* Decorative top badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-[#E9E4FF] text-[#5145E5] flex items-center space-x-1.5">
            <Target className="w-3.5 h-3.5" />
            <span>Active Quest</span>
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-[#FEE2E2] text-[#991B1B] flex items-center space-x-1">
            <AlertTriangle className="w-3 h-3 text-[#DC2626]" />
            <span>Priority: {mission.priority}</span>
          </span>
        </div>

        {mission.isDemo && (
          <span className="text-[11px] font-bold text-amber-800 bg-[#FFF9F0] border border-[#FDE7C7] px-2.5 py-1 rounded-lg">
            ⚡ Simulated Demo Dataset
          </span>
        )}
      </div>

      {/* Main Title & Description */}
      <h2 className="text-xl lg:text-2xl font-black text-[#211D3B] tracking-tight mb-2">
        {mission.title}
      </h2>
      <p className="text-sm font-semibold text-[#5145E5] mb-2">{mission.tagline}</p>
      <p className="text-sm text-[#716C84] leading-relaxed mb-6 max-w-3xl">
        {mission.description}
      </p>

      {/* Acceptance Criteria Checklist */}
      <div className="bg-[#FAF9FD] rounded-2xl p-4 sm:p-5 border border-[#E2DEEB] mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#211D3B] flex items-center space-x-1.5">
            <CheckSquare className="w-4 h-4 text-[#5145E5]" />
            <span>Acceptance Criteria</span>
          </span>
          <span className="text-xs text-[#716C84] font-medium">
            {mission.acceptanceCriteria.filter((c) => c.satisfied).length} of{' '}
            {mission.acceptanceCriteria.length} Satisfied
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {mission.acceptanceCriteria.map((criterion, i) => (
            <div
              key={i}
              className={`flex items-start space-x-2.5 p-2.5 rounded-xl border text-xs font-medium ${
                criterion.satisfied
                  ? 'bg-emerald-50/60 border-emerald-200 text-emerald-900'
                  : 'bg-white border-[#E2DEEB] text-[#716C84]'
              }`}
            >
              <input
                type="checkbox"
                checked={criterion.satisfied}
                readOnly
                className="mt-0.5 rounded text-[#5145E5] focus:ring-0 cursor-default"
              />
              <span className={criterion.satisfied ? 'line-through text-emerald-800/80' : ''}>
                {criterion.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <div className="text-xs text-[#716C84]">
          <span className="font-bold text-[#211D3B]">FalkorDB Graph Contract:</span> State machine enforces unblocked execution topology.
        </div>
        <button
          onClick={onExploreGraph}
          className="px-5 py-2.5 rounded-xl bg-[#5145E5] text-white hover:bg-[#4338CA] transition-colors text-xs font-bold shadow-xs flex items-center space-x-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>Inspect Knowledge Graph</span>
        </button>
      </div>
    </div>
  );
};
