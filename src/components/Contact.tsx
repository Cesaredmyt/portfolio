import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { FaGithub, FaLinkedin, FaPhoneAlt, FaArrowRight, FaCopy, FaCheck, FaDownload, FaChessKnight, FaSun, FaMoon } from 'react-icons/fa';
import type { IconType } from 'react-icons';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import Magnetic from './ui/Magnetic';
import SpotlightCard from './ui/SpotlightCard';

const EMAIL = 'dcesar664@gmail.com';

const channels: { Icon: IconType; label: string; value: string; hint: string; href: string; color: string; external?: boolean }[] = [
  {
    Icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'cesarenriquediazmaldonado',
    hint: 'Conectemos',
    href: 'https://linkedin.com/in/cesarenriquediazmaldonado',
    color: '#0A66C2',
    external: true,
  },
  {
    Icon: FaGithub,
    label: 'GitHub',
    value: 'Cesaredmyt',
    hint: 'Revisa mi código',
    href: 'https://github.com/Cesaredmyt',
    color: '#A78BFA',
    external: true,
  },
  {
    Icon: FaPhoneAlt,
    label: 'Teléfono',
    value: '+52 417 130 7288',
    hint: 'Llámame',
    href: 'tel:+524171307288',
    color: '#34D399',
  },
];

