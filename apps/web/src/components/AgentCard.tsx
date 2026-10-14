import React from 'react';
import { Agent } from '@/types/relaygraph';
import { PixelAvatar } from './PixelAvatar';
import { StatusBadge } from './StatusBadge';
import { ChevronRight, FileText, CheckCircle2 } from 'lucide-react';

interface AgentCardProps {
  agent: Agent;
  onSelect: (agent: Agent) => void;
  isSelected?: boolean;
}

export const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  onSelect,
  isSelected = false,
}) => {
  return (
    <div
      onClick={() => onSelect(agent)}
      className={`rounded-2xl p-5 border bg-white pixel-border-interactive cursor-pointer relative overflow-hidden transition-all ${
        isSelected
          ? 'ring-2 ring-[#5145E5] border-transparent shadow-md'
          : 'border-[#E2DEEB]'
      }`}
    >
      {/* Top row: Avatar & Identity */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <PixelAvatar type={agent.pixelAvatar} size={44} />
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-extrabold text-sm text-[#211D3B]">
                {agent.name}
              </span>
              <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-md bg-[#FAF9FD] border border-[#E2DEEB] text-[#716C84]">
                {agent.role}
              </span>
            </div>
            <p className="text-xs text-[#716C84] font-medium leading-none mt-1">
              {agent.title}
            </p>
          </div>
        </div>

        <StatusBadge status={agent.status} />
      </div>

      {/* Current Task Description */}
      <div className="bg-[#FAF9FD] rounded-xl p-3 border border-[#E2DEEB] mb-4">
        <div className="text-[10px] font-bold uppercase tracking-wider text-[#716C84] mb-1">
          Active Task
        </div>
        <p className="text-xs font-semibold text-[#211D3B] line-clamp-2">
          {agent.currentTask || 'Idle — Standing by for graph unblock.'}
        </p>
      </div>

      {/* Stats and Artifacts Count */}
      <div className="grid grid-cols-2 gap-2 text-xs mb-4 pt-1 border-t border-[#F1EFF7]">
        <div className="flex items-center space-x-2 text-[#716C84]">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>
            <strong className="text-[#211D3B]">{agent.tasksCompleted}</strong> Tasks Done
          </span>
        </div>
        <div className="flex items-center space-x-2 text-[#716C84]">
          <FileText className="w-3.5 h-3.5 text-sky-600" />
          <span>
            <strong className="text-[#211D3B]">{agent.findingsCount}</strong> Findings
          </span>
        </div>
      </div>

      {/* Bottom Inspect Action */}
      <div className="flex items-center justify-between pt-2 text-xs font-bold text-[#5145E5] group">
        <span>Inspect Worker Dossier</span>
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </div>
  );
};
