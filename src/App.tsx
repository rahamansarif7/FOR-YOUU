import React, { useState, useEffect, useRef } from 'react';
import { LevelId, Achievement } from './types';
import { Navbar } from './components/Navbar';
import { ProgressBar } from './components/ProgressBar';
import { MusicPlayer } from './components/MusicPlayer';
import { AchievementsModal } from './components/AchievementsModal';
import { Level1Welcome } from './components/levels/Level1Welcome';
import { Level2Gate } from './components/levels/Level2Gate';
import { Level3GiftKingdom } from './components/levels/Level3GiftKingdom';
import { Level4ButterflyChallenge } from './components/levels/Level4ButterflyChallenge';
import { Level5BalloonWorld } from './components/levels/Level5BalloonWorld';
import { Level6StarCollection } from './components/levels/Level6StarCollection';
import { Level7TreasureOf20 } from './components/levels/Level7TreasureOf20';
import { Level8BirthdayCake } from './components/levels/Level8BirthdayCake';
import { Level9SecretLetter } from './components/levels/Level9SecretLetter';
import { Level10Celebration } from './components/levels/Level10Celebration';
import { particleEngine } from './utils/particles';
import {
  setSoundEffectsEnabled,
  isSoundEffectsEnabled,
  musicPlayer,
  playGlissando,
  playChime
} from './utils/audio';

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 'start', title: 'Garden Explorer', description: 'Began the birthday journey', unlocked: true, icon: '🌷' },
  { id: 'gate', title: 'Gate Opener', description: 'Unlocked the magical wrought-iron gate', unlocked: false, icon: '🚪' },
  { id: 'gifts', title: 'Gift Unwrapper', description: 'Unwrapped all 10 birthday boxes', unlocked: false, icon: '🎁' },
  { id: 'butterflies', title: 'Butterfly Whisperer', description: 'Caught garden butterflies in the challenge', unlocked: false, icon: '🦋' },
  { id: 'balloons', title: 'Balloon Popper', description: 'Popped the compliment balloons', unlocked: false, icon: '🎈' },
  { id: 'stars', title: 'Star Seeker', description: 'Discovered all 5 hidden night sky stars', unlocked: false, icon: '⭐' },
  { id: 'treasure', title: 'Treasured Heart', description: 'Opened the Treasure Chest of 20 Wishes', unlocked: false, icon: '💎' },
  { id: 'candles', title: 'Flame Keeper', description: 'Lit all 20 candles on the birthday cake', unlocked: false, icon: '🎂' },
  { id: 'letter', title: 'Letter Reader', description: 'Read the secret birthday letter', unlocked: false, icon: '💌' },
  { id: 'master', title: 'Level 20 Master', description: 'Unlocked the grand finale celebration', unlocked: false, icon: '👑' },
];

