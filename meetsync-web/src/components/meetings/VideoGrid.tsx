import { Hand, LogOut, Mic, MicOff, MonitorUp, Video } from 'lucide-react';
import type { Participant } from '../../types/domain';
import { getInitials } from '../../utils/format';
import { cn } from '../../utils/cn';

interface VideoGridProps {
  topic: string;
  participants: Participant[];
}

const tileTints = ['bg-navy-800', 'bg-navy-700', 'bg-[#1d2b52]', 'bg-[#22305a]', 'bg-navy-800', 'bg-[#1a2749]'];

/** Decorative meeting video area for the product showcase. */
export default function VideoGrid({ topic, participants }: VideoGridProps) {
  return (
    <div className="flex h-full flex-col rounded-xl bg-navy-900 p-3 ring-1 ring-white/10 sm:p-4">
      <div className="flex items-center justify-between gap-3 px-1 pb-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">{topic}</p>
          <p className="text-xs text-navy-300">Хэлэлцэх асуудал 2 / 4 · {participants.length + 26} оролцогч</p>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 rounded-md bg-danger-500/15 px-2 py-1 text-[11px] font-medium text-danger-500">
          <span className="size-1.5 animate-live-dot rounded-full bg-danger-500" />
          Шууд · 00:36:51
        </span>
      </div>

      <ul className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-3">
        {participants.map((p, i) => (
          <li
            key={p.id}
            className={cn(
              'relative flex aspect-video items-center justify-center rounded-lg',
              tileTints[i % tileTints.length],
              p.isSpeaking && 'ring-2 ring-accent-400',
            )}
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white sm:size-12">
              {getInitials(p.name)}
            </span>
            <span className="absolute bottom-1.5 left-1.5 flex max-w-[85%] items-center gap-1 rounded bg-navy-950/70 px-1.5 py-0.5 text-[10px] text-white">
              {p.isMuted ? <MicOff size={10} className="shrink-0 text-danger-500" /> : <Mic size={10} className="shrink-0 text-accent-300" />}
              <span className="truncate">{p.name}</span>
            </span>
            {p.role === 'organizer' && (
              <span className="absolute top-1.5 left-1.5 rounded bg-brand-600 px-1.5 py-0.5 text-[9px] font-medium text-white">
                Даргалагч
              </span>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-3 flex items-center justify-center gap-2">
        {[Mic, Video, MonitorUp, Hand].map((Icon, i) => (
          <span key={i} className="flex size-9 items-center justify-center rounded-full bg-white/10 text-white">
            <Icon size={16} />
          </span>
        ))}
        <span className="ml-2 flex h-9 items-center gap-1.5 rounded-full bg-danger-500 px-4 text-xs font-medium text-white">
          <LogOut size={14} /> Гарах
        </span>
      </div>
    </div>
  );
}
