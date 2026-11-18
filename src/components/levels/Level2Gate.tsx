import React, { useState } from 'react';
import { Sparkles, ArrowRight, KeyRound } from 'lucide-react';
import { playChime, playGlissando, playFlutter } from '../../utils/audio';
import { particleEngine } from '../../utils/particles';
import gardenGateImg from '../../assets/images/garden_gate_tulips_1793872769082.jpg';

interface Level2GateProps {
  personName: string;
  onNext: () => void;
}

export const Level2Gate: React.FC<Level2GateProps> = ({ personName, onNext }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGate = () => {
    if (isOpen) return;
    setIsOpen(true);
    playChime(440);
    setTimeout(() => {
      playGlissando();
      playFlutter();
      particleEngine.spawnPetals(35);
      particleEngine.spawnConfetti(25);
    }, 400);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 py-8 overflow-hidden">
      {/* Background Gate Setting */}
      <div className="absolute inset-0 z-0">
        <img
          src={gardenGateImg}
          alt="Magical garden gate with blooming tulips"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover opacity-60 scale-105 transition-transform duration-1000"
          style={{ filter: isOpen ? 'brightness(0.9) saturate(1.2)' : 'brightness(0.6) blur(2px)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120B1E] via-[#120B1E]/60 to-transparent" />
      </div>

      {/* Main Interactive Gate Container */}
      <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center">
        {!isOpen ? (
          <div className="glass-panel rounded-3xl p-8 sm:p-10 border border-pink-400/40 shadow-2xl max-w-lg animate-float">
            <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-400/50 flex items-center justify-center text-3xl mx-auto mb-4 text-pink-300">
              🚪
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-pink-100 mb-2">
              The Garden Gate
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-6">
              A whimsical wrought-iron gate covered in blooming tulips stands before you. Tap the gate to step into your birthday world.
            </p>

            {/* Interactive Clickable Gate */}
            <div
              onClick={handleOpenGate}
              className="group relative cursor-pointer mx-auto w-56 h-48 rounded-2xl bg-gradient-to-b from-purple-900/60 to-slate-900/80 border-2 border-pink-400/60 p-4 flex flex-col items-center justify-center transition-all hover:scale-105 hover:border-pink-300 hover:shadow-[0_0_30px_rgba(244,114,182,0.6)]"
            >
              <div className="absolute top-2 left-3 text-lg animate-pulse">🌷</div>
              <div className="absolute top-2 right-3 text-lg animate-pulse">🦋</div>

              {/* Gate Lattice Pattern */}
              <div className="flex gap-4 items-center justify-center text-pink-300/80 mb-2">
                <div className="w-16 h-28 border-2 border-pink-400/70 rounded-t-full flex items-center justify-center bg-pink-500/10 group-hover:border-pink-300 transition-colors">
                  <span className="text-2xl">🌷</span>
                </div>
                <div className="w-16 h-28 border-2 border-pink-400/70 rounded-t-full flex items-center justify-center bg-pink-500/10 group-hover:border-pink-300 transition-colors">
                  <span className="text-2xl">🦋</span>
                </div>
              </div>

              <span className="text-xs font-semibold text-pink-200 uppercase tracking-widest flex items-center gap-1.5 mt-2">
                <KeyRound className="w-3.5 h-3.5 text-yellow-300" />
                Tap to Unlock
              </span>
            </div>
          </div>
        ) : (
          /* Opened Gate Reveal */
          <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-pink-400/50 shadow-2xl max-w-xl animate-fadeIn relative overflow-hidden">
            {/* Flying butterflies escaping through gate */}
            <div className="absolute -top-4 left-1/4 text-3xl animate-float [animation-duration:2.5s]">🦋</div>
            <div className="absolute -top-6 right-1/4 text-4xl animate-float [animation-duration:3.2s]">🦋</div>
            <div className="absolute top-1/2 -right-4 text-2xl animate-float">🌷</div>

            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500/30 to-purple-500/30 border border-pink-300/50 flex items-center justify-center text-3xl mx-auto mb-4 animate-bounce">
              🌷
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-pink-100 mb-4 leading-tight">
              Welcome to your little birthday garden!
            </h2>

            <p className="text-lg sm:text-xl text-pink-200/90 font-serif italic mb-6 leading-relaxed">
              "Today, the flowers are blooming a little brighter because it's your special day."
            </p>

            <div className="p-3 bg-pink-500/10 rounded-2xl border border-pink-500/20 mb-8 text-sm text-slate-300">
              The gentle morning breeze carries the scent of fresh tulips and fluttering butterflies...
            </div>

            <button
              onClick={onNext}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>Explore the Gift Kingdom</span>
              <ArrowRight className="w-5 h-5 text-pink-200" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
