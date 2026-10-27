import React from 'react';
import { StageId } from '@/types/relaygraph';
import { Check, Code2, ShieldCheck, Trophy, Sparkles } from 'lucide-react';

interface WorkflowOverviewProps {
  currentStage: StageId;
}

export const WorkflowOverview: React.FC<WorkflowOverviewProps> = ({
  currentStage,
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-[#2A2353] shadow-md flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-base font-black text-[#1E1B4B] flex items-center space-x-1.5">
            <span className="w-2.5 h-4 bg-[#4F46E5] rounded-xs inline-block" />
            <span>Workflow Overview</span>
          </span>
        </div>
        <span className="px-3 py-0.5 rounded-full text-xs font-black bg-[#DCFCE7] text-[#15803D] border border-[#86EFAC] flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] animate-ping mr-1" />
          Live
        </span>
      </div>

      {/* Stepper Pipeline */}
      <div className="relative flex items-center justify-between px-2 sm:px-6 my-4">
        {/* Connection Track Line */}
        <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-[#E2E8F0] z-0" />
        <div className="absolute left-6 w-[45%] top-1/2 -translate-y-1/2 h-1 bg-[#22C55E] z-0 transition-all duration-500" />

        {/* Step 1: Research (Completed) */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-11 h-11 rounded-full bg-[#22C55E] text-white flex items-center justify-center font-bold shadow-md border-2 border-white ring-3 ring-[#DCFCE7]">
            <Check className="w-6 h-6 stroke-[3]" />
          </div>
          <span className="text-xs font-black text-[#1E1B4B] mt-2">Research</span>
          <span className="text-[10px] font-bold text-[#15803D]">Completed</span>
        </div>

        {/* Step 2: Implement (In Progress) */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-11 h-11 rounded-full bg-[#6366F1] text-white flex items-center justify-center font-bold shadow-md border-2 border-white ring-3 ring-[#E0E7FF] animate-pulse">
            <Code2 className="w-5 h-5 stroke-[2.5]" />
          </div>
          <span className="text-xs font-black text-[#4338CA] mt-2">Implement</span>
          <span className="text-[10px] font-bold text-[#6366F1]">In Progress</span>
        </div>

        {/* Step 3: Verify (Pending) */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-11 h-11 rounded-full bg-white text-[#94A3B8] border-2 border-[#CBD5E1] flex items-center justify-center font-bold shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <span className="text-xs font-black text-[#64748B] mt-2">Verify</span>
          <span className="text-[10px] font-bold text-[#94A3B8]">Pending</span>
        </div>

        {/* Step 4: Complete */}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-11 h-11 rounded-full bg-white text-[#94A3B8] border-2 border-[#CBD5E1] flex items-center justify-center font-bold shadow-xs">
            <Trophy className="w-5 h-5" />
          </div>
          <span className="text-xs font-black text-[#64748B] mt-2">Complete</span>
          <span className="text-[10px] font-bold text-[#94A3B8]">Soon!</span>
        </div>
      </div>

      <div className="bg-[#FAF9FD] rounded-2xl p-3 border border-[#E2DEEB] text-[11px] text-[#475569] flex items-center justify-between">
        <span className="font-bold">Next checkpoint:</span>
        <span className="font-extrabold text-[#4F46E5]">Atomic Graph MERGE commit</span>
      </div>
    </div>
  );
};
