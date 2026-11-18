export type LevelId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface GiftItem {
  id: number;
  message: string;
  color: string;
  pattern: string;
  unwrapped: boolean;
  sparkleColor: string;
}

export interface ButterflyItem {
  id: number;
  x: number;
  y: number;
  color: string;
  secondaryColor: string;
  size: number;
  speed: number;
  direction: number;
  caught: boolean;
  message: string;
}

export interface BalloonItem {
  id: number;
  color: string;
  gradient: string;
  compliment: string;
  popped: boolean;
  size: number;
  floatOffset: number;
}

export interface StarItem {
  id: number;
  category: 'Happiness' | 'Friendship' | 'Confidence' | 'New Opportunities' | 'Beautiful Adventures';
  wish: string;
  collected: boolean;
  x: number; // percentage
  y: number; // percentage
  hint: string;
}

export interface TreasureWishItem {
  id: number;
  title: string;
  category: string;
  wish: string;
  icon: string;
  color: string;
}

export interface SongTrack {
  id: string;
  title: string;
  artist: string;
  duration: number; // seconds
  melodyNotes: number[]; // frequencies or midi for synth engine
  coverUrl?: string;
  audioUrl?: string; // local or external MP3 if provided
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
}
