import {
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
  MissionOverview,
} from '@/types/relaygraph';

export const mockMission: MissionOverview = {
  id: 'mission-01',
  title: 'Investigate a production bug in Payment Webhook',
  tagline: 'Find the root cause, propose a fix, and verify the result.',
  description:
    'Customers experienced silent failures on multi-currency webhook events when receiving idempotent duplicate payloads. Agent A discovers the race condition, Agent B applies an atomic FalkorDB guard, and Agent C executes mutation tests against acceptance criteria.',
  priority: 'Critical',
  currentStage: 'implement',
  progressPercent: 62,
  acceptanceCriteria: [
    { text: 'Root cause identified and corroborated by error telemetry', satisfied: true },
    { text: 'Atomic idempotency key recorded in FalkorDB persistent memory', satisfied: true },
    { text: 'Patch synthesized and verified without regression in unit suite', satisfied: false },
    { text: 'Automated verification test passes with 0 duplicate ledger entries', satisfied: false },
  ],
  isDemo: true,
};

export const mockAgents: Agent[] = [
  {
    id: 'agent-a',
    name: 'Scout-01',
    role: 'Investigator',
    title: 'Root Cause Investigator',
    status: 'completed',
    accentColor: '#38BDF8', // Sky blue
    themeClass: 'bg-sky-50 border-sky-200 text-sky-950',
    currentTask: 'TASK-101: Triage duplicate webhook event spikes',
    tasksCompleted: 4,
    findingsCount: 3,
    lastActive: '12m ago',
    pixelAvatar: 'investigator',
    bio: 'Specialized in static AST traversal, FalkorDB log pattern correlation, and root-cause hypothesis generation.',
    incomingHandoffs: ['Telemetry Alert Dispatcher', 'Sentry Incident #4089'],
    outgoingHandoffs: ['TASK-102: Implement Atomic Lock to Agent B'],
    dependencies: ['Raw Log Ingestion', 'Schema Telemetry Node'],
    recentFailureHistory: [],
  },
  {
    id: 'agent-b',
    name: 'Forge-02',
    role: 'Implementer',
    title: 'Code Synthesizer & Patch Builder',
    status: 'running',
    accentColor: '#FB923C', // Peach/orange
    themeClass: 'bg-amber-50 border-orange-200 text-amber-950',
    currentTask: 'TASK-102: Inject Cypher atomic upsert for transaction tokens',
    tasksCompleted: 2,
    findingsCount: 1,
    lastActive: 'Just now',
    pixelAvatar: 'implementer',
    bio: 'Constructs targeted diffs, enforces database constraints, and wires transactional safety patterns across services.',
    incomingHandoffs: ['TASK-101: Findings from Scout-01'],
    outgoingHandoffs: ['TASK-103: Staging Verification Suite to Agent C'],
    dependencies: ['TASK-101: Finding #FND-901'],
    recentFailureHistory: [
      {
        task: 'TASK-102 (Attempt 1)',
        reason: 'AST parser encountered missing TypeScript declaration in legacy helper',
        recovered: true,
        timestamp: '18m ago',
      },
    ],
  },
  {
    id: 'agent-c',
    name: 'Sentinel-03',
    role: 'Verifier',
    title: 'Acceptance & Regression Verifier',
    status: 'waiting',
    accentColor: '#A78BFA', // Lavender/mint
    themeClass: 'bg-indigo-50 border-indigo-200 text-indigo-950',
    currentTask: 'TASK-103: Run concurrent stress tests with duplicate nonce attack',
    tasksCompleted: 3,
    findingsCount: 2,
    lastActive: 'Waiting on Agent B',
    pixelAvatar: 'verifier',
    bio: 'Runs synthetic acceptance tests, validates graph invariants, and guarantees no state mutation leaks under race conditions.',
    incomingHandoffs: ['Pending patch artifact from Forge-02'],
    outgoingHandoffs: ['Release Approval Node #REL-44'],
    dependencies: ['TASK-102: Patch Verification Bundle'],
    recentFailureHistory: [],
  },
];

export const mockTasks: Task[] = [
  {
    id: 'TASK-101',
    title: 'Investigate payment webhook race condition',
    description: 'Inspect stack traces and trace concurrent token deduplication failures in checkout services.',
    stage: 'research',
    assignedTo: 'agent-a',
    status: 'completed',
    priority: 'critical',
    dependencies: [],
    outputs: ['FINDING-901', 'DECISION-301'],
    evidenceIds: ['EV-01', 'EV-02'],
    startedAt: '14:02:10 UTC',
    completedAt: '14:14:45 UTC',
  },
  {
    id: 'TASK-102',
    title: 'Implement atomic Cypher guard in FalkorDB layer',
    description: 'Replace non-atomic SELECT-then-INSERT with atomic `MERGE (t:Tx {id: $id}) ON CREATE SET ...` pattern.',
    stage: 'implement',
    assignedTo: 'agent-b',
    status: 'running',
    priority: 'high',
    dependencies: ['TASK-101'],
    outputs: ['PATCH-DIFF-42', 'DECISION-302'],
    evidenceIds: ['EV-03'],
    startedAt: '14:15:02 UTC',
  },
  {
    id: 'TASK-103',
    title: 'Verify zero double-spend with 50 parallel concurrent mock webhooks',
    description: 'Spawn synthetic concurrency load with simulated network jitter to assert absolute graph idempotency.',
    stage: 'verify',
    assignedTo: 'agent-c',
    status: 'pending',
    priority: 'critical',
    dependencies: ['TASK-102'],
    outputs: [],
    evidenceIds: [],
  },
];

