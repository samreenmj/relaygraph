import React from 'react';
import { StageId } from '@/types/relaygraph';
import { CheckCircle2, CircleDashed, ArrowRight, Loader2 } from 'lucide-react';

interface MissionProgressProps {
  currentStage: StageId;
  progressPercent: number;
}

export const MissionProgress: React.FC<MissionProgressProps> = ({
  currentStage,
  progressPercent,
}) => {
  const stages: { id: StageId; label: string; agent: string }[] = [
    { id: 'research', label: '1. Research', agent: 'Agent A (Investigator)' },
    { id: 'implement', label: '2. Implement', agent: 'Agent B (Implementer)' },
    { id: 'verify', label: '3. Verify', agent: 'Agent C (Verifier)' },
    { id: 'complete', label: '4. Complete', agent: 'Mission Goal' },
  ];

  const getStageStatus = (stageId: StageId) => {
    const order: StageId[] = ['research', 'implement', 'verify', 'complete'];
    const currentIndex = order.indexOf(currentStage);
    const stageIndex = order.indexOf(stageId);

    if (stageIndex < currentIndex) return 'completed';
    if (stageIndex === currentIndex) return 'running';
    return 'waiting';
  };

  return (
    <div className="w-full bg-white rounded-2xl p-5 border border-[#E2DEEB] pixel-border">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#211D3B]">
              Mission Pipeline
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-md bg-[#E9E4FF] text-[#5145E5] font-bold">
              Stage: {currentStage.toUpperCase()}
            </span>
          </div>
          <p className="text-xs text-[#716C84] mt-0.5">
            Synchronous handoff progression backed by topological graph resolution.
          </p>
        </div>

        {/* Numeric Progress Bar */}
        <div className="mt-3 sm:mt-0 flex items-center space-x-3">
          <div className="w-32 bg-[#F1EFF7] rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-[#5145E5] h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-black text-[#5145E5]">{progressPercent}%</span>
        </div>
      </div>

      {/* Stage Nodes Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stages.map((st, idx) => {
          const status = getStageStatus(st.id);
          const isCurrent = st.id === currentStage;

          return (
            <div
              key={st.id}
              className={`p-3.5 rounded-xl border transition-all ${
                isCurrent
                  ? 'bg-[#FFF9F0] border-[#FDBA74] shadow-xs'
                  : status === 'completed'
                  ? 'bg-[#F0FDF4] border-[#BBF7D0]'
                  : 'bg-[#FAF9FD] border-[#E2DEEB] opacity-75'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-[#211D3B]">{st.label}</span>
                {status === 'completed' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                )}
                {status === 'running' && (
                  <Loader2 className="w-4 h-4 text-amber-600 animate-spin" />
                )}
                {status === 'waiting' && (
                  <CircleDashed className="w-4 h-4 text-[#716C84]" />
                )}
              </div>
              <p className="text-[11px] text-[#716C84] truncate">{st.agent}</p>
              <div className="mt-2 flex items-center justify-between text-[10px]">
                <span
                  className={`font-bold capitalize ${
                    status === 'completed'
                      ? 'text-emerald-700'
                      : status === 'running'
                      ? 'text-amber-800'
                      : 'text-[#716C84]'
                  }`}
                >
                  {status}
                </span>
                {idx < stages.length - 1 && (
                  <ArrowRight className="w-3 h-3 text-[#CBC5DF] hidden lg:block" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
