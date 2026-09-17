import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react';
import { useLenis } from 'lenis/react';

// Tacómetro: la aguja sube de 0 a la zona roja conforme avanzas en la página.
const START = -120;
const SWEEP = 240;
const R = 21;

const arcPoint = (deg: number, r = R) => {
  const rad = ((deg - 90) * Math.PI) / 180;
  return { x: 28 + r * Math.cos(rad), y: 28 + r * Math.sin(rad) };
};

const describeArc = (from: number, to: number, r = R) => {
  const a = arcPoint(from, r);
  const b = arcPoint(to, r);
  const large = to - from > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${large} 1 ${b.x} ${b.y}`;
};

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 18 });
  const needle = useTransform(smooth, [0, 1], [START, START + SWEEP]);
  const lenis = useLenis();
  const needleRef = useRef<SVGGElement>(null);

  useMotionValueEvent(needle, 'change', (deg) => {
    needleRef.current?.setAttribute('transform', `rotate(${deg} 28 28)`);
  });

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      onClick={goTop}
      aria-label="Volver arriba"
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.92 }}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16, pointerEvents: visible ? 'auto' : 'none' }}
      className="group fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full glass border border-white/10 hover:border-emerald-400/40 hover:shadow-lg hover:shadow-emerald-500/20 cursor-pointer transition-[border-color,box-shadow] duration-300"
    >
      <svg viewBox="0 0 56 56" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <path d={describeArc(START, START + SWEEP)} fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="2.5" strokeLinecap="round" className="text-gray-300" />
        <path d={describeArc(START + SWEEP * 0.8, START + SWEEP)} fill="none" stroke="rgb(248 113 113)" strokeOpacity="0.7" strokeWidth="2.5" strokeLinecap="round" />
        <motion.path
          d={describeArc(START, START + SWEEP)}
          fill="none"
          stroke="rgb(52 211 153)"
          strokeWidth="2.5"
          strokeLinecap="round"
          style={{ pathLength: smooth }}
        />
        {Array.from({ length: 7 }, (_, i) => {
          const deg = START + (SWEEP / 6) * i;
          const a = arcPoint(deg, 16);
          const b = arcPoint(deg, 13.5);
          return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="currentColor" strokeOpacity="0.35" className="text-gray-300" />;
        })}
        <g ref={needleRef} transform={`rotate(${START} 28 28)`}>
          <line x1="28" y1="28" x2="28" y2="13" stroke="rgb(52 211 153)" strokeWidth="1.8" strokeLinecap="round" />
        </g>
        <circle cx="28" cy="28" r="2.6" className="fill-gray-200" />
      </svg>
      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[7px] font-mono tracking-widest text-gray-500 transition-colors group-hover:text-emerald-300">
        TOP
      </span>
    </motion.button>
  );
};

export default ScrollToTop;
