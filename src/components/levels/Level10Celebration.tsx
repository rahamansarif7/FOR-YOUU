import React, { useEffect, useState } from 'react';
import { Sparkles, RotateCcw, Share2, Award, Heart, Download } from 'lucide-react';
import { playFanfare, playGlissando, playChime } from '../../utils/audio';
import { particleEngine } from '../../utils/particles';

interface Level10CelebrationProps {
  personName: string;
  onRestart: () => void;
  onOpenMusic: () => void;
}

export const Level10Celebration: React.FC<Level10CelebrationProps> = ({
  personName,
  onRestart,
  onOpenMusic,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Launch celebratory bursts
    playFanfare();
    particleEngine.spawnConfetti(90);
    particleEngine.spawnPetals(45);
    particleEngine.launchFirework();

    const interval = setInterval(() => {
      particleEngine.launchFirework();
      particleEngine.spawnPetals(10);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const handleManualBurst = (e: React.MouseEvent) => {
    playGlissando();
    particleEngine.spawnClickSparkles(e.clientX, e.clientY, 30);
    particleEngine.spawnConfetti(40);
    particleEngine.launchFirework(e.clientX, e.clientY);
  };

  const handleShare = () => {
    playChime(659.25);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Happy 20th Birthday to ${personName}! 🌷🦋 Explored the magical Tulip & Butterfly Birthday Adventure!`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      onClick={handleManualBurst}
      className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 py-12 overflow-hidden text-center cursor-pointer select-none"
    >
      {/* Aurora Glow & Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-r from-pink-500/25 via-purple-600/25 to-amber-400/25 rounded-full blur-[120px]" />
        
        {/* Floating Icons */}
        <div className="absolute top-8 left-8 text-4xl animate-float">🌷</div>
        <div className="absolute top-12 right-12 text-4xl animate-float [animation-delay:1.5s]">🦋</div>
        <div className="absolute bottom-16 left-12 text-4xl animate-float [animation-delay:2.5s]">🎈</div>
        <div className="absolute bottom-20 right-16 text-4xl animate-float [animation-delay:0.8s]">✨</div>
        <div className="absolute top-1/2 left-6 text-3xl animate-float [animation-delay:3s]">💖</div>
        <div className="absolute top-1/3 right-8 text-3xl animate-float [animation-delay:1.8s]">⭐</div>
      </div>

      {/* Main Grand Announcement Card */}
      <div className="relative z-10 max-w-3xl w-full glass-panel rounded-3xl p-8 sm:p-14 border-2 border-pink-400/50 shadow-[0_25px_80px_rgba(236,72,153,0.35)] animate-fadeIn">
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/25 to-purple-600/25 border border-pink-400/40 text-pink-200 text-sm font-semibold mb-6">
          <span>🌷 Milestone Reached 🦋</span>
        </div>

        {/* Giant Glowing Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight bg-gradient-to-r from-pink-200 via-rose-100 to-purple-200 bg-clip-text text-transparent mb-6 drop-shadow-[0_0_35px_rgba(244,114,182,0.6)] leading-tight">
          HAPPY 20TH BIRTHDAY, {personName}! 🎂🌷
        </h1>

        {/* Heartfelt Wish */}
        <p className="text-lg sm:text-2xl font-serif italic text-pink-100/95 leading-relaxed max-w-2xl mx-auto mb-6">
          "May your days be colourful, your laughter be endless, your dreams keep growing, and your life be filled with beautiful surprises."
        </p>

        {/* Playful Gamer Unlock Note */}
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-pink-900/40 via-purple-950/50 to-pink-900/40 border border-pink-400/30 max-w-xl mx-auto mb-6">
          <p className="text-sm sm:text-base text-pink-200 font-medium">
            Congratulations! You've officially unlocked Level 20. New adventures, unexpected plot twists, and legendary memories await! 🚀✨
          </p>
        </div>

        {/* Mysterious Creator Attribution */}
        <p className="text-sm sm:text-base font-script text-pink-300 text-xl mb-8">
          Made especially for you, by someone you know. 🌷
        </p>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRestart();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800/90 hover:bg-slate-700 text-pink-200 text-sm font-semibold border border-pink-400/30 shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-pink-300" />
            <span>Replay Adventure</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenMusic();
            }}
            className="group relative flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-pink-500/90 via-fuchsia-500/85 to-purple-600/90 text-white text-sm sm:text-base font-semibold border border-pink-200/70 animate-music-breathe transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.03] hover:brightness-110 hover:border-pink-100/90 active:scale-95 active:translate-y-0 cursor-pointer whitespace-nowrap"
          >
            {/* Gentle animated music equalizer */}
            <span className="flex items-end gap-[2.5px] h-3.5 shrink-0" aria-hidden="true">
              <span className="w-[2.5px] h-full rounded-full bg-pink-100/95 animate-music-eq" />
              <span className="w-[2.5px] h-full rounded-full bg-white/95 animate-music-eq [animation-delay:0.35s]" />
              <span className="w-[2.5px] h-full rounded-full bg-purple-100/95 animate-music-eq [animation-delay:0.7s]" />
            </span>
            <span className="tracking-wide drop-shadow-sm">Music Garden 🎶</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            <span>{copied ? 'Copied Blessing! 🌸' : 'Copy Blessing'}</span>
          </button>
        </div>

        <p className="text-[11px] text-pink-300/60 mt-6">
          Tip: Tap anywhere on the screen to launch extra celebratory fireworks &amp; sparkles! ✨
        </p>
      </div>
    </div>
  );
};
