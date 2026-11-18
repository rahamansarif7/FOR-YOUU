import React, { useState } from 'react';
import { Star, Sparkles, ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';
import { playChime, playGlissando } from '../../utils/audio';
import { particleEngine } from '../../utils/particles';
import nightStarGardenImg from '../../assets/images/cute_night_star_garden_1793875675679.jpg';

interface Level6StarCollectionProps {
  personName: string;
  onNext: () => void;
}

interface StarNode {
  id: number;
  category: string;
  wish: string;
  x: number; // percentage left
  y: number; // percentage top
  hint: string;
  icon: string;
}

const STAR_NODES: StarNode[] = [
  {
    id: 1,
    category: "Happiness",
    wish: "May your heart always be as full, radiant, and peaceful as a tranquil midnight sky.",
    x: 64,
    y: 15,
    hint: "Right beside the smiling crescent moon in the starry sky 🌙",
    icon: "🌟"
  },
  {
    id: 2,
    category: "Friendship",
    wish: "May you always be surrounded by genuine souls who celebrate you just as you are.",
    x: 41,
    y: 32,
    hint: "Floating gently near the cute fairy messenger in the air 🧚",
    icon: "💫"
  },
  {
    id: 3,
    category: "Confidence",
    wish: "May you always believe in your quiet strength, your boundless kindness, and your unforgettable spark.",
    x: 18,
    y: 26,
    hint: "Glowing softly near the warm lantern in the big tree 🏮",
    icon: "✨"
  },
  {
    id: 4,
    category: "New Opportunities",
    wish: "May doors swing open to wondrous paths and adventures you haven't even dared to dream of yet.",
    x: 34,
    y: 76,
    hint: "Tucked inside the magical glowing purple tulips 🌷",
    icon: "🌠"
  },
  {
    id: 5,
    category: "Beautiful Adventures",
    wish: "May your twenties be a grand, unforgettable story filled with bold strides and serendipitous wonders.",
    x: 83,
    y: 48,
    hint: "Shining near the cozy window of the fairy garden cottage 🏡",
    icon: "⭐"
  }
];

export const Level6StarCollection: React.FC<Level6StarCollectionProps> = ({
  personName,
  onNext,
}) => {
  const [collectedIds, setCollectedIds] = useState<number[]>([]);
  const [activeStar, setActiveStar] = useState<StarNode | null>(null);
  const [showHints, setShowHints] = useState(false);

  const handleCollectStar = (star: StarNode, e: React.MouseEvent) => {
    const isNew = !collectedIds.includes(star.id);
    if (isNew) {
      setCollectedIds(prev => [...prev, star.id]);
      playChime(880 + star.id * 80);
      particleEngine.spawnClickSparkles(e.clientX, e.clientY, 25);
    }
    setActiveStar(star);

    if (collectedIds.length + 1 === STAR_NODES.length) {
      setTimeout(() => {
        playGlissando();
        particleEngine.spawnConfetti(35);
      }, 350);
    }
  };

  const handleCollectAll = () => {
    setCollectedIds(STAR_NODES.map(s => s.id));
    playGlissando();
    particleEngine.spawnConfetti(35);
  };

  const collectedCount = collectedIds.length;
  const allCollected = collectedCount === STAR_NODES.length;

  return (
    <div className="relative min-h-[85vh] max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-purple-500/15 border border-purple-400/30 text-purple-300">
            Level 6 · Star Collection ⭐
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-pink-100 mt-1">
            Find the Five Hidden Garden Stars
          </h2>
          <p className="text-xs text-slate-300">
            Click on each glowing star hidden across the dreamy storybook night garden!
          </p>
        </div>

        {/* Counter and Helper */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-purple-500/30 text-xs text-purple-200">
            <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span>Stars Collected:</span>
            <span className="font-bold text-pink-300">{collectedCount} / 5</span>
          </div>

          <button
            onClick={() => setShowHints(!showHints)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-pink-200 text-xs border border-slate-700 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showHints ? 'Hide Hints' : 'Hints'}</span>
          </button>

          {!allCollected && (
            <button
              onClick={handleCollectAll}
              className="text-xs text-purple-300 hover:text-purple-100 underline decoration-purple-500/40 cursor-pointer"
            >
              Collect all ✨
            </button>
          )}
        </div>
      </div>

      {/* Main Night Sky Canvas Container */}
      <div className="relative rounded-3xl overflow-hidden border border-purple-400/30 shadow-2xl min-h-[480px] sm:min-h-[560px]">
        {/* Background Image of the cute dreamy night garden */}
        <img
          src={nightStarGardenImg}
          alt="Dreamy cute storybook night sky garden with smiling moon and fairies"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover min-h-[480px] sm:min-h-[560px]"
        />

        {/* Subtle atmospheric overlay */}
        <div className="absolute inset-0 bg-purple-950/15 pointer-events-none" />

        {/* 5 Hidden Stars in Scene */}
        {STAR_NODES.map((star) => {
          const isCollected = collectedIds.includes(star.id);

          return (
            <div
              key={star.id}
              onClick={(e) => handleCollectStar(star, e)}
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
            >
              {/* Star Beacon */}
              <div
                className={`relative flex items-center justify-center transition-all duration-300 ${
                  isCollected
                    ? 'w-10 h-10 rounded-full bg-yellow-400/35 border border-yellow-300/80 shadow-[0_0_20px_rgba(250,204,21,0.85)] scale-90'
                    : 'w-12 h-12 rounded-full bg-yellow-300/25 border-2 border-yellow-300 animate-pulse hover:scale-130 shadow-[0_0_25px_rgba(250,204,21,0.95)]'
                }`}
              >
                <Star
                  className={`w-6 h-6 transition-transform ${
                    isCollected
                      ? 'text-yellow-200 fill-yellow-200'
                      : 'text-yellow-300 fill-yellow-300 animate-spin [animation-duration:8s] group-hover:scale-125'
                  }`}
                />
                {!isCollected && (
                  <span className="absolute inset-0 rounded-full bg-yellow-400/30 animate-ping pointer-events-none" />
                )}
              </div>

              {/* Star Label / Category Tooltip */}
              <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-0.5 rounded bg-slate-900/90 border border-yellow-400/40 text-[10px] text-yellow-200 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity shadow">
                {isCollected ? `✓ ${star.category}` : star.category}
              </div>
            </div>
          );
        })}

        {/* Hint Ribbon (if requested) */}
        {showHints && !allCollected && (
          <div className="absolute top-4 left-4 right-4 z-30 glass-panel rounded-2xl p-3 border border-yellow-400/40 text-xs text-yellow-100 animate-fadeIn shadow-xl">
            <span className="font-bold text-yellow-300 block mb-1">Star Location Clues:</span>
            <ul className="grid sm:grid-cols-2 gap-1.5 text-[11px] text-slate-200">
              {STAR_NODES.map((s) => (
                <li key={s.id} className="flex items-center gap-1.5">
                  <span>{collectedIds.includes(s.id) ? '✅' : '🔍'}</span>
                  <span><strong>{s.category}:</strong> {s.hint}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Active Star Wish Modal */}
        {activeStar && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md z-30 glass-panel rounded-2xl p-5 border border-yellow-400/50 shadow-2xl animate-fadeIn text-left">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-yellow-300 flex items-center gap-1.5">
                <span>{activeStar.icon}</span>
                <span>The Wish of {activeStar.category}</span>
              </span>
              <button
                onClick={() => setActiveStar(null)}
                className="text-xs text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>
            <p className="text-base font-serif text-slate-100 italic font-medium leading-relaxed">
              "{activeStar.wish}"
            </p>
          </div>
        )}
      </div>

      {/* Completion Advance */}
      {allCollected && (
        <div className="text-center pt-6 animate-fadeIn">
          <div className="inline-flex items-center gap-2 p-3 px-6 rounded-2xl bg-gradient-to-r from-yellow-500/20 to-purple-600/20 border border-yellow-400/40 mb-4 shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-pink-200">
              All 5 celestial stars collected! The magical tulip-engraved chest is waiting for you.
            </span>
          </div>
          <div>
            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-yellow-500 via-pink-500 to-purple-600 text-white font-semibold shadow-[0_0_25px_rgba(250,204,21,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Unlock the Engraved Chest</span>
              <ArrowRight className="w-5 h-5 text-pink-200" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