export const mockFindings: Finding[] = [
  {
    id: 'FINDING-901',
    title: 'Unindexed Idempotency Check in Webhook Handler',
    summary:
      'The payment event consumer queries memory cache with a 50ms TTL window before locking the row, permitting simultaneous duplicate delivery across worker nodes.',
    sourceAgentId: 'agent-a',
    taskId: 'TASK-101',
    confidence: 0.98,
    provenance: {
      fileOrResource: 'services/webhook/consumer.ts',
      lineNumbers: 'L84-L112',
      queryExecuted: 'MATCH (e:Event {id: $id}) RETURN e',
      contextSnippet: 'const existing = await cache.get(eventId); if (!existing) { await db.insert(...); }',
    },
    timestamp: '14:12:00 UTC',
    impactScore: 'high',
  },
  {
    id: 'FINDING-902',
    title: 'FalkorDB Graph Constraint Omission on Event UUID',
    summary:
      'The target node `WebhookEvent` did not have an active uniqueness constraint asserted, allowing duplicate node instances under high network concurrency.',
    sourceAgentId: 'agent-a',
    taskId: 'TASK-101',
    confidence: 0.94,
    provenance: {
      fileOrResource: 'schema/graph_constraints.cypher',
      lineNumbers: 'L12',
      queryExecuted: 'CALL db.constraints() YIELD label, properties',
      contextSnippet: 'Missing: CREATE CONSTRAINT FOR (w:WebhookEvent) REQUIRE w.uuid IS UNIQUE',
    },
    timestamp: '14:14:20 UTC',
    impactScore: 'high',
  },
  {
    id: 'FINDING-903',
    title: 'AST Syntax Validation for Safe Transpilation',
    summary:
      'Scoped type declarations in `@types/falkordb` resolved safely after updating Cypher parameter mappings.',
    sourceAgentId: 'agent-b',
    taskId: 'TASK-102',
    confidence: 0.91,
    provenance: {
      fileOrResource: 'src/lib/falkor_client.ts',
      lineNumbers: 'L33-L41',
      contextSnippet: 'export type GraphTxParams = { uuid: string; amount: number; currency: string };',
    },
    timestamp: '14:22:15 UTC',
    impactScore: 'medium',
  },
];

export const mockDecisions: Decision[] = [
  {
    id: 'DECISION-301',
    title: 'Adopt FalkorDB Atomic Cypher MERGE over Redis Semaphore',
    rationale:
      'Redis distributed locks incur network roundtrips and failure timeouts. FalkorDB graph transactions provide ACID isolation directly on the transaction entity graph.',
    agentId: 'agent-a',
    taskId: 'TASK-101',
    supportedByFindingIds: ['FINDING-901', 'FINDING-902'],
    outcome: 'strategy_pivot',
    timestamp: '14:14:40 UTC',
  },
  {
    id: 'DECISION-302',
    title: 'Add Unique Constraint & ON CREATE Transaction Guard',
    rationale:
      'Ensures graph engine rejects concurrent duplicates natively at the storage engine level with zero memory leaks.',
    agentId: 'agent-b',
    taskId: 'TASK-102',
    supportedByFindingIds: ['FINDING-902', 'FINDING-903'],
    outcome: 'fix_applied',
    timestamp: '14:25:30 UTC',
  },
];