function useMoreliaTime() {
  const read = () => {
    const parts = new Intl.DateTimeFormat('es-MX', {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Mexico_City',
    }).formatToParts(new Date());
    const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00';
    return { hh: get('hour'), mm: get('minute') };
  };
  const [time, setTime] = useState(read);
  useEffect(() => {
    const id = setInterval(() => setTime(read()), 20_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

/* Franja gigante: frases cortas que alternan relleno con degradado y contorno */
const phrases = ['¿Hablamos?', 'Escríbeme', 'Disponible', 'Construyamos algo'];

const Spark: React.FC = () => (
  <svg viewBox="0 0 24 24" className="spark w-8 h-8 md:w-12 md:h-12 flex-shrink-0 mx-4 md:mx-6" aria-hidden="true">
    <path d="M12 0 C13 8 16 11 24 12 C16 13 13 16 12 24 C11 16 8 13 0 12 C8 11 11 8 12 0 Z" fill="currentColor" />
  </svg>
);

const KineticBand: React.FC = () => (
  <div aria-hidden="true" className="relative mb-14 overflow-hidden py-3 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
    <div className="flex w-max animate-marquee [animation-duration:34s]">
      {[0, 1].map((copy) => (
        <div key={copy} className="flex items-center">
          {phrases.map((p, i) => (
            <span key={p} className="flex items-center">
              <span
                className={`font-display font-bold text-6xl md:text-8xl tracking-tight whitespace-nowrap ${
                  i % 2 === 0 ? 'text-gradient-move' : 'kinetic-word'
                }`}
              >
                {p}
              </span>
              <Spark />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

/* Ubicación: radar sobre Morelia, hora local con dos puntos parpadeando y día/noche */
const LocationTile: React.FC = () => {
  const { hh, mm } = useMoreliaTime();
  const hour = Number(hh);
  const day = hour >= 7 && hour < 19;

  return (
    <div className="channel-tile group relative flex flex-col h-full min-h-[168px] glass border border-white/5 rounded-2xl p-5 overflow-hidden" style={{ ['--brand' as string]: '#38BDF8' }}>
      <span className="channel-glow absolute inset-0 pointer-events-none" />
      <span aria-hidden="true" className="radar absolute -right-10 -top-10 w-40 h-40 pointer-events-none">
        <span className="radar-ring" />
        <span className="radar-ring [animation-delay:1.2s]" />
        <span className="radar-dot" />
      </span>

      <span className="relative flex items-center gap-2 text-[11px] font-mono text-gray-400">
        {day ? <FaSun className="text-amber-300" size={12} /> : <FaMoon className="text-indigo-300" size={11} />}
        {day ? 'de día en Morelia' : 'de noche en Morelia'}
      </span>

      <span className="relative mt-auto">
        <span className="block font-mono text-4xl font-bold text-white tabular-nums leading-none">
          {hh}<span className="clock-colon">:</span>{mm}
        </span>
        <span className="block font-display text-sm font-bold text-gray-200 mt-3">Morelia, Michoacán</span>
        <span className="block text-[11px] font-mono text-gray-500 mt-0.5">19.70° N · 101.19° O · GMT-6</span>
      </span>
    </div>
  );
};

/* Planeta con anillo que flota junto a la tarjeta */
const Planet: React.FC = () => (
  <div aria-hidden="true" className="planet pointer-events-none absolute -top-10 -right-4 md:-right-10 w-28 h-28 md:w-36 md:h-36 z-20">
    <span className="planet-ring absolute inset-[-22%] rounded-[50%]" />
    <span className="planet-body absolute inset-[18%] rounded-full" />
  </div>
);

/* Tablero de fondo con un caballo que salta en L al pasar el cursor */
const ChessCorner: React.FC = () => (
  <div aria-hidden="true" className="absolute -right-6 -bottom-6 w-44 h-44 opacity-[0.35] group-hover:opacity-60 transition-opacity duration-500 pointer-events-none">
    <div className="chess-board absolute inset-0 rounded-xl" />
    <span className="chess-knight absolute w-1/4 h-1/4 flex items-center justify-center text-emerald-300" style={{ left: '25%', top: '75%' }}>
      <FaChessKnight className="w-[55%] h-[55%]" />
    </span>
  </div>
);

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contacto" className="relative pt-24 pb-10 px-6 md:px-12 scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading index="06" title="Contacto" subtitle="¿Tienes un proyecto o una oportunidad? Escríbeme, respondo rápido." />
      </div>

      <KineticBand />

      <div className="container mx-auto max-w-6xl">

        <div className="grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-5">
          <Reveal className="h-full relative">
            <Planet />
            <div className="orbit-border orbit-border--live rounded-2xl h-full">
            <SpotlightCard tilt={3} className="contact-hero group relative overflow-hidden h-full rounded-2xl p-7 md:p-9 flex flex-col">
              <ChessCorner />

              <span className="inline-flex w-fit items-center gap-2 mb-6 px-3 py-1 rounded-full border border-emerald-500/25 bg-emerald-500/5 text-xs text-emerald-300">
                <span className="relative flex w-2 h-2">
                  <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400" />
                </span>
                Disponible para prácticas y puestos junior
              </span>

              <h3 className="font-display text-4xl md:text-6xl font-bold text-white leading-[0.95] tracking-tight mb-4">
                Tu turno<br /><span className="text-gradient-move">de mover.</span>
              </h3>
              <p className="text-gray-400 leading-relaxed max-w-md mb-6">
                Si buscas a alguien para backend, infraestructura o proyectos con IA, cuéntame qué tienes en mente.
              </p>

              <div className="relative z-10 flex flex-wrap items-center gap-3 mb-8">
                <a href={`mailto:${EMAIL}`} className="email-link font-display text-xl sm:text-2xl md:text-3xl font-bold text-white break-all">
                  {EMAIL}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copiar correo"
                  className="relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 transition-colors cursor-pointer min-w-[92px] justify-center"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                      <motion.span key="ok" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1.5 text-emerald-300">
                        <FaCheck size={10} /> Copiado
                      </motion.span>
                    ) : (
                      <motion.span key="copy" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -6, opacity: 0 }} className="flex items-center gap-1.5">
                        <FaCopy size={10} /> Copiar
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>

              <div className="relative z-10 flex flex-wrap gap-3 mt-auto">
                <Magnetic strength={0.3}>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="shine group/cta inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-sm rounded-xl transition-colors duration-200 shadow-lg shadow-emerald-500/25"
                  >
                    Enviar un mensaje
                    <FaArrowRight size={12} className="transition-transform duration-300 group-hover/cta:translate-x-1" />
                  </a>
                </Magnetic>
                <Magnetic strength={0.3}>
                  <a
                    href="/cv.pdf"
                    download
                    className="group/cv inline-flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-medium rounded-xl transition-colors duration-200"
                  >
                    <FaDownload size={12} className="transition-transform duration-300 group-hover/cv:translate-y-0.5" />
                    Descargar CV
                  </a>
                </Magnetic>
              </div>
            </SpotlightCard>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-fr">
            {channels.map(({ Icon, label, value, hint, href, color, external }, i) => (
              <Reveal key={label} delay={0.08 * (i + 1)} className="h-full">
                <a
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="channel-tile group relative flex flex-col h-full min-h-[168px] glass border border-white/5 rounded-2xl p-5 overflow-hidden"
                  style={{ ['--brand' as string]: color }}
                >
                  <span className="channel-glow absolute inset-0 pointer-events-none" />
                  <Icon className="channel-watermark absolute -right-5 -bottom-6 w-28 h-28 pointer-events-none" />

                  <span className="relative flex items-start justify-between mb-auto">
                    <span className="channel-icon w-11 h-11 rounded-xl flex items-center justify-center">
                      <Icon size={19} />
                    </span>
                    <span className="channel-arrow w-8 h-8 rounded-full flex items-center justify-center border border-white/10 text-gray-500">
                      <FaArrowRight size={11} />
                    </span>
                  </span>

                  <span className="relative mt-6">
                    <span className="block font-display text-lg font-bold text-white leading-tight">{label}</span>
                    <span className="block text-[12px] font-mono text-gray-400 truncate mt-0.5">{value}</span>
                    <span className="channel-hint block text-[11px] font-medium mt-2">{hint} →</span>
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.32} className="h-full">
              <LocationTile />
            </Reveal>
          </div>
        </div>
      </div>

      <footer className="mt-24 pt-6 border-t border-white/5 container mx-auto max-w-6xl flex items-center justify-center gap-3 text-gray-600 font-mono text-xs">
        <p>© 2026 César Enrique Díaz Maldonado</p>
        <span aria-hidden="true" className="footer-knight text-gray-600 hover:text-emerald-400">
          <FaChessKnight size={12} />
        </span>
      </footer>
    </section>
  );
};

export default Contact;
