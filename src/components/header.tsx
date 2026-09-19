import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaDownload, FaChevronDown, FaGraduationCap } from 'react-icons/fa';
import Counter from './ui/Counter';
import Magnetic from './ui/Magnetic';
import { useLanguage, type Language } from '../context/LanguageContext';

const roles: Record<Language, string[]> = {
  es: ['Backend Developer · Full Stack', 'APIs REST y PostgreSQL', 'Autenticación y control de acceso', 'Docker, Linux y observabilidad'],
  en: ['Backend Developer · Full Stack', 'REST APIs and PostgreSQL', 'Authentication and access control', 'Docker, Linux and observability'],
};

const stats = [
  { value: 3, suffix: '', es: 'Proyectos end-to-end', en: 'End-to-end projects' },
  { value: 15, suffix: '+', es: 'Servicios desplegados', en: 'Deployed services' },
  { value: 6, suffix: 'M+', es: 'Registros analizados', en: 'Records analyzed' },
  { value: 94, suffix: '/100', es: 'Promedio académico', en: 'Academic average' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

function useTypewriter(words: string[]) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    setIndex(0);
    setDisplayed('');
    setTyping(true);
  }, [words]);

  useEffect(() => {
    const current = words[index];
    let timeout: ReturnType<typeof setTimeout>;
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
      } else {
        timeout = setTimeout(() => setTyping(false), 2200);
      }
    } else if (displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else {
      setIndex((prev) => (prev + 1) % words.length);
      setTyping(true);
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, index, words]);

  return displayed;
}

const NAME = 'César Enrique Díaz Maldonado';