export const mockMemoryRecords: MemoryRecord[] = [
  {
    id: 'MEM-01',
    title: 'Webhook Idempotency Race Condition Analysis',
    category: 'findings',
    contentSummary:
      'Identified window of vulnerability where duplicate webhooks within 50ms bypass cache check.',
    sourceAgentId: 'agent-a',
    relatedTaskId: 'TASK-101',
    provenance: 'services/webhook/consumer.ts:L84-112',
    connectedEntities: ['TASK-101', 'FINDING-901', 'Scout-01'],
    createdAt: '14:12:00 UTC',
    isFact: true,
  },
  {
    id: 'MEM-02',
    title: 'Architectural Shift: Native Graph MERGE vs Distributed Locks',
    category: 'decisions',
    contentSummary:
      'Elected FalkorDB native graph locking over distributed Redis locks to minimize cascade timeout risks.',
    sourceAgentId: 'agent-a',
    relatedTaskId: 'TASK-101',
    provenance: 'FalkorDB Documentation & Concurrency Benchmarks',
    connectedEntities: ['DECISION-301', 'FINDING-901', 'FINDING-902'],
    createdAt: '14:14:40 UTC',
    isFact: true,
  },
  {
    id: 'MEM-03',
    title: 'Handoff Protocol: Scout-01 -> Forge-02',
    category: 'handoffs',
    contentSummary:
      'Context package containing AST snippet, stack trace, and Cypher uniqueness constraint recommendation passed to Forge-02.',
    sourceAgentId: 'agent-a',
    relatedTaskId: 'TASK-101',
    provenance: 'RelayGraph Context Broker #PKG-809',
    connectedEntities: ['Scout-01', 'Forge-02', 'TASK-102'],
    createdAt: '14:15:00 UTC',
    isFact: true,
  },
  {
    id: 'MEM-04',
    title: 'Reusable Procedure: Safe Atomic Node Ingestion in FalkorDB',
    category: 'procedures',
    contentSummary:
      'Standardized pattern: MERGE (node:Type {uuid: $uuid}) ON CREATE SET node.created_at = timestamp() ON MATCH SET node.duplicate_count = node.duplicate_count + 1 RETURN node',
    sourceAgentId: 'agent-b',
    relatedTaskId: 'TASK-102',
    provenance: 'lib/graph/transactions.ts',
    connectedEntities: ['TASK-102', 'DECISION-302'],
    createdAt: '14:26:00 UTC',
    isFact: true,
  },
  {
    id: 'MEM-05',
    title: 'Hypothesis: Payment Gateway Retry Backoff Pattern',
    category: 'findings',
    contentSummary:
      'Preliminary hypothesis that Stripe retry waves group in tight bursts of 3 queries during network latency spikes.',
    sourceAgentId: 'agent-a',
    relatedTaskId: 'TASK-101',
    provenance: 'Telemetry sample window #W-390',
    connectedEntities: ['Scout-01', 'TASK-101'],
    createdAt: '14:05:00 UTC',
    isFact: false, // proposed conclusion
  },
];

export const mockGraphNodes: GraphNode[] = [
  // Agents
  {
    id: 'agent-a',
    label: 'Agent A: Scout-01',
    type: 'agent',
    subType: 'Investigator',
    details: {
      status: 'completed',
      owner: 'System',
      summary: 'Root Cause Investigator',
      metrics: '3 Findings, 1 Decision',
    },
    x: 100,
    y: 120,
  },
  {
    id: 'agent-b',
    label: 'Agent B: Forge-02',
    type: 'agent',
    subType: 'Implementer',
    details: {
      status: 'running',
      owner: 'System',
      summary: 'Code Synthesizer & Patch Builder',
      metrics: '1 Finding, 1 Decision',
    },
    x: 440,
    y: 120,
  },
  {
    id: 'agent-c',
    label: 'Agent C: Sentinel-03',
    type: 'agent',
    subType: 'Verifier',
    details: {
      status: 'waiting',
      owner: 'System',
      summary: 'Acceptance & Regression Verifier',
      metrics: 'Awaiting patch dependency',
    },
    x: 780,
    y: 120,
  },

  // Tasks
  {
    id: 'TASK-101',
    label: 'TASK-101: Triage Bug',
    type: 'task',
    subType: 'research',
    details: {
      status: 'completed',
      owner: 'Agent A',
      summary: 'Investigate payment webhook race condition',
      timestamp: '14:14 UTC',
    },
    x: 100,
    y: 300,
  },
  {
    id: 'TASK-102',
    label: 'TASK-102: Atomic Guard',
    type: 'task',
    subType: 'implement',
    details: {
      status: 'running',
      owner: 'Agent B',
      summary: 'Inject Cypher atomic upsert for transaction tokens',
      timestamp: '14:15 UTC',
    },
    x: 440,
    y: 300,
  },
  {
    id: 'TASK-103',
    label: 'TASK-103: Concurrency Test',
    type: 'task',
    subType: 'verify',
    details: {
      status: 'pending',
      owner: 'Agent C',
      summary: 'Run 50 parallel concurrent webhook attacks',
      timestamp: 'Pending',
    },
    x: 780,
    y: 300,
  },

  // Findings
  {
    id: 'FINDING-901',
    label: 'FND-901: Race Window',
    type: 'finding',
    details: {
      owner: 'Agent A',
      summary: 'Unindexed Idempotency Check in Webhook Handler (50ms gap)',
      timestamp: '14:12 UTC',
    },
    x: 100,
    y: 470,
  },
  {
    id: 'FINDING-902',
    label: 'FND-902: Missing Constraint',
    type: 'finding',
    details: {
      owner: 'Agent A',
      summary: 'FalkorDB Graph Constraint Omission on Event UUID',
      timestamp: '14:14 UTC',
    },
    x: 270,
    y: 470,
  },

  // Decisions
  {
    id: 'DECISION-301',
    label: 'DEC-301: Graph MERGE',
    type: 'decision',
    details: {
      owner: 'Agent A',
      summary: 'Adopt FalkorDB Atomic Cypher MERGE over Redis lock',
      timestamp: '14:14 UTC',
    },
    x: 350,
    y: 390,
  },
  {
    id: 'DECISION-302',
    label: 'DEC-302: Unique Index',
    type: 'decision',
    details: {
      owner: 'Agent B',
      summary: 'Add Unique Constraint & ON CREATE Guard',
      timestamp: '14:25 UTC',
    },
    x: 610,
    y: 470,
  },

  // Events
  {
    id: 'EV-RECOVERY',
    label: 'EVENT: Auto-Recovery',
    type: 'event',
    details: {
      owner: 'Agent B',
      summary: 'Worker recovered after AST transpilation fault using FalkorDB checkpoint',
      timestamp: '14:18 UTC',
    },
    x: 520,
    y: 210,
  },
];

