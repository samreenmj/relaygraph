import React from 'react';
import { ActivityEvent } from '@/types/relaygraph';
import {
  FileSearch,
  CheckCircle,
  GitPullRequest,
  AlertOctagon,
  RefreshCw,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ActivityFeedProps {
  events: ActivityEvent[];
  maxItems?: number;
  onViewAll?: () => void;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  events,
  maxItems = 5,
  onViewAll,
}) => {
  const displayEvents = events.slice(0, maxItems);

  const getEventIcon = (type: ActivityEvent['eventType']) => {
    switch (type) {
      case 'finding_recorded':
        return <FileSearch className="w-3.5 h-3.5 text-sky-600" />;
      case 'task_completed':
        return <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />;
      case 'handoff_received':
        return <GitPullRequest className="w-3.5 h-3.5 text-indigo-600" />;
      case 'worker_interrupted':
        return <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />;
      case 'recovery_attempted':
        return <RefreshCw className="w-3.5 h-3.5 text-purple-600 animate-spin" />;
      default:
        return <Sparkles className="w-3.5 h-3.5 text-amber-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E2DEEB] pixel-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-[#5145E5]" />
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-[#211D3B]">
            Recent Graph Activity
          </h3>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs font-bold text-[#5145E5] hover:underline cursor-pointer"
          >
            View Full Timeline
          </button>
        )}
      </div>

      <div className="space-y-3 relative before:absolute before:inset-y-0 before:left-3.5 before:w-0.5 before:bg-[#E2DEEB]">
        {displayEvents.map((evt) => (
          <div key={evt.id} className="relative flex items-start space-x-3 text-xs pl-1">
            {/* Event dot */}
            <div className="w-6 h-6 rounded-lg bg-[#FAF9FD] border border-[#E2DEEB] flex items-center justify-center shrink-0 z-10 shadow-2xs">
              {getEventIcon(evt.eventType)}
            </div>

            {/* Event details */}
            <div className="flex-1 bg-[#FAF9FD] rounded-xl p-3 border border-[#E2DEEB]">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-[#211D3B]">{evt.actorName}</span>
                <span className="text-[10px] text-[#716C84]">{evt.timestamp}</span>
              </div>
              <p className="text-xs text-[#716C84] leading-relaxed">{evt.description}</p>
              {evt.isSimulated && (
                <div className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                  Simulated Injected Fault
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
