'use client';

import React, { useState } from 'react';
import { ActivityEvent, RecoveryState, AgentId } from '@/types/relaygraph';
import {
  ShieldAlert,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  History,
  Filter,
  Check,
  Cpu,
  Layers,
} from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface ActivityRecoveryViewProps {
  events: ActivityEvent[];
  recoveryState: RecoveryState;
}

export const ActivityRecoveryView: React.FC<ActivityRecoveryViewProps> = ({
  events,
  recoveryState,
}) => {
  const [selectedAgent, setSelectedAgent] = useState<AgentId | 'all'>('all');
  const [selectedEventType, setSelectedEventType] = useState<string>('all');

  const filteredEvents = events.filter((e) => {
    const matchesAgent =
      selectedAgent === 'all' || e.agentId === selectedAgent;
    const matchesType =
      selectedEventType === 'all' || e.eventType === selectedEventType;
    return matchesAgent && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Recovery Visualization Hero Card */}
      <div className="bg-gradient-to-br from-white to-[#FAF9FD] rounded-3xl p-6 lg:p-7 border border-[#E2DEEB] pixel-border relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-100 text-purple-900 flex items-center space-x-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-purple-700" />
              <span>FalkorDB Recovery Engine</span>
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
              Attempt #{recoveryState.attemptCount}
            </span>
          </div>

          {recoveryState.isSimulated && (
            <span className="text-[11px] font-bold text-amber-800 bg-[#FFF9F0] border border-[#FDE7C7] px-2.5 py-1 rounded-lg">
              ⚡ Simulated Fault Injection
            </span>
          )}
        </div>

        <h2 className="text-xl font-black text-[#211D3B] mb-2">
          Stateful Recovery Sequence
        </h2>
        <p className="text-xs text-[#716C84] leading-relaxed max-w-2xl mb-6">
          When an agent experiences an unhandled syntax or runtime interruption,
          RelayGraph recovers using FalkorDB graph state rather than restarting
          from scratch.
        </p>

        {/* 6-Step Recovery Flow Pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          <div className="p-3.5 rounded-2xl bg-white border border-[#E2DEEB]">
            <span className="text-[10px] font-black uppercase text-[#716C84]">
              1. Interrupted Task
            </span>
            <p className="text-xs font-bold text-[#211D3B] mt-1">
              {recoveryState.interruptedTaskId}
            </p>
            <span className="text-[10px] text-rose-600 font-semibold mt-1 block">
              Process crashed at step 2
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#E2DEEB]">
            <span className="text-[10px] font-black uppercase text-[#716C84]">
              2. Last Persisted State
            </span>
            <p className="text-xs font-bold text-[#211D3B] mt-1 font-mono truncate">
              {recoveryState.lastPersistedState}
            </p>
            <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">
              FalkorDB Node Checkpoint Intact
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#E2DEEB]">
            <span className="text-[10px] font-black uppercase text-[#716C84]">
              3. Previous Attempt
            </span>
            <p className="text-xs font-bold text-[#211D3B] mt-1">
              {recoveryState.previousAttempt}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#E2DEEB]">
            <span className="text-[10px] font-black uppercase text-[#716C84]">
              4. Recovery Decision
            </span>
            <p className="text-xs font-bold text-[#211D3B] mt-1 leading-snug">
              {recoveryState.recoveryDecision}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-white border border-[#E2DEEB]">
            <span className="text-[10px] font-black uppercase text-[#716C84]">
              5. Action Chosen
            </span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-xs font-black uppercase">
                {recoveryState.recoveryAction}
              </span>
              <span className="text-[11px] text-[#716C84]">from step 3</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-[10px] font-black uppercase text-emerald-800">
              6. Final Verified Outcome
            </span>
            <p className="text-xs font-bold text-emerald-950 mt-1 leading-snug">
              {recoveryState.finalVerifiedOutcome || 'Pending Verification'}
            </p>
          </div>
        </div>
      </div>

      {/* Chronological Activity Feed with Filters */}
      <div className="bg-white rounded-3xl p-6 border border-[#E2DEEB] pixel-border">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#F1EFF7] mb-5">
          <div className="flex items-center space-x-2">
            <History className="w-4 h-4 text-[#5145E5]" />
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#211D3B]">
              Chronological Graph Event Log
            </h3>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center space-x-1 bg-[#FAF9FD] p-1 rounded-xl border border-[#E2DEEB]">
              <span className="text-[10px] font-bold text-[#716C84] px-1.5">
                Agent:
              </span>
              {(['all', 'agent-a', 'agent-b', 'agent-c'] as const).map((ag) => (
                <button
                  key={ag}
                  onClick={() => setSelectedAgent(ag)}
                  className={`px-2 py-0.5 rounded-lg text-[11px] font-bold capitalize ${
                    selectedAgent === ag
                      ? 'bg-[#5145E5] text-white'
                      : 'text-[#716C84] hover:bg-[#E2DEEB]'
                  }`}
                >
                  {ag === 'all'
                    ? 'All'
                    : ag === 'agent-a'
                    ? 'Scout'
                    : ag === 'agent-b'
                    ? 'Forge'
                    : 'Sentinel'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Table / Timeline */}
        <div className="space-y-3">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="p-3.5 rounded-2xl bg-[#FAF9FD] border border-[#E2DEEB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-white border border-[#E2DEEB] flex items-center justify-center font-bold text-[#5145E5] shrink-0 text-xs">
                  {evt.attemptId?.toUpperCase() || 'ATT'}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-0.5">
                    <span className="font-extrabold text-[#211D3B]">
                      {evt.actorName}
                    </span>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-white border border-[#E2DEEB] text-[#716C84]">
                      {evt.taskId}
                    </span>
                    <span className="text-[10px] text-[#716C84]">
                      {evt.timestamp}
                    </span>
                  </div>
                  <p className="text-[#716C84] leading-relaxed">
                    {evt.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center space-x-2 self-end sm:self-auto">
                {evt.isSimulated && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                    Simulated
                  </span>
                )}
                {evt.result && <StatusBadge status={evt.result} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
