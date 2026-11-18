import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { playPop, playGlissando, playChime, playClick } from '../../utils/audio';
import { particleEngine } from '../../utils/particles';

interface Level5BalloonWorldProps {
  personName: string;
  onNext: () => void;
}

interface BalloonEntity {
  id: number;
  compliment: string;
  title: string;
  color: string;
  stringColor: string;
  floatDelay: string;
  size: number;
  popped: boolean;
}

const BALLOON_DATA: Omit<BalloonEntity, 'popped'>[] = [
  { id: 1, title: "Pure Radiance", compliment: "You're amazing 🌸", color: "from-pink-400 to-rose-600", stringColor: "#f472b6", floatDelay: "0s", size: 68 },
  { id: 2, title: "Sunny Vibes", compliment: "Keep smiling ✨", color: "from-amber-400 to-orange-500", stringColor: "#fbbf24", floatDelay: "0.8s", size: 72 },
  { id: 3, title: "Heart of Gold", compliment: "Stay happy 💖", color: "from-fuchsia-400 to-pink-600", stringColor: "#e879f9", floatDelay: "1.4s", size: 66 },
  { id: 4, title: "Starlight Spirit", compliment: "Keep shining 🌟", color: "from-yellow-300 to-amber-500", stringColor: "#fde047", floatDelay: "0.4s", size: 74 },
  { id: 5, title: "Infinite Skies", compliment: "Never stop dreaming 🌈", color: "from-purple-400 to-indigo-600", stringColor: "#c084fc", floatDelay: "2.1s", size: 70 },
  { id: 6, title: "Quiet Strength", compliment: "Believe in yourself ⭐", color: "from-sky-400 to-blue-600", stringColor: "#38bdf8", floatDelay: "1.1s", size: 72 },
  { id: 7, title: "Bright Horizon", compliment: "Your future is bright ✨", color: "from-emerald-400 to-teal-600", stringColor: "#34d399", floatDelay: "1.7s", size: 68 },
  { id: 8, title: "Graceful Growth", compliment: "Keep growing 💙", color: "from-cyan-400 to-blue-500", stringColor: "#22d3ee", floatDelay: "2.5s", size: 70 },
  { id: 9, title: "Rare Gem", compliment: "You're one of a kind 🌼", color: "from-rose-400 to-red-500", stringColor: "#fb7185", floatDelay: "0.6s", size: 74 },
  { id: 10, title: "Pure Joy", compliment: "Enjoy every moment 🎉", color: "from-violet-400 to-purple-600", stringColor: "#a78bfa", floatDelay: "1.9s", size: 68 },
];

