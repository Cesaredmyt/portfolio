import { useEffect, useState } from 'react';
import { sections } from '../data/sections';

type Listener = (state: { active: string; scrollY: number; direction: 'up' | 'down' }) => void;

// Un solo listener de scroll compartido por todos los componentes que lo usan.
const listeners = new Set<Listener>();
let frame = 0;
let lastY = 0;
let state = { active: '', scrollY: 0, direction: 'up' as 'up' | 'down' };

function compute() {
  frame = 0;
  const y = window.scrollY;
  const line = window.innerHeight * 0.35;
  let active = '';
  for (const { id } of sections) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= line) active = id;
  }
  if (window.innerHeight + y >= document.documentElement.scrollHeight - 4) active = 'contacto';
  const direction = Math.abs(y - lastY) < 4 ? state.direction : y > lastY ? 'down' : 'up';
  lastY = y;
  state = { active, scrollY: y, direction };
  listeners.forEach((l) => l(state));
}

const schedule = () => { if (!frame) frame = requestAnimationFrame(compute); };

export function useActiveSection() {
  const [value, setValue] = useState(state);

  useEffect(() => {
    // Solo re-renderiza cuando cambia algo visible, no en cada cuadro de scroll.
    const listener: Listener = (next) =>
      setValue((prev) =>
        prev.active === next.active && prev.direction === next.direction && prev.scrollY > 40 === next.scrollY > 40 ? prev : next
      );
    listeners.add(listener);
    if (listeners.size === 1) {
      window.addEventListener('scroll', schedule, { passive: true });
      window.addEventListener('resize', schedule, { passive: true });
    }
    schedule();
    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
      }
    };
  }, []);

  return value;
}
