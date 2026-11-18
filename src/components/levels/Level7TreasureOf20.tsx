import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { playChime, playGlissando } from '../../utils/audio';
import { particleEngine } from '../../utils/particles';
import { TreasureWishItem } from '../../types';

interface Level7TreasureOf20Props {
  personName: string;
  onNext: () => void;
}

const TWENTY_WISHES: TreasureWishItem[] = [
  { id: 1, category: "Personal Growth", title: "Unstoppable Evolution", wish: "May you always embrace change with open curiosity and trust the pace of your own blooming.", icon: "🌱", color: "from-emerald-500/20 to-teal-600/20" },
  { id: 2, category: "New Experiences", title: "Uncharted Journeys", wish: "May your twenties take you to breathtaking places and show you sights that stir your imagination.", icon: "🗺️", color: "from-sky-500/20 to-blue-600/20" },
  { id: 3, category: "Happiness", title: "Unfading Glow", wish: "May your heart feel lighter with every sunrise and richer with every sunset.", icon: "💖", color: "from-pink-500/20 to-rose-600/20" },
  { id: 4, category: "Success", title: "Triumph in Craft", wish: "May all the hard work you pour into your ambitions yield results that make you proud.", icon: "🎯", color: "from-amber-500/20 to-yellow-600/20" },
  { id: 5, category: "Confidence", title: "Unshakable Grace", wish: "May you walk into every room knowing your voice and ideas carry genuine value.", icon: "👑", color: "from-purple-500/20 to-indigo-600/20" },
  { id: 6, category: "Good Health", title: "Vibrant Energy", wish: "May sound sleep, fresh energy, and mental peace be your effortless daily companions.", icon: "🌿", color: "from-teal-500/20 to-emerald-600/20" },
  { id: 7, category: "Friendship", title: "Kindred Spirits", wish: "May you cultivate deep bonds with people who celebrate your quirks and lift you higher.", icon: "🤝", color: "from-rose-500/20 to-pink-600/20" },
  { id: 8, category: "Laughter", title: "Tears of Joy", wish: "May life bless you with jokes that make your stomach ache and inside giggles with good friends.", icon: "😂", color: "from-orange-500/20 to-amber-600/20" },
  { id: 9, category: "Courage", title: "Fearless Heart", wish: "May you have the bravery to start before you feel ready and the stamina to see things through.", icon: "🦁", color: "from-red-500/20 to-rose-600/20" },
  { id: 10, category: "Opportunities", title: "Serendipitous Doors", wish: "May unexpected doors swing wide open right when you need a fresh spark.", icon: "🚪✨", color: "from-cyan-500/20 to-blue-600/20" },
  { id: 11, category: "Inner Peace", title: "Quiet Sanctuary", wish: "May you always find calm amidst chaotic storms and know how to guard your peace.", icon: "🕊️", color: "from-indigo-500/20 to-violet-600/20" },
  { id: 12, category: "Creativity", title: "Boundless Spark", wish: "May your unique perspective continually surprise and delight those around you.", icon: "🎨", color: "from-fuchsia-500/20 to-pink-600/20" },
  { id: 13, category: "Wisdom", title: "Gentle Insight", wish: "May you learn from every twist in the road and turn hurdles into your greatest superpowers.", icon: "🦉", color: "from-slate-500/20 to-slate-700/20" },
  { id: 14, category: "Adventure", title: "Spontaneous Thrills", wish: "May you say 'yes' to spontaneous weekend road trips, stargazing nights, and new tastes.", icon: "⛺", color: "from-lime-500/20 to-emerald-600/20" },
  { id: 15, category: "Kindness", title: "Warm Ripple", wish: "May the warmth you generously offer others return to you multiplied a hundredfold.", icon: "🌷", color: "from-pink-500/20 to-rose-500/20" },
  { id: 16, category: "Curiosity", title: "Childlike Wonder", wish: "May you never outgrow the joy of asking questions and learning how the universe works.", icon: "🔭", color: "from-blue-500/20 to-indigo-600/20" },
  { id: 17, category: "Balance", title: "Harmonious Days", wish: "May you find the sweet equilibrium between fierce hustle and cozy, guilt-free rest.", icon: "⚖️", color: "from-violet-500/20 to-purple-600/20" },
  { id: 18, category: "Grit", title: "Resilient Spirit", wish: "May temporary setbacks bounce off you like morning raindrops on tulip petals.", icon: "🛡️", color: "from-amber-500/20 to-orange-600/20" },
  { id: 19, category: "Gratitude", title: "Appreciative Eyes", wish: "May you continually notice the soft magic tucked into ordinary Tuesday afternoons.", icon: "☕", color: "from-emerald-500/20 to-teal-700/20" },
  { id: 20, category: "Milestone 20", title: "Chapter Twenty", wish: "Happy 20th birthday! May this milestone year be the launching pad for your brightest dreams yet.", icon: "🎂🦋", color: "from-pink-600/30 to-purple-700/30" }
];

