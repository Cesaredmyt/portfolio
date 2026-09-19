import React from 'react';
import { motion, useReducedMotion, type HTMLMotionProps } from 'motion/react';

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number;
  y?: number;
};

const Reveal: React.FC<RevealProps> = ({ delay = 0, y = 24, children, ...rest }) => {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={reduced ? { duration: 0 } : { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
