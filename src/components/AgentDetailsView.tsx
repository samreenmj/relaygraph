import React from 'react';
import { Agent } from '@/types/relaygraph';
import { PixelAvatar } from './PixelAvatar';
import { StatusBadge } from './StatusBadge';
import {
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  GitBranch,
  Layers,
} from 'lucide-react';

interface AgentDetailsViewProps {
  agent: Agent;
  onBack?: () => void;
}

export const AgentDetailsView: React.FC<AgentDetailsViewProps> = ({
  agent,
  onBack,
}) => {
  return (
    <div className="space-y-6">
      {/* Header Profile Card */}
      <div className="bg-white rounded-3xl p-6 lg:p-7 border border-[#E2DEEB] pixel-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-4">
            <PixelAvatar type={agent.pixelAvatar} size={64} />
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl lg:text-2xl font-black text-[#211D3B]">
                  {agent.name}
                </h2>
                <span className="text-xs uppercase font-extrabold px-2 py-0.5 rounded-md bg-[#FAF9FD] border border-[#E2DEEB] text-[#716C84]">
                  {agent.role}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#5145E5] mt-0.5">
                {agent.title}
              </p>
            </div>
          </div>
          <StatusBadge status={agent.status} className="self-start sm:self-auto text-sm px-3 py-1" />
        </div>

        <p className="text-sm text-[#716C84] leading-relaxed max-w-3xl mb-6">
          {agent.bio}
        </p>

        {/* Metric Badges Bento */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#F1EFF7]">
          <div className="p-3 rounded-2xl bg-[#FAF9FD] border border-[#E2DEEB]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#716C84]">
              Completed Tasks
            </span>
            <div className="text-lg font-black text-[#211D3B] mt-1">
              {agent.tasksCompleted}
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-[#FAF9FD] border border-[#E2DEEB]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#716C84]">
              Findings Recorded
            </span>
            <div className="text-lg font-black text-[#211D3B] mt-1">
              {agent.findingsCount}
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-[#FAF9FD] border border-[#E2DEEB]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#716C84]">
              Last Heartbeat
            </span>
            <div className="text-sm font-black text-[#211D3B] mt-1.5 truncate">
              {agent.lastActive}
            </div>
          </div>
          <div className="p-3 rounded-2xl bg-[#FAF9FD] border border-[#E2DEEB]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#716C84]">
              Active Invariants
            </span>
            <div className="text-sm font-black text-emerald-700 mt-1.5 flex items-center">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5" />
              Verified
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid: Active Task & Handoffs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Active Task & Dependencies */}
        <div className="bg-white rounded-3xl p-6 border border-[#E2DEEB] pixel-border">
          <div className="flex items-center space-x-2 mb-3">
            <Layers className="w-4 h-4 text-[#5145E5]" />
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#211D3B]">
              Current Task & Dependencies
            </h3>
          </div>
          <div className="p-4 rounded-2xl bg-[#FAF9FD] border border-[#E2DEEB] mb-4">
            <span className="text-[10px] font-black uppercase text-[#5145E5]">
              Assigned Task
            </span>
            <p className="text-sm font-bold text-[#211D3B] mt-1">
              {agent.currentTask || 'Idle — Standing by for graph unblock.'}
            </p>
          </div>

          <div>
            <span className="text-xs font-bold text-[#716C84] block mb-2">
              Prerequisite Dependencies
            </span>
            <div className="space-y-2">
              {agent.dependencies.map((dep, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-[#211D3B] flex items-center justify-between"
                >
                  <span>{dep}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Satisfied
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Handoff Pipelines */}
        <div className="bg-white rounded-3xl p-6 border border-[#E2DEEB] pixel-border">
          <div className="flex items-center space-x-2 mb-3">
            <GitBranch className="w-4 h-4 text-[#5145E5]" />
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#211D3B]">
              Graph Handoff Pipeline
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-bold text-[#716C84] block mb-1.5">
                Incoming Handoffs
              </span>
              <div className="space-y-1.5">
                {agent.incomingHandoffs.map((ih, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-950 font-medium"
                  >
                    ← {ih}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-[#716C84] block mb-1.5">
                Outgoing Handoffs
              </span>
              <div className="space-y-1.5">
                {agent.outgoingHandoffs.map((oh, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 font-medium"
                  >
                    → {oh}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recovery History If Any */}
      {agent.recentFailureHistory && agent.recentFailureHistory.length > 0 && (
        <div className="bg-[#FFF9F0] rounded-3xl p-6 border border-[#FDE7C7] pixel-border">
          <div className="flex items-center space-x-2 text-amber-900 mb-3">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <h3 className="text-sm font-extrabold uppercase tracking-wider">
              Fault Injection & Recovery Log
            </h3>
          </div>
          <div className="space-y-2">
            {agent.recentFailureHistory.map((fail, i) => (
              <div
                key={i}
                className="p-3 rounded-2xl bg-white border border-[#FDE7C7] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <span className="font-extrabold text-[#211D3B]">{fail.task}:</span>{' '}
                  <span className="text-[#716C84]">{fail.reason}</span>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-[10px] text-[#716C84]">{fail.timestamp}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    FalkorDB Checkpoint Resumed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
