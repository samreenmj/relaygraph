'use client';

import React, { useState, useEffect } from 'react';
import {
  Agent,
  MissionOverview,
  ActivityEvent,
  GraphNode,
  GraphEdge,
  MemoryRecord,
  RecoveryState,
  Lesson,
  Achievement,
  BenchmarkSummary,
} from '@/types/relaygraph';
import { apiClient } from '@/services/apiClient';

import { NavDestination } from '@/components/AppSidebar';
import { GameTopNav } from '@/components/GameTopNav';
import { PixelQuestMap } from '@/components/PixelQuestMap';
import { WorkflowOverview } from '@/components/WorkflowOverview';
import { KnowledgeGraphBentoPreview } from '@/components/KnowledgeGraphBentoPreview';
import { BottomBentoCards } from '@/components/BottomBentoCards';

import { AgentParty } from '@/components/AgentParty';
import { AgentDetailsView } from '@/components/AgentDetailsView';
import { KnowledgeGraph } from '@/components/KnowledgeGraph';
import { ActivityRecoveryView } from '@/components/ActivityRecoveryView';
import { MemoryExplorer } from '@/components/MemoryExplorer';
import { LearningPanel } from '@/components/LearningPanel';
import { AchievementsView } from '@/components/AchievementsView';
import { Loader2 } from 'lucide-react';

