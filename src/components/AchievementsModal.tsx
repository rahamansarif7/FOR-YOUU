import React from 'react';
import { X, Award, CheckCircle2, Lock } from 'lucide-react';
import { Achievement } from '../types';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  achievements,
}) => {
  if (!isOpen) return null;

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-7 shadow-2xl border border-pink-400/40">
        <div className="flex items-center justify-between pb-4 border-b border-pink-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-pink-100">
                Adventure Badges
              </h3>
              <p className="text-xs text-slate-300">
                Unlocked {unlockedCount} of {achievements.length} badges
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Badges List */}
        <div className="mt-4 space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {achievements.map((badge) => (
            <div
              key={badge.id}
              className={`p-3 rounded-2xl border flex items-center gap-3 transition-colors ${
                badge.unlocked
                  ? 'bg-pink-500/15 border-pink-400/40 text-pink-100 shadow-sm'
                  : 'bg-slate-900/40 border-slate-800 text-slate-400 opacity-60'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                  badge.unlocked
                    ? 'bg-gradient-to-br from-amber-400/30 to-pink-500/30 border border-amber-300/40 shadow'
                    : 'bg-slate-800 border border-slate-700'
                }`}
              >
                {badge.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-serif text-sm font-bold truncate">
                    {badge.title}
                  </h4>
                  {badge.unlocked ? (
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                      Unlocked
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500">Locked</span>
                  )}
                </div>
                <p className="text-xs text-slate-300/80 truncate">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