export const Level5BalloonWorld: React.FC<Level5BalloonWorldProps> = ({ personName, onNext }) => {
  const [balloons, setBalloons] = useState<BalloonEntity[]>(BALLOON_DATA.map(b => ({ ...b, popped: false })));
  const [activePopupBalloon, setActivePopupBalloon] = useState<BalloonEntity | null>(null);

  const handlePop = (b: BalloonEntity, e: React.MouseEvent) => {
    if (b.popped) {
      // Re-read already popped compliment
      playClick();
      setActivePopupBalloon(b);
      return;
    }

    playPop();
    playChime(659.25);
    particleEngine.spawnClickSparkles(e.clientX, e.clientY, 26);
    particleEngine.spawnConfetti(25);

    const updated = balloons.map(item => (item.id === b.id ? { ...item, popped: true } : item));
    setBalloons(updated);

    const updatedBalloon = { ...b, popped: true };
    setActivePopupBalloon(updatedBalloon);

    const remainingCount = updated.filter(item => !item.popped).length;
    if (remainingCount === 0) {
      setTimeout(() => {
        playGlissando();
        particleEngine.spawnConfetti(50);
      }, 350);
    }
  };

  const handlePopAll = () => {
    playPop();
    playGlissando();
    particleEngine.spawnConfetti(55);
    setBalloons(prev => prev.map(b => ({ ...b, popped: true })));
    // Open the first popped balloon message popup
    setActivePopupBalloon({ ...balloons[0], popped: true });
  };

  const handleNextInModal = () => {
    if (!activePopupBalloon) return;
    const nextId = (activePopupBalloon.id % balloons.length) + 1;
    const nextBalloon = balloons.find(b => b.id === nextId) || balloons[0];
    playClick();
    setActivePopupBalloon(nextBalloon);
  };

  const handlePrevInModal = () => {
    if (!activePopupBalloon) return;
    const prevId = activePopupBalloon.id === 1 ? balloons.length : activePopupBalloon.id - 1;
    const prevBalloon = balloons.find(b => b.id === prevId) || balloons[0];
    playClick();
    setActivePopupBalloon(prevBalloon);
  };

  const poppedCount = balloons.filter(b => b.popped).length;
  const allPopped = poppedCount === BALLOON_DATA.length;

  return (
    <div className="relative min-h-[85vh] max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/30 text-pink-300">
          Level 5 · Balloon World 🎈
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-pink-100 mt-1">
          Pop the Birthday Garden Balloons
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto mt-1">
          Each floating balloon is filled with sweet words and joyful sparkles. Tap each to pop and reveal its message!
        </p>

        <div className="flex items-center justify-center gap-4 mt-3">
          <div className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-pink-500/30 text-pink-200 shadow-md">
            Popped: <span className="text-pink-400 font-bold">{poppedCount}</span> / {BALLOON_DATA.length}
          </div>
          {!allPopped && (
            <button
              onClick={handlePopAll}
              className="text-xs text-pink-300 hover:text-pink-100 underline decoration-pink-500/40"
            >
              Pop all balloons at once! 🎈
            </button>
          )}
        </div>
      </div>

      {/* Floating Balloons Field */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-pink-500/20 relative min-h-[460px] overflow-hidden shadow-2xl mb-8 flex flex-col justify-between">
        {/* Subtle clouds & garden horizon */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-pink-900/20 to-transparent pointer-events-none" />

        {/* Balloons Container */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 items-center justify-items-center py-6">
          {balloons.map((b) => {
            if (b.popped) {
              return (
                <button
                  key={b.id}
                  onClick={(e) => handlePop(b, e)}
                  className="w-24 h-32 rounded-2xl border border-pink-500/30 bg-pink-500/10 hover:bg-pink-500/20 flex flex-col items-center justify-center text-center p-2.5 transition-all hover:scale-105 cursor-pointer group shadow-sm"
                  title="Click to view compliment again"
                >
                  <span className="text-2xl mb-1 group-hover:scale-125 transition-transform">✨</span>
                  <p className="text-[11px] font-bold text-pink-200 font-serif leading-tight">
                    {b.compliment}
                  </p>
                  <span className="text-[9px] text-pink-300/70 mt-1">Popped · View</span>
                </button>
              );
            }

            return (
              <div
                key={b.id}
                onClick={(e) => handlePop(b, e)}
                style={{ animationDelay: b.floatDelay }}
                className="group relative cursor-pointer flex flex-col items-center animate-float hover:scale-115 active:scale-95 transition-transform"
              >
                {/* Balloon Body */}
                <div
                  className={`relative rounded-[50%] bg-gradient-to-br ${b.color} shadow-[0_12px_28px_rgba(0,0,0,0.45)] flex items-center justify-center border border-white/30`}
                  style={{
                    width: `${b.size}px`,
                    height: `${b.size * 1.25}px`,
                  }}
                >
                  {/* Gloss shine highlight */}
                  <div className="absolute top-2 left-2.5 w-3 h-6 rounded-full bg-white/40 -rotate-25 blur-[0.5px]" />
                  <span className="text-xs font-semibold text-white/90 group-hover:scale-125 transition-transform">
                    🎈
                  </span>
                </div>

                {/* Knot */}
                <div
                  className="w-2 h-1.5 -mt-0.5 rounded-b-sm bg-pink-600 border border-white/20"
                />

                {/* String */}
                <div
                  className="w-0.5 h-12 bg-pink-300/40 origin-top group-hover:rotate-6 transition-transform"
                />

                {/* Pop CTA */}
                <span className="text-[10px] text-pink-300 font-semibold opacity-0 group-hover:opacity-100 transition-opacity -mt-2">
                  Pop!
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* POPPED BALLOON COMPLIMENT POPUP MODAL */}
      {activePopupBalloon && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fadeIn"
          onClick={() => setActivePopupBalloon(null)}
        >
          <div
            className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border border-pink-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-center overflow-hidden animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-20 -left-20 w-44 h-44 bg-pink-500/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-purple-500/25 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button '✕' */}
            <button
              onClick={() => setActivePopupBalloon(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-20 cursor-pointer"
              title="Close Popup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Popped Balloon Badge Icon */}
            <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-pink-500/30 to-purple-600/30 border border-pink-400/50 flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg animate-bounce [animation-duration:2.5s]">
              <span>🎈</span>
              <span className="absolute -top-1 -right-1 text-[10px] bg-pink-500 text-white font-bold px-1.5 py-0.2 rounded-full shadow">
                #{activePopupBalloon.id}
              </span>
            </div>

            {/* Category tag */}
            <span className="text-xs font-semibold uppercase tracking-wider text-pink-400 inline-block px-3 py-0.5 rounded-full bg-pink-500/10 border border-pink-500/20 mb-2">
              {activePopupBalloon.title}
            </span>

            {/* Big Revealed Compliment */}
            <div className="my-4 p-5 rounded-2xl bg-slate-950/40 border border-pink-500/20 shadow-inner">
              <p className="text-2xl sm:text-3xl font-serif text-pink-100 font-bold leading-relaxed">
                "{activePopupBalloon.compliment}"
              </p>
            </div>

            <p className="text-xs text-pink-300/80 mb-6 font-script text-base">
              A burst of sunshine in your birthday garden! 🌸✨
            </p>

            {/* Footer Navigation Buttons */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-pink-500/20">
              <button
                onClick={handlePrevInModal}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Previous Balloon"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <button
                onClick={() => setActivePopupBalloon(null)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs sm:text-sm font-semibold shadow-md shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                {allPopped ? 'All Popped! Continue ✨' : 'Pop More Balloons 🎈'}
              </button>

              <button
                onClick={handleNextInModal}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Next Balloon"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Advance */}
      {allPopped && (
        <div className="text-center pt-2 animate-fadeIn">
          <div className="inline-flex items-center gap-2 p-3 px-6 rounded-2xl bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-400/40 mb-4 shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium text-pink-200">
              All 10 compliments popped! Night is falling over the garden... Look at the glowing stars!
            </span>
          </div>
          <div>
            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Explore Star Collection</span>
              <ArrowRight className="w-5 h-5 text-pink-200" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
