import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  X,
  Music,
  AlertCircle
} from 'lucide-react';
import { musicPlayer, MusicTrack } from '../utils/audio';

interface MusicPlayerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(musicPlayer.getIsPlaying());
  const [isLoading, setIsLoading] = useState(musicPlayer.getIsLoading());
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(musicPlayer.getCurrentTrack());
  const [currentIndex, setCurrentIndex] = useState(musicPlayer.getCurrentIndex());
  const [volume, setVolume] = useState(musicPlayer.getVolume());
  const [currentTime, setCurrentTime] = useState(musicPlayer.getCurrentPlaybackTime());
  const [duration, setDuration] = useState(musicPlayer.getDuration());
  const [tracks, setTracks] = useState<MusicTrack[]>(musicPlayer.getTracks());
  const [errorMessage, setErrorMessage] = useState<string | null>(musicPlayer.getErrorMessage());

  useEffect(() => {
    const syncState = () => {
      setIsPlaying(musicPlayer.getIsPlaying());
      setIsLoading(musicPlayer.getIsLoading());
      setCurrentTrack(musicPlayer.getCurrentTrack());
      setCurrentIndex(musicPlayer.getCurrentIndex());
      setVolume(musicPlayer.getVolume());
      setCurrentTime(musicPlayer.getCurrentPlaybackTime());
      setDuration(musicPlayer.getDuration());
      setTracks([...musicPlayer.getTracks()]);
      setErrorMessage(musicPlayer.getErrorMessage());
    };

    syncState();
    const unsub = musicPlayer.subscribe(syncState);
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      musicPlayer.probeDurations();
    }
  }, [isOpen]);

  const handlePlayToggle = () => {
    musicPlayer.togglePlay();
  };

  const handleNext = () => {
    musicPlayer.nextTrack();
  };

  const handlePrev = () => {
    musicPlayer.prevTrack();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    musicPlayer.setVolume(val);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCurrentTime(val);
    musicPlayer.seek(val);
  };

  const handleSelectTrack = (index: number) => {
    musicPlayer.selectTrack(index, true);
  };

  const formatTime = (secs: number) => {
    if (!Number.isFinite(secs) || secs <= 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0
    ? Math.min(100, (currentTime / duration) * 100)
    : 0;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg glass-panel rounded-3xl p-6 sm:p-7 shadow-2xl border border-pink-400/30 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Decorative background glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-center justify-between pb-4 border-b border-pink-500/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-pink-500/20 border border-pink-400/40 flex items-center justify-center text-pink-300">
              <Music className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-pink-100 flex items-center gap-2">
                A Little Music Garden 🎶
              </h3>
              <p className="text-xs text-pink-300/80">
                Your personal birthday garden soundtrack
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close Music Garden"
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        {tracks.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-pink-300 font-serif text-lg">
              Your music garden is waiting for its soundtrack. 🌷
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-5">
            {/* Active Track Showcase */}
            <div className="glass-card rounded-2xl p-4 flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br from-pink-500/40 to-purple-600/40 border border-pink-400/40 flex items-center justify-center text-3xl shadow-lg relative overflow-hidden shrink-0 ${
                  isPlaying ? 'animate-pulse' : ''
                }`}
              >
                <span>{currentTrack?.coverEmoji || '🌷'}</span>
                {isPlaying && (
                  <div className="absolute inset-0 bg-white/10 animate-ping rounded-xl pointer-events-none" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-pink-400 uppercase tracking-wider">
                    {isPlaying ? 'Now Playing' : isLoading ? 'Loading...' : 'Selected Track'}
                  </span>
                </div>
                <h4 className="font-serif text-base font-semibold text-white truncate">
                  {currentTrack?.title}
                </h4>
                <p className="text-xs text-slate-300 truncate">
                  {currentTrack?.artist}
                </p>
              </div>
            </div>

            {/* Graceful Error Banner for Audio Playback Issues */}
            {errorMessage && (
              <div className="rounded-xl p-3 bg-rose-950/60 border border-rose-400/40 text-xs text-rose-100 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-300 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0 space-y-1.5">
                  <p className="leading-snug">{errorMessage}</p>
                  <div>
                    <button
                      onClick={() => musicPlayer.clearError()}
                      className="text-[11px] text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Waveform / Equalizer Animation */}
            <div className="h-7 flex items-end justify-center gap-1.5 px-4 bg-slate-950/40 rounded-xl py-1.5 border border-pink-500/10">
              {[40, 75, 50, 90, 60, 85, 45, 95, 70, 80, 55, 65, 90, 45, 60].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-to-t from-pink-500 to-purple-400 rounded-full transition-all duration-300"
                  style={{
                    height: isPlaying ? `${Math.max(15, h * (volume || 0.5))}%` : '15%',
                    opacity: isPlaying ? 0.9 : 0.3
                  }}
                />
              ))}
            </div>

            {/* Progress Bar with Seeking */}
            <div className="space-y-1.5">
              <div className="relative w-full h-3 flex items-center group">
                <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-pink-500 to-purple-400 h-full rounded-full transition-[width] duration-150"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <input
                  type="range"
                  aria-label="Seek audio progress"
                  min={0}
                  max={duration > 0 ? duration : 100}
                  step={0.1}
                  value={duration > 0 ? Math.min(currentTime, duration) : 0}
                  disabled={duration <= 0}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-default"
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 tabular-nums">
                <span>{formatTime(currentTime)}</span>
                <span>{duration > 0 ? formatTime(duration) : '--:--'}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between pt-1 gap-2">
              {/* Volume Slider */}
              <div className="flex items-center gap-2 w-28 sm:w-32">
                <button
                  onClick={() => musicPlayer.setVolume(volume > 0 ? 0 : 0.7)}
                  aria-label={volume === 0 ? 'Unmute' : 'Mute'}
                  className="text-slate-400 hover:text-pink-300 transition-colors cursor-pointer"
                >
                  {volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-slate-500" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-pink-300" />
                  )}
                </button>
                <input
                  type="range"
                  aria-label="Volume"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-400"
                />
              </div>

              {/* Main Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-2 text-slate-300 hover:text-pink-300 hover:bg-white/5 rounded-full transition-colors cursor-pointer"
                  title="Previous Track"
                  aria-label="Previous Track"
                >
                  <SkipBack className="w-5 h-5" />
                </button>

                <button
                  onClick={handlePlayToggle}
                  className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={handleNext}
                  className="p-2 text-slate-300 hover:text-pink-300 hover:bg-white/5 rounded-full transition-colors cursor-pointer"
                  title="Next Track"
                  aria-label="Next Track"
                >
                  <SkipForward className="w-5 h-5" />
                </button>
              </div>

              <div className="w-28 sm:w-32 text-right">
                <span className="text-xs text-pink-300/80 font-medium">
                  {isPlaying ? 'Playing 🌷' : 'Paused ⏸️'}
                </span>
              </div>
            </div>

            {/* Playlist Queue */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Garden Playlist
              </span>
              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                {tracks.map((t, idx) => {
                  const isCurrent = currentIndex === idx;
                  return (
                    <div
                      key={t.id}
                      onClick={() => handleSelectTrack(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectTrack(idx);
                        }
                      }}
                      className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left text-xs transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-pink-500/20 border border-pink-400/40 text-pink-200 shadow-sm'
                          : 'bg-slate-900/40 hover:bg-slate-800/60 text-slate-300 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="text-base">{t.coverEmoji}</span>
                        <div className="truncate">
                          <p className={`font-medium truncate ${isCurrent ? 'text-pink-200' : 'text-slate-200'}`}>
                            {t.title}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">
                            {t.artist}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="text-[10px] text-slate-400 tabular-nums">
                          {t.duration > 0 ? formatTime(t.duration) : '--:--'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
