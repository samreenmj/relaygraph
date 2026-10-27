export type AgentId = 'agent-a' | 'agent-b' | 'agent-c';
export type AgentRole = 'Investigator' | 'Implementer' | 'Verifier';
export type AgentStatus = 'idle' | 'running' | 'completed' | 'waiting' | 'failed' | 'recovering';

export interface Agent {
  id: AgentId;
  name: string;
  role: AgentRole;
  title: string;
  status: AgentStatus;
  accentColor: string; // Tailwind/hex token reference
  themeClass: string;
  currentTask?: string;
  tasksCompleted: number;
  findingsCount: number;
  lastActive: string;
  pixelAvatar: string; // Identifier for pixel mascot SVG
  bio: string;
  incomingHandoffs: string[];
  outgoingHandoffs: string[];
  dependencies: string[];
  recentFailureHistory?: {
    task: string;
    reason: string;
    recovered: boolean;
    timestamp: string;
  }[];
}

export type TaskStatus = 'pending' | 'running' | 'completed' | 'failed' | 'recovering';
export type StageId = 'research' | 'implement' | 'verify' | 'complete';

export interface Task {
  id: string;
  title: string;
  description: string;
  stage: StageId;
  assignedTo: AgentId;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high' | 'critical';
  dependencies: string[]; // task IDs
  outputs: string[];
  evidenceIds: string[];
  startedAt?: string;
  completedAt?: string;
}

export interface Finding {
  id: string;
  title: string;
  summary: string;
  sourceAgentId: AgentId;
  taskId: string;
  confidence: number;
  provenance: {
    fileOrResource: string;
    lineNumbers?: string;
    queryExecuted?: string;
    contextSnippet?: string;
  };
  timestamp: string;
  impactScore: 'low' | 'medium' | 'high';
}

export interface Decision {
  id: string;
  title: string;
  rationale: string;
  agentId: AgentId;
  taskId: string;
  supportedByFindingIds: string[];
  outcome: 'fix_applied' | 'test_passed' | 'strategy_pivot' | 'recovery_triggered';
  timestamp: string;
}

export interface MemoryRecord {
  id: string;
  title: string;
  category: 'findings' | 'decisions' | 'task_history' | 'handoffs' | 'procedures';
  contentSummary: string;
  sourceAgentId: AgentId;
  relatedTaskId: string;
  provenance: string;
  connectedEntities: string[];
  createdAt: string;
  isFact: boolean; // true = persisted verified fact, false = proposed conclusion
}

export type GraphNodeType = 'agent' | 'task' | 'finding' | 'decision' | 'event';
export type GraphEdgeType = 'OWNS' | 'DEPENDS_ON' | 'PRODUCED' | 'INFORMS' | 'HAS_EVENT';

export interface GraphNode {
  id: string;
  label: string;
  type: GraphNodeType;
  subType?: string;
  details: {
    status?: string;
    owner?: string;
    summary?: string;
    metrics?: string;
    timestamp?: string;
  };
  x: number;
  y: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  relationship: GraphEdgeType;
  label?: string;
}

export interface ActivityEvent {
  id: string;
  timestamp: string;
  agentId: AgentId;
  actorName: string;
  eventType: 'finding_recorded' | 'dependency_satisfied' | 'handoff_received' | 'verification_started' | 'worker_interrupted' | 'recovery_attempted' | 'task_completed';
  taskId: string;
  description: string;
  attemptId?: string;
  result?: 'success' | 'failure' | 'in_progress';
  isSimulated?: boolean;
}

export interface RecoveryState {
  isInterrupted: boolean;
  interruptedTaskId: string;
  lastPersistedState: string;
  previousAttempt: string;
  recoveryDecision: string;
  recoveryAction: 'retry' | 'resume' | 'rollback_and_branch';
  finalVerifiedOutcome?: string;
  isSimulated: boolean;
  attemptCount: number;
}

export interface Lesson {
  id: number;
  title: string;
  slug: string;
  category: string;
  explanation: string;
  whyRelayGraphNeedsIt: string;
  technicalExample: {
    language: 'cypher' | 'typescript' | 'json';
    code: string;
  };
  commonMistake: string;
  interviewTakeaway: string;
  knowledgeCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  requirementDescription: string;
}

export interface BenchmarkSummary {
  scenario: string;
  baselineResult: {
    completionRate: string;
    recoveryRate: string;
    duplicateEffects: number;
    avgTokenUsage: string;
    avgTime: string;
  };
  relayGraphResult: {
    completionRate: string;
    recoveryRate: string;
    duplicateEffects: number;
    avgTokenUsage: string;
    avgTime: string;
  };
  isSampleData: boolean;
}

export interface MissionOverview {
  id: string;
  title: string;
  tagline: string;
  description: string;
  priority: 'High' | 'Critical' | 'Medium';
  currentStage: StageId;
  progressPercent: number;
  acceptanceCriteria: {
    text: string;
    satisfied: boolean;
  }[];
  isDemo: boolean;
}
