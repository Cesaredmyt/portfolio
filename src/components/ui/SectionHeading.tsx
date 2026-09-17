import React from 'react';
import { motion } from 'motion/react';

interface Props {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  align?: 'center' | 'left';
  /** Número editorial grande detrás del título, p. ej. "02". */
  index?: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

const SectionHeading: React.FC<Props> = ({ title, subtitle, badge, align = 'center', index }) => {
  const words = title.split(' ');
  const center = align === 'center';

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
      className={`relative mb-14 ${center ? 'text-center' : 'text-left'}`}
    >
      {index && (
        <motion.span
          aria-hidden="true"
          variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1, transition: { duration: 1.2, ease } } }}
          className={`section-index absolute -top-14 md:-top-20 font-display font-bold leading-none select-none pointer-events-none text-[7rem] md:text-[10rem] ${center ? 'left-1/2 -translate-x-1/2' : 'left-0'}`}
        >
          {index}
        </motion.span>
      )}
      {badge && (
        <motion.div
          variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
          className={`mb-4 flex ${center ? 'justify-center' : ''}`}
        >
          {badge}
        </motion.div>
      )}

      <h2 className="relative group font-display text-4xl md:text-5xl font-bold tracking-tight text-white">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-1 -mb-1">
            <motion.span
              variants={{ hidden: { y: '110%' }, show: { y: '0%', transition: { duration: 0.8, ease } } }}
              className="inline-block"
            >
              {word}
            </motion.span>
            {i < words.length - 1 && ' '}
          </span>
        ))}
      </h2>

      <motion.div
        variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.9, ease, delay: 0.2 } } }}
        className={`board-rank h-1 w-24 mt-5 origin-center ${center ? 'mx-auto' : ''}`}
      />

      {subtitle && (
        <motion.p
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
          className={`text-gray-400 text-base mt-5 max-w-2xl leading-relaxed ${center ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
