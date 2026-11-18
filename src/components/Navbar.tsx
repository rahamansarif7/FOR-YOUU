import React from 'react';
import { Volume2, VolumeX, Music, Award, Sparkles } from 'lucide-react';
import { LevelId } from '../types';

interface NavbarProps {
  currentLevel: LevelId;
  maxUnlockedLevel: LevelId;
  onSelectLevel: (lvl: LevelId) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  musicPlaying: boolean;
  onToggleMusicModal: () => void;
  onOpenAchievements: () => void;
  personName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLevel,
  maxUnlockedLevel,
  onSelectLevel,
  soundEnabled,
  onToggleSound,
  musicPlaying,
  onToggleMusicModal,
  onOpenAchievements,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#120B1E]/80 backdrop-blur-md border-b border-pink-500/15 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand wordmark in display serif */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xl md:text-2xl font-serif text-pink-200 tracking-tight whitespace-nowrap">
            The Tulip &amp; Butterfly Garden
          </span>
          <span className="hidden sm:inline-block text-xs text-pink-400 font-script text-base">
            Level 20 Adventure
          </span>
        </div>

        {/* Zone 2: Navigation Links (single-line, clean unboxed typography) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectLevel(1)}
            className={`whitespace-nowrap transition-colors hover:text-pink-300 ${
              currentLevel === 1 ? 'text-pink-400 font-semibold' : ''
            }`}
          >
            Welcome
          </button>
          <button
            onClick={() => onSelectLevel(2)}
            disabled={maxUnlockedLevel < 2}
            className={`whitespace-nowrap transition-colors hover:text-pink-300 disabled:opacity-40 disabled:cursor-not-allowed ${
              currentLevel === 2 ? 'text-pink-400 font-semibold' : ''
            }`}
          >
            Garden Gate
          </button>
          <button
            onClick={() => onSelectLevel(3)}
            disabled={maxUnlockedLevel < 3}
            className={`whitespace-nowrap transition-colors hover:text-pink-300 disabled:opacity-40 disabled:cursor-not-allowed ${
              currentLevel === 3 ? 'text-pink-400 font-semibold' : ''
            }`}
          >
            Gift Kingdom
          </button>
          <button
            onClick={() => onSelectLevel(6)}
            disabled={maxUnlockedLevel < 6}
            className={`whitespace-nowrap transition-colors hover:text-pink-300 disabled:opacity-40 disabled:cursor-not-allowed ${
              currentLevel === 6 ? 'text-pink-400 font-semibold' : ''
            }`}
          >
            Star Sky
          </button>
          <button
            onClick={() => onSelectLevel(8)}
            disabled={maxUnlockedLevel < 8}
            className={`whitespace-nowrap transition-colors hover:text-pink-300 disabled:opacity-40 disabled:cursor-not-allowed ${
              currentLevel === 8 ? 'text-pink-400 font-semibold' : ''
            }`}
          >
            Birthday Cake
          </button>
          <button
            onClick={() => onSelectLevel(10)}
            disabled={maxUnlockedLevel < 10}
            className={`whitespace-nowrap transition-colors hover:text-pink-300 disabled:opacity-40 disabled:cursor-not-allowed ${
              currentLevel === 10 ? 'text-pink-400 font-semibold' : ''
            }`}
          >
            Grand Finale
          </button>
        </nav>

        {/* Zone 3: Primary Action / Quick Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Achievements */}
          <button
            onClick={onOpenAchievements}
            title="View Achievements"
            className="p-2 text-slate-300 hover:text-pink-300 hover:bg-pink-500/10 rounded-lg transition-colors flex items-center gap-1.5 text-xs"
          >
            <Award className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Badges</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            className="p-2 text-slate-300 hover:text-pink-300 hover:bg-pink-500/10 rounded-lg transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-pink-300" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Music Garden trigger */}
          <button
            onClick={onToggleMusicModal}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-2 transition-all whitespace-nowrap ${
              musicPlaying
                ? 'bg-pink-500/20 text-pink-200 border border-pink-500/40 shadow-[0_0_12px_rgba(236,72,153,0.3)]'
                : 'bg-slate-800/80 text-slate-300 hover:text-pink-200 border border-slate-700/50'
            }`}
          >
            <Music className={`w-3.5 h-3.5 ${musicPlaying ? 'animate-bounce text-pink-400' : ''}`} />
            <span>Music Garden</span>
            {musicPlaying && (
              <span className="flex gap-0.5 items-end h-2.5">
                <span className="w-0.5 h-full bg-pink-400 animate-pulse" />
                <span className="w-0.5 h-2 bg-pink-300 animate-pulse delay-75" />
                <span className="w-0.5 h-1.5 bg-pink-400 animate-pulse delay-150" />
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
