import React, { useState, useEffect } from 'react';
import { Mail, Sparkles, RotateCcw, ArrowRight, FastForward } from 'lucide-react';
import { playClick, playGlissando, playChime } from '../../utils/audio';
import { particleEngine } from '../../utils/particles';

interface Level9SecretLetterProps {
  personName: string;
  onNext: () => void;
}

export const Level9SecretLetter: React.FC<Level9SecretLetterProps> = ({
  personName,
  onNext,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const fullLetter = `Hey ${personName},

First of all, happy 20th birthday!

I hope this new chapter brings you countless reasons to smile, exciting experiences, wonderful opportunities, and memories worth keeping.

May you continue to grow, discover new things, chase the things that make you happy, and never lose that funny and lovely side of yours.

I hope life surprises you in the nicest ways, your efforts turn into achievements, and even your ordinary days have something beautiful hidden in them.

And remember, being 20 doesn't mean you suddenly have to figure everything out. Nobody really does. So enjoy the journey, make mistakes, laugh a little louder, and keep being yourself.

Once again, happy birthday!

Stay happy, stay amazing, and take care of yourself.

— Someone You Know 🌷`;

  useEffect(() => {
    if (!isOpen) return;
    setIsTyping(true);
    setDisplayedText('');
    let idx = 0;

    const interval = setInterval(() => {
      idx++;
      setDisplayedText(fullLetter.slice(0, idx));
      if (idx % 12 === 0) {
        particleEngine.spawnPetals(2);
      }
      if (idx >= fullLetter.length) {
        clearInterval(interval);
        setIsTyping(false);
        playChime(659.25);
      }
    }, 24);

    return () => clearInterval(interval);
  }, [isOpen, fullLetter]);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    setIsOpen(true);
    playGlissando();
    particleEngine.spawnPetals(25);
  };

  const handleSkipTyping = () => {
    setDisplayedText(fullLetter);
    setIsTyping(false);
    playClick();
  };

  const handleReplay = () => {
    setDisplayedText('');
    setIsTyping(true);
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setDisplayedText(fullLetter.slice(0, idx));
      if (idx >= fullLetter.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 24);
  };

  return (
    <div className="relative min-h-[85vh] max-w-4xl mx-auto px-4 py-8 flex flex-col items-center justify-center">
      {/* Header */}
      <div className="text-center mb-6">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-pink-500/15 border border-pink-400/30 text-pink-300">
          Level 9 · The Secret Letter 💌
        </span>
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-pink-100 mt-1">
          A Sealed Birthday Message
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto mt-1">
          Handwritten thoughts sealed with a golden butterfly stamp.
        </p>
      </div>

      {!isOpen ? (
        /* Sealed Envelope Display */
        <div
          onClick={handleOpenEnvelope}
          className="group relative cursor-pointer w-full max-w-md glass-panel rounded-3xl p-8 sm:p-12 border-2 border-pink-400/40 shadow-2xl flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:border-pink-300 hover:shadow-[0_0_35px_rgba(244,114,182,0.5)] animate-float"
        >
          {/* Tulip floral decorations */}
          <div className="absolute top-4 left-6 text-2xl">🌷</div>
          <div className="absolute top-4 right-6 text-2xl">🌷</div>

          {/* Envelope Envelope Flap Graphic */}
          <div className="relative w-48 h-32 rounded-xl bg-gradient-to-br from-purple-900/80 to-pink-950/80 border border-pink-400/50 flex items-center justify-center shadow-lg mb-4">
            {/* Wax Seal */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-rose-600 border-2 border-yellow-200 flex items-center justify-center text-2xl shadow-lg shadow-amber-500/40 group-hover:scale-110 transition-transform">
              🦋
            </div>
          </div>

          <h3 className="font-serif text-xl font-bold text-pink-100 mb-1">
            For {personName}
          </h3>
          <p className="text-xs text-pink-300/80 font-medium tracking-wide">
            Tap to break the butterfly seal and open 🌷
          </p>
        </div>
      ) : (
        /* Opened Letter Display with Typewriter effect */
        <div className="w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-10 border border-pink-400/40 shadow-2xl relative overflow-hidden animate-fadeIn">
          {/* Subtle tulip watermark decoration */}
          <div className="absolute -bottom-10 -right-10 text-8xl opacity-10 pointer-events-none select-none">
            🌷
          </div>

          {/* Controls bar */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-pink-500/20 text-xs">
            <span className="font-serif text-pink-300 font-semibold flex items-center gap-1.5">
              <span>💌</span>
              <span>Personal Letter</span>
            </span>

            <div className="flex items-center gap-2">
              {isTyping && (
                <button
                  onClick={handleSkipTyping}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-500/20 text-pink-200 hover:bg-pink-500/30 transition-colors"
                >
                  <FastForward className="w-3.5 h-3.5" />
                  <span>Skip Typing</span>
                </button>
              )}
              {!isTyping && (
                <button
                  onClick={handleReplay}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Animation</span>
                </button>
              )}
            </div>
          </div>

          {/* Letter Body */}
          <div className="font-serif text-base sm:text-lg text-pink-100/90 whitespace-pre-line leading-relaxed min-h-[300px]">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-2 h-5 bg-pink-400 ml-1 animate-pulse align-middle" />
            )}
          </div>

          {/* Advance to Level 10 Celebration */}
          {!isTyping && (
            <div className="text-center pt-8 mt-4 border-t border-pink-500/20 animate-fadeIn">
              <button
                onClick={onNext}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-semibold text-lg shadow-[0_0_30px_rgba(244,114,182,0.6)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Grand Birthday Celebration 🎉</span>
                <ArrowRight className="w-5 h-5 text-pink-200" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
