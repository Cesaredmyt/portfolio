import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

type RevealProps = HTMLMotionProps<'div'> & {
  delay?: number;
  y?: number;
};

const Reveal: React.FC<RevealProps> = ({ delay = 0, y = 24, children, ...rest }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    {...rest}
  >
    {children}
  </motion.div>
);

export default Reveal;
