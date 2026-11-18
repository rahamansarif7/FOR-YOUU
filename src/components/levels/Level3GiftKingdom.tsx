import React, { useState } from 'react';
import { Gift, Sparkles, ArrowRight, CheckCircle2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { playChime, playGlissando, playClick } from '../../utils/audio';
import { particleEngine } from '../../utils/particles';

interface Level3GiftKingdomProps {
  personName: string;
  onNext: () => void;
}

interface GiftData {
  id: number;
  wish: string;
  color: string;
  ribbonColor: string;
  icon: string;
  title: string;
}

const GIFTS: GiftData[] = [
  {
    id: 1,
    title: "Storage Upgrade",
    wish: "May your happiness have unlimited storage.",
    color: "from-pink-500/80 to-rose-600/80",
    ribbonColor: "border-pink-300",
    icon: "💾🌸"
  },
  {
    id: 2,
    title: "Problem Solver",
    wish: "May your problems stay as confused as you are sometimes.",
    color: "from-purple-500/80 to-indigo-600/80",
    ribbonColor: "border-purple-300",
    icon: "🤷‍♀️✨"
  },
  {
    id: 3,
    title: "Big Ambitions",
    wish: "May your dreams be bigger than your unread notifications.",
    color: "from-fuchsia-500/80 to-pink-600/80",
    ribbonColor: "border-fuchsia-300",
    icon: "📱💫"
  },
  {
    id: 4,
    title: "Daily Wonders",
    wish: "May every ordinary day surprise you in extraordinary ways.",
    color: "from-amber-500/80 to-rose-500/80",
    ribbonColor: "border-amber-300",
    icon: "🌷🎈"
  },
  {
    id: 5,
    title: "Endless Glow",
    wish: "May your smile never run out of reasons.",
    color: "from-rose-500/80 to-pink-500/80",
    ribbonColor: "border-rose-300",
    icon: "😄💖"
  },
  {
    id: 6,
    title: "Lucky Charm",
    wish: "May good luck become your permanent roommate.",
    color: "from-emerald-500/80 to-teal-600/80",
    ribbonColor: "border-emerald-300",
    icon: "🍀🏠"
  },
  {
    id: 7,
    title: "Golden Horizons",
    wish: "May your future be filled with exciting opportunities.",
    color: "from-sky-500/80 to-blue-600/80",
    ribbonColor: "border-sky-300",
    icon: "🚀🌟"
  },
  {
    id: 8,
    title: "Gentle Wonders",
    wish: "May you always find beauty in little things.",
    color: "from-teal-500/80 to-cyan-600/80",
    ribbonColor: "border-teal-300",
    icon: "🦋🌼"
  },
  {
    id: 9,
    title: "Joyful Echoes",
    wish: "May your laughter remain louder than your worries.",
    color: "from-violet-500/80 to-purple-600/80",
    ribbonColor: "border-violet-300",
    icon: "😂🎉"
  },
  {
    id: 10,
    title: "Celebration Milestone",
    wish: "May this year bring you countless reasons to celebrate.",
    color: "from-pink-600/80 to-purple-700/80",
    ribbonColor: "border-yellow-300",
    icon: "🥂🎂"
  }
];

export const Level3GiftKingdom: React.FC<Level3GiftKingdomProps> = ({ personName, onNext }) => {
  const [openedIds, setOpenedIds] = useState<number[]>([]);
  const [selectedGift, setSelectedGift] = useState<GiftData | null>(null);

  const handleOpenGift = (gift: GiftData, e: React.MouseEvent) => {
    const isNew = !openedIds.includes(gift.id);
    if (isNew) {
      setOpenedIds(prev => [...prev, gift.id]);
      playGlissando();
      particleEngine.spawnClickSparkles(e.clientX, e.clientY, 24);
      particleEngine.spawnConfetti(20);
    } else {
      playClick();
    }
    setSelectedGift(gift);
  };

  const handleOpenAll = () => {
    const all = GIFTS.map(g => g.id);
    setOpenedIds(all);
    playGlissando();
    particleEngine.spawnConfetti(45);
  };

  const handleNextGiftInModal = () => {
    if (!selectedGift) return;
    const nextId = (selectedGift.id % GIFTS.length) + 1;
    const nextGift = GIFTS.find(g => g.id === nextId) || GIFTS[0];
    if (!openedIds.includes(nextGift.id)) {
      setOpenedIds(prev => [...prev, nextGift.id]);
      playGlissando();
      particleEngine.spawnConfetti(15);
    } else {
      playClick();
    }
    setSelectedGift(nextGift);
  };

  const handlePrevGiftInModal = () => {
    if (!selectedGift) return;
    const prevId = selectedGift.id === 1 ? GIFTS.length : selectedGift.id - 1;
    const prevGift = GIFTS.find(g => g.id === prevId) || GIFTS[0];
    if (!openedIds.includes(prevGift.id)) {
      setOpenedIds(prev => [...prev, prevGift.id]);
      playGlissando();
      particleEngine.spawnConfetti(15);
    } else {
      playClick();
    }
    setSelectedGift(prevGift);
  };

  const allOpened = openedIds.length === GIFTS.length;

  return (
    <div className="relative min-h-[85vh] max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/30 text-xs text-pink-300 mb-2">
          <span>Level 3 · The Gift Kingdom 🎁</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-pink-100">
          Ten Floating Birthday Surprises
        </h2>
        <p className="text-slate-300 text-sm max-w-lg mx-auto mt-1">
          Each floating gift box carries a handpicked wish crafted especially for you. Click on any box to unpack its popup message!
        </p>

        {/* Counter & Action */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <div className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-pink-500/30 text-pink-200 shadow-md">
            Unwrapped: <span className="text-pink-400 font-bold">{openedIds.length}</span> / 10
          </div>
          {openedIds.length > 0 && !allOpened && (
            <button
              onClick={handleOpenAll}
              className="text-xs text-pink-300 hover:text-pink-100 underline decoration-pink-500/40"
            >
              Unwrap all at once ✨
            </button>
          )}
        </div>
      </div>

      {/* Grid of 10 Floating Gifts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6 mb-10">
        {GIFTS.map((gift) => {
          const isOpened = openedIds.includes(gift.id);
          const isSelected = selectedGift?.id === gift.id;

          return (
            <button
              key={gift.id}
              onClick={(e) => handleOpenGift(gift, e)}
              className={`relative group h-40 rounded-2xl p-4 flex flex-col items-center justify-center text-center transition-all duration-300 cursor-pointer overflow-hidden ${
                isOpened
                  ? 'glass-card border-pink-400/50 shadow-[0_0_15px_rgba(236,72,153,0.25)]'
                  : 'bg-slate-900/70 border border-slate-700/80 hover:border-pink-400/60 hover:scale-105 hover:shadow-[0_0_20px_rgba(244,114,182,0.4)]'
              } ${isSelected ? 'ring-2 ring-pink-300 ring-offset-2 ring-offset-[#120B1E]' : ''}`}
            >
              {/* Ribbon Graphic */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-pink-400/30 to-purple-400/30 pointer-events-none" />
              <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-pink-400/30 to-purple-400/30 pointer-events-none" />

              {/* Gift State Icon */}
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300 mb-2 relative ${
                  isOpened
                    ? 'bg-gradient-to-br from-pink-500/30 to-purple-500/30 text-white'
                    : 'bg-gradient-to-br ' + gift.color + ' text-white shadow-lg group-hover:scale-110'
                }`}
              >
                {isOpened ? (
                  <span>{gift.icon}</span>
                ) : (
                  <Gift className="w-7 h-7 text-white stroke-[2.2]" />
                )}
                {!isOpened && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500" />
                  </span>
                )}
              </div>

              <span className="text-xs font-semibold text-slate-200">
                Gift #{gift.id}
              </span>

              <span className="text-[11px] text-pink-300/80 mt-1 truncate max-w-full px-1">
                {isOpened ? 'Read Message ✨' : 'Tap to open'}
              </span>
            </button>
          );
        })}
      </div>

      {/* GIFT MESSAGE POPUP MODAL */}
      {selectedGift && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelectedGift(null)}
        >
          <div
            className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-8 border border-pink-400/40 shadow-[0_20px_60px_rgba(0,0,0,0.7)] text-center overflow-hidden animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-20 -left-20 w-44 h-44 bg-pink-500/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-44 h-44 bg-purple-500/25 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button '✕' */}
            <button
              onClick={() => setSelectedGift(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors z-20 cursor-pointer"
              title="Close Popup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Gift Icon Badge */}
            <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-500/30 to-purple-600/30 border border-pink-400/50 flex items-center justify-center text-4xl mx-auto mb-4 shadow-lg animate-bounce [animation-duration:2.5s]">
              <span>{selectedGift.icon}</span>
              <span className="absolute -top-1.5 -right-1.5 text-xs bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-full shadow">
                #{selectedGift.id}
              </span>
            </div>

            {/* Header info */}
            <div className="mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-pink-400 inline-block px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 mb-1">
                {selectedGift.title}
              </span>
            </div>

            {/* The Actual Birthday Wish Message */}
            <div className="my-5 p-5 sm:p-6 rounded-2xl bg-slate-950/40 border border-pink-500/20 shadow-inner">
              <p className="text-xl sm:text-2xl font-serif text-pink-100 font-medium italic leading-relaxed">
                "{selectedGift.wish}"
              </p>
            </div>

            <p className="text-xs text-pink-300/80 mb-6 font-script text-base">
              Unwrapped especially for you with love and smiles 🌷
            </p>

            {/* Navigation and Close Buttons */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-pink-500/20">
              <button
                onClick={handlePrevGiftInModal}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Previous Gift"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <button
                onClick={() => setSelectedGift(null)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs sm:text-sm font-semibold shadow-md shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all"
              >
                Keep Exploring 🎁
              </button>

              <button
                onClick={handleNextGiftInModal}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Next Gift"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Banner */}
      {allOpened && (
        <div className="text-center pt-2 animate-fadeIn">
          <div className="inline-flex items-center gap-2 p-3 px-6 rounded-2xl bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-400/40 mb-4 shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium text-pink-200">
              All 10 birthday gifts unlocked! The garden butterflies have taken flight.
            </span>
          </div>
          <div>
            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Play Butterfly Challenge</span>
              <ArrowRight className="w-5 h-5 text-pink-200" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