export const mockGraphEdges: GraphEdge[] = [
  { id: 'e1', source: 'agent-a', target: 'TASK-101', relationship: 'OWNS', label: 'executes' },
  { id: 'e2', source: 'TASK-101', target: 'FINDING-901', relationship: 'PRODUCED', label: 'discovered' },
  { id: 'e3', source: 'TASK-101', target: 'FINDING-902', relationship: 'PRODUCED', label: 'discovered' },
  { id: 'e4', source: 'FINDING-901', target: 'DECISION-301', relationship: 'INFORMS', label: 'substantiates' },
  { id: 'e5', source: 'FINDING-902', target: 'DECISION-301', relationship: 'INFORMS', label: 'substantiates' },
  { id: 'e6', source: 'TASK-102', target: 'TASK-101', relationship: 'DEPENDS_ON', label: 'depends on findings' },
  { id: 'e7', source: 'agent-b', target: 'TASK-102', relationship: 'OWNS', label: 'executes' },
  { id: 'e8', source: 'DECISION-301', target: 'TASK-102', relationship: 'INFORMS', label: 'guides implementation' },
  { id: 'e9', source: 'TASK-102', target: 'DECISION-302', relationship: 'PRODUCED', label: 'decided fix' },
  { id: 'e10', source: 'agent-b', target: 'EV-RECOVERY', relationship: 'HAS_EVENT', label: 'checkpoint resumed' },
  { id: 'e11', source: 'TASK-103', target: 'TASK-102', relationship: 'DEPENDS_ON', label: 'awaits patch diff' },
  { id: 'e12', source: 'agent-c', target: 'TASK-103', relationship: 'OWNS', label: 'executes' },
];

export const mockActivityEvents: ActivityEvent[] = [
  {
    id: 'act-01',
    timestamp: '14:02:10 UTC',
    agentId: 'agent-a',
    actorName: 'Scout-01 (Investigator)',
    eventType: 'finding_recorded',
    taskId: 'TASK-101',
    description: 'Investigator scanned 43 commits and identified lack of atomic locking in webhook router.',
    attemptId: 'att-1',
    result: 'success',
  },
  {
    id: 'act-02',
    timestamp: '14:12:00 UTC',
    agentId: 'agent-a',
    actorName: 'Scout-01 (Investigator)',
    eventType: 'finding_recorded',
    taskId: 'TASK-101',
    description: 'Recorded FINDING-901: 50ms concurrency vulnerability in consumer cache.',
    attemptId: 'att-1',
    result: 'success',
  },
  {
    id: 'act-03',
    timestamp: '14:14:45 UTC',
    agentId: 'agent-a',
    actorName: 'Scout-01 (Investigator)',
    eventType: 'task_completed',
    taskId: 'TASK-101',
    description: 'TASK-101 completed. Findings and architecture decision DECISION-301 committed to FalkorDB.',
    attemptId: 'att-1',
    result: 'success',
  },
  {
    id: 'act-04',
    timestamp: '14:15:02 UTC',
    agentId: 'agent-b',
    actorName: 'Forge-02 (Implementer)',
    eventType: 'handoff_received',
    taskId: 'TASK-102',
    description: 'Implementer received handoff package #PKG-809 with graph findings from Scout-01.',
    attemptId: 'att-1',
    result: 'success',
  },
  {
    id: 'act-05',
    timestamp: '14:17:30 UTC',
    agentId: 'agent-b',
    actorName: 'Forge-02 (Implementer)',
    eventType: 'worker_interrupted',
    taskId: 'TASK-102',
    description: 'Worker interrupted: AST parser encountered syntax error in legacy module. Process crashed.',
    attemptId: 'att-1',
    result: 'failure',
    isSimulated: true,
  },
  {
    id: 'act-06',
    timestamp: '14:18:10 UTC',
    agentId: 'agent-b',
    actorName: 'Forge-02 (Implementer)',
    eventType: 'recovery_attempted',
    taskId: 'TASK-102',
    description: 'Recovery engine retrieved last FalkorDB graph checkpoint (State: Post-AST-Scan). Resumed at step 3.',
    attemptId: 'att-2',
    result: 'success',
    isSimulated: true,
  },
  {
    id: 'act-07',
    timestamp: '14:25:30 UTC',
    agentId: 'agent-b',
    actorName: 'Forge-02 (Implementer)',
    eventType: 'finding_recorded',
    taskId: 'TASK-102',
    description: 'Synthesized atomic Cypher MERGE query and updated FalkorDB schema constraint definition.',
    attemptId: 'att-2',
    result: 'in_progress',
  },
  {
    id: 'act-08',
    timestamp: '14:26:00 UTC',
    agentId: 'agent-c',
    actorName: 'Sentinel-03 (Verifier)',
    eventType: 'dependency_satisfied',
    taskId: 'TASK-103',
    description: 'Dependency graph updated: waiting on patch artifact compilation before triggering concurrency tests.',
    attemptId: 'att-1',
    result: 'in_progress',
  },
];

