import React, { useState, useEffect } from 'react';
import { Trophy, Timer, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { playFlutter, playChime, playGlissando } from '../../utils/audio';
import { particleEngine } from '../../utils/particles';

interface Level4ButterflyChallengeProps {
  personName: string;
  onNext: () => void;
}

interface ButterflyEntity {
  id: number;
  message: string;
  color: string;
  wingsColor: string;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  caught: boolean;
}

const BUTTERFLY_MESSAGES = [
  "Officially certified sunshine! ☀️",
  "Your sense of humour deserves its own award. 🏆",
  "A little chaos, a lot of charm. ✨",
  "Keep being wonderfully unpredictable. 🌈",
  "May your confidence keep growing. 🌷",
  "You make ordinary moments more cheerful. 🌸"
];

const BUTTERFLY_PALETTES = [
  { body: '#f43f5e', wings: '#fbcfe8' },
  { body: '#8b5cf6', wings: '#e9d5ff' },
  { body: '#06b6d4', wings: '#cffafe' },
  { body: '#f59e0b', wings: '#fef3c7' },
  { body: '#ec4899', wings: '#fce7f3' },
  { body: '#10b981', wings: '#d1fae5' },
];

export const Level4ButterflyChallenge: React.FC<Level4ButterflyChallengeProps> = ({
  personName,
  onNext,
}) => {
  const [butterflies, setButterflies] = useState<ButterflyEntity[]>(() =>
    BUTTERFLY_MESSAGES.map((msg, idx) => ({
      id: idx + 1,
      message: msg,
      color: BUTTERFLY_PALETTES[idx].body,
      wingsColor: BUTTERFLY_PALETTES[idx].wings,
      x: 15 + Math.random() * 70,
      y: 20 + Math.random() * 60,
      size: 40 + Math.random() * 14,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      caught: false,
    }))
  );

  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(true);
  const [unlockedMessages, setUnlockedMessages] = useState<string[]>([]);
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  // Floating flutter physics loop
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setButterflies((prev) =>
        prev.map((b) => {
          if (b.caught) return b;
          let nx = b.x + b.vx;
          let ny = b.y + b.vy;
          let nvx = b.vx + (Math.random() - 0.5) * 0.3;
          let nvy = b.vy + (Math.random() - 0.5) * 0.3;

          // Bounce off boundaries
          if (nx < 8) { nx = 8; nvx = Math.abs(nvx); }
          if (nx > 92) { nx = 92; nvx = -Math.abs(nvx); }
          if (ny < 12) { ny = 12; nvy = Math.abs(nvy); }
          if (ny > 88) { ny = 88; nvy = -Math.abs(nvy); }

          // Cap speed
          nvx = Math.max(-1.2, Math.min(1.2, nvx));
          nvy = Math.max(-1.2, Math.min(1.2, nvy));

          return { ...b, x: nx, y: ny, vx: nvx, vy: nvy };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Timer countdown
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setIsPlaying(false);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleCatchButterfly = (b: ButterflyEntity, e: React.MouseEvent) => {
    if (b.caught) return;
    playFlutter();
    playChime(784);
    particleEngine.spawnClickSparkles(e.clientX, e.clientY, 18);

    setButterflies((prev) =>
      prev.map((item) => (item.id === b.id ? { ...item, caught: true } : item))
    );
    setUnlockedMessages((prev) => [...prev, b.message]);
    setActiveMessage(b.message);

    if (unlockedMessages.length + 1 >= BUTTERFLY_MESSAGES.length) {
      setTimeout(() => {
        playGlissando();
        particleEngine.spawnConfetti(35);
      }, 300);
    }
  };

  const handleResetGame = () => {
    setTimeLeft(30);
    setIsPlaying(true);
    setUnlockedMessages([]);
    setActiveMessage(null);
    setButterflies(
      BUTTERFLY_MESSAGES.map((msg, idx) => ({
        id: idx + 1,
        message: msg,
        color: BUTTERFLY_PALETTES[idx].body,
        wingsColor: BUTTERFLY_PALETTES[idx].wings,
        x: 15 + Math.random() * 70,
        y: 20 + Math.random() * 60,
        size: 40 + Math.random() * 14,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        caught: false,
      }))
    );
  };

  const caughtCount = butterflies.filter((b) => b.caught).length;
  const isAllCaught = caughtCount === BUTTERFLY_MESSAGES.length;

  return (
    <div className="relative min-h-[85vh] max-w-5xl mx-auto px-4 py-6 flex flex-col">
      {/* Header with Game HUD */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300">
            Level 4 · Butterfly Challenge 🦋
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-pink-100 mt-1">
            Catch the Magical Garden Butterflies
          </h2>
          <p className="text-xs text-slate-300">
            Tap the fluttering butterflies before the gentle breeze carries them away!
          </p>
        </div>

        {/* HUD Meters */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-pink-500/30 text-xs">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300">Caught:</span>
            <span className="font-bold text-pink-300">{caughtCount} / {BUTTERFLY_MESSAGES.length}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-pink-500/30 text-xs">
            <Timer className="w-4 h-4 text-pink-400" />
            <span className="text-slate-300">Time:</span>
            <span className={`font-mono font-bold ${timeLeft <= 5 ? 'text-rose-400 animate-pulse' : 'text-slate-100'}`}>
              {timeLeft}s
            </span>
          </div>

          <button
            onClick={handleResetGame}
            title="Reset Game"
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Game Playing Field */}
      <div className="relative flex-1 min-h-[460px] sm:min-h-[500px] w-full rounded-3xl glass-panel border border-pink-500/20 overflow-hidden shadow-2xl">
        {/* Garden backdrop decor */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-transparent to-pink-950/40 pointer-events-none" />
        <div className="absolute bottom-2 left-6 text-4xl opacity-40 pointer-events-none">🌷</div>
        <div className="absolute bottom-2 right-12 text-5xl opacity-40 pointer-events-none">🌷</div>
        <div className="absolute bottom-2 left-1/3 text-3xl opacity-35 pointer-events-none">🌸</div>

        {/* Active Butterflies */}
        {butterflies.map((b) => {
          if (b.caught) return null;
          return (
            <div
              key={b.id}
              onClick={(e) => handleCatchButterfly(b, e)}
              className="absolute cursor-pointer transition-transform duration-75 hover:scale-125 select-none"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                transform: `translate(-50%, -50%) rotate(${b.vx * 15}deg)`,
              }}
            >
              <div className="relative flex items-center justify-center p-2">
                {/* Custom SVG Butterfly */}
                <svg
                  width={b.size}
                  height={b.size}
                  viewBox="0 0 100 100"
                  className="filter drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]"
                >
                  {/* Left Wings */}
                  <g className="animate-flutter-left origin-right">
                    <path
                      d="M 50,50 C 20,20 10,25 15,50 C 18,65 35,70 50,50 Z"
                      fill={b.wingsColor}
                      stroke={b.color}
                      strokeWidth="3"
                    />
                    <path
                      d="M 50,50 C 25,60 20,80 35,85 C 45,88 48,70 50,50 Z"
                      fill={b.wingsColor}
                      stroke={b.color}
                      strokeWidth="2.5"
                    />
                  </g>
                  {/* Right Wings */}
                  <g className="animate-flutter-right origin-left">
                    <path
                      d="M 50,50 C 80,20 90,25 85,50 C 82,65 65,70 50,50 Z"
                      fill={b.wingsColor}
                      stroke={b.color}
                      strokeWidth="3"
                    />
                    <path
                      d="M 50,50 C 75,60 80,80 65,85 C 55,88 52,70 50,50 Z"
                      fill={b.wingsColor}
                      stroke={b.color}
                      strokeWidth="2.5"
                    />
                  </g>
                  {/* Body & Antennae */}
                  <ellipse cx="50" cy="50" rx="4" ry="18" fill={b.color} />
                  <line x1="48" y1="35" x2="42" y2="22" stroke={b.color} strokeWidth="2" strokeLinecap="round" />
                  <line x1="52" y1="35" x2="58" y2="22" stroke={b.color} strokeWidth="2" strokeLinecap="round" />
                </svg>

                {/* Subtle pulse hint */}
                <span className="absolute -bottom-1 text-[10px] text-pink-300 font-semibold bg-slate-900/60 rounded px-1 pointer-events-none">
                  Tap!
                </span>
              </div>
            </div>
          );
        })}

        {/* Message Banner for Latest Caught Butterfly */}
        {activeMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 max-w-md w-[90%] glass-panel rounded-2xl px-4 py-3 border border-pink-400/50 text-center animate-fadeIn shadow-xl pointer-events-none z-20">
            <span className="text-xs font-semibold text-pink-400 uppercase tracking-wide">
              Butterfly Whispers
            </span>
            <p className="text-base font-serif text-pink-100 font-medium mt-0.5">
              "{activeMessage}"
            </p>
          </div>
        )}

        {/* Game Completed / Time-up State */}
        {isAllCaught && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-3xl mb-3 shadow-lg shadow-pink-500/50 animate-bounce">
              🦋
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-pink-100 mb-2">
              Master Butterfly Whisperer! ✨
            </h3>
            <p className="text-pink-200/90 text-sm max-w-md mb-6">
              You caught all the magical garden butterflies and unlocked all their special compliments!
            </p>

            <div className="flex flex-wrap gap-2 justify-center max-w-xl mb-6">
              {unlockedMessages.map((msg, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-200"
                >
                  {msg}
                </span>
              ))}
            </div>

            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Fly to Balloon World</span>
              <ArrowRight className="w-5 h-5 text-pink-200" />
            </button>
          </div>
        )}

        {/* Time up without all caught */}
        {!isAllCaught && !isPlaying && timeLeft === 0 && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30 animate-fadeIn">
            <h3 className="text-2xl font-serif font-bold text-pink-100 mb-2">
              Time's Up! You caught {caughtCount} butterflies! 🌸
            </h3>
            <p className="text-slate-300 text-sm mb-6">
              Would you like to try catching the remaining flutterers, or float ahead?
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleResetGame}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-pink-200 text-sm font-medium border border-slate-700"
              >
                Try Again 🦋
              </button>
              <button
                onClick={onNext}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-semibold shadow-md"
              >
                Continue Anyway ✨
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
