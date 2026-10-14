import React from 'react';
import { AgentStatus, TaskStatus } from '@/types/relaygraph';
import { CheckCircle2, Clock, PlayCircle, AlertCircle, RefreshCw, HelpCircle } from 'lucide-react';

interface StatusBadgeProps {
  status: AgentStatus | TaskStatus | string;
  className?: string;
  showIcon?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  className = '',
  showIcon = true,
}) => {
  let bg = 'bg-slate-100 text-slate-700 border-slate-300';
  let label = status;
  let icon = <HelpCircle className="w-3 h-3 mr-1" />;

  switch (status.toLowerCase()) {
    case 'completed':
    case 'success':
      bg = 'bg-emerald-50 text-emerald-800 border-emerald-300';
      label = 'Completed';
      icon = <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-600" />;
      break;
    case 'running':
    case 'in_progress':
      bg = 'bg-amber-50 text-amber-900 border-amber-300';
      label = 'Running';
      icon = <PlayCircle className="w-3 h-3 mr-1 text-amber-600 animate-pulse" />;
      break;
    case 'waiting':
    case 'pending':
      bg = 'bg-indigo-50 text-indigo-800 border-indigo-200';
      label = 'Waiting';
      icon = <Clock className="w-3 h-3 mr-1 text-indigo-500" />;
      break;
    case 'failed':
      bg = 'bg-rose-50 text-rose-800 border-rose-300';
      label = 'Failed';
      icon = <AlertCircle className="w-3 h-3 mr-1 text-rose-600" />;
      break;
    case 'recovering':
      bg = 'bg-purple-50 text-purple-900 border-purple-300';
      label = 'Recovering';
      icon = <RefreshCw className="w-3 h-3 mr-1 text-purple-600 animate-spin" />;
      break;
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${bg} ${className}`}
    >
      {showIcon && icon}
      <span>{label}</span>
    </span>
  );
};
