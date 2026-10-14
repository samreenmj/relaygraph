'use client';

import React, { useState } from 'react';
import { MemoryRecord } from '@/types/relaygraph';
import {
  Brain,
  Search,
  Tag,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { PixelAvatar } from './PixelAvatar';

interface MemoryExplorerProps {
  records: MemoryRecord[];
}

export const MemoryExplorer: React.FC<MemoryExplorerProps> = ({ records }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [factFilter, setFactFilter] = useState<'all' | 'facts' | 'hypotheses'>('all');
  const [expandedRecordId, setExpandedRecordId] = useState<string | null>(null);

  const categories = ['all', 'findings', 'decisions', 'handoffs', 'procedures'];

  const filteredRecords = records.filter((rec) => {
    const matchesSearch =
      rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.contentSummary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.provenance.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat =
      selectedCategory === 'all' || rec.category === selectedCategory;

    const matchesFact =
      factFilter === 'all' ||
      (factFilter === 'facts' && rec.isFact) ||
      (factFilter === 'hypotheses' && !rec.isFact);

    return matchesSearch && matchesCat && matchesFact;
  });

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-white rounded-3xl p-6 border border-[#E2DEEB] pixel-border">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-[#E9E4FF] flex items-center justify-center text-[#5145E5]">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-[#211D3B]">
              Persistent Graph Memory
            </h2>
            <p className="text-xs text-[#716C84]">
              Structured knowledge preserved across LLM worker crashes and sessions in FalkorDB.
            </p>
          </div>
        </div>

        {/* Filter controls */}
        <div className="mt-5 pt-4 border-t border-[#F1EFF7] flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#716C84]" />
            <input
              type="text"
              placeholder="Search findings, Cypher provenance, or code files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#FAF9FD] border border-[#E2DEEB] text-xs text-[#211D3B] focus:outline-none focus:ring-2 focus:ring-[#5145E5]"
            />
          </div>

          {/* Category Chips */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#5145E5] text-white shadow-2xs'
                    : 'bg-[#F1EFF7] text-[#716C84] hover:bg-[#E2DEEB]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Fact vs Hypothesis filter */}
          <div className="flex items-center space-x-1 bg-[#FAF9FD] p-1 rounded-xl border border-[#E2DEEB]">
            <button
              onClick={() => setFactFilter('all')}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold ${
                factFilter === 'all'
                  ? 'bg-white text-[#211D3B] shadow-2xs'
                  : 'text-[#716C84]'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFactFilter('facts')}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold ${
                factFilter === 'facts'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'text-[#716C84]'
              }`}
            >
              Verified Facts
            </button>
            <button
              onClick={() => setFactFilter('hypotheses')}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold ${
                factFilter === 'hypotheses'
                  ? 'bg-amber-100 text-amber-800'
                  : 'text-[#716C84]'
              }`}
            >
              Hypotheses
            </button>
          </div>
        </div>
      </div>

      {/* Memory Records List */}
      <div className="space-y-3">
        {filteredRecords.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 border border-[#E2DEEB] text-center">
            <Brain className="w-8 h-8 text-[#CBC5DF] mx-auto mb-2" />
            <p className="text-sm font-bold text-[#211D3B]">No memory records found</p>
            <p className="text-xs text-[#716C84] mt-1">
              Try adjusting your search criteria or category filter.
            </p>
          </div>
        ) : (
          filteredRecords.map((rec) => {
            const isExpanded = expandedRecordId === rec.id;
            return (
              <div
                key={rec.id}
                className="bg-white rounded-2xl p-5 border border-[#E2DEEB] pixel-border-interactive transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded bg-[#FAF9FD] border border-[#E2DEEB] text-[#716C84]">
                      {rec.category}
                    </span>
                    <h3 className="font-extrabold text-sm text-[#211D3B]">
                      {rec.title}
                    </h3>
                  </div>

                  {/* Fact vs Hypothesis badge */}
                  <div className="flex items-center space-x-2">
                    {rec.isFact ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                        <ShieldCheck className="w-3 h-3 mr-1 text-emerald-600" />
                        Verified Fact
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                        <AlertCircle className="w-3 h-3 mr-1 text-amber-600" />
                        Proposed Hypothesis
                      </span>
                    )}
                    <span className="text-[10px] text-[#716C84]">{rec.createdAt}</span>
                  </div>
                </div>

                <p className="text-xs text-[#716C84] leading-relaxed mb-3">
                  {rec.contentSummary}
                </p>

                {/* Provenance & connected entities */}
                <div className="bg-[#FAF9FD] rounded-xl p-3 border border-[#E2DEEB] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-[#716C84] font-semibold text-[11px]">
                      Provenance:
                    </span>
                    <code className="text-[#5145E5] font-mono text-[11px] bg-white px-2 py-0.5 rounded border border-[#E2DEEB]">
                      {rec.provenance}
                    </code>
                  </div>

                  <div className="flex items-center space-x-1.5 flex-wrap">
                    <span className="text-[10px] text-[#716C84] font-bold">Graph:</span>
                    {rec.connectedEntities.map((ent, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#E9E4FF] text-[#5145E5]"
                      >
                        {ent}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
