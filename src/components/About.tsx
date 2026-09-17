import React from 'react';
import { motion } from 'motion/react';
import { FaServer, FaShieldAlt, FaRobot } from 'react-icons/fa';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import SpotlightCard from './ui/SpotlightCard';

/* ── about-me.ts ────────────────────────────────────────── */
type Token = { t: 'keyword' | 'var' | 'key' | 'str' | 'bool' | 'op'; v: string };

const str = (v: string): Token => ({ t: 'str', v: `"${v}"` });
const op = (v: string): Token => ({ t: 'op', v });
const key = (v: string): Token => ({ t: 'key', v });
const list = (values: string[]): Token[] => values.flatMap((v, i) => (i === 0 ? [str(v)] : [op(', '), str(v)]));

const lines: { indent: number; tokens: Token[] }[] = [
  { indent: 0, tokens: [{ t: 'keyword', v: 'const ' }, { t: 'var', v: 'cesar' }, op(' = {')] },
  { indent: 1, tokens: [key('base'), op(': '), str('Morelia, MX'), op(',')] },
  { indent: 1, tokens: [key('stack'), op(': ['), ...list(['TypeScript', 'Python', 'PostgreSQL']), op('],')] },
  { indent: 1, tokens: [key('infra'), op(': ['), ...list(['Docker', 'Caddy', 'Authelia']), op('],')] },
  { indent: 1, tokens: [key('estudiando'), op(': '), str('Google Cloud'), op(',')] },
  { indent: 1, tokens: [key('fuera_del_teclado'), op(': ['), ...list(['el cosmos', 'ajedrez', 'autos']), op('],')] },
  { indent: 1, tokens: [key('disponible'), op(': '), { t: 'bool', v: 'true' }] },
  { indent: 0, tokens: [op('};')] },
];

const colorMap: Record<Token['t'], string> = {
  keyword: 'text-purple-400',
  var: 'text-sky-300',
  key: 'text-rose-300',
  str: 'text-emerald-300',
  bool: 'text-amber-300',
  op: 'text-gray-400',
};