// Soft pastel accents cycled across the 20 keepsake wish cards
const CARD_ACCENTS = [
  'border-[#E7B5BE]/45 bg-[#2B1B30]/75',
  'border-[#C8B9DC]/45 bg-[#261B36]/75',
  'border-[#E8D5C4]/40 bg-[#2C202E]/75',
  'border-[#B8D4C2]/40 bg-[#212432]/75',
];

export const Level7TreasureOf20: React.FC<Level7TreasureOf20Props> = ({
  onNext,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const openTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (openTimerRef.current) {
        clearTimeout(openTimerRef.current);
      }
    };
  }, []);

  const handleOpenBox = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);
    playChime(659.25);

    openTimerRef.current = window.setTimeout(() => {
      setIsOpen(true);
      setIsOpening(false);
      playGlissando();
      particleEngine.spawnPetals(24);
      particleEngine.spawnConfetti(28);
    }, 950);
  };

  const handleReplayBox = () => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
    }
    setIsOpen(false);
    setIsOpening(false);
  };

  const handleToggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    playChime(784);
    setFavoriteIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredWishes = selectedTag === 'all'
    ? TWENTY_WISHES
    : selectedTag === 'favorites'
    ? TWENTY_WISHES.filter(w => favoriteIds.includes(w.id))
    : TWENTY_WISHES.filter(w => w.category.toLowerCase().includes(selectedTag.toLowerCase()));

  return (
    <div className="relative min-h-[85vh] max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#DDA7AE]/15 border border-[#DDA7AE]/35 text-[#F4D3D8]">
          Level 7 · Keepsake of 20 🌸
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF3E8] mt-2">
          Twenty Wishes for Twenty Years
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto mt-1">
          A small handcrafted keepsake box holding 20 pastel wish cards gathered for your 20th year.
        </p>
      </div>

      {/* Handcrafted Keepsake Box View */}
      {!isOpen ? (
        <div className="max-w-lg mx-auto glass-panel rounded-3xl p-7 sm:p-10 text-center border border-[#E7B5BE]/30 shadow-xl">
          {/* Interactive 3D Handcrafted Keepsake Box */}
          <div
            onClick={handleOpenBox}
            role="button"
            tabIndex={0}
            aria-label="Open handcrafted keepsake box"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenBox();
              }
            }}
            className="group relative mx-auto w-64 sm:w-72 pt-8 pb-6 cursor-pointer select-none focus:outline-none"
          >
            {/* Soft warm shadow underneath the box */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-52 h-6 bg-black/45 rounded-full blur-md transition-transform duration-700 group-hover:scale-105" />

            {/* 3D Perspective Box Assembly */}
            <div
              className="relative mx-auto w-56 sm:w-64"
              style={{ perspective: '950px' }}
            >
              {/* Interior Box Lining & Colourful Peeking Wish Cards */}
              <div className="relative mx-auto w-52 sm:w-60 h-16 rounded-t-2xl bg-[#F3E6D3] border-2 border-[#C8A682] shadow-inner overflow-visible">
                {/* Soft cream linen interior shading */}
                <div className="absolute inset-1 rounded-t-xl bg-gradient-to-b from-[#E5D3BC] to-[#FAF3E8]" />

                {/* Colourful Wish Cards Peeking Out From Inside */}
                <div
                  className={`absolute inset-x-3 bottom-1 h-16 flex items-end justify-center gap-1 transition-all duration-700 ease-out ${
                    isOpening ? '-translate-y-7 scale-105' : '-translate-y-2 group-hover:-translate-y-3.5'
                  }`}
                >
                  {/* Dusty Pink Card */}
                  <div className="w-12 h-14 rounded-t-lg bg-[#E9BFC4] border border-[#D49AA3] shadow-sm -rotate-12 origin-bottom p-1.5 flex flex-col justify-between">
                    <span className="block w-5 h-1 rounded-full bg-[#FAF3E8]/80" />
                    <span className="text-[10px] text-[#6E3D46] font-serif">🌷</span>
                  </div>
                  {/* Soft Lavender Card */}
                  <div className="w-12 h-16 rounded-t-lg bg-[#D5C6E8] border border-[#B7A2D2] shadow-sm -rotate-3 origin-bottom p-1.5 flex flex-col justify-between -ml-3">
                    <span className="block w-6 h-1 rounded-full bg-[#FAF3E8]/80" />
                    <span className="text-[10px] text-[#4B3A63] font-serif">✨</span>
                  </div>
                  {/* Warm Cream Card */}
                  <div className="w-12 h-16 rounded-t-lg bg-[#FAF3E8] border border-[#DFC7A9] shadow-sm rotate-4 origin-bottom p-1.5 flex flex-col justify-between -ml-3">
                    <span className="block w-5 h-1 rounded-full bg-[#DDA7AE]/70" />
                    <span className="text-[10px] text-[#7A5B47] font-serif">🦋</span>
                  </div>
                  {/* Soft Sage Card */}
                  <div className="w-11 h-14 rounded-t-lg bg-[#CBE0CE] border border-[#A5C4AA] shadow-sm rotate-12 origin-bottom p-1.5 flex flex-col justify-between -ml-3">
                    <span className="block w-4 h-1 rounded-full bg-[#FAF3E8]/80" />
                    <span className="text-[10px] text-[#3B5941] font-serif">20</span>
                  </div>
                </div>
              </div>

              {/* Lower Wooden & Pastel Body of the Keepsake Box */}
              <div className="relative -mt-6 w-56 sm:w-64 h-28 rounded-2xl bg-gradient-to-b from-[#DFC3A6] via-[#D2B08E] to-[#C29C76] border-2 border-[#B38C66] shadow-[0_14px_28px_rgba(0,0,0,0.45)] overflow-hidden">
                {/* Painted Dusty-Pink Inset Front Panel */}
                <div className="absolute inset-2 rounded-xl bg-gradient-to-b from-[#F5EAE0] to-[#EAD7D9] border border-[#D8B5BC] shadow-inner">
                  {/* Subtle handmade brush texture & hand-painted floral motif */}
                  <svg
                    viewBox="0 0 220 90"
                    className="w-full h-full opacity-95"
                    aria-hidden="true"
                  >
                    {/* Delicate hand-painted sage leaves & stems */}
                    <path
                      d="M 48 64 Q 78 52 110 56 Q 142 52 172 64"
                      fill="none"
                      stroke="#93AE97"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 76 56 Q 70 43 60 44 Q 65 55 76 56 Z"
                      fill="#A9C3AD"
                    />
                    <path
                      d="M 144 56 Q 150 43 160 44 Q 155 55 144 56 Z"
                      fill="#A9C3AD"
                    />
                    {/* Small dusty-pink hand-painted tulip */}
                    <path
                      d="M 110 56 L 110 38"
                      stroke="#8BA68F"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 103 38 C 103 27, 110 25, 110 29 C 110 25, 117 27, 117 38 C 117 44, 103 44, 103 38 Z"
                      fill="#D998A2"
                    />
                    {/* Tiny lavender blooms on left and right */}
                    <circle cx="52" cy="59" r="4.5" fill="#C4B0DC" />
                    <circle cx="52" cy="59" r="1.6" fill="#FAF3E8" />
                    <circle cx="168" cy="59" r="4.5" fill="#C4B0DC" />
                    <circle cx="168" cy="59" r="1.6" fill="#FAF3E8" />
                    {/* Subtle hand-painted dots */}
                    <circle cx="32" cy="48" r="1.8" fill="#DDA7AE" />
                    <circle cx="188" cy="48" r="1.8" fill="#DDA7AE" />
                    <circle cx="88" cy="67" r="1.5" fill="#C4B0DC" />
                    <circle cx="132" cy="67" r="1.5" fill="#C4B0DC" />
                  </svg>
                </div>

                {/* Wooden corner bevel highlights for handmade feel */}
                <div className="absolute inset-x-0 bottom-0 h-2 bg-black/10 pointer-events-none" />

                {/* Lower Brass Catch Plate */}
                <div className="absolute top-1 left-1/2 -translate-x-1/2 w-7 h-3 rounded-b-md bg-gradient-to-b from-[#D2B376] to-[#A68447] border border-[#8A6B35]/60 shadow-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5D451F]" />
                </div>
              </div>

              {/* Hinged Rounded Wooden & Pastel Lid (Natural 3D Hinge Animation) */}
              <div
                className="absolute -top-3 -left-1 -right-1 h-16 rounded-t-3xl rounded-b-xl bg-gradient-to-b from-[#E5CCB2] via-[#D8B999] to-[#CAA47E] border-2 border-[#B38C66] shadow-[0_8px_18px_rgba(0,0,0,0.3)] transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transformOrigin: '50% 10%',
                  transformStyle: 'preserve-3d',
                  transform: isOpening
                    ? 'rotateX(112deg) translateY(-10px)'
                    : 'rotateX(0deg) translateY(0px)',
                }}
              >
                {/* Painted Lavender & Cream Top Cushion / Panel */}
                <div className="absolute inset-1.5 rounded-t-2xl rounded-b-lg bg-gradient-to-br from-[#F7EFE6] via-[#EFE3EC] to-[#E2D6EC] border border-[#CBB6DA] overflow-hidden">
                  <svg
                    viewBox="0 0 240 54"
                    className="w-full h-full"
                    aria-hidden="true"
                  >
                    {/* Delicate hand-painted floral corner sprigs */}
                    <path
                      d="M 18 32 Q 34 22 48 28"
                      fill="none"
                      stroke="#9AB39E"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <circle cx="24" cy="24" r="3.5" fill="#DDA7AE" />
                    <circle cx="34" cy="20" r="2.8" fill="#C4B0DC" />
                    <path
                      d="M 222 32 Q 206 22 192 28"
                      fill="none"
                      stroke="#9AB39E"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <circle cx="216" cy="24" r="3.5" fill="#DDA7AE" />
                    <circle cx="206" cy="20" r="2.8" fill="#C4B0DC" />
                    {/* Handwritten-style "20" keepsake emblem */}
                    <text
                      x="120"
                      y="33"
                      textAnchor="middle"
                      fill="#7D5868"
                      fontSize="16"
                      fontFamily="Playfair Display, Georgia, serif"
                      fontStyle="italic"
                      fontWeight="600"
                    >
                      20 Wishes
                    </text>
                  </svg>
                </div>

                {/* Tiny, Subtle Brass Clasp Tongue on Front Lip */}
                <div
                  className={`absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-4 rounded-b-lg bg-gradient-to-b from-[#DFC389] to-[#B7924F] border border-[#8E6F37]/70 shadow-sm transition-transform duration-300 origin-top ${
                    isOpening ? '' : 'group-hover:-translate-y-0.5'
                  }`}
                  style={isOpening ? { transform: 'rotateX(-55deg) translateY(-3px)' } : undefined}
                >
                  <div className="w-2 h-0.5 bg-[#7B5F2E]/60 mx-auto mt-1.5 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-serif font-bold text-[#FAF3E8] mb-2 mt-2">
            Handcrafted Keepsake Box
          </h3>
          <p className="text-slate-300 text-sm mb-6 max-w-md mx-auto leading-relaxed">
            A small pastel wooden box painted with garden blooms, holding 20 personal wish cards tucked inside just for you.
          </p>

          <button
            onClick={handleOpenBox}
            disabled={isOpening}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D88B98] via-[#C395D0] to-[#9E7EC8] text-white font-semibold shadow-lg hover:brightness-105 hover:scale-[1.03] active:scale-95 transition-all cursor-pointer disabled:opacity-75"
          >
            <span>{isOpening ? 'Opening Keepsake Box...' : 'Open Keepsake Box 🌷'}</span>
          </button>
        </div>
      ) : (
        /* Opened Box - 20 Individual Keepsake Wish Cards */
        <div className="space-y-6 animate-fadeIn">
          {/* Filter Bar (functional buttons + subtle replay option) */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900/60 rounded-2xl border border-[#DDA7AE]/25">
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setSelectedTag('all')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedTag === 'all'
                    ? 'bg-pink-500 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                All 20 Wishes
              </button>
              <button
                onClick={() => setSelectedTag('growth')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedTag === 'growth'
                    ? 'bg-pink-500 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                Growth &amp; Courage
              </button>
              <button
                onClick={() => setSelectedTag('happiness')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedTag === 'happiness'
                    ? 'bg-pink-500 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                Happiness &amp; Peace
              </button>
              <button
                onClick={() => setSelectedTag('adventure')}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  selectedTag === 'adventure'
                    ? 'bg-pink-500 text-white'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                Adventure &amp; Dreams
              </button>
              {favoriteIds.length > 0 && (
                <button
                  onClick={() => setSelectedTag('favorites')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-1 cursor-pointer ${
                    selectedTag === 'favorites'
                      ? 'bg-amber-500 text-slate-950 font-bold'
                      : 'text-amber-300 hover:bg-slate-800'
                  }`}
                >
                  <span>★ Starred ({favoriteIds.length})</span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleReplayBox}
                className="inline-flex items-center gap-1 text-xs text-[#E9BFC4] hover:text-white transition-colors cursor-pointer"
                title="Close and view keepsake box again"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Close Box</span>
              </button>
              <span className="text-xs text-slate-400 font-medium tabular-nums">
                Showing {filteredWishes.length} of 20
              </span>
            </div>
          </div>

          {/* 20 Cards Grid appearing one by one with warm handcrafted pastel borders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredWishes.map((w, idx) => {
              const isFav = favoriteIds.includes(w.id);
              const accentClass = CARD_ACCENTS[idx % CARD_ACCENTS.length];

              return (
                <div
                  key={w.id}
                  style={{ animationDelay: `${idx * 55}ms` }}
                  className={`animate-keepsake-card rounded-2xl p-5 border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl relative overflow-hidden group backdrop-blur-md ${
                    isFav
                      ? 'border-amber-300/70 bg-[#2F2138]/85 shadow-[0_8px_24px_rgba(251,191,36,0.16)]'
                      : `${accentClass} shadow-[0_8px_20px_rgba(12,6,18,0.3)] hover:border-[#E9BFC4]/70`
                  }`}
                >
                  {/* Subtle pastel corner tint */}
                  <div className={`absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br ${w.color} blur-2xl pointer-events-none opacity-80`} />

                  <div>
                    {/* Header line */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl">{w.icon}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-[#E9BFC4]/85 uppercase tracking-widest tabular-nums">
                          #{w.id}
                        </span>
                        <button
                          onClick={(e) => handleToggleFavorite(w.id, e)}
                          title="Bookmark Wish"
                          className={`p-1 rounded-md transition-colors cursor-pointer ${
                            isFav ? 'text-amber-300' : 'text-slate-400 hover:text-amber-200'
                          }`}
                        >
                          ★
                        </button>
                      </div>
                    </div>

                    <div className="text-xs font-semibold text-[#E7B5BE] mb-1">
                      {w.category}
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#FAF3E8] mb-2">
                      {w.title}
                    </h4>

                    <p className="text-sm text-slate-200 font-sans leading-relaxed">
                      "{w.wish}"
                    </p>
                  </div>

                  {/* Footer note */}
                  <div className="pt-4 mt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#E9BFC4]/70">
                    <span>Keepsake Card</span>
                    <span>🌷🦋</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Advance to Birthday Cake */}
          <div className="text-center pt-8">
            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Light the Birthday Cake</span>
              <ArrowRight className="w-5 h-5 text-pink-200" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