export default function App() {
  const [currentLevel, setCurrentLevel] = useState<LevelId>(1);
  const [maxUnlockedLevel, setMaxUnlockedLevel] = useState<LevelId>(1);
  const [personName, setPersonName] = useState<string>('Sabnam');
  const [soundEnabled, setSoundEnabled] = useState(isSoundEffectsEnabled());
  const [isMusicModalOpen, setIsMusicModalOpen] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(musicPlayer.getIsPlaying());
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [isLoading, setIsLoading] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Initialize canvas particle engine & loading screen
  useEffect(() => {
    if (canvasRef.current) {
      particleEngine.init(canvasRef.current);
      particleEngine.spawnPetals(20);
    }

    const unsubMusic = musicPlayer.subscribe(() => {
      setMusicPlaying(musicPlayer.getIsPlaying());
    });

    // Loading screen timer
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => {
      unsubMusic();
      clearTimeout(loadTimer);
      particleEngine.destroy();
    };
  }, []);

  // Unlock achievement helper
  const unlockAchievement = (id: string) => {
    setAchievements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, unlocked: true } : a))
    );
  };

  const handleNextLevel = (nextLvl: LevelId) => {
    if (nextLvl > maxUnlockedLevel) {
      setMaxUnlockedLevel(nextLvl);
    }
    setCurrentLevel(nextLvl);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Track achievements
    if (nextLvl === 2) unlockAchievement('gate');
    if (nextLvl === 4) unlockAchievement('gifts');
    if (nextLvl === 5) unlockAchievement('butterflies');
    if (nextLvl === 6) unlockAchievement('balloons');
    if (nextLvl === 7) unlockAchievement('stars');
    if (nextLvl === 8) unlockAchievement('treasure');
    if (nextLvl === 9) unlockAchievement('candles');
    if (nextLvl === 10) {
      unlockAchievement('letter');
      unlockAchievement('master');
    }
  };

  const handleSelectLevel = (lvl: LevelId) => {
    if (lvl <= maxUnlockedLevel) {
      setCurrentLevel(lvl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    setSoundEffectsEnabled(next);
    if (next) {
      playChime(659.25);
    }
  };

  const handleRestart = () => {
    setCurrentLevel(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playGlissando();
  };

  // Easter egg: Stardust shower on click
  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    particleEngine.spawnClickSparkles(e.clientX, e.clientY, 10);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#120B1E] flex flex-col items-center justify-center p-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-pink-500/30 to-purple-600/30 border border-pink-400/40 flex items-center justify-center text-4xl animate-bounce shadow-2xl mb-4">
          🌷
        </div>
        <h2 className="font-serif text-2xl font-bold text-pink-100 mb-1">
          Blooming the Tulip Garden...
        </h2>
        <p className="text-xs text-pink-300 font-script text-base">
          Preparing butterflies and birthday surprises
        </p>
      </div>
    );
  }

  return (
    <div
      onClick={handleCanvasClick}
      className="relative min-h-screen bg-[#120B1E] text-slate-100 flex flex-col justify-between pt-16 pb-20 selection:bg-pink-500/30 selection:text-pink-200"
    >
      {/* Background Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      />

      {/* Top Bar Navigation */}
      <Navbar
        currentLevel={currentLevel}
        maxUnlockedLevel={maxUnlockedLevel}
        onSelectLevel={handleSelectLevel}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        musicPlaying={musicPlaying}
        onToggleMusicModal={() => setIsMusicModalOpen(true)}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        personName={personName}
      />

      {/* Main Dynamic Level Container */}
      <main className="relative z-20 flex-1 flex flex-col justify-center">
        {currentLevel === 1 && (
          <Level1Welcome
            personName={personName}
            onUpdateName={setPersonName}
            onStart={() => handleNextLevel(2)}
          />
        )}
        {currentLevel === 2 && (
          <Level2Gate
            personName={personName}
            onNext={() => handleNextLevel(3)}
          />
        )}
        {currentLevel === 3 && (
          <Level3GiftKingdom
            personName={personName}
            onNext={() => handleNextLevel(4)}
          />
        )}
        {currentLevel === 4 && (
          <Level4ButterflyChallenge
            personName={personName}
            onNext={() => handleNextLevel(5)}
          />
        )}
        {currentLevel === 5 && (
          <Level5BalloonWorld
            personName={personName}
            onNext={() => handleNextLevel(6)}
          />
        )}
        {currentLevel === 6 && (
          <Level6StarCollection
            personName={personName}
            onNext={() => handleNextLevel(7)}
          />
        )}
        {currentLevel === 7 && (
          <Level7TreasureOf20
            personName={personName}
            onNext={() => handleNextLevel(8)}
          />
        )}
        {currentLevel === 8 && (
          <Level8BirthdayCake
            personName={personName}
            onNext={() => handleNextLevel(9)}
          />
        )}
        {currentLevel === 9 && (
          <Level9SecretLetter
            personName={personName}
            onNext={() => handleNextLevel(10)}
          />
        )}
        {currentLevel === 10 && (
          <Level10Celebration
            personName={personName}
            onRestart={handleRestart}
            onOpenMusic={() => setIsMusicModalOpen(true)}
          />
        )}
      </main>

      {/* Persistent Level Progress Tracker */}
      <ProgressBar
        currentLevel={currentLevel}
        maxUnlockedLevel={maxUnlockedLevel}
        onSelectLevel={handleSelectLevel}
      />

      {/* A Little Music Garden 🎶 Modal */}
      <MusicPlayer
        isOpen={isMusicModalOpen}
        onClose={() => setIsMusicModalOpen(false)}
      />

      {/* Achievements & Badges Modal */}
      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        achievements={achievements}
      />
    </div>
  );
}
