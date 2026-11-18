/**
 * Lightweight canvas particle engine for flower petals, stardust sparkles, confetti, and fireworks
 */

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  rotation: number;
  rotationSpeed: number;
  type: 'confetti' | 'petal' | 'sparkle' | 'firework';
}

class ParticleEngine {
  private particles: Particle[] = [];
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private animFrameId: number | null = null;

  public init(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', this.handleResize);
    this.loop();
  }

  public destroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
    }
  }

  private handleResize = () => {
    this.resize();
  };

  private resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  public spawnClickSparkles(x: number, y: number, count = 12) {
    const colors = ['#f472b6', '#ec4899', '#c084fc', '#fde047', '#67e8f9'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.03 + 0.02,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
        type: 'sparkle'
      });
    }
  }

  public spawnConfetti(count = 70) {
    if (!this.canvas) return;
    const colors = ['#f472b6', '#ec4899', '#fb7185', '#a855f7', '#c084fc', '#facc15', '#38bdf8'];
    const w = this.canvas.width;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * w,
        y: -20,
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 3 + 2,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        decay: Math.random() * 0.005 + 0.003,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        type: 'confetti'
      });
    }
  }

  public spawnPetals(count = 25) {
    if (!this.canvas) return;
    const petalColors = ['#fbcfe8', '#f472b6', '#fda4af', '#f9a8d4', '#fed7aa'];
    const w = this.canvas.width;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * w,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.3) * 1.5,
        vy: Math.random() * 1.2 + 0.8,
        size: Math.random() * 10 + 6,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        alpha: Math.random() * 0.5 + 0.4,
        decay: 0.001,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        type: 'petal'
      });
    }
  }

  public launchFirework(x?: number, y?: number) {
    if (!this.canvas) return;
    const startX = x ?? (Math.random() * (this.canvas.width * 0.7) + this.canvas.width * 0.15);
    const startY = y ?? (Math.random() * (this.canvas.height * 0.5) + this.canvas.height * 0.15);
    const colors = ['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#fbbf24', '#38bdf8', '#4ade80'];
    const burstColor = colors[Math.floor(Math.random() * colors.length)];
    const count = 45;

    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + (Math.random() * 0.2);
      const speed = Math.random() * 4 + 2;
      this.particles.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 3.5 + 1.5,
        color: burstColor,
        alpha: 1,
        decay: Math.random() * 0.02 + 0.015,
        rotation: 0,
        rotationSpeed: 0,
        type: 'firework'
      });
    }
  }

  private loop = () => {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.alpha -= p.decay;

      if (p.type === 'confetti' || p.type === 'firework') {
        p.vy += 0.05; // gravity
      } else if (p.type === 'petal') {
        p.vx += Math.sin(p.rotation * 0.02) * 0.02;
        if (p.y > this.canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * this.canvas.width;
          p.alpha = 0.7;
        }
      }

      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.type === 'petal') {
        // Draw tulip petal curve
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, p.size * 0.5, p.size, Math.PI / 4, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (p.type === 'confetti') {
        this.ctx.fillStyle = p.color;
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      } else {
        // Sparkle or firework dot with glow
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.restore();
    }

    this.animFrameId = requestAnimationFrame(this.loop);
  };
}

export const particleEngine = new ParticleEngine();