export default function RelayGraphApp() {
  const [currentDest, setCurrentDest] = useState<NavDestination>('quest');
  const [isLearnOpen, setIsLearnOpen] = useState(false);

  // Core state
  const [mission, setMission] = useState<MissionOverview | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [graphData, setGraphData] = useState<{ nodes: GraphNode[]; edges: GraphEdge[] }>({
    nodes: [],
    edges: [],
  });
  const [memoryRecords, setMemoryRecords] = useState<MemoryRecord[]>([]);
  const [activityEvents, setActivityEvents] = useState<ActivityEvent[]>([]);
  const [recoveryState, setRecoveryState] = useState<RecoveryState | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([1, 2, 3, 5]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [benchmarks, setBenchmarks] = useState<BenchmarkSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [
          m,
          ags,
          g,
          mems,
          evts,
          rec,
          les,
          achs,
          bms,
        ] = await Promise.all([
          apiClient.getMission(),
          apiClient.getAgents(),
          apiClient.getGraph(),
          apiClient.getMemoryRecords(),
          apiClient.getActivityEvents(),
          apiClient.getRecoveryState(),
          apiClient.getLessons(),
          apiClient.getAchievements(),
          apiClient.getBenchmarkSummary(),
        ]);

        setMission(m);
        setAgents(ags);
        setSelectedAgent(ags[0] || null);
        setGraphData(g);
        setMemoryRecords(mems);
        setActivityEvents(evts);
        setRecoveryState(rec);
        setLessons(les);
        setAchievements(achs);
        setBenchmarks(bms);
      } catch (err) {
        console.error('Failed to load RelayGraph initial state:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const handleToggleLessonCompleted = (id: number) => {
    setCompletedLessonIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAgentById = (id: string) => {
    const found = agents.find((a) => a.id === id);
    if (found) {
      setSelectedAgent(found);
      setCurrentDest('agents');
    }
  };

  if (isLoading || !mission || !recoveryState || !benchmarks) {
    return (
      <div className="min-h-screen bg-[#3B336A] flex flex-col items-center justify-center p-6 text-center text-white">
        <Loader2 className="w-10 h-10 text-amber-300 animate-spin mb-3" />
        <h2 className="text-lg font-black tracking-tight">
          Loading RelayGraph Quest World...
        </h2>
        <p className="text-xs text-[#C7D2FE] mt-1 font-bold">
          Mounting FalkorDB Graph Layer and Pixel Mascots
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#473D7C] text-[#1E1B4B] flex flex-col font-sans">
      {/* Game Header Bar matching Reference 1 */}
      <GameTopNav
        currentDest={currentDest}
        onNavigate={(dest) => setCurrentDest(dest)}
        onOpenLearn={() => setIsLearnOpen(true)}
        isMockAdapter={apiClient.isMockAdapter}
      />

      {/* Main Game Shell / Bento Container */}
      <main className="flex-1 p-3 sm:p-5 lg:p-6 max-w-7xl w-full mx-auto space-y-5">
        {/* Destination: Quest Dashboard (Screen A — Exact Bento Layout from Image 1) */}
        {currentDest === 'quest' && (
          <div className="space-y-5">
            {/* Top Grid: Quest Map (Left 60%) + Workflow & Graph Preview (Right 40%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* Left Column: Overworld Pixel Quest Map */}
              <div className="lg:col-span-7 flex flex-col">
                <PixelQuestMap
                  currentStage={mission.currentStage}
                  onSelectAgentA={() => handleSelectAgentById('agent-a')}
                  onSelectAgentB={() => handleSelectAgentById('agent-b')}
                  onSelectAgentC={() => handleSelectAgentById('agent-c')}
                />
              </div>

              {/* Right Column: Workflow Overview + Knowledge Graph Bento Preview */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="flex-1">
                  <WorkflowOverview currentStage={mission.currentStage} />
                </div>
                <div className="flex-1">
                  <KnowledgeGraphBentoPreview
                    onViewGraph={() => setCurrentDest('graph')}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Row: 3 Bento Cards (Quick Learn, Achievements, Key Takeaway) */}
            <BottomBentoCards
              onStartLearning={() => setIsLearnOpen(true)}
              onViewAchievements={() => setCurrentDest('achievements')}
            />

            {/* Expandable Agent Party for Deep Inspection */}
            <div className="pt-2">
              <AgentParty
                agents={agents}
                selectedAgentId={selectedAgent?.id}
                onSelectAgent={(ag) => {
                  setSelectedAgent(ag);
                  setCurrentDest('agents');
                }}
              />
            </div>
          </div>
        )}

        {/* Destination: Agents (Screen C) */}
        {currentDest === 'agents' && (
          <div className="space-y-5">
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 bg-white p-2 rounded-2xl border-3 border-[#2A2353] shadow-md">
              {agents.map((ag) => (
                <button
                  key={ag.id}
                  onClick={() => setSelectedAgent(ag)}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                    selectedAgent?.id === ag.id
                      ? 'bg-[#4F46E5] text-white shadow-xs'
                      : 'bg-[#F1EFF7] text-[#1E1B4B] hover:bg-[#E2DEEB]'
                  }`}
                >
                  {ag.name} ({ag.role})
                </button>
              ))}
            </div>

            {selectedAgent && <AgentDetailsView agent={selectedAgent} />}
          </div>
        )}

        {/* Destination: Knowledge Graph (Screen B) */}
        {currentDest === 'graph' && (
          <div className="space-y-4">
            <KnowledgeGraph
              nodes={graphData.nodes}
              edges={graphData.edges}
              selectedNodeId={selectedAgent?.id}
            />
          </div>
        )}

        {/* Destination: Persistent Memory (Screen D) */}
        {currentDest === 'memory' && (
          <MemoryExplorer records={memoryRecords} />
        )}

        {/* Destination: Activity Log & Recovery (Screen E) */}
        {currentDest === 'activity' && (
          <ActivityRecoveryView
            events={activityEvents}
            recoveryState={recoveryState}
          />
        )}

        {/* Destination: Achievements & Evaluation (Screen G) */}
        {currentDest === 'achievements' && (
          <AchievementsView
            achievements={achievements}
            benchmarks={benchmarks}
          />
        )}
      </main>

      {/* Bottom Footer Badge */}
      <footer className="text-center py-3 text-white/80 text-xs font-black tracking-wide flex items-center justify-center space-x-1.5">
        <span>Build. Learn. Innovate.</span>
        <span className="text-amber-300">✨</span>
      </footer>

      {/* Persistent Interactive Learning Drawer (Screen F) */}
      <LearningPanel
        lessons={lessons}
        isOpen={isLearnOpen}
        onClose={() => setIsLearnOpen(false)}
        completedLessonIds={completedLessonIds}
        onToggleLessonCompleted={handleToggleLessonCompleted}
      />
    </div>
  );
}
