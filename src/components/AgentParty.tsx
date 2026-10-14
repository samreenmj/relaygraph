import React from 'react';
import { Agent } from '@/types/relaygraph';
import { AgentCard } from './AgentCard';

interface AgentPartyProps {
  agents: Agent[];
  selectedAgentId?: string;
  onSelectAgent: (agent: Agent) => void;
}

export const AgentParty: React.FC<AgentPartyProps> = ({
  agents,
  selectedAgentId,
  onSelectAgent,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#211D3B]">
            Agent Party & Workers
          </h3>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E9E4FF] text-[#5145E5]">
            3 Autonomous Units
          </span>
        </div>
        <span className="text-xs text-[#716C84]">Click any agent to inspect graph context</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onSelect={onSelectAgent}
            isSelected={selectedAgentId === agent.id}
          />
        ))}
      </div>
    </div>
  );
};
