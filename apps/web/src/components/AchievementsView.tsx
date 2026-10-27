import React from 'react';
import { Achievement, BenchmarkSummary } from '@/types/relaygraph';
import {
  Trophy,
  CheckCircle2,
  Lock,
  Database,
  GitFork,
  BrainCircuit,
  ShieldAlert,
  Link,
  BarChart3,
  Zap,
} from 'lucide-react';

interface AchievementsViewProps {
  achievements: Achievement[];
  benchmarks: BenchmarkSummary;
}

export const AchievementsView: React.FC<AchievementsViewProps> = ({
  achievements,
  benchmarks,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Database':
        return <Database className="w-5 h-5 text-indigo-600" />;
      case 'GitFork':
        return <GitFork className="w-5 h-5 text-amber-600" />;
      case 'BrainCircuit':
        return <BrainCircuit className="w-5 h-5 text-purple-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-emerald-600" />;
      case 'Link':
        return <Link className="w-5 h-5 text-sky-600" />;
      default:
        return <Trophy className="w-5 h-5 text-amber-500" />;
    }
  };

  const unlockedCount = achievements.filter((a) => a.isUnlocked).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 lg:p-7 border border-[#E2DEEB] pixel-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF9F0] border border-[#FDE7C7] flex items-center justify-center text-amber-600">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-black text-[#211D3B]">
                  Engineering Achievements
                </h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  {unlockedCount} / {achievements.length} Unlocked
                </span>
              </div>
              <p className="text-xs text-[#716C84]">
                Milestones are awarded strictly when corresponding verified graph events occur.
              </p>
            </div>
          </div>
        </div>

        {/* Achievement Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all ${
                ach.isUnlocked
                  ? 'bg-[#FAF9FD] border-[#D0C7F8] shadow-xs'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="p-2 rounded-xl bg-white border border-[#E2DEEB]">
                  {getIcon(ach.iconName)}
                </div>
                {ach.isUnlocked ? (
                  <span className="inline-flex items-center text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                    <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />
                    {ach.unlockedAt}
                  </span>
                ) : (
                  <span className="inline-flex items-center text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-md">
                    <Lock className="w-3 h-3 mr-1" />
                    Locked
                  </span>
                )}
              </div>

              <h4 className="font-extrabold text-sm text-[#211D3B]">{ach.title}</h4>
              <p className="text-xs text-[#716C84] mt-1 leading-snug">
                {ach.description}
              </p>
              <div className="mt-3 pt-2 border-t border-[#F1EFF7] text-[10px] text-[#716C84] font-medium">
                Target: {ach.requirementDescription}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Benchmark Summary Section */}
      <div className="bg-white rounded-3xl p-6 lg:p-7 border border-[#E2DEEB] pixel-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-[#5145E5]" />
            <h3 className="text-lg font-black text-[#211D3B]">
              Benchmark Evaluation
            </h3>
          </div>
          {benchmarks.isSampleData && (
            <span className="text-[11px] font-bold text-amber-800 bg-[#FFF9F0] border border-[#FDE7C7] px-2.5 py-1 rounded-lg">
              ⚡ Illustrative Hackathon Benchmark Data
            </span>
          )}
        </div>

        <p className="text-xs text-[#716C84] mb-6">
          Scenario: <strong>{benchmarks.scenario}</strong>. Comparing traditional
          stateless agent loops against RelayGraph’s FalkorDB-backed persistent
          memory and idempotency guards.
        </p>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Baseline Stateless Loop */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <span className="font-black text-xs uppercase tracking-wider text-slate-700">
                Baseline (Stateless Multi-Agent)
              </span>
              <span className="text-[10px] font-bold text-slate-500">Uncoordinated</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Task Completion Rate:</span>
                <span className="font-bold text-slate-900">
                  {benchmarks.baselineResult.completionRate}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Recovery Rate from Faults:</span>
                <span className="font-bold text-slate-900">
                  {benchmarks.baselineResult.recoveryRate}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Duplicate Ledger Effects:</span>
                <span className="font-bold text-rose-700">
                  {benchmarks.baselineResult.duplicateEffects} duplicates
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Average Token Usage:</span>
                <span className="font-bold text-slate-900">
                  {benchmarks.baselineResult.avgTokenUsage}
                </span>
              </div>
            </div>
          </div>

          {/* RelayGraph System */}
          <div className="p-5 rounded-2xl bg-[#F0FDF4] border border-[#BBF7D0]">
            <div className="flex items-center justify-between mb-3">
              <span className="font-black text-xs uppercase tracking-wider text-emerald-900 flex items-center">
                <Zap className="w-3.5 h-3.5 mr-1 text-emerald-600" /> RelayGraph + FalkorDB
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-200/60 px-2 py-0.5 rounded">
                Persistent Graph
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-[#BBF7D0]">
                <span className="text-emerald-800">Task Completion Rate:</span>
                <span className="font-black text-emerald-950">
                  {benchmarks.relayGraphResult.completionRate}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#BBF7D0]">
                <span className="text-emerald-800">Recovery Rate from Faults:</span>
                <span className="font-black text-emerald-950">
                  {benchmarks.relayGraphResult.recoveryRate}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#BBF7D0]">
                <span className="text-emerald-800">Duplicate Ledger Effects:</span>
                <span className="font-black text-emerald-700">
                  {benchmarks.relayGraphResult.duplicateEffects} (Atomic MERGE)
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-emerald-800">Average Token Usage:</span>
                <span className="font-black text-emerald-950">
                  {benchmarks.relayGraphResult.avgTokenUsage} (-66%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
