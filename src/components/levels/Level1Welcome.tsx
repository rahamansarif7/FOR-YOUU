import React, { useState } from 'react';
import { Sparkles, Heart, Gift, Edit3, Check } from 'lucide-react';
import { playChime, playGlissando } from '../../utils/audio';

interface Level1WelcomeProps {
  personName: string;
  onUpdateName: (name: string) => void;
  onStart: () => void;
}

export const Level1Welcome: React.FC<Level1WelcomeProps> = ({
  personName,
  onUpdateName,
  onStart,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(personName);

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempName.trim()) {
      onUpdateName(tempName.trim());
    }
    setIsEditingName(false);
    playChime(659.25);
  };

  const handleStartSurprise = () => {
    playGlissando();
    onStart();
  };

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background magical elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated Butterflies in corners */}
        <div className="absolute top-12 left-10 text-3xl animate-float">🦋</div>
        <div className="absolute top-24 right-14 text-2xl animate-float [animation-delay:1.5s]">🌷</div>
        <div className="absolute bottom-20 left-16 text-3xl animate-float [animation-delay:2.5s]">✨</div>
        <div className="absolute bottom-16 right-20 text-3xl animate-float [animation-delay:0.8s]">🦋</div>
        <div className="absolute top-1/2 left-6 text-2xl animate-float [animation-delay:3s]">💖</div>
        <div className="absolute top-1/3 right-8 text-2xl animate-float [animation-delay:1.8s]">🎈</div>

        {/* Ambient Aurora Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[350px] bg-gradient-to-r from-pink-500/20 via-purple-600/20 to-rose-400/20 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Main Glass Card */}
      <div className="relative z-10 max-w-2xl w-full text-center glass-panel rounded-3xl p-8 sm:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-pink-400/30">
        {/* Decorative floral crown */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-2xl animate-pulse">🌷</span>
          <span className="text-xl text-pink-300 font-script text-2xl">A Special Milestone Adventure</span>
          <span className="text-2xl animate-pulse">🦋</span>
        </div>

        {/* Greeting with Name */}
        <div className="relative inline-flex items-center justify-center gap-2 group mb-3">
          {isEditingName ? (
            <form onSubmit={handleSaveName} className="flex items-center gap-2">
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="bg-purple-900/60 border border-pink-400 text-pink-100 text-3xl md:text-5xl font-serif font-bold text-center rounded-xl px-4 py-1 focus:outline-none focus:ring-2 focus:ring-pink-300"
                autoFocus
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-pink-500 text-white hover:bg-pink-600 transition-colors"
                title="Save Name"
              >
                <Check className="w-5 h-5" />
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-3">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight bg-gradient-to-r from-pink-200 via-rose-100 to-purple-200 bg-clip-text text-transparent">
                Hey, {personName}!
              </h1>
              <button
                onClick={() => setIsEditingName(true)}
                title="Customize Name"
                className="opacity-40 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-pink-500/20 rounded-lg text-pink-300 text-xs flex items-center gap-1"
              >
                <Edit3 className="w-4 h-4" />
                <span className="text-[11px] hidden sm:inline">Customize</span>
              </button>
            </div>
          )}
        </div>

        {/* Surprise Prompt */}
        <p className="text-xl sm:text-2xl text-pink-100/90 font-serif italic mb-4 leading-relaxed">
          Sagar has prepared a little surprise for you...
        </p>

        {/* Playful warning subtitle */}
        <div className="inline-block bg-pink-500/15 border border-pink-400/25 rounded-2xl px-5 py-2.5 mb-8">
          <p className="text-sm sm:text-base text-pink-200/90 font-medium">
            Warning: Excessive cuteness and birthday happiness ahead. 🌷✨
          </p>
        </div>

        {/* Start button */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleStartSurprise}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 text-lg font-semibold text-white rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 shadow-[0_0_35px_rgba(244,114,182,0.5)] hover:shadow-[0_0_50px_rgba(244,114,182,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start the Surprise 🎁
              <Sparkles className="w-5 h-5 text-yellow-200 animate-spin [animation-duration:4s]" />
            </span>
            <div className="absolute inset-0 rounded-full bg-white/20 blur opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>

          <span className="text-xs text-pink-300/60 font-sans tracking-wide">
            Estimated exploration time: ~3–5 magical minutes
          </span>
        </div>
      </div>
    </div>
  );
};
