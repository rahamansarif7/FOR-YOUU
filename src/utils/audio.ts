/**
 * Audio Engine: Web Audio API sound effects and HTML5 Audio Music Garden Player
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Master sound effects switch
let soundEffectsEnabled = true;

export function setSoundEffectsEnabled(enabled: boolean) {
  soundEffectsEnabled = enabled;
}

export function isSoundEffectsEnabled(): boolean {
  return soundEffectsEnabled;
}

// 1. Play Soft Chime
export function playChime(freq = 523.25) { // C5
  if (!soundEffectsEnabled) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.8);
  } catch {
    // Ignore audio errors if blocked
  }
}

// 2. Play Magical Glissando / Sparkle
export function playGlissando() {
  if (!soundEffectsEnabled) return;
  try {
    const ctx = getAudioContext();
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98]; // C E G C E G
    notes.forEach((freq, idx) => {
      const startTime = ctx.currentTime + idx * 0.06;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.4);
    });
  } catch {
    // Ignore
  }
}

// 3. Play Balloon Pop
export function playPop() {
  if (!soundEffectsEnabled) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.35, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.09);
  } catch {
    // Ignore
  }
}

// 4. Play Butterfly Flutter / Soft Ping
export function playFlutter() {
  if (!soundEffectsEnabled) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch {
    // Ignore
  }
}

// 5. Play Candle Spark
export function playCandleSpark() {
  if (!soundEffectsEnabled) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.25);
  } catch {
    // Ignore
  }
}

// 6. Play Grand Fanfare
export function playFanfare() {
  if (!soundEffectsEnabled) return;
  try {
    const ctx = getAudioContext();
    const chord = [523.25, 659.25, 783.99, 1046.50];
    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.6);
    });
  } catch {
    // Ignore
  }
}

// 7. Play Click
export function playClick() {
  if (!soundEffectsEnabled) return;
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch {
    // Ignore
  }
}

// --- HTML5 AUDIO MUSIC GARDEN PLAYER ---
export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  duration: number; // seconds, populated from audio metadata when loaded
  coverEmoji: string;
  unavailable?: boolean;
}

export const DEFAULT_TRACKS: MusicTrack[] = [
  {
    id: 'maula-mere-maula',
    title: 'Maula Mere Maula',
    artist: 'Garden Soundtrack',
    audioUrl: '/music/maula-mere-maula.mp3',
    duration: 0,
    coverEmoji: '🌷',
  },
  {
    id: 'piya-aaye-na',
    title: 'Piya Aaye Na',
    artist: 'Garden Soundtrack',
    audioUrl: '/music/piya-aaye-na.mp3',
    duration: 0,
    coverEmoji: '🦋',
  },
  {
    id: 'ishq-mubarak',
    title: 'Ishq Mubarak',
    artist: 'Garden Soundtrack',
    audioUrl: '/music/ishq-mubarak.mp3',
    duration: 0,
    coverEmoji: '🌸',
  },
  {
    id: 'hasi',
    title: 'Hasi',
    artist: 'Garden Soundtrack',
    audioUrl: '/music/hasi.mp3',
    duration: 0,
    coverEmoji: '✨',
  },
];

class Html5MusicPlayerEngine {
  private audio: HTMLAudioElement | null = null;
  private tracks: MusicTrack[] = DEFAULT_TRACKS.map((t) => ({ ...t }));
  private currentTrackIndex = 0; // Starts with Maula Mere Maula
  private isPlaying = false;
  private volume = 0.7;
  private currentTime = 0;
  private duration = 0;
  private errorMessage: string | null = null;
  private isLoading = false;
  private isSwitching = false;
  private switchToken = 0;
  private hasLoadedSrc = false;
  private hasProbedDurations = false;
  private listeners: Array<() => void> = [];

  constructor() {
    if (typeof window !== 'undefined' && typeof Audio !== 'undefined') {
      this.audio = new Audio();
      this.audio.preload = 'metadata';
      this.audio.volume = this.volume;

      this.audio.addEventListener('loadedmetadata', () => {
        if (!this.audio) return;
        const dur = Number.isFinite(this.audio.duration) ? this.audio.duration : 0;
        this.duration = dur;
        if (dur > 0 && this.tracks[this.currentTrackIndex]) {
          this.tracks[this.currentTrackIndex].duration = dur;
          this.tracks[this.currentTrackIndex].unavailable = false;
        }
        this.isLoading = false;
        this.notify();
      });

      this.audio.addEventListener('durationchange', () => {
        if (!this.audio) return;
        const dur = Number.isFinite(this.audio.duration) ? this.audio.duration : 0;
        this.duration = dur;
        if (dur > 0 && this.tracks[this.currentTrackIndex]) {
          this.tracks[this.currentTrackIndex].duration = dur;
        }
        this.notify();
      });

      this.audio.addEventListener('timeupdate', () => {
        if (!this.audio) return;
        this.currentTime = this.audio.currentTime || 0;
        this.notify();
      });

      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.isLoading = false;
        this.errorMessage = null;
        this.notify();
      });

      this.audio.addEventListener('pause', () => {
        if (this.isSwitching) return;
        this.isPlaying = false;
        this.notify();
      });

      this.audio.addEventListener('ended', () => {
        this.nextTrack(true);
      });

      this.audio.addEventListener('error', () => {
        if (!this.hasLoadedSrc) return;
        const track = this.getCurrentTrack();
        this.isPlaying = false;
        this.isLoading = false;
        if (track) {
          this.tracks[this.currentTrackIndex].unavailable = true;
          this.errorMessage = `Unable to play "${track.title}". Audio file missing or unsupported at ${track.audioUrl}.`;
        } else {
          this.errorMessage = 'Audio file could not be loaded.';
        }
        this.notify();
      });
    }
  }

  public subscribe(cb: () => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb());
  }

  public getTracks(): MusicTrack[] {
    return this.tracks;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsLoading(): boolean {
    return this.isLoading;
  }

  public getErrorMessage(): string | null {
    return this.errorMessage;
  }

  public clearError() {
    this.errorMessage = null;
    this.notify();
  }

  public getCurrentTrack(): MusicTrack | null {
    return this.tracks[this.currentTrackIndex] || null;
  }

  public getCurrentIndex(): number {
    return this.currentTrackIndex;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getCurrentPlaybackTime(): number {
    return this.currentTime;
  }

  public getDuration(): number {
    const track = this.getCurrentTrack();
    return this.duration || track?.duration || 0;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audio) {
      this.audio.volume = this.volume;
    }
    this.notify();
  }

  public seek(seconds: number) {
    if (!this.audio) return;
    const total = this.getDuration();
    if (total <= 0) return;
    const target = Math.max(0, Math.min(total, seconds));
    try {
      this.audio.currentTime = target;
      this.currentTime = target;
      this.notify();
    } catch {
      // Ignore seek before metadata loaded
    }
  }

  public probeDurations() {
    if (this.hasProbedDurations || typeof Audio === 'undefined') return;
    this.hasProbedDurations = true;

    this.tracks.forEach((track, idx) => {
      if (!track.audioUrl) return;
      const probe = new Audio();
      probe.preload = 'metadata';

      const cleanup = () => {
        probe.onloadedmetadata = null;
        probe.onerror = null;
        probe.removeAttribute('src');
        probe.load();
      };

      probe.onloadedmetadata = () => {
        if (Number.isFinite(probe.duration) && probe.duration > 0) {
          this.tracks[idx].duration = probe.duration;
          this.tracks[idx].unavailable = false;
          if (idx === this.currentTrackIndex && this.duration === 0) {
            this.duration = probe.duration;
          }
          this.notify();
        }
        cleanup();
      };

      probe.onerror = () => {
        this.tracks[idx].unavailable = true;
        this.notify();
        cleanup();
      };

      probe.src = track.audioUrl;
    });
  }

  public async play() {
    if (!this.audio) return;
    const track = this.getCurrentTrack();
    if (!track || !track.audioUrl) {
      this.errorMessage = 'No playable audio source configured for this track.';
      this.isPlaying = false;
      this.notify();
      return;
    }

    const token = ++this.switchToken;
    this.errorMessage = null;

    try {
      const targetUrl = new URL(track.audioUrl, window.location.href).href;
      if (!this.hasLoadedSrc || this.audio.src !== targetUrl) {
        this.isLoading = true;
        this.hasLoadedSrc = true;
        this.audio.src = track.audioUrl;
        this.audio.load();
        this.notify();
      }

      this.audio.volume = this.volume;
      await this.audio.play();
      if (token !== this.switchToken) return;
      this.isPlaying = true;
      this.isLoading = false;
      this.tracks[this.currentTrackIndex].unavailable = false;
      this.notify();
    } catch (err) {
      if (token !== this.switchToken) return;
      this.isPlaying = false;
      this.isLoading = false;
      const msg = err instanceof Error ? err.message : '';
      if (msg.toLowerCase().includes('abort')) {
        // Interrupted by a newer play/pause request
        this.notify();
        return;
      }
      this.tracks[this.currentTrackIndex].unavailable = true;
      this.errorMessage = `Unable to play "${track.title}". Please check your audio connection or try another track.`;
      this.notify();
    }
  }

  public pause() {
    if (!this.audio) return;
    this.switchToken++;
    this.isSwitching = false;
    this.audio.pause();
    this.isPlaying = false;
    this.isLoading = false;
    this.notify();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public nextTrack(forcePlay?: boolean) {
    const nextIdx = (this.currentTrackIndex + 1) % this.tracks.length;
    this.selectTrack(nextIdx, forcePlay ?? this.isPlaying);
  }

  public prevTrack(forcePlay?: boolean) {
    const prevIdx = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.selectTrack(prevIdx, forcePlay ?? this.isPlaying);
  }

  public async selectTrack(index: number, autoPlayIfRequested?: boolean) {
    if (index < 0 || index >= this.tracks.length) return;
    const shouldPlay = autoPlayIfRequested ?? this.isPlaying;
    const token = ++this.switchToken;

    this.errorMessage = null;

    // Gentle fade-out if currently playing
    if (this.audio && this.isPlaying) {
      this.isSwitching = true;
      const startVol = this.volume;
      for (let step = 3; step >= 1; step--) {
        if (token !== this.switchToken) {
          this.isSwitching = false;
          return;
        }
        this.audio.volume = (startVol * step) / 4;
        await new Promise((r) => setTimeout(r, 35));
      }
      if (token !== this.switchToken) {
        this.isSwitching = false;
        return;
      }
      this.audio.pause();
      this.audio.volume = this.volume;
      this.isSwitching = false;
    }

    this.currentTrackIndex = index;
    this.currentTime = 0;
    this.duration = this.tracks[index].duration || 0;
    this.hasLoadedSrc = false;

    if (this.audio) {
      const nextTrack = this.tracks[index];
      if (shouldPlay) {
        this.notify();
        await this.play();
      } else {
        this.isPlaying = false;
        this.isLoading = false;
        if (nextTrack.audioUrl) {
          this.hasLoadedSrc = true;
          this.audio.src = nextTrack.audioUrl;
          this.audio.load();
        }
        this.notify();
      }
    } else {
      this.notify();
    }
  }
}

export const musicPlayer = new Html5MusicPlayerEngine();