export const mockRecoveryState: RecoveryState = {
  isInterrupted: false,
  interruptedTaskId: 'TASK-102',
  lastPersistedState: 'CHECKPOINT-UUID-7719 (FalkorDB Graph Node State: AST_ANALYZED)',
  previousAttempt: 'att-1 (Crashed at 14:17:30 UTC due to syntax fault)',
  recoveryDecision: 'Read parent findings from FalkorDB; skip clean restart; resume worker with patch isolation container.',
  recoveryAction: 'resume',
  finalVerifiedOutcome: 'Active worker Forge-02 resumed cleanly in attempt att-2; graph invariants preserved with zero duplicate writes.',
  isSimulated: true,
  attemptCount: 2,
};

export const mockLessons: Lesson[] = [
  {
    id: 1,
    title: 'What is a graph database?',
    slug: 'what-is-a-graph-database',
    category: 'Foundations',
    explanation:
      'A graph database stores data in nodes (entities) and edges (relationships) as first-class citizens. Unlike relational tables with expensive multi-table JOINs, graphs use pointer chasing (index-free adjacency) to traverse complex webs of connections in constant time per hop.',
    whyRelayGraphNeedsIt:
      'RelayGraph coordinates multiple agents whose actions, findings, hypotheses, and task dependencies form a rich network. Relational tables would require convoluted foreign-key joins, while a graph models multi-agent collaboration naturally.',
    technicalExample: {
      language: 'cypher',
      code: `// Connecting an Agent to a Finding in FalkorDB
CREATE (a:Agent {name: 'Scout-01', role: 'Investigator'})
CREATE (f:Finding {id: 'FND-901', summary: 'Webhook race condition'})
CREATE (a)-[:PRODUCED {timestamp: timestamp()}]->(f)`,
    },
    commonMistake:
      'Treating graph nodes like isolated relational rows and failing to express key relationships as typed edges.',
    interviewTakeaway:
      'Graph databases excel when queries ask questions about connections, multi-step dependency paths, and provenance rather than aggregate flat table calculations.',
    knowledgeCheck: {
      question: 'Why does FalkorDB perform multi-hop relationship lookups faster than SQL tables with multiple JOINs?',
      options: [
        'FalkorDB stores pointers directly between related nodes (index-free adjacency) instead of scanning join indexes',
        'FalkorDB converts all tables into flat CSV memory files',
        'FalkorDB requires only one single global database lock',
      ],
      correctIndex: 0,
      explanation:
        'Graph engines use pointer adjacency: traversing an edge takes O(1) time per relationship regardless of overall database size.',
    },
  },
  {
    id: 2,
    title: 'Nodes, relationships, labels, and properties',
    slug: 'nodes-relationships-labels-properties',
    category: 'Foundations',
    explanation:
      'Nodes represent things (agents, tasks, code files). Labels group nodes into categories (`:Agent`, `:Task`). Relationships connect two nodes with a direction and a type (`:DEPENDS_ON`). Properties are key-value attributes stored on both nodes and relationships.',
    whyRelayGraphNeedsIt:
      'Allows distinguishing an Agent node from a Task node while attaching status properties (`status: "running"`) and relationship metadata (`confidence: 0.98`).',
    technicalExample: {
      language: 'cypher',
      code: `// Expressing a dependency with metadata
MATCH (t1:Task {id: 'TASK-102'}), (t2:Task {id: 'TASK-101'})
MERGE (t1)-[r:DEPENDS_ON {type: 'strict', verified: true}]->(t2)`,
    },
    commonMistake:
      'Embedding related IDs inside a string array property instead of creating an explicit edge in the graph.',
    interviewTakeaway:
      'Rich properties on edges (like weight, latency, or confidence) turn passive diagrams into active computable decision graphs.',
    knowledgeCheck: {
      question: 'Which of the following should be modeled as an explicit graph edge rather than a JSON property?',
      options: [
        'A task priority level ("high")',
        'A dependency link connecting an Implementer task to an Investigator finding',
        'The timestamp when an agent started',
      ],
      correctIndex: 1,
      explanation:
        'Connections between distinct entities that represent dependencies or provenance should be graph edges for fast traversal and reasoning.',
    },
  },
  {
    id: 3,
    title: 'Basic Cypher queries',
    slug: 'basic-cypher-queries',
    category: 'Querying',
    explanation:
      'Cypher is the standard declarative query language for graph databases. It uses ASCII art pattern matching: `(node)-[:RELATIONSHIP]->(target)`.',
    whyRelayGraphNeedsIt:
      'Agents query FalkorDB using Cypher to discover available unblocked tasks, inspect peer findings, and verify assertions.',
    technicalExample: {
      language: 'cypher',
      code: `// Find all unblocked tasks ready for Agent B
MATCH (t:Task {status: 'pending'})
WHERE NOT (t)-[:DEPENDS_ON]->(:Task {status: 'running'})
  AND NOT (t)-[:DEPENDS_ON]->(:Task {status: 'pending'})
RETURN t.id, t.title`,
    },
    commonMistake:
      'Writing procedural looping code in the client instead of letting Cypher pattern matching find the subgraph in one query.',
    interviewTakeaway:
      'Cypher declarative clauses (MATCH, WHERE, MERGE, RETURN) let you express complex graph logic in readable sentences.',
    knowledgeCheck: {
      question: 'In Cypher syntax, what does `(a)-[:PRODUCED]->(b)` represent?',
      options: [
        'A directed relationship of type PRODUCED from node a to node b',
        'A comparison checking if a is mathematically greater than b',
        'A relational foreign key cascade delete operation',
      ],
      correctIndex: 0,
      explanation:
        'The ASCII arrow `(a)-[:PRODUCED]->(b)` represents a directed relationship from source node a to target node b.',
    },
  },
  {
    id: 4,
    title: 'Graph traversal and multi-hop reasoning',
    slug: 'graph-traversal-multi-hop-reasoning',
    category: 'Reasoning',
    explanation:
      'Multi-hop queries traverse chains of connected nodes to discover indirect relationships (e.g., finding all code files impacted by a root cause three steps removed).',
    whyRelayGraphNeedsIt:
      'Agent C (Verifier) uses multi-hop traversal to follow the chain: `(Verifier)-[:CHECKS]->(Task)-[:DEPENDS_ON]->(Decision)-[:SUPPORTED_BY]->(Finding)` to audit full provenance.',
    technicalExample: {
      language: 'cypher',
      code: `// Trace 1 to 3 hops of provenance from a Decision
MATCH path = (d:Decision {id: 'DECISION-301'})-[:SUPPORTED_BY*1..3]->(evidence)
RETURN path`,
    },
    commonMistake:
      'Unbounded traversal `*..` without hop limits on dense graphs, which can trigger graph traversal explosions.',
    interviewTakeaway:
      'Bounded multi-hop reasoning (`*1..3`) gives LLM agents instant verifiable context chains without prompt bloat.',
    knowledgeCheck: {
      question: 'What is the purpose of limiting variable length paths to `*1..3`?',
      options: [
        'To prevent unbounded graph traversals from causing performance degradation',
        'Because FalkorDB only supports up to 3 nodes total',
        'Because Cypher cannot traverse more than one edge type',
      ],
      correctIndex: 0,
      explanation:
        'Bounding path depth protects against runaway traversals in large or cyclic graphs while retrieving necessary context.',
    },
  },
  {
    id: 5,
    title: 'Persistent agent memory',
    slug: 'persistent-agent-memory',
    category: 'Memory',
    explanation:
      'Standard LLM sessions suffer from amnesia when context windows reset or workers crash. Persistent graph memory stores facts, decisions, and artifacts in an external graph so any agent can pick up where others left off.',
    whyRelayGraphNeedsIt:
      'Agent B immediately knows what Agent A learned about the webhook race condition without re-reading the entire git commit log or passing 100,000 tokens through the prompt.',
    technicalExample: {
      language: 'cypher',
      code: `// Querying persistent memory for verified facts
MATCH (m:MemoryRecord {isFact: true})
WHERE m.category IN ['findings', 'decisions']
RETURN m.title, m.contentSummary, m.provenance
ORDER BY m.createdAt DESC LIMIT 5`,
    },
    commonMistake:
      'Storing unstructured chat transcripts as raw text rather than structured, typed knowledge nodes with explicit provenance.',
    interviewTakeaway:
      'External structured graph memory beats vector-only search when relationships and strict causality matter.',
    knowledgeCheck: {
      question: 'Why is structured graph memory superior to raw chat transcript dumping for multi-agent workflows?',
      options: [
        'It allows agents to query specific verified facts and provenance without filling LLM context windows with conversational noise',
        'It forces all agents to use the exact same temperature setting',
        'It makes LLM tokens completely free of charge',
      ],
      correctIndex: 0,
      explanation:
        'Structured graph nodes preserve atomic facts, causal chains, and provenance while keeping prompt contexts lean.',
    },
  },
  {
    id: 6,
    title: 'Task state machines',
    slug: 'task-state-machines',
    category: 'Coordination',
    explanation:
      'Tasks in RelayGraph transition through a deterministic finite state machine: `pending` -> `running` -> `completed` (or `failed` -> `recovering`). States are strictly tracked as node properties.',
    whyRelayGraphNeedsIt:
      'Prevents race conditions where two agents attempt to execute the same task simultaneously or run steps before dependencies pass.',
    technicalExample: {
      language: 'typescript',
      code: `type TaskState = 'pending' | 'running' | 'completed' | 'failed' | 'recovering';

function canTransition(current: TaskState, next: TaskState): boolean {
  const transitions: Record<TaskState, TaskState[]> = {
    pending: ['running'],
    running: ['completed', 'failed'],
    failed: ['recovering'],
    recovering: ['running', 'failed'],
    completed: []
  };
  return transitions[current].includes(next);
}`,
    },
    commonMistake:
      'Allowing arbitrary state transitions that skip verification or leave zombie tasks in undefined states.',
    interviewTakeaway:
      'Deterministic state machines prevent chaotic emergent failure modes in autonomous multi-agent swarms.',
    knowledgeCheck: {
      question: 'Which transition is valid when a running task encounters an unhandled exception?',
      options: [
        'running -> failed',
        'running -> completed',
        'running -> pending (silent reset without failure state)',
      ],
      correctIndex: 0,
      explanation:
        'A failure must be explicitly transitioned to `failed` so the recovery controller can log the fault and schedule recovery.',
    },
  },
  {
    id: 7,
    title: 'Handoffs and dependency resolution',
    slug: 'handoffs-and-dependency-resolution',
    category: 'Coordination',
    explanation:
      'A handoff occurs when an agent completes a task and attaches an explicit output bundle (findings, diffs) to the graph. Downstream agents are unblocked only when all dependency nodes transition to `completed`.',
    whyRelayGraphNeedsIt:
      'Agent B should never start writing code until Agent A has verified the root cause finding.',
    technicalExample: {
      language: 'cypher',
      code: `// Atomically check if all dependencies are satisfied
MATCH (t:Task {id: $taskId})
OPTIONAL MATCH (t)-[:DEPENDS_ON]->(dep:Task)
WITH t, count(dep) AS totalDeps,
     count(CASE WHEN dep.status = 'completed' THEN 1 END) AS completedDeps
WHERE totalDeps = completedDeps
RETURN t.id AS unblockedTaskId`,
    },
    commonMistake:
      'Relying on timing delays or loose callbacks instead of evaluating strict graph dependency topology.',
    interviewTakeaway:
      'Topological dependency resolution in graphs guarantees correct execution order even with hundreds of asynchronous sub-tasks.',
    knowledgeCheck: {
      question: 'When should Agent C (Verifier) begin test execution?',
      options: [
        'Only after all upstream dependency tasks in the graph have reached `completed` state',
        'Immediately when Agent B starts writing code',
        'After a 10-second arbitrary timer elapses',
      ],
      correctIndex: 0,
      explanation:
        'Dependency edges in the graph dictate readiness; tasks execute only when all upstream dependency nodes are satisfied.',
    },
  },
  {
    id: 8,
    title: 'Idempotency and duplicate execution',
    slug: 'idempotency-and-duplicate-execution',
    category: 'Resilience',
    explanation:
      'Idempotency ensures that performing an operation multiple times produces the exact same side effects as performing it once. In graphs, `MERGE` statements provide atomic idempotency.',
    whyRelayGraphNeedsIt:
      'Network timeouts, agent retries, or duplicate webhook payloads could lead to duplicated database records without idempotency keys.',
    technicalExample: {
      language: 'cypher',
      code: `// Idempotent node creation with MERGE
MERGE (evt:WebhookEvent {id: $eventId})
ON CREATE SET evt.firstSeen = timestamp(), evt.processCount = 1
ON MATCH SET evt.duplicateHits = coalesce(evt.duplicateHits, 0) + 1
RETURN evt`,
    },
    commonMistake:
      'Running a `MATCH` followed by an application-level `CREATE`, leaving a concurrent race window between the two commands.',
    interviewTakeaway:
      'Always push idempotency locks into the database transaction layer using atomic Cypher `MERGE`.',
    knowledgeCheck: {
      question: 'Why does Cypher `MERGE` prevent duplicate entities during concurrent worker retries?',
      options: [
        'It atomically finds or creates the node within a single transaction lock',
        'It automatically cancels other agents from running',
        'It changes the primary key to a random number',
      ],
      correctIndex: 0,
      explanation:
        'MERGE combines matching and creation atomically within FalkorDB, ensuring only a single node is created even if called concurrently.',
    },
  },
  {
    id: 9,
    title: 'Failure recovery',
    slug: 'failure-recovery',
    category: 'Resilience',
    explanation:
      'When an AI worker crashes, RelayGraph inspects the last persisted graph checkpoint. The system decides whether to retry the task from scratch, resume from the checkpoint, or rollback to a stable branch.',
    whyRelayGraphNeedsIt:
      'Agent B crashed during AST generation. Instead of restarting the entire mission from Agent A, RelayGraph read the graph state, identified the checkpoint, and resumed Agent B cleanly.',
    technicalExample: {
      language: 'typescript',
      code: `async function handleRecovery(agentId: string, failedTaskId: string) {
  const checkpoint = await falkor.getLatestCheckpoint(failedTaskId);
  if (checkpoint.isReusable) {
    return { action: 'resume', state: checkpoint.stateSnapshot };
  }
  return { action: 'retry', fromStep: 1 };
}`,
    },
    commonMistake:
      'Displaying "recovered successfully" before confirming that the recovery transaction actually succeeded in the application state.',
    interviewTakeaway:
      'Stateful checkpointing turns brittle AI pipelines into fault-tolerant distributed systems.',
    knowledgeCheck: {
      question: 'What is the primary advantage of resuming from a graph checkpoint over restarting the entire pipeline?',
      options: [
        'Preserving verified upstream findings and saving expensive LLM tokens and execution time',
        'Hiding errors so the user never knows something broke',
        'Allowing failing code to run without ever fixing it',
      ],
      correctIndex: 0,
      explanation:
        'Checkpoint recovery avoids repeating expensive exploratory tasks like AST indexing or root-cause searches.',
    },
  },
  {
    id: 10,
    title: 'Evaluation and benchmarking',
    slug: 'evaluation-and-benchmarking',
    category: 'Evaluation',
    explanation:
      'Measuring multi-agent performance requires objective benchmarks: task completion rate, recovery rate from injected faults, duplicate effect count, and token overhead.',
    whyRelayGraphNeedsIt:
      'Demonstrates quantifiable improvements over baseline stateless agent frameworks during the hackathon.',
    technicalExample: {
      language: 'json',
      code: `{
  "benchmark": "Webhook Race Condition Recovery",
  "baseline_stateless": {
    "completion_rate": "54%",
    "recovery_rate": "12%",
    "duplicate_effects": 8
  },
  "relay_graph": {
    "completion_rate": "96%",
    "recovery_rate": "89%",
    "duplicate_effects": 0
  }
}`,
    },
    commonMistake:
      'Claiming benchmark wins without specifying the test scenario, baseline conditions, or sample status.',
    interviewTakeaway:
      'Rigorous benchmarking with failure injection is the gold standard for proving AI agent reliability in production.',
    knowledgeCheck: {
      question: 'Which metric best reflects RelayGraph’s resilience against race conditions and retries?',
      options: [
        'Zero duplicate effects under concurrent replay attacks',
        'Total number of CSS lines compiled',
        'How fast the landing page animations load',
      ],
      correctIndex: 0,
      explanation:
        'Idempotency and deduplication guarantee that retrying failed tasks never causes double-charging or corrupt state.',
    },
  },
];

