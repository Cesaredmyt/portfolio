import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

interface Props {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

// Atrae suavemente su contenido hacia el cursor.
const Magnetic: React.FC<Props> = ({ children, strength = 0.3, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 15, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 15, mass: 0.4 });

  const onMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} style={{ x, y }} className={`inline-flex ${className}`}>
      {children}
    </motion.div>
  );
};

export default Magnetic;
