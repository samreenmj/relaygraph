# RelayGraph — Multi-Agent Coordination & Persistent Memory

RelayGraph is a graph-backed persistent memory and agent coordination system built for the **FalkorDB Graph Hacks** hackathon.

It coordinates three specialized AI workers:
- **Agent A — Investigator (Scout-01):** Analyzes telemetry, traces root causes, and records structured findings.
- **Agent B — Implementer (Forge-02):** Receives verified findings and applies atomic code/schema mutations.
- **Agent C — Verifier (Sentinel-03):** Runs stress tests against acceptance criteria to ensure zero regressions and state invariant preservation.

---

## 🎨 Visual Identity: Pixel-Art Adventure Meets Bento UI

- **Pixel-Art Mascots:** Distinct SVG pixel avatars for each specialized agent.
- **Bento Card Architecture:** Clean, rounded cards with soft lavender (`#E9E4FF`), cream (`#FFF9F0`), mint (`#D9F5E8`), sky blue (`#DCEEFF`), and peach (`#FFE2D2`) accents.
- **Typography & Theme:** Deep indigo (`#5145E5`) and dark-purple navigation accents, subtle borders, restrained shadows, and game-inspired progress indicators.
- **Accessibility:** Status badges combine clear text labels and icons rather than relying on color alone.

---

## 🗺️ Application Screens & Capabilities

1. **Quest Dashboard (`/quest`):**
   - Active mission card with title, description, priority, acceptance criteria, and progress.
   - 3 Agent cards displaying live status, current task, findings count, and dossier inspect links.
   - Sequential pipeline stages: Research → Implement → Verify → Complete.
   - Chronological recent graph activity feed with fault injection labels.

2. **Knowledge Graph (`/graph`):**
   - Interactive canvas displaying FalkorDB nodes (`Agent`, `Task`, `Finding`, `Decision`, `Event`).
   - Relationships modeled: `OWNS`, `DEPENDS_ON`, `PRODUCED`, `INFORMS`, `HAS_EVENT`.
   - Pan/zoom controls, node type filters, and a node inspector panel showing Cypher paths and connected edges.

3. **Agent Dossiers (`/agents`):**
   - Dedicated inspection view for each worker.
   - Tasks completed, findings produced, heartbeat, and verified invariants.
   - Incoming/outgoing handoff pipelines and prerequisite dependency graph.
   - Fault injection and recovery history log.

4. **Persistent Memory Explorer (`/memory`):**
   - Categorized records: Findings, Decisions, Handoffs, Procedures.
   - Live search across titles, summaries, and file provenance.
   - Clear distinction between **Verified Facts** (persisted in FalkorDB) and **Proposed Hypotheses**.
   - Code snippet and Cypher provenance on every record.

5. **Activity Log & Recovery (`/activity`):**
   - 6-Step stateful recovery sequence pipeline:
     1. Interrupted Task
     2. Last Persisted State
     3. Previous Attempt
     4. Recovery Decision
     5. Action Chosen (Resume vs Retry)
     6. Final Verified Outcome
   - Chronological event timeline with Agent and Event Type filters.

6. **Interactive Learning Panel (`/learn`):**
   - Persistent slide-out drawer or full view.
   - 10 interactive lessons covering Graph Databases, Cypher, Multi-Hop Traversal, Persistent Memory, State Machines, Idempotency, and Failure Recovery.
   - Each lesson includes: concept explanation, why RelayGraph needs it, technical code examples, common pitfalls, interview takeaways, and an interactive knowledge-check quiz.

7. **Achievements & Benchmark Evaluation (`/achievements`):**
   - Gamified engineering milestones unlocked strictly by verified graph events.
   - Benchmark evaluation comparing baseline stateless loops against RelayGraph + FalkorDB (completion rate, fault recovery rate, duplicate ledger effects, token savings).

---

## 🏗️ Architecture & Component Hierarchy

```
src/
├── types/
│   └── relaygraph.ts          # Strict domain contracts and discriminated unions
├── mock/
│   └── relaygraphData.ts      # Coherent demo dataset with simulated fault injection
├── services/
│   └── apiClient.ts           # Typed API client with pluggable MockAdapter
├── components/
│   ├── PixelAvatar.tsx        # Crisp SVG pixel-art agent mascots
│   ├── StatusBadge.tsx        # Accessible status indicators (label + icon)
│   ├── AppSidebar.tsx         # Responsive desktop sidebar & mobile drawer
│   ├── TopBar.tsx             # System status, FalkorDB indicator, learn trigger
│   ├── MissionCard.tsx        # Bento quest card with criteria checklist
│   ├── MissionProgress.tsx    # Multi-stage mission pipeline
│   ├── AgentCard.tsx          # Reusable agent card
│   ├── AgentParty.tsx         # Bento party grid for the 3 agents
│   ├── AgentDetailsView.tsx   # Comprehensive agent dossier
│   ├── KnowledgeGraph.tsx     # Canvas with zoom, filters, and inspector
│   ├── ActivityFeed.tsx       # Chronological recent events
│   ├── ActivityRecoveryView.tsx # 6-Step recovery sequence & event filters
│   ├── MemoryExplorer.tsx     # Persistent memory search & provenance
│   ├── LearningPanel.tsx      # Interactive drawer with quizzes
│   └── AchievementsView.tsx   # Verified milestones & benchmark summary
└── app/
    ├── globals.css            # Tailwind theme tokens & pixel-border styles
    ├── layout.tsx             # Root layout with fonts & metadata
    └── page.tsx               # Orchestrator client page managing screen routing
```

---

## 🔌 Connecting to a Live Backend

RelayGraph uses an explicit typed client contract `IRelayGraphApiClient` defined in `src/services/apiClient.ts`.
By default, `apiClient` runs in **Demo Adapter Mode** (`isMockAdapter = true`), providing realistic sample data clearly labeled as demo data.

To connect to a live FalkorDB backend:
1. Implement `IRelayGraphApiClient` with real `fetch()` calls to your API endpoints.
2. Replace `export const apiClient = new MockRelayGraphApiClient();` with your live client instance in `src/services/apiClient.ts`.

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run production build
npm run build
```

The application will be served at `http://localhost:3000`.