export const mockAchievements: Achievement[] = [
  {
    id: 'ach-01',
    title: 'First Graph Query',
    description: 'Executed atomic Cypher pattern match against FalkorDB node hierarchy.',
    iconName: 'Database',
    isUnlocked: true,
    unlockedAt: '14:02 UTC',
    requirementDescription: 'Perform 1 Cypher query against FalkorDB context layer.',
  },
  {
    id: 'ach-02',
    title: 'First Successful Handoff',
    description: 'Investigator completed diagnosis and cleanly handed off context package to Implementer.',
    iconName: 'GitFork',
    isUnlocked: true,
    unlockedAt: '14:15 UTC',
    requirementDescription: 'Complete an agent-to-agent task handoff with verified outputs.',
  },
  {
    id: 'ach-03',
    title: 'Persistent Memory',
    description: 'Recorded verified finding and architectural decision nodes with source provenance.',
    iconName: 'BrainCircuit',
    isUnlocked: true,
    unlockedAt: '14:14 UTC',
    requirementDescription: 'Persist 3+ verified memory records into the graph memory explorer.',
  },
  {
    id: 'ach-04',
    title: 'Recovery Verified',
    description: 'Worker recovered cleanly from injected syntax crash using FalkorDB graph checkpoint.',
    iconName: 'ShieldAlert',
    isUnlocked: true,
    unlockedAt: '14:18 UTC',
    requirementDescription: 'Resume an interrupted task attempt without repeating upstream findings.',
  },
  {
    id: 'ach-05',
    title: 'Evidence-Backed Decision',
    description: 'Decision node linked directly to 2 corroborating code telemetry findings in the graph.',
    iconName: 'Link',
    isUnlocked: true,
    unlockedAt: '14:14 UTC',
    requirementDescription: 'Create a decision supported by at least two distinct graph findings.',
  },
  {
    id: 'ach-06',
    title: 'Benchmark Completed',
    description: 'Execute automated concurrency benchmark suite to evaluate idempotency and recovery.',
    iconName: 'Trophy',
    isUnlocked: false,
    requirementDescription: 'Run the full 50-client synthetic concurrency attack suite.',
  },
];

export const mockBenchmarkSummary: BenchmarkSummary = {
  scenario: '50 Concurrent Webhook Replays with Simulated Worker Failure',
  baselineResult: {
    completionRate: '54.2%',
    recoveryRate: '12.5%',
    duplicateEffects: 8,
    avgTokenUsage: '142,500 tokens',
    avgTime: '4m 12s',
  },
  relayGraphResult: {
    completionRate: '96.8%',
    recoveryRate: '88.9%',
    duplicateEffects: 0,
    avgTokenUsage: '48,200 tokens',
    avgTime: '1m 24s',
  },
  isSampleData: true,
};
