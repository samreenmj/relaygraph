'use client';

import React, { useState } from 'react';
import { Lesson } from '@/types/relaygraph';
import {
  BookOpen,
  CheckCircle2,
  X,
  Code2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
} from 'lucide-react';

interface LearningPanelProps {
  lessons: Lesson[];
  isOpen: boolean;
  onClose: () => void;
  completedLessonIds: number[];
  onToggleLessonCompleted: (lessonId: number) => void;
}

export const LearningPanel: React.FC<LearningPanelProps> = ({
  lessons,
  isOpen,
  onClose,
  completedLessonIds,
  onToggleLessonCompleted,
}) => {
  const [selectedLessonId, setSelectedLessonId] = useState<number>(1);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);

  const activeLesson =
    lessons.find((l) => l.id === selectedLessonId) || lessons[0];

  const isCompleted = completedLessonIds.includes(activeLesson.id);

  const handleSelectLesson = (id: number) => {
    setSelectedLessonId(id);
    setSelectedAnswer(null);
    setHasAnswered(false);
  };

  const handleNextLesson = () => {
    const next = lessons.find((l) => l.id === activeLesson.id + 1);
    if (next) handleSelectLesson(next.id);
  };

  const handlePrevLesson = () => {
    const prev = lessons.find((l) => l.id === activeLesson.id - 1);
    if (prev) handleSelectLesson(prev.id);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[540px] bg-white border-l border-[#E2DEEB] shadow-2xl z-50 flex flex-col">
      {/* Drawer Header */}
      <div className="p-5 border-b border-[#E2DEEB] bg-[#FAF9FD] flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-[#E9E4FF] text-[#5145E5] flex items-center justify-center">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-extrabold text-sm text-[#211D3B]">
                Learn While Building
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E9E4FF] text-[#5145E5]">
                {completedLessonIds.length}/{lessons.length} Done
              </span>
            </div>
            <p className="text-[11px] text-[#716C84]">
              FalkorDB graph principles & multi-agent systems
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-[#716C84] hover:bg-[#E2DEEB] hover:text-[#211D3B] transition-colors"
          aria-label="Close Learning Drawer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Lesson Index Bar */}
      <div className="px-5 py-2.5 bg-white border-b border-[#F1EFF7] flex items-center space-x-1.5 overflow-x-auto text-xs">
        {lessons.map((l) => {
          const done = completedLessonIds.includes(l.id);
          const current = l.id === activeLesson.id;
          return (
            <button
              key={l.id}
              onClick={() => handleSelectLesson(l.id)}
              className={`px-2.5 py-1 rounded-lg font-bold shrink-0 transition-colors flex items-center space-x-1 ${
                current
                  ? 'bg-[#5145E5] text-white shadow-2xs'
                  : done
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-[#FAF9FD] text-[#716C84] hover:bg-[#E9E4FF]'
              }`}
            >
              <span>#{l.id}</span>
              {done && <CheckCircle2 className="w-3 h-3 text-emerald-600 ml-0.5" />}
            </button>
          );
        })}
      </div>

      {/* Lesson Content Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
        {/* Title & Category */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black uppercase text-[#5145E5] tracking-wider">
              {activeLesson.category} · Lesson #{activeLesson.id}
            </span>
            <button
              onClick={() => onToggleLessonCompleted(activeLesson.id)}
              className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg font-bold transition-all ${
                isCompleted
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                  : 'bg-[#F1EFF7] text-[#716C84] hover:bg-[#E2DEEB]'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isCompleted ? 'Completed' : 'Mark Complete'}</span>
            </button>
          </div>
          <h2 className="text-lg font-black text-[#211D3B]">
            {activeLesson.title}
          </h2>
        </div>

        {/* Plain Language Explanation */}
        <div className="space-y-1">
          <span className="text-[#716C84] font-bold uppercase tracking-wider text-[10px]">
            Concept Explanation
          </span>
          <p className="text-[#211D3B] text-xs leading-relaxed bg-[#FAF9FD] p-3.5 rounded-2xl border border-[#E2DEEB]">
            {activeLesson.explanation}
          </p>
        </div>

        {/* Why RelayGraph Needs It */}
        <div className="space-y-1">
          <span className="text-[#716C84] font-bold uppercase tracking-wider text-[10px]">
            Why RelayGraph Needs It
          </span>
          <div className="p-3.5 rounded-2xl bg-[#E9E4FF]/40 border border-[#D0C7F8] text-[#211D3B] flex items-start space-x-2.5">
            <Sparkles className="w-4 h-4 text-[#5145E5] shrink-0 mt-0.5" />
            <p className="leading-relaxed">{activeLesson.whyRelayGraphNeedsIt}</p>
          </div>
        </div>

        {/* Technical Example */}
        <div className="space-y-1">
          <span className="text-[#716C84] font-bold uppercase tracking-wider text-[10px] flex items-center space-x-1">
            <Code2 className="w-3 h-3 text-[#5145E5]" />
            <span>Technical Example ({activeLesson.technicalExample.language.toUpperCase()})</span>
          </span>
          <div className="rounded-2xl bg-[#1E1B2E] p-4 text-[#E2DEEB] font-mono text-[11px] overflow-x-auto">
            <pre>
              <code>{activeLesson.technicalExample.code}</code>
            </pre>
          </div>
        </div>

        {/* Common Mistake & Interview Takeaway */}
        <div className="grid grid-cols-1 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#FFF9F0] border border-[#FDE7C7]">
            <span className="text-[10px] font-black uppercase text-amber-900 flex items-center space-x-1">
              <AlertTriangle className="w-3 h-3 text-amber-600" />
              <span>Common Pitfall</span>
            </span>
            <p className="text-amber-950 mt-1 leading-relaxed">
              {activeLesson.commonMistake}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <span className="text-[10px] font-black uppercase text-emerald-900 flex items-center space-x-1">
              <Lightbulb className="w-3 h-3 text-emerald-600" />
              <span>Interview Takeaway</span>
            </span>
            <p className="text-emerald-950 mt-1 leading-relaxed">
              {activeLesson.interviewTakeaway}
            </p>
          </div>
        </div>

        {/* Interactive Knowledge Check */}
        <div className="p-4 rounded-2xl bg-[#FAF9FD] border border-[#E2DEEB] space-y-3">
          <div className="flex items-center space-x-1.5 text-[#5145E5] font-black uppercase tracking-wider text-[10px]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Interactive Knowledge Check</span>
          </div>

          <p className="text-xs font-bold text-[#211D3B]">
            {activeLesson.knowledgeCheck.question}
          </p>

          <div className="space-y-2">
            {activeLesson.knowledgeCheck.options.map((opt, idx) => (
              <button
                key={idx}
                disabled={hasAnswered}
                onClick={() => {
                  setSelectedAnswer(idx);
                  setHasAnswered(true);
                  if (idx === activeLesson.knowledgeCheck.correctIndex) {
                    onToggleLessonCompleted(activeLesson.id);
                  }
                }}
                className={`w-full text-left p-2.5 rounded-xl border text-xs font-medium transition-all ${
                  hasAnswered
                    ? idx === activeLesson.knowledgeCheck.correctIndex
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold'
                      : idx === selectedAnswer
                      ? 'bg-rose-100 border-rose-400 text-rose-950'
                      : 'bg-white border-[#E2DEEB] text-[#716C84]'
                    : 'bg-white border-[#E2DEEB] hover:bg-[#F1EFF7] text-[#211D3B]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {hasAnswered && (
            <div
              className={`p-3 rounded-xl text-xs font-medium ${
                selectedAnswer === activeLesson.knowledgeCheck.correctIndex
                  ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                  : 'bg-amber-50 text-amber-900 border border-amber-200'
              }`}
            >
              {selectedAnswer === activeLesson.knowledgeCheck.correctIndex
                ? ' Correct! '
                : ' Not quite. '}
              {activeLesson.knowledgeCheck.explanation}
            </div>
          )}
        </div>
      </div>

      {/* Drawer Footer Navigation */}
      <div className="p-4 border-t border-[#E2DEEB] bg-[#FAF9FD] flex items-center justify-between">
        <button
          onClick={handlePrevLesson}
          disabled={activeLesson.id === 1}
          className="px-3 py-1.5 rounded-xl border border-[#E2DEEB] bg-white text-xs font-bold text-[#716C84] hover:bg-[#F1EFF7] disabled:opacity-40 flex items-center space-x-1"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <span className="text-[11px] text-[#716C84] font-medium">
          Lesson {activeLesson.id} of {lessons.length}
        </span>

        <button
          onClick={handleNextLesson}
          disabled={activeLesson.id === lessons.length}
          className="px-3 py-1.5 rounded-xl border border-[#E2DEEB] bg-white text-xs font-bold text-[#5145E5] hover:bg-[#F1EFF7] disabled:opacity-40 flex items-center space-x-1"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
