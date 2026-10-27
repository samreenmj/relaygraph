import { getGraphClient } from "./graph.js";

const graphName = () => process.env.FALKORDB_GRAPH ?? "relaygraph";

export async function createFindingNode(input: {
  id: string;
  missionId: string;
  agentId: string;
  summary: string;
}) {
  const client = await getGraphClient();
  const graph = client.selectGraph(graphName());

  await graph.query(
    `MATCH (m:Mission {id: $missionId})
     CREATE (f:Finding {
       id: $id,
       agentId: $agentId,
       summary: $summary,
       createdAt: $createdAt
     })
     CREATE (m)-[:HAS_FINDING]->(f)`,
    {
      params: {
        id: input.id,
        missionId: input.missionId,
        agentId: input.agentId,
        summary: input.summary,
        createdAt: new Date().toISOString(),
      },
    },
  );
}

export async function createHandoffRelationship(input: {
  missionId: string;
  handoffId: string;
  findingIds: string[];
}) {
  const client = await getGraphClient();
  const graph = client.selectGraph(graphName());

  await graph.query(
    `MATCH (m:Mission {id: $missionId})
     MERGE (a:Agent {id: 'investigator', role: 'investigator'})
     MERGE (b:Agent {id: 'implementer', role: 'implementer'})
     CREATE (h:Handoff {
       id: $handoffId,
       status: 'pending',
       createdAt: $createdAt
     })
     CREATE (a)-[:INITIATES]->(h)
     CREATE (h)-[:TARGETS]->(b)
     CREATE (m)-[:HAS_HANDOFF]->(h)
     WITH h
     UNWIND $findingIds AS findingId
     MATCH (f:Finding {id: findingId})
     CREATE (h)-[:CARRIES]->(f)`,
    {
      params: {
        missionId: input.missionId,
        handoffId: input.handoffId,
        findingIds: input.findingIds,
        createdAt: new Date().toISOString(),
      },
    },
  );
}

export async function getMissionGraphContext(missionId: string) {
  const client = await getGraphClient();
  const graph = client.selectGraph(graphName());

  const result = await graph.query(
    `MATCH (m:Mission {id: $missionId})
     OPTIONAL MATCH (m)-[:HAS_FINDING]->(f:Finding)
     OPTIONAL MATCH (m)-[:HAS_HANDOFF]->(h:Handoff)
     RETURN m, collect(DISTINCT f) AS findings,
       collect(DISTINCT h) AS handoffs`,
    { params: { missionId } },
  );

  return result.data;
}
