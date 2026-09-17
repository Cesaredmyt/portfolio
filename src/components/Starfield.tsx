import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Star {
  x: number; y: number;
  r: number; base: number;
  phase: number; speed: number;
  layer: 0 | 1 | 2;
}

interface ShootingStar {
  x: number; y: number;
  vx: number; vy: number;
  life: number; max: number;
}

// Parallax por capa: las estrellas lejanas casi no se mueven.
const SCROLL_PARALLAX = [0.03, 0.08, 0.16];
const MOUSE_PARALLAX = [4, 10, 20];
const LINK_DIST = 110;
const CURSOR_DIST = 170;
const MAX_STARS = 170;

const Starfield: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const light = theme === 'light';
    const color = light ? '15,23,42' : '226,232,240';
    const accent = light ? '4,120,87' : '16,185,129';

    let w = 0, h = 0;
    let stars: Star[] = [];
    const shooting: ShootingStar[] = [];
    const mouse = { x: -9999, y: -9999, nx: 0, ny: 0, lastMove: 0 };
    let animId = 0;
    let nextShot = performance.now() + 4000;
    let lastScroll = window.scrollY;
    let velocity = 0;
    let warpUntil = 0;

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(MAX_STARS, (w * h) / 8000));
      stars = Array.from({ length: count }, () => {
        const layer = (Math.random() < 0.6 ? 0 : Math.random() < 0.7 ? 1 : 2) as Star['layer'];
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: [0.5, 0.9, 1.4][layer] * (0.7 + Math.random() * 0.6),
          base: (light ? 0.18 : 0.35) + Math.random() * (light ? 0.2 : 0.5),
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 1.6,
          layer,
        };
      });
    };

    const wrap = (v: number, max: number) => ((v % max) + max) % max;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const scroll = window.scrollY;
      // Velocidad de scroll suavizada: las estrellas se estiran como estelas al moverse rápido.
      velocity += (scroll - lastScroll - velocity) * 0.25;
      lastScroll = scroll;
      const warp = t < warpUntil ? 2.6 : 1;
      const streaking = Math.abs(velocity) > 2;
      const hasMouse = mouse.x > -9000;
      mouse.nx += ((hasMouse ? (mouse.x / w - 0.5) * 2 : 0) - mouse.nx) * 0.04;
      mouse.ny += ((hasMouse ? (mouse.y / h - 0.5) * 2 : 0) - mouse.ny) * 0.04;
      // Las constelaciones solo se calculan mientras el cursor se mueve.
      const linking = hasMouse && t - mouse.lastMove < 1500;
      const near: number[] = [];

      ctx.fillStyle = `rgb(${color})`;
      for (const s of stars) {
        const px = wrap(s.x - mouse.nx * MOUSE_PARALLAX[s.layer], w);
        const py = wrap(s.y - scroll * SCROLL_PARALLAX[s.layer] - mouse.ny * MOUSE_PARALLAX[s.layer], h);
        const twinkle = reduced ? 1 : 0.65 + 0.35 * Math.sin(t * 0.001 * s.speed + s.phase);
        ctx.globalAlpha = s.base * twinkle;
        const size = s.r * 2;
        if (streaking && s.layer > 0) {
          const len = Math.min(70, Math.abs(velocity) * SCROLL_PARALLAX[s.layer] * 6 * warp);
          ctx.fillRect(px - s.r / 2, velocity > 0 ? py : py - len, s.r, len + size);
        } else {
          ctx.fillRect(px - s.r, py - s.r, size, size);
        }

        if (linking && s.layer > 0) {
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          if (dx * dx + dy * dy < CURSOR_DIST * CURSOR_DIST) near.push(px, py);
        }
      }
      ctx.globalAlpha = 1;

      if (near.length > 2) {
        ctx.lineWidth = 0.6;
        for (let i = 0; i < near.length; i += 2) {
          for (let j = i + 2; j < near.length; j += 2) {
            const dx = near[i] - near[j];
            const dy = near[i + 1] - near[j + 1];
            const d2 = dx * dx + dy * dy;
            if (d2 < LINK_DIST * LINK_DIST) {
              ctx.strokeStyle = `rgba(${accent},${0.35 * (1 - Math.sqrt(d2) / LINK_DIST)})`;
              ctx.beginPath();
              ctx.moveTo(near[i], near[i + 1]);
              ctx.lineTo(near[j], near[j + 1]);
              ctx.stroke();
            }
          }
        }
      }

      if (!light && t > nextShot) {
        const fromLeft = Math.random() < 0.5;
        shooting.push({
          x: fromLeft ? Math.random() * w * 0.5 : w * 0.5 + Math.random() * w * 0.5,
          y: Math.random() * h * 0.4,
          vx: (fromLeft ? 1 : -1) * (7 + Math.random() * 4),
          vy: 3 + Math.random() * 2,
          life: 0,
          max: 45 + Math.random() * 25,
        });
        nextShot = t + 7000 + Math.random() * 9000;
      }

      for (let i = shooting.length - 1; i >= 0; i--) {
        const s = shooting[i];
        s.life++;
        s.x += s.vx;
        s.y += s.vy;
        const k = 1 - s.life / s.max;
        const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 12, s.y - s.vy * 12);
        grad.addColorStop(0, `rgba(255,255,255,${0.9 * k})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.4;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 12, s.y - s.vy * 12);
        ctx.stroke();
        if (s.life >= s.max) shooting.splice(i, 1);
      }

      if (!reduced) animId = requestAnimationFrame(draw);
    };

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.lastMove = performance.now();
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onResize = () => { build(); if (reduced) draw(0); };
    const onVisibility = () => {
      cancelAnimationFrame(animId);
      if (!document.hidden && !reduced) animId = requestAnimationFrame(draw);
    };
    const onScrollStatic = () => draw(0);
    const onWarp = (e: Event) => {
      const { duration = 1.2 } = (e as CustomEvent<{ duration?: number }>).detail ?? {};
      warpUntil = performance.now() + duration * 1000;
    };
    window.addEventListener('portfolio:warp', onWarp);

    build();
    if (reduced) {
      draw(0);
      window.addEventListener('scroll', onScrollStatic, { passive: true });
    } else {
      animId = requestAnimationFrame(draw);
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
      document.addEventListener('visibilitychange', onVisibility);
    }
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScrollStatic);
      window.removeEventListener('portfolio:warp', onWarp);
    };
  }, [theme]);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{
        // Nebulosas con gradientes radiales: mismo efecto que blur() sin su costo.
        background:
          'radial-gradient(40rem 40rem at 95% 0%, rgb(16 185 129 / 0.07), transparent 70%),' +
          'radial-gradient(36rem 36rem at 0% 45%, rgb(99 102 241 / 0.07), transparent 70%),' +
          'radial-gradient(32rem 32rem at 70% 100%, rgb(14 165 233 / 0.05), transparent 70%)',
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default Starfield;
