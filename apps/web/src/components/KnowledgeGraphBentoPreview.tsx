import React from 'react';
import { User, Code2, CheckCircle, ArrowRight, FileText, Database } from 'lucide-react';

interface KnowledgeGraphBentoPreviewProps {
  onViewGraph: () => void;
}

export const KnowledgeGraphBentoPreview: React.FC<KnowledgeGraphBentoPreviewProps> = ({
  onViewGraph,
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-[#2A2353] shadow-md flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Database className="w-4 h-4 text-[#4F46E5]" />
          <span className="text-base font-black text-[#1E1B4B]">Knowledge Graph</span>
        </div>
        <button
          onClick={onViewGraph}
          className="px-3 py-1 rounded-xl bg-[#EDE9FE] text-[#4F46E5] hover:bg-[#DDD6FE] transition-colors text-xs font-black flex items-center space-x-1 cursor-pointer"
        >
          <span>View Graph</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Mini Node Diagram exactly as in Reference Image 1 */}
      <div className="relative bg-[#FAF9FD] rounded-2xl p-4 border border-[#E2DEEB] flex flex-col items-center justify-center min-h-[170px] overflow-hidden">
        {/* Soft floating stars */}
        <div className="absolute top-3 right-6 text-amber-300 text-xs">✨</div>
        <div className="absolute bottom-4 left-6 text-amber-300 text-xs">✨</div>

        {/* Nodes flow */}
        <div className="flex items-center justify-between w-full max-w-md px-2 z-10">
          {/* Agent A Node */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#E0F2FE] border-2 border-[#38BDF8] flex items-center justify-center text-[#0284C7] shadow-xs">
              <User className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold text-[#1E1B4B] mt-1.5">
              Agent A
            </span>
            <span className="text-[9px] font-bold text-[#64748B]">(Researcher)</span>
          </div>

          {/* Edge: provides */}
          <div className="flex-1 flex flex-col items-center mx-2">
            <span className="text-[10px] font-bold text-[#64748B] mb-0.5">provides →</span>
            <div className="w-full h-0.5 bg-[#CBD5E1]" />
          </div>

          {/* Central Task Node */}
          <div className="bg-[#EDE9FE] border-2 border-[#818CF8] rounded-2xl px-3.5 py-2 text-center shadow-xs">
            <span className="text-[11px] font-black text-[#312E81] block">
              Task: Fix Bug
            </span>
            <span className="text-[9px] font-extrabold text-[#4F46E5] bg-white/70 px-2 py-0.5 rounded-full inline-block mt-0.5">
              (in_progress)
            </span>
          </div>

          {/* Edge: assigned to */}
          <div className="flex-1 flex flex-col items-center mx-2">
            <span className="text-[10px] font-bold text-[#64748B] mb-0.5">assigned to →</span>
            <div className="w-full h-0.5 bg-[#CBD5E1]" />
          </div>

          {/* Agent B Node */}
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-[#DCFCE7] border-2 border-[#22C55E] flex items-center justify-center text-[#15803D] shadow-xs">
              <Code2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold text-[#1E1B4B] mt-1.5">
              Agent B
            </span>
            <span className="text-[9px] font-bold text-[#64748B]">(Implementer)</span>
          </div>
        </div>

        {/* Downward branch: depends on finding */}
        <div className="flex flex-col items-center mt-3 z-10">
          <span className="text-[9px] font-bold text-[#64748B]">↓ depends on</span>
          <div className="flex items-center space-x-1.5 bg-[#FEF3C7] border-2 border-[#F59E0B] rounded-xl px-2.5 py-1 text-amber-950 text-[10px] font-black mt-1 shadow-2xs">
            <FileText className="w-3.5 h-3.5 text-amber-600" />
            <span>Finding: Root Cause Identified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
