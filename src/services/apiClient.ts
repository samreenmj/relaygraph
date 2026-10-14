import {
  MissionOverview,
  Agent,
  Task,
  Finding,
  Decision,
  MemoryRecord,
  GraphNode,
  GraphEdge,
  ActivityEvent,
  RecoveryState,
  Lesson,
  Achievement,
  BenchmarkSummary,
} from '@/types/relaygraph';

import {
  mockMission,
  mockAgents,
  mockTasks,
  mockFindings,
  mockDecisions,
  mockMemoryRecords,
  mockGraphNodes,
  mockGraphEdges,
  mockActivityEvents,
  mockRecoveryState,
  mockLessons,
  mockAchievements,
  mockBenchmarkSummary,
} from '@/mock/relaygraphData';

export interface IRelayGraphApiClient {
  getMission(): Promise<MissionOverview>;
  getAgents(): Promise<Agent[]>;
  getAgentById(id: string): Promise<Agent | null>;
  getTasks(): Promise<Task[]>;
  getFindings(): Promise<Finding[]>;
  getDecisions(): Promise<Decision[]>;
  getMemoryRecords(): Promise<MemoryRecord[]>;
  getGraph(): Promise<{ nodes: GraphNode[]; edges: GraphEdge[] }>;
  getActivityEvents(): Promise<ActivityEvent[]>;
  getRecoveryState(): Promise<RecoveryState>;
  getLessons(): Promise<Lesson[]>;
  getAchievements(): Promise<Achievement[]>;
  getBenchmarkSummary(): Promise<BenchmarkSummary>;
  isMockAdapter: boolean;
}

/**
 * Mock implementation of RelayGraph API adapter.
 * Uses realistic data clearly annotated as demo data.
 * When real FalkorDB backend endpoints become available, swap or extend this client.
 */
export class MockRelayGraphApiClient implements IRelayGraphApiClient {
  public isMockAdapter = true;

  async getMission(): Promise<MissionOverview> {
    return Promise.resolve({ ...mockMission });
  }

  async getAgents(): Promise<Agent[]> {
    return Promise.resolve([...mockAgents]);
  }

  async getAgentById(id: string): Promise<Agent | null> {
    const agent = mockAgents.find((a) => a.id === id);
    return Promise.resolve(agent ? { ...agent } : null);
  }

  async getTasks(): Promise<Task[]> {
    return Promise.resolve([...mockTasks]);
  }

  async getFindings(): Promise<Finding[]> {
    return Promise.resolve([...mockFindings]);
  }

  async getDecisions(): Promise<Decision[]> {
    return Promise.resolve([...mockDecisions]);
  }

  async getMemoryRecords(): Promise<MemoryRecord[]> {
    return Promise.resolve([...mockMemoryRecords]);
  }

  async getGraph(): Promise<{ nodes: GraphNode[]; edges: GraphEdge[] }> {
    return Promise.resolve({
      nodes: [...mockGraphNodes],
      edges: [...mockGraphEdges],
    });
  }

  async getActivityEvents(): Promise<ActivityEvent[]> {
    return Promise.resolve([...mockActivityEvents]);
  }

  async getRecoveryState(): Promise<RecoveryState> {
    return Promise.resolve({ ...mockRecoveryState });
  }

  async getLessons(): Promise<Lesson[]> {
    return Promise.resolve([...mockLessons]);
  }

  async getAchievements(): Promise<Achievement[]> {
    return Promise.resolve([...mockAchievements]);
  }

  async getBenchmarkSummary(): Promise<BenchmarkSummary> {
    return Promise.resolve({ ...mockBenchmarkSummary });
  }
}

// Single instance export
export const apiClient = new MockRelayGraphApiClient();