// Cada letra sube al pasar el cursor y sus vecinas la acompañan (ver .name-letter en index.css).
const WavyName: React.FC = () => {
  const total = NAME.replace(/ /g, '').length;
  let n = 0;
  return (
    <span aria-hidden="true" className="flex w-full flex-wrap justify-center md:justify-start">
      {NAME.split(' ').map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap mr-[0.25em]">
          {[...word].map((ch, i) => {
            const pct = Math.round((n++ / (total - 1)) * 100);
            return (
              <span key={i} className="name-letter" style={{ ['--p' as string]: `${pct}%` }}>
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
};

// Componente aislado: solo este texto se re-renderiza al escribir, no todo el hero.
const Typewriter: React.FC<{ words: string[] }> = ({ words }) => {
  const displayed = useTypewriter(words);
  return <span className="text-emerald-400 font-mono text-lg md:text-xl font-medium text-glow">{displayed}</span>;
};

const OrbitPhoto: React.FC = () => (
  <motion.div
    whileHover={{ scale: 1.04, rotate: -2 }}
    transition={{ type: "spring", stiffness: 200, damping: 15 }}
    className="group relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
  >
    {/* Outer orbit */}
    <div className="absolute inset-[-18%] rounded-full border border-white/5 animate-spin-slower">
      <span className="absolute top-1/2 -left-1.5 w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_14px_rgb(129_140_248)]" />
    </div>
    {/* Inner orbit */}
    <div className="absolute inset-[-6%] rounded-full border border-dashed border-emerald-500/20 animate-spin-slow">
      <span className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgb(52_211_153)]" />
      <span className="absolute bottom-[14%] right-[4%] w-1.5 h-1.5 rounded-full bg-sky-300/80" />
    </div>

    <div className="absolute -inset-6 rounded-full opacity-60 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(closest-side, rgb(16 185 129 / 0.35), transparent)" }} />
    <div className="relative w-full h-full rounded-full overflow-hidden border border-emerald-500/40 shadow-2xl shadow-emerald-500/10">
      <img
        src="/img/avatar.webp"
        width={320}
        height={320}
        fetchPriority="high"
        decoding="async"
        alt="César Enrique Díaz Maldonado"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    </div>
  </motion.div>
);

const Header: React.FC = () => {
  const { language, tr } = useLanguage();
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 600], [0, 80]);
  const fade = useTransform(scrollY, [0, 500], [1, 0.25]);

  return (
    <header id="inicio" className="relative min-h-screen flex flex-col justify-center text-white pt-28 pb-12 px-6 md:px-12 overflow-x-clip">
      <div className="container mx-auto max-w-6xl relative">
        <div className="grid min-w-0 grid-cols-1 md:grid-cols-[3fr_2fr] items-center gap-14">

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            style={{ opacity: fade }}
            className="min-w-0 text-center md:text-left order-2 md:order-1"
          >
            <motion.div variants={item} className="inline-flex items-center gap-2 mb-5 px-3 py-1 rounded-full border border-emerald-500/25 bg-emerald-500/5">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs font-mono text-emerald-300 tracking-wide">{tr('Disponible · prácticas y junior', 'Available · internships and junior roles')}</span>
            </motion.div>

            <motion.h1
              variants={item}
              aria-label={NAME}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-5 tracking-tight leading-[1.02] cursor-default"
            >
              <WavyName />
            </motion.h1>

            <motion.div variants={item} className="flex items-center mb-5 h-8 justify-center md:justify-start">
              <Typewriter words={roles[language]} />
              <span className="inline-block w-0.5 h-5 bg-emerald-400 ml-1 animate-pulse" />
            </motion.div>

            <motion.p variants={item} className="text-base md:text-lg text-gray-300 max-w-xl mb-7 leading-relaxed mx-auto md:mx-0">
              {tr(
                'Soy estudiante de Ingeniería en Sistemas Computacionales (egreso estimado en 2027), con enfoque backend y capacidad full stack. Diseño APIs, modelos de datos, control de acceso e integraciones, y los conecto con interfaces en React y Next.js.',
                'I am a Computer Systems Engineering student (expected graduation in 2027), focused on backend development with full-stack capabilities. I design APIs, data models, access control and integrations, then connect them to React and Next.js interfaces.',
              )}
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
              <span className="flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-500/5 border border-emerald-500/20 px-3 py-1.5 rounded-full transition-all duration-200 hover:border-emerald-500/40 hover:-translate-y-0.5">
                <FaGraduationCap size={12} />
                {tr('Estudiante ISC · egreso 2027', 'CS Engineering student · 2027')}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-gray-400 border border-white/10 px-3 py-1.5 rounded-full transition-all duration-200 hover:border-emerald-500/40 hover:text-gray-200 hover:-translate-y-0.5">
                <FaMapMarkerAlt className="text-emerald-400" size={11} />
                Morelia, Mich.
              </span>
              <span className="text-xs text-gray-400 border border-white/10 px-3 py-1.5 rounded-full transition-all duration-200 hover:border-emerald-500/40 hover:text-gray-200 hover:-translate-y-0.5">{tr('Inglés B2', 'English B2')}</span>
              <span className="text-xs text-gray-400 border border-white/10 px-3 py-1.5 rounded-full transition-all duration-200 hover:border-emerald-500/40 hover:text-gray-200 hover:-translate-y-0.5">{tr('Remoto · Híbrido · Presencial', 'Remote · Hybrid · On-site')}</span>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Magnetic>
                <a
                  href="mailto:dcesar664@gmail.com"
                  className="shine group flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-gray-950 text-sm font-bold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                >
                  <FaEnvelope size={13} className="transition-transform group-hover:-rotate-12" />
                  {tr('Contactar', 'Contact me')}
                </a>
                </Magnetic>
              <Magnetic>
                <a
                  href="/cv.pdf"
                  download
                  className="group flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-medium rounded-xl transition-all duration-200"
                >
                  <FaDownload size={13} className="transition-transform duration-300 group-hover:translate-y-0.5" />
                  {tr('Descargar CV', 'Download résumé')}
                </a>
                </Magnetic>
              <Magnetic>
                <a
                  href="https://github.com/Cesaredmyt"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex items-center justify-center w-11 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-xl transition-all duration-200"
                >
                  <FaGithub size={17} />
                </a>
                </Magnetic>
              <Magnetic>
                <a
                  href="https://linkedin.com/in/cesarenriquediazmaldonado"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center justify-center w-11 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white rounded-xl transition-all duration-200"
                >
                  <FaLinkedin size={17} />
                </a>
                </Magnetic>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: photoY }}
            className="flex justify-center order-1 md:order-2"
          >
            <OrbitPhoto />
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.7 } } }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {stats.map(({ value, suffix, es, en }) => {
            const label = language === 'es' ? es : en;
            return (
            <motion.div
              key={label}
              variants={item}
              whileHover={{ y: -6, scale: 1.03 }}
              className="group glass border border-white/5 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/10 rounded-xl p-4 text-center transition-[border-color,box-shadow] duration-300 cursor-default"
            >
              <p className="font-display text-3xl font-bold text-emerald-400 mb-1 transition-[text-shadow] duration-300 group-hover:text-glow">
                <Counter value={value} suffix={suffix} />
              </p>
              <p className="text-xs text-gray-500 leading-tight">{label}</p>
            </motion.div>
            );
          })}
        </motion.div>
      </div>

      <motion.a
        href="#proyectos"
        aria-label={tr('Ir a proyectos', 'Go to projects')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 1.4 }, y: { repeat: Infinity, duration: 2 } }}
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-600 hover:text-emerald-400"
      >
        <FaChevronDown size={18} />
      </motion.a>
    </header>
  );
};

export default Header;
