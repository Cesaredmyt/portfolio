import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, type HTMLMotionProps } from 'motion/react';

type Props = HTMLMotionProps<'div'> & {
  /** Inclinación máxima en grados al mover el cursor (0 = sin inclinación). */
  tilt?: number;
};

const SPRING = { stiffness: 220, damping: 20, mass: 0.6 };

const SpotlightCard: React.FC<Props> = ({ className = '', children, tilt = 0, onPointerMove, onPointerLeave, style, ...rest }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const rx = useSpring(useMotionValue(0), SPRING);
  const ry = useSpring(useMotionValue(0), SPRING);
  const canTilt = tilt > 0 && !reduced;

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
      if (canTilt && e.pointerType === 'mouse') {
        ry.set((x / rect.width - 0.5) * tilt * 2);
        rx.set(-(y / rect.height - 0.5) * tilt * 2);
      }
    }
    onPointerMove?.(e);
  };

  const handleLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    rx.set(0);
    ry.set(0);
    onPointerLeave?.(e);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={canTilt ? { rotateX: rx, rotateY: ry, transformPerspective: 1000, ...style } : style}
      className={`spotlight ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default SpotlightCard;
