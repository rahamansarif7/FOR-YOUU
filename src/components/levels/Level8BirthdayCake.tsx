import React, { useState } from 'react';
import { Sparkles, Wand2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { playCandleSpark, playGlissando, playFanfare, playChime } from '../../utils/audio';
import { particleEngine } from '../../utils/particles';

interface Level8BirthdayCakeProps {
  personName: string;
  onNext: () => void;
}

interface CandlePos {
  id: number;
  x: number;
  y: number;
  waxColor: string;
  stripeColor: string;
  row: 'back' | 'front';
}

// 20 candles physically distributed in two neat, slightly curved rows on the top surface of Tier 1
const CANDLE_CONFIG: CandlePos[] = [
  // Back Row (10 candles, slightly higher on the top tier surface)
  { id: 0,  x: 212.0, y: 227.0, waxColor: '#fce7f3', stripeColor: '#f472b6', row: 'back' },
  { id: 1,  x: 231.5, y: 224.2, waxColor: '#f3e8ff', stripeColor: '#c084fc', row: 'back' },
  { id: 2,  x: 251.0, y: 222.0, waxColor: '#fef3c7', stripeColor: '#fbbf24', row: 'back' },
  { id: 3,  x: 270.5, y: 220.6, waxColor: '#fce7f3', stripeColor: '#ec4899', row: 'back' },
  { id: 4,  x: 290.0, y: 220.0, waxColor: '#fdf4ff', stripeColor: '#e879f9', row: 'back' },
  { id: 5,  x: 310.0, y: 220.0, waxColor: '#f3e8ff', stripeColor: '#a855f7', row: 'back' },
  { id: 6,  x: 329.5, y: 220.6, waxColor: '#fef3c7', stripeColor: '#f59e0b', row: 'back' },
  { id: 7,  x: 349.0, y: 222.0, waxColor: '#fce7f3', stripeColor: '#f43f5e', row: 'back' },
  { id: 8,  x: 368.5, y: 224.2, waxColor: '#fdf4ff', stripeColor: '#c084fc', row: 'back' },
  { id: 9,  x: 388.0, y: 227.0, waxColor: '#fef3c7', stripeColor: '#fbbf24', row: 'back' },

  // Front Row (10 candles, slightly lower on the top tier surface, staggered for visibility)
  { id: 10, x: 218.0, y: 238.5, waxColor: '#fef3c7', stripeColor: '#f59e0b', row: 'front' },
  { id: 11, x: 236.2, y: 241.0, waxColor: '#fce7f3', stripeColor: '#ec4899', row: 'front' },
  { id: 12, x: 254.4, y: 243.0, waxColor: '#f3e8ff', stripeColor: '#a855f7', row: 'front' },
  { id: 13, x: 272.6, y: 244.5, waxColor: '#fdf4ff', stripeColor: '#f472b6', row: 'front' },
  { id: 14, x: 290.8, y: 245.0, waxColor: '#fef3c7', stripeColor: '#fbbf24', row: 'front' },
  { id: 15, x: 309.2, y: 245.0, waxColor: '#fce7f3', stripeColor: '#f43f5e', row: 'front' },
  { id: 16, x: 327.4, y: 244.5, waxColor: '#f3e8ff', stripeColor: '#c084fc', row: 'front' },
  { id: 17, x: 345.6, y: 243.0, waxColor: '#fdf4ff', stripeColor: '#e879f9', row: 'front' },
  { id: 18, x: 363.8, y: 241.0, waxColor: '#fef3c7', stripeColor: '#f59e0b', row: 'front' },
  { id: 19, x: 382.0, y: 238.5, waxColor: '#fce7f3', stripeColor: '#ec4899', row: 'front' },
];

export const Level8BirthdayCake: React.FC<Level8BirthdayCakeProps> = ({
  personName,
  onNext,
}) => {
  const [litCandles, setLitCandles] = useState<boolean[]>(Array(20).fill(false));
  const [wished, setWished] = useState(false);
  const [isBlowing, setIsBlowing] = useState(false);

  const litCount = litCandles.filter(Boolean).length;
  const allLit = litCount === 20;

  const handleLightCandle = (index: number, e: React.MouseEvent) => {
    if (litCandles[index]) return;
    playCandleSpark();
    particleEngine.spawnClickSparkles(e.clientX, e.clientY, 14);

    const updated = [...litCandles];
    updated[index] = true;
    setLitCandles(updated);

    if (updated.filter(Boolean).length === 20) {
      setTimeout(() => {
        playFanfare();
        particleEngine.spawnConfetti(75);
        particleEngine.spawnPetals(30);
        particleEngine.launchFirework();
        setTimeout(() => particleEngine.launchFirework(), 500);
        setTimeout(() => particleEngine.launchFirework(), 1000);
      }, 300);
    }
  };

  const handleLightAll = () => {
    setLitCandles(Array(20).fill(true));
    playFanfare();
    particleEngine.spawnConfetti(85);
    particleEngine.spawnPetals(35);
    particleEngine.launchFirework();
    setTimeout(() => particleEngine.launchFirework(), 600);
  };

  const handleMakeWish = () => {
    if (wished) return;
    setIsBlowing(true);
    playChime(1046.50);
    particleEngine.spawnPetals(40);
    particleEngine.spawnConfetti(55);
    particleEngine.launchFirework();

    setTimeout(() => {
      // Extinguish flames into stardust
      setLitCandles(Array(20).fill(false));
      setIsBlowing(false);
      setWished(true);
      playGlissando();
    }, 1200);
  };

  // Helper to render a candle with its wick, flame, and frosting base socket
  const renderCandle = (c: CandlePos) => {
    const isLit = litCandles[c.id];
    const candleHeight = 36;
    const candleWidth = 4.5;
    const topX = c.x;
    const topY = c.y - candleHeight;
    const wickTopY = topY - 5;

    return (
      <g
        key={c.id}
        onClick={(e) => handleLightCandle(c.id, e)}
        className="cursor-pointer group select-none"
      >
        {/* Invisible enlarged hit target for easy tapping on mobile/desktop */}
        <rect
          x={c.x - 12}
          y={topY - 26}
          width={24}
          height={candleHeight + 32}
          fill="transparent"
          className="cursor-pointer"
        />

        {/* Embedded Frosting Socket / Cream Dollop at candle base */}
        <ellipse
          cx={c.x}
          cy={c.y + 1}
          rx={3.5}
          ry={1.8}
          fill="#fce7f3"
          stroke="#f472b6"
          strokeWidth="0.6"
          opacity="0.9"
        />
        <circle cx={c.x} cy={c.y} r={1.6} fill="#ffffff" opacity="0.8" />

        {/* Vertical Candle Body (Physical wax cylinder) */}
        <rect
          x={c.x - candleWidth / 2}
          y={topY}
          width={candleWidth}
          height={candleHeight}
          rx={1.5}
          fill={`url(#candle-wax-${c.id % 4})`}
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="0.5"
          className="transition-transform group-hover:scale-105 origin-bottom"
        />

        {/* Subtle decorative spiral stripes on candle */}
        <line
          x1={c.x - candleWidth / 2 + 0.8}
          y1={topY + 6}
          x2={c.x + candleWidth / 2 - 0.8}
          y2={topY + 11}
          stroke={c.stripeColor}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.75"
        />
        <line
          x1={c.x - candleWidth / 2 + 0.8}
          y1={topY + 18}
          x2={c.x + candleWidth / 2 - 0.8}
          y2={topY + 23}
          stroke={c.stripeColor}
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.75"
        />

        {/* Candle Wick standing upright */}
        <line
          x1={topX}
          y1={topY}
          x2={topX}
          y2={wickTopY}
          stroke="#262626"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Realistic Animated Flame (Directly above the wick) */}
        {isLit && (
          <g className="animate-pulse origin-bottom">
            {/* Soft Ambient Golden Glow */}
            <circle
              cx={topX}
              cy={wickTopY - 6}
              r={12}
              fill="url(#candle-glow)"
              opacity="0.7"
              pointerEvents="none"
            />

            {/* Outer Flame Teardrop */}
            <path
              d={`M ${topX} ${wickTopY} 
                  C ${topX - 3.5} ${wickTopY - 4}, ${topX - 3.5} ${wickTopY - 11}, ${topX} ${wickTopY - 15}
                  C ${topX + 3.5} ${wickTopY - 11}, ${topX + 3.5} ${wickTopY - 4}, ${topX} ${wickTopY} Z`}
              fill="url(#flame-outer)"
              filter="drop-shadow(0 0 4px rgba(251, 146, 60, 0.8))"
            />

            {/* Inner White-Hot Core */}
            <path
              d={`M ${topX} ${wickTopY - 1} 
                  C ${topX - 1.8} ${wickTopY - 3}, ${topX - 1.8} ${wickTopY - 7}, ${topX} ${wickTopY - 10}
                  C ${topX + 1.8} ${wickTopY - 7}, ${topX + 1.8} ${wickTopY - 3}, ${topX} ${wickTopY - 1} Z`}
              fill="#fffbeb"
            />
          </g>
        )}
      </g>
    );
  };

  return (
    <div className="relative min-h-[85vh] max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">
      {/* Surrounding Ambient Environment: Subtle Floating Petals and Butterflies */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-6 left-8 text-2xl animate-float opacity-70">🌷</div>
        <div className="absolute top-10 right-10 text-2xl animate-float [animation-delay:1.5s] opacity-70">🦋</div>
        <div className="absolute bottom-16 left-10 text-xl animate-float [animation-delay:2s] opacity-60">✨</div>
        <div className="absolute bottom-12 right-12 text-2xl animate-float [animation-delay:0.8s] opacity-70">🌸</div>
      </div>

      {/* Header */}
      <div className="text-center mb-4 z-10">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300">
          Level 8 · The Birthday Cake 🎂
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-pink-100 mt-1">
          Twenty Birthday Candles
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto mt-1">
          Tap each candle to light its flame for your 20th milestone!
        </p>

        {/* Live Candle Counter (Required: "0 / 20 candles lit" updated after each interaction) */}
        <div className="flex items-center justify-center gap-4 mt-3">
          <div className="text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full bg-slate-900/90 border border-pink-500/30 text-pink-200 shadow-md">
            <span className="text-amber-400 font-bold">{litCount} / 20</span> candles lit
          </div>
          {!allLit && (
            <button
              onClick={handleLightAll}
              className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-100 underline decoration-amber-500/40"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>Light All Candles ✨</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Realistic 3-Tier Illustrated Birthday Cake Stage */}
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-4 sm:p-8 border border-pink-500/30 shadow-2xl flex flex-col items-center justify-center overflow-hidden z-10">
        <div className="w-full flex items-center justify-center">
          <svg
            viewBox="0 0 600 520"
            className="w-full max-w-[560px] h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] select-none"
          >
            <defs>
              {/* Ceramic Cake Platter Gradient */}
              <linearGradient id="stand-metal" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="35%" stopColor="#ffffff" />
                <stop offset="70%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>

              {/* Gold Rim on Stand */}
              <linearGradient id="gold-rim" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="50%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>

              {/* Tier 3 (Bottom) Frosting Gradients */}
              <linearGradient id="tier3-side" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fae8ff" />
                <stop offset="30%" stopColor="#fdf4ff" />
                <stop offset="65%" stopColor="#f5d0fe" />
                <stop offset="100%" stopColor="#d8b4fe" />
              </linearGradient>
              <radialGradient id="tier3-top" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="60%" stopColor="#fae8ff" />
                <stop offset="100%" stopColor="#f0abfc" />
              </radialGradient>

              {/* Tier 2 (Middle) Frosting Gradients */}
              <linearGradient id="tier2-side" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffe4e6" />
                <stop offset="35%" stopColor="#fff1f2" />
                <stop offset="70%" stopColor="#fecdd3" />
                <stop offset="100%" stopColor="#fda4af" />
              </linearGradient>
              <radialGradient id="tier2-top" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="65%" stopColor="#ffe4e6" />
                <stop offset="100%" stopColor="#fda4af" />
              </radialGradient>

              {/* Tier 1 (Top Tier) Frosting Gradients */}
              <linearGradient id="tier1-side" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fce7f3" />
                <stop offset="35%" stopColor="#fdf2f8" />
                <stop offset="70%" stopColor="#fbcfe8" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
              <radialGradient id="tier1-top" cx="45%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="45%" stopColor="#fdf2f8" />
                <stop offset="85%" stopColor="#fce7f3" />
                <stop offset="100%" stopColor="#fbcfe8" />
              </radialGradient>

              {/* Candle Wax Gradients */}
              <linearGradient id="candle-wax-0" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fdf2f8" />
                <stop offset="40%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#fce7f3" />
              </linearGradient>
              <linearGradient id="candle-wax-1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f3e8ff" />
                <stop offset="40%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#e9d5ff" />
              </linearGradient>
              <linearGradient id="candle-wax-2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fef3c7" />
                <stop offset="40%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#fde68a" />
              </linearGradient>
              <linearGradient id="candle-wax-3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ffe4e6" />
                <stop offset="40%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#fecdd3" />
              </linearGradient>

              {/* Flame Gradients */}
              <linearGradient id="flame-outer" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="40%" stopColor="#f97316" />
                <stop offset="70%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#fef08a" />
              </linearGradient>
              <radialGradient id="candle-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(253, 224, 71, 0.7)" />
                <stop offset="50%" stopColor="rgba(251, 146, 60, 0.3)" />
                <stop offset="100%" stopColor="rgba(251, 146, 60, 0)" />
              </radialGradient>
            </defs>

            {/* 1. CAKE STAND / PLATTER */}
            <g id="cake-stand">
              {/* Stand Shadow */}
              <ellipse cx="300" cy="505" rx="140" ry="12" fill="rgba(0,0,0,0.35)" />
              {/* Pedestal Base */}
              <ellipse cx="300" cy="492" rx="90" ry="14" fill="url(#stand-metal)" />
              <path
                d="M 240 492 C 270 480, 270 468, 275 460 L 325 460 C 330 468, 330 480, 360 492 Z"
                fill="url(#stand-metal)"
              />
              {/* Platter Rim Under-Shadow */}
              <ellipse cx="300" cy="462" rx="230" ry="34" fill="rgba(0,0,0,0.25)" />
              {/* Main Platter Disk */}
              <ellipse cx="300" cy="458" rx="230" ry="34" fill="url(#stand-metal)" />
              {/* Gold Platter Rim */}
              <ellipse cx="300" cy="456" rx="226" ry="32" fill="none" stroke="url(#gold-rim)" strokeWidth="2.5" />
            </g>

            {/* 2. TIER 3 (BOTTOM TIER) */}
            <g id="cake-tier-3">
              {/* Drop shadow on platter */}
              <ellipse cx="300" cy="454" rx="200" ry="30" fill="rgba(0,0,0,0.18)" />

              {/* Cylindrical Side Body */}
              <path
                d="M 100 375 
                   C 100 405, 100 425, 100 445 
                   C 100 462, 500 462, 500 445 
                   L 500 375 Z"
                fill="url(#tier3-side)"
              />

              {/* Elegant Scalloped Vanilla Cream Swags on Tier 3 Side */}
              <path
                d="M 115 405 Q 165 422 215 405 Q 265 422 315 405 Q 365 422 415 405 Q 455 420 485 405"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                opacity="0.85"
                strokeLinecap="round"
              />
              <path
                d="M 135 425 Q 175 438 215 425 Q 255 438 295 425 Q 335 438 375 425 Q 415 438 455 425"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.8"
                opacity="0.6"
                strokeLinecap="round"
              />

              {/* Top Surface Ellipse of Tier 3 */}
              <ellipse cx="300" cy="375" rx="200" ry="30" fill="url(#tier3-top)" />

              {/* Piped Vanilla Cream Pearls along Tier 3 Top Border */}
              {Array.from({ length: 32 }).map((_, i) => {
                const angle = (Math.PI / 31) * i;
                const px = 300 - Math.cos(angle) * 198;
                const py = 375 + Math.sin(angle) * 29;
                return (
                  <circle
                    key={`t3-pearl-${i}`}
                    cx={px}
                    cy={py}
                    r={2.8}
                    fill="#ffffff"
                    stroke="#f5d0fe"
                    strokeWidth="0.5"
                  />
                );
              })}
            </g>

            {/* 3. TIER 2 (MIDDLE TIER) */}
            <g id="cake-tier-2">
              {/* Drop shadow on Tier 3 */}
              <ellipse cx="300" cy="374" rx="155" ry="24" fill="rgba(0,0,0,0.14)" />

              {/* Cylindrical Side Body */}
              <path
                d="M 145 300 
                   C 145 325, 145 350, 145 368 
                   C 145 382, 455 382, 455 368 
                   L 455 300 Z"
                fill="url(#tier2-side)"
              />

              {/* Delicate Vanilla Cream Swags on Tier 2 */}
              <path
                d="M 160 328 Q 200 342 240 328 Q 280 342 320 328 Q 360 342 400 328 Q 425 338 440 328"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.2"
                opacity="0.9"
                strokeLinecap="round"
              />

              {/* Top Surface Ellipse of Tier 2 */}
              <ellipse cx="300" cy="300" rx="155" ry="24" fill="url(#tier2-top)" />

              {/* Piped Vanilla Pearls along Tier 2 Top Border */}
              {Array.from({ length: 26 }).map((_, i) => {
                const angle = (Math.PI / 25) * i;
                const px = 300 - Math.cos(angle) * 153;
                const py = 300 + Math.sin(angle) * 23;
                return (
                  <circle
                    key={`t2-pearl-${i}`}
                    cx={px}
                    cy={py}
                    r={2.4}
                    fill="#ffffff"
                    stroke="#fda4af"
                    strokeWidth="0.5"
                  />
                );
              })}
            </g>

            {/* 4. TIER 1 (UPPERMOST TIER) */}
            <g id="cake-tier-1">
              {/* Drop shadow on Tier 2 */}
              <ellipse cx="300" cy="299" rx="116" ry="19" fill="rgba(0,0,0,0.12)" />

              {/* Cylindrical Side Body */}
              <path
                d="M 184 235 
                   C 184 255, 184 275, 184 292 
                   C 184 304, 416 304, 416 292 
                   L 416 235 Z"
                fill="url(#tier1-side)"
              />

              {/* Smooth Frosting Texture / Specular Sheen */}
              <path
                d="M 195 245 C 205 270, 215 285, 235 290"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
              />

              {/* Top Surface Ellipse of Tier 1 (Where candles are physically placed) */}
              <ellipse cx="300" cy="235" rx="116" ry="21" fill="url(#tier1-top)" />

              {/* Delicate Piped Cream Border Pearls around Tier 1 Surface Rim */}
              {Array.from({ length: 22 }).map((_, i) => {
                const angle = (Math.PI / 21) * i;
                const px = 300 - Math.cos(angle) * 115;
                const py = 235 + Math.sin(angle) * 20.5;
                return (
                  <circle
                    key={`t1-pearl-${i}`}
                    cx={px}
                    cy={py}
                    r={2.2}
                    fill="#ffffff"
                    stroke="#f472b6"
                    strokeWidth="0.4"
                  />
                );
              })}
            </g>

            {/* 5. PHYSICAL CANDLES (Strictly placed upright on Tier 1 Top Surface) */}
            {/* Render Back Row first so front row renders smoothly in front */}
            <g id="candles-back-row">
              {CANDLE_CONFIG.filter((c) => c.row === 'back').map((c) => renderCandle(c))}
            </g>
            <g id="candles-front-row">
              {CANDLE_CONFIG.filter((c) => c.row === 'front').map((c) => renderCandle(c))}
            </g>
          </svg>
        </div>

        {/* Required Birthday Message & Action when all 20 candles are lit */}
        {allLit && !wished && (
          <div className="mt-6 text-center animate-fadeIn z-20">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-pink-100 mb-2">
              20 looks like a wonderful chapter to begin!
            </h3>
            <p className="text-sm sm:text-base text-pink-200/90 mb-5 font-medium max-w-lg mx-auto">
              Close your eyes, think of something you wish for your twenties, and make a wish...
            </p>

            <button
              onClick={handleMakeWish}
              disabled={isBlowing}
              className="inline-flex items-center gap-2 px-8 sm:px-10 py-3.5 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 text-white font-bold text-lg shadow-[0_0_35px_rgba(251,191,36,0.65)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-yellow-200 animate-spin" />
              <span>{isBlowing ? 'Whispering your wish to the stars...' : 'Make a Wish ✨'}</span>
            </button>
          </div>
        )}

        {/* Post-Wish Completed State */}
        {wished && (
          <div className="mt-6 text-center animate-fadeIn z-20">
            <div className="inline-flex items-center gap-2 p-3 px-6 rounded-2xl bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-400/40 mb-4">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-medium text-pink-100 font-serif">
                Your wish has been whispered to the garden stars! 🌠
              </span>
            </div>

            <div>
              <button
                onClick={onNext}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Read the Secret Letter</span>
                <ArrowRight className="w-5 h-5 text-pink-200" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
