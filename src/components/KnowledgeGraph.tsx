'use client';

import React, { useState } from 'react';
import { GraphNode, GraphEdge, GraphNodeType } from '@/types/relaygraph';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Filter,
  Info,
  Sparkles,
  Database,
  ArrowRight,
  X,
} from 'lucide-react';
import { PixelAvatar } from './PixelAvatar';

interface KnowledgeGraphProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onSelectNode?: (node: GraphNode) => void;
  selectedNodeId?: string;
}

export const KnowledgeGraph: React.FC<KnowledgeGraphProps> = ({
  nodes,
  edges,
  onSelectNode,
  selectedNodeId,
}) => {
  const [zoom, setZoom] = useState<number>(1);
  const [filterType, setFilterType] = useState<GraphNodeType | 'all'>('all');
  const [activeNode, setActiveNode] = useState<GraphNode | null>(
    nodes.find((n) => n.id === selectedNodeId) || nodes[0] || null
  );

  const handleNodeClick = (node: GraphNode) => {
    setActiveNode(node);
    if (onSelectNode) onSelectNode(node);
  };

  const filteredNodes =
    filterType === 'all' ? nodes : nodes.filter((n) => n.type === filterType);

  const getNodeColor = (type: GraphNodeType) => {
    switch (type) {
      case 'agent':
        return {
          bg: '#E9E4FF',
          border: '#818CF8',
          text: '#3730A3',
          badge: 'bg-indigo-100 text-indigo-800',
        };
      case 'task':
        return {
          bg: '#FFF9F0',
          border: '#FDBA74',
          text: '#9A3412',
          badge: 'bg-orange-100 text-orange-800',
        };
      case 'finding':
        return {
          bg: '#DCEEFF',
          border: '#38BDF8',
          text: '#0369A1',
          badge: 'bg-sky-100 text-sky-800',
        };
      case 'decision':
        return {
          bg: '#D9F5E8',
          border: '#34D399',
          text: '#065F46',
          badge: 'bg-emerald-100 text-emerald-800',
        };
      case 'event':
        return {
          bg: '#FEE2E2',
          border: '#F87171',
          text: '#991B1B',
          badge: 'bg-rose-100 text-rose-800',
        };
    }
  };

  return (
    <div className="flex flex-col xl:flex-row gap-5 w-full">
      {/* Canvas Area */}
      <div className="flex-1 bg-[#FAF9FD] rounded-3xl border border-[#E2DEEB] pixel-border relative overflow-hidden min-h-[520px] flex flex-col">
        {/* Canvas Toolbar */}
        <div className="p-4 border-b border-[#E2DEEB] bg-white/80 backdrop-blur-xs flex flex-wrap items-center justify-between gap-3 z-10">
          {/* Node Type Filter */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-[#716C84] mr-1 flex items-center">
              <Filter className="w-3.5 h-3.5 mr-1" /> Filter:
            </span>
            {(['all', 'agent', 'task', 'finding', 'decision', 'event'] as const).map(
              (t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold capitalize transition-colors ${
                    filterType === t
                      ? 'bg-[#5145E5] text-white shadow-2xs'
                      : 'bg-[#F1EFF7] text-[#716C84] hover:bg-[#E2DEEB]'
                  }`}
                >
                  {t}
                </button>
              )
            )}
          </div>

          {/* Zoom and Fit Controls */}
          <div className="flex items-center space-x-1.5">
            <button
              onClick={() => setZoom((z) => Math.max(0.7, z - 0.15))}
              className="p-1.5 rounded-lg border border-[#E2DEEB] bg-white text-[#716C84] hover:bg-[#F1EFF7]"
              title="Zoom out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold px-1.5 text-[#716C84]">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(1.4, z + 0.15))}
              className="p-1.5 rounded-lg border border-[#E2DEEB] bg-white text-[#716C84] hover:bg-[#F1EFF7]"
              title="Zoom in"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-1.5 rounded-lg border border-[#E2DEEB] bg-white text-[#716C84] hover:bg-[#F1EFF7]"
              title="Reset view"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* SVG Graph Viewport */}
        <div className="relative flex-1 overflow-auto p-8 flex items-center justify-center select-none">
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage: 'radial-gradient(#CBC5DF 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />

          <div
            className="relative transition-transform duration-200"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center center',
              width: '920px',
              height: '560px',
            }}
          >
            {/* Render Edges SVG */}
            <svg className="absolute inset-0 w-full height-full pointer-events-none z-0">
              <defs>
                <marker
                  id="arrow"
                  viewBox="0 0 10 10"
                  refX="18"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#818CF8" />
                </marker>
              </defs>
              {edges.map((edge) => {
                const sourceNode = nodes.find((n) => n.id === edge.source);
                const targetNode = nodes.find((n) => n.id === edge.target);
                if (!sourceNode || !targetNode) return null;

                const sx = sourceNode.x + 80;
                const sy = sourceNode.y + 35;
                const tx = targetNode.x + 80;
                const ty = targetNode.y + 35;

                return (
                  <g key={edge.id}>
                    <line
                      x1={sx}
                      y1={sy}
                      x2={tx}
                      y2={ty}
                      stroke="#A59EBF"
                      strokeWidth="2"
                      strokeDasharray={edge.relationship === 'DEPENDS_ON' ? '4 4' : 'none'}
                      markerEnd="url(#arrow)"
                    />
                    {/* Edge relationship label */}
                    {edge.label && (
                      <text
                        x={(sx + tx) / 2}
                        y={(sy + ty) / 2 - 5}
                        fill="#716C84"
                        fontSize="9"
                        fontWeight="bold"
                        textAnchor="middle"
                        className="bg-white"
                      >
                        {edge.relationship}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Render Interactive Nodes */}
            {filteredNodes.map((node) => {
              const colors = getNodeColor(node.type);
              const isSelected = activeNode?.id === node.id;

              return (
                <div
                  key={node.id}
                  onClick={() => handleNodeClick(node)}
                  className={`absolute w-44 rounded-2xl p-3 border cursor-pointer transition-all z-10 ${
                    isSelected
                      ? 'ring-3 ring-[#5145E5] shadow-lg scale-105'
                      : 'hover:scale-102 shadow-xs'
                  }`}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    backgroundColor: colors.bg,
                    borderColor: colors.border,
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[9px] uppercase font-black px-1.5 py-0.5 rounded ${colors.badge}`}
                    >
                      {node.type}
                    </span>
                    {node.type === 'agent' && (
                      <PixelAvatar
                        type={
                          node.id === 'agent-a'
                            ? 'investigator'
                            : node.id === 'agent-b'
                            ? 'implementer'
                            : 'verifier'
                        }
                        size={18}
                      />
                    )}
                  </div>
                  <div className="font-extrabold text-xs text-[#211D3B] truncate">
                    {node.label}
                  </div>
                  <div className="text-[10px] text-[#716C84] mt-0.5 line-clamp-1">
                    {node.details.summary || node.subType}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Legend */}
        <div className="p-3 border-t border-[#E2DEEB] bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-3">
            <span className="font-bold text-[#211D3B] flex items-center">
              <Database className="w-3.5 h-3.5 text-[#5145E5] mr-1" /> FalkorDB Invariants:
            </span>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center text-[11px] text-[#716C84]">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#818CF8] mr-1" /> Agent
              </span>
              <span className="inline-flex items-center text-[11px] text-[#716C84]">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#FDBA74] mr-1" /> Task
              </span>
              <span className="inline-flex items-center text-[11px] text-[#716C84]">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#38BDF8] mr-1" /> Finding
              </span>
              <span className="inline-flex items-center text-[11px] text-[#716C84]">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#34D399] mr-1" /> Decision
              </span>
            </div>
          </div>
          <span className="text-[11px] text-[#716C84]">
            Select any node to view Cypher path and provenance
          </span>
        </div>
      </div>

      {/* Node Inspector Side Panel */}
      {activeNode && (
        <div className="w-full xl:w-80 bg-white rounded-3xl p-6 border border-[#E2DEEB] pixel-border flex flex-col">
          <div className="flex items-start justify-between pb-4 border-b border-[#F1EFF7] mb-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#E9E4FF] text-[#5145E5]">
                Node Inspector
              </span>
              <h3 className="font-extrabold text-base text-[#211D3B] mt-1.5">
                {activeNode.label}
              </h3>
            </div>
            <button
              onClick={() => setActiveNode(null)}
              className="text-[#716C84] hover:text-[#211D3B] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4 text-xs flex-1">
            <div>
              <span className="text-[#716C84] font-semibold block mb-1">
                FalkorDB Node Label
              </span>
              <code className="bg-[#FAF9FD] px-2 py-1 rounded border border-[#E2DEEB] text-[#5145E5] font-mono block">
                :{activeNode.type.toUpperCase()}{' '}
                {`{id: "${activeNode.id}"}`}
              </code>
            </div>

            <div>
              <span className="text-[#716C84] font-semibold block mb-1">Summary</span>
              <p className="bg-[#FAF9FD] p-3 rounded-xl border border-[#E2DEEB] text-[#211D3B] leading-relaxed">
                {activeNode.details.summary || 'No summary text registered.'}
              </p>
            </div>

            {activeNode.details.metrics && (
              <div>
                <span className="text-[#716C84] font-semibold block mb-1">
                  Connected Metrics
                </span>
                <p className="font-semibold text-[#211D3B]">
                  {activeNode.details.metrics}
                </p>
              </div>
            )}

            {/* Connected Relationships in Graph */}
            <div>
              <span className="text-[#716C84] font-semibold block mb-2">
                Connected Edges
              </span>
              <div className="space-y-1.5">
                {edges
                  .filter(
                    (e) => e.source === activeNode.id || e.target === activeNode.id
                  )
                  .map((e) => (
                    <div
                      key={e.id}
                      className="p-2 rounded-lg bg-[#FAF9FD] border border-[#E2DEEB] flex items-center justify-between text-[11px]"
                    >
                      <span className="font-bold text-[#5145E5]">
                        {e.relationship}
                      </span>
                      <span className="text-[#716C84]">
                        {e.source === activeNode.id
                          ? `→ ${e.target}`
                          : `← ${e.source}`}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Cypher inspection prompt */}
          <div className="mt-4 pt-4 border-t border-[#F1EFF7] text-[11px] text-[#716C84] flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Indexed in FalkorDB with index-free adjacency.</span>
          </div>
        </div>
      )}
    </div>
  );
};
