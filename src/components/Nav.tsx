import React, { useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { FaSun, FaMoon, FaDownload, FaChessKnight } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { sections } from '../data/sections';
import { useActiveSection } from '../hooks/useActiveSection';

const Nav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { language, setLanguage, tr } = useLanguage();
  const { active, scrollY, direction } = useActiveSection();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const scrolled = scrollY > 40;
  const hidden = scrolled && direction === 'down' && scrollY > 600 && !open;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-3 md:pt-4 pointer-events-none"
    >
      <nav
        className={`nav-pill pointer-events-auto relative w-full max-w-5xl rounded-2xl border transition-[padding,background-color,border-color,box-shadow] duration-500 ${
          scrolled || open ? 'nav-pill--scrolled py-2' : 'py-3 border-transparent bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between gap-3 px-3 md:px-4">
          <a href="#inicio" className="group flex items-center gap-2 flex-shrink-0" aria-label="Inicio">
            <span className="nav-logo-mark w-8 h-8 rounded-lg flex items-center justify-center text-emerald-400 border border-emerald-500/30 bg-emerald-500/10">
              <FaChessKnight size={14} />
            </span>
            <span className="font-mono text-sm text-emerald-400">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-x-0.5">&lt;</span>
              Cesar
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"> /&gt;</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-0.5 rounded-xl p-1 nav-links">
            {sections.map(({ id, label, labelEn }) => {
              const on = active === id;
              return (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`relative block px-3.5 py-1.5 text-[13px] rounded-lg transition-colors duration-200 ${
                      on ? 'text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="nav-active"
                        className="nav-active absolute inset-0 rounded-lg"
                        transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                      />
                    )}
                    <span className="relative">{language === 'es' ? label : labelEn}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-1.5">
            <div role="group" aria-label={tr('Seleccionar idioma', 'Select language')} className="flex items-center rounded-lg border border-white/10 p-0.5">
              {(['es', 'en'] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLanguage(code)}
                  aria-pressed={language === code}
                  className={`px-2 py-1.5 rounded-md text-[11px] font-mono font-bold transition-colors cursor-pointer ${
                    language === code ? 'bg-emerald-400 text-gray-950' : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {code.toUpperCase()}
                </button>
              ))}
            </div>

            <button
              onClick={toggle}
              aria-label={theme === 'dark' ? tr('Cambiar a tema claro', 'Switch to light theme') : tr('Cambiar a tema oscuro', 'Switch to dark theme')}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-200 cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <FaSun size={15} /> : <FaMoon size={14} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <a
              href="/cv.pdf"
              download
              className="shine group hidden sm:flex items-center gap-2 text-xs font-semibold text-gray-950 bg-emerald-400 hover:bg-emerald-300 px-3.5 py-2 rounded-lg transition-colors duration-200"
            >
              <FaDownload size={11} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              {tr('Descargar CV', 'Download résumé')}
            </a>

            <button
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? tr('Cerrar menú', 'Close menu') : tr('Abrir menú', 'Open menu')}
              aria-expanded={open}
              className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg text-gray-300 hover:bg-white/5 cursor-pointer"
            >
              <span className={`block w-4 h-px bg-current transition-transform duration-300 ${open ? 'translate-y-[3px] rotate-45' : ''}`} />
              <span className={`block w-4 h-px bg-current transition-transform duration-300 ${open ? '-translate-y-[3px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>

        {scrolled && (
          <div className="absolute left-4 right-4 bottom-0 h-px overflow-hidden rounded-full">
            <motion.div style={{ scaleX: progress }} className="h-full origin-left bg-gradient-to-r from-emerald-400 via-sky-400 to-indigo-400" />
          </div>
        )}

        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden overflow-hidden px-3"
            >
              {sections.map(({ id, label, labelEn }, i) => (
                <motion.li key={id} initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.03 * i }}>
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between py-3 border-b border-white/5 text-sm ${active === id ? 'text-emerald-400' : 'text-gray-300'}`}
                  >
                    {language === 'es' ? label : labelEn}
                    <span className="font-mono text-[11px] text-gray-600">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
              <li>
                <a href="/cv.pdf" download className="flex items-center gap-2 py-3 text-sm text-emerald-400">
                  <FaDownload size={11} /> {tr('Descargar CV', 'Download résumé')}
                </a>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Nav;
