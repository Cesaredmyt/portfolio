import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import { sections, sectionNumber, type SectionId } from '../data/sections';
import { useActiveSection } from '../hooks/useActiveSection';

const socials = [
  { href: 'https://github.com/Cesaredmyt', label: 'GitHub', Icon: FaGithub, external: true },
  { href: 'https://linkedin.com/in/cesarenriquediazmaldonado', label: 'LinkedIn', Icon: FaLinkedin, external: true },
  { href: 'mailto:dcesar664@gmail.com', label: 'Email', Icon: HiMail },
];

const Corner: React.FC<{ className: string }> = ({ className }) => (
  <span aria-hidden="true" className={`hud-corner absolute w-5 h-5 ${className}`} />
);

// Decoración fija a los lados; solo en pantallas anchas donde hay margen libre.
const SideRails: React.FC = () => {
  const { active } = useActiveSection();
  const current = sections.find((s) => s.id === active);

  return (
    <div className="hidden min-[1360px]:block pointer-events-none fixed inset-0 z-40">
      {/* Esquinas de visor */}
      <Corner className="top-24 left-6 border-t border-l" />
      <Corner className="top-24 right-6 border-t border-r" />
      <Corner className="bottom-6 left-6 border-b border-l" />

      <p className="absolute top-[7.25rem] left-6 font-mono text-[10px] leading-4 tracking-widest text-gray-600">
        19.70° N<br />101.19° O
      </p>

      <div className="absolute top-[7.25rem] right-6 text-right font-mono text-[10px] leading-4 tracking-widest text-gray-600">
        <AnimatePresence mode="wait">
          <motion.p
            key={active || 'inicio'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <span className="text-emerald-400">{current ? sectionNumber(current.id) : '00'}</span> / {String(sections.length).padStart(2, '0')}
            <br />
            {current ? current.label.toUpperCase() : 'INICIO'}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Riel izquierdo: redes */}
      <div className="absolute left-7 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4">
        <span className="w-px h-16 bg-gradient-to-b from-transparent to-white/15" />
        {socials.map(({ href, label, Icon, external }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            target={external ? '_blank' : undefined}
            rel={external ? 'noopener noreferrer' : undefined}
            className="rail-link pointer-events-auto text-gray-500 hover:text-emerald-400"
          >
            <Icon size={17} />
          </a>
        ))}
        <span className="w-px h-16 bg-gradient-to-t from-transparent to-white/15" />
      </div>

      {/* Riel derecho: índice de secciones como casillas */}
      <nav aria-label="Índice de secciones" className="absolute right-7 top-1/2 -translate-y-1/2 flex flex-col items-end gap-3">
        {sections.map(({ id, label }, i) => {
          const on = active === id;
          return (
            <a key={id} href={`#${id}`} className="rail-dot group pointer-events-auto flex items-center gap-3" aria-label={label}>
              <span className="rail-dot-label font-mono text-[10px] tracking-widest text-gray-400 whitespace-nowrap">
                {sectionNumber(id as SectionId)} {label}
              </span>
              <span
                className={`block rounded-[2px] border transition-all duration-500 ${
                  on
                    ? 'w-2.5 h-6 bg-emerald-400 border-emerald-300 shadow-[0_0_10px_rgb(52_211_153/0.5)]'
                    : `w-2.5 h-2.5 ${i % 2 ? 'bg-white/15 border-white/15' : 'bg-transparent border-white/25'} group-hover:border-emerald-400/70`
                }`}
              />
            </a>
          );
        })}
      </nav>
    </div>
  );
};

export default SideRails;