const CodeWindow: React.FC = () => (
  <motion.div
    whileHover={{ y: -4 }}
    className="dark-surface group bg-[#0d1117] border border-white/8 hover:border-emerald-500/25 rounded-2xl overflow-hidden shadow-2xl shadow-black/40 transition-[border-color] duration-500"
  >
    <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
      <span className="w-3 h-3 rounded-full bg-red-500/60 transition-colors group-hover:bg-red-500" />
      <span className="w-3 h-3 rounded-full bg-yellow-500/60 transition-colors group-hover:bg-yellow-500" />
      <span className="w-3 h-3 rounded-full bg-emerald-500/60 transition-colors group-hover:bg-emerald-500" />
      <span className="ml-3 text-xs text-gray-500 font-mono">about-me.ts</span>
    </div>
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } } }}
      className="px-5 py-4 font-mono text-[12.5px] leading-7 overflow-x-auto"
    >
      {lines.map((line, i) => (
        <motion.div
          key={i}
          variants={{ hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
          className="flex whitespace-pre rounded transition-colors duration-150 hover:bg-white/[0.04]"
        >
          <span className="select-none w-6 text-gray-700 text-right mr-4">{i + 1}</span>
          <span style={{ paddingLeft: `${line.indent * 1.25}rem` }}>
            {line.tokens.map((tok, j) => (
              <span key={j} className={colorMap[tok.t]}>{tok.v}</span>
            ))}
          </span>
        </motion.div>
      ))}
    </motion.div>
  </motion.div>
);

/* ── Pilares ────────────────────────────────────────────── */
const pillars = [
  { Icon: FaServer, title: 'Backend y datos', text: 'APIs, esquemas PostgreSQL y seguridad a nivel de fila.', tone: 'text-emerald-300 bg-emerald-500/10 border-emerald-500/25' },
  { Icon: FaShieldAlt, title: 'Infraestructura', text: 'Servidores propios con SSO, backups probados y monitoreo.', tone: 'text-sky-300 bg-sky-500/10 border-sky-500/25' },
  { Icon: FaRobot, title: 'IA con límites', text: 'Agentes con permisos segmentados y confirmación humana.', tone: 'text-indigo-300 bg-indigo-500/10 border-indigo-500/25' },
];

/* ── Trayectoria ────────────────────────────────────────── */
const timeline = [
  { year: '2022', title: 'Ingreso al Tecnológico de Morelia', detail: 'Ing. en Sistemas Computacionales' },
  { year: '2025', title: 'ProjeXus', detail: 'Backend REST con Spring Boot' },
  { year: '2026', title: 'IMPA · Detección de fraude · Kuni', detail: 'Líder backend, ML e Innovation Fest' },
  { year: '2026', title: 'Google AI Professional Certificate', detail: 'Coursera · 7 cursos' },
  { year: 'Hoy', title: 'Home Lab y Google Cloud', detail: 'Infraestructura propia · certificado en curso', now: true },
  { year: '2027', title: 'Egreso', detail: 'Ingeniería en Sistemas', future: true },
];

const About: React.FC = () => (
  <section id="sobre-mi" className="py-24 px-6 md:px-12 scroll-mt-16">
    <div className="container mx-auto max-w-6xl">
      <SectionHeading title="Sobre mí" index="01" />

      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-start">
        <div>
          <Reveal>
            <p className="font-display text-2xl md:text-[1.7rem] leading-snug text-white mb-6">
              Construyo el lado del software que no se ve:{' '}
              <span className="text-emerald-300">los datos, los permisos y los servidores</span> que mantienen todo en pie.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-gray-400 leading-relaxed mb-4">
              Estudio Ingeniería en Sistemas Computacionales en el Tecnológico de Morelia, con especialidad en
              desarrollo de software y promedio de 94. He liderado el backend de plataformas en equipo y
              desarrollé integraciones de mensajería para una plataforma de salud en un hackatón.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="text-gray-400 leading-relaxed mb-8">
              Fuera de clases administro mi propio servidor: reverse proxy, SSO con doble factor, backups que
              se prueban y agentes de IA que solo actúan con mi confirmación.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {pillars.map(({ Icon, title, text, tone }, i) => (
              <Reveal key={title} delay={0.1 + i * 0.08} className="h-full">
                <SpotlightCard tilt={8} className="group h-full glass border border-white/5 hover:border-white/15 rounded-xl p-4 transition-colors duration-300">
                  <span className={`w-9 h-9 rounded-lg border flex items-center justify-center mb-3 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110 ${tone}`}>
                    <Icon size={14} />
                  </span>
                  <p className="font-display font-semibold text-white text-sm mb-1">{title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{text}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <Reveal delay={0.1}>
            <CodeWindow />
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-gray-500 mb-4">Trayectoria</p>
            <motion.ol
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              className="relative pl-7"
            >
              <span className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-emerald-500/60 via-white/10 to-transparent" />
              {timeline.map((t, i) => (
                <motion.li
                  key={t.title}
                  variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
                  className="group relative pb-5 last:pb-0"
                >
                  {/* Marcador cuadrado alternado, como casillas de tablero */}
                  <span
                    className={`absolute -left-7 top-1.5 w-[15px] h-[15px] rounded-[3px] border transition-transform duration-300 group-hover:rotate-45 ${
                      t.now
                        ? 'bg-emerald-400 border-emerald-300 shadow-[0_0_12px_rgb(52_211_153/0.6)]'
                        : t.future
                          ? 'bg-transparent border-dashed border-white/25'
                          : i % 2
                            ? 'bg-white/15 border-white/20'
                            : 'bg-gray-950 border-white/25'
                    }`}
                  />
                  <div className="flex items-baseline gap-3">
                    <span className={`font-mono text-xs w-9 flex-shrink-0 ${t.now ? 'text-emerald-400' : 'text-gray-500'}`}>{t.year}</span>
                    <div className="transition-transform duration-300 group-hover:translate-x-1">
                      <p className={`text-sm font-medium ${t.future ? 'text-gray-400' : 'text-gray-100'}`}>{t.title}</p>
                      <p className="text-xs text-gray-500">{t.detail}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default About;
