import React from 'react';
import { LevelId } from '../types';
import { Sparkles, Check } from 'lucide-react';

interface ProgressBarProps {
  currentLevel: LevelId;
  maxUnlockedLevel: LevelId;
  onSelectLevel: (lvl: LevelId) => void;
}

const LEVEL_NAMES: Record<LevelId, { title: string; icon: string }> = {
  1: { title: 'Welcome', icon: '✨' },
  2: { title: 'The Gate', icon: '🚪' },
  3: { title: 'Gift Kingdom', icon: '🎁' },
  4: { title: 'Butterflies', icon: '🦋' },
  5: { title: 'Balloons', icon: '🎈' },
  6: { title: 'Star Sky', icon: '⭐' },
  7: { title: 'Treasure 20', icon: '💎' },
  8: { title: 'The Cake', icon: '🎂' },
  9: { title: 'Secret Letter', icon: '💌' },
  10: { title: 'Celebration', icon: '🎉' },
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentLevel,
  maxUnlockedLevel,
  onSelectLevel,
}) => {
  const levels: LevelId[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 w-[95%] max-w-2xl">
      <div className="glass-panel rounded-full px-3 py-2 flex items-center justify-between shadow-2xl border border-pink-500/20">
        <div className="flex items-center gap-1.5 w-full justify-between overflow-x-auto no-scrollbar py-0.5">
          {levels.map((lvl) => {
            const isCompleted = lvl < currentLevel;
            const isCurrent = lvl === currentLevel;
            const isUnlocked = lvl <= maxUnlockedLevel;

            return (
              <button
                key={lvl}
                disabled={!isUnlocked}
                onClick={() => onSelectLevel(lvl)}
                title={`Level ${lvl}: ${LEVEL_NAMES[lvl].title}`}
                className={`group relative flex items-center justify-center transition-all ${
                  !isUnlocked ? 'cursor-not-allowed opacity-35' : 'cursor-pointer'
                }`}
              >
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white ring-2 ring-pink-300 ring-offset-2 ring-offset-[#120B1E] scale-110 shadow-[0_0_12px_rgba(236,72,153,0.6)]'
                      : isCompleted
                      ? 'bg-pink-900/60 text-pink-200 border border-pink-400/50 hover:bg-pink-800/80'
                      : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-pink-500/40'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 text-pink-300 stroke-[2.5]" />
                  ) : (
                    <span>{lvl}</span>
                  )}
                </div>

                {/* Hover Tooltip */}
                <div className="absolute -top-9 left-1/2 -translate-x-1/2 hidden sm:group-hover:flex items-center gap-1 px-2 py-0.5 rounded bg-slate-900 text-[11px] text-pink-200 whitespace-nowrap shadow-md border border-pink-500/20 pointer-events-none">
                  <span>{LEVEL_NAMES[lvl].icon}</span>
                  <span>{LEVEL_NAMES[lvl].title}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
