import React, { useEffect, useRef } from 'react';
import { animate, useInView } from 'motion/react';

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

const Counter: React.FC<Props> = ({ value, prefix = '', suffix = '', decimals = 0, className }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => { node.textContent = `${prefix}${v.toFixed(decimals)}${suffix}`; },
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix, decimals]);

  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
};

export default Counter;
