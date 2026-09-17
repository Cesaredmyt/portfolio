import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import type { IconType } from 'react-icons';
import {
  FaGithub, FaExternalLinkAlt, FaWhatsapp, FaFlagCheckered, FaHeartbeat, FaClock, FaLayerGroup, FaCheckDouble,
  FaExclamationTriangle, FaFileAlt, FaSearch, FaCalendarCheck, FaSyringe, FaHome, FaUserPlus, FaUsers, FaTrophy, FaGavel,
  FaImage, FaProjectDiagram,
} from 'react-icons/fa';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import SpotlightCard from './ui/SpotlightCard';
import SmartImage from './ui/SmartImage';
import TechBadge, { type Tech } from './ui/TechBadge';

/* ── Piezas comunes ─────────────────────────────────────── */
function GithubLink({ href, featured }: { href: string; featured?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`shine group/gh relative z-10 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 w-fit ${
        featured
          ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20'
          : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
      }`}
    >
      <FaGithub size={14} className="transition-transform duration-300 group-hover/gh:rotate-[360deg]" />
      Ver en GitHub
      <FaExternalLinkAlt size={10} className="opacity-50 transition-transform duration-200 group-hover/gh:translate-x-0.5 group-hover/gh:-translate-y-0.5" />
    </a>
  );
}

type View = 'captura' | 'flujo';

// Selector "Capturas / Cómo funciona" con indicador deslizante.
const ViewToggle: React.FC<{ view: View; onChange: (v: View) => void; accent: string }> = ({ view, onChange, accent }) => {
  const id = useId();
  const options: { value: View; label: string; Icon: IconType }[] = [
    { value: 'captura', label: 'Capturas', Icon: FaImage },
    { value: 'flujo', label: 'Cómo funciona', Icon: FaProjectDiagram },
  ];
  return (
    <div role="tablist" className="dark-surface relative z-20 inline-flex p-1 rounded-full bg-gray-950/85 border border-white/10 shadow-lg">
      {options.map(({ value, label, Icon }) => {
        const on = view === value;
        return (
          <button
            key={value}
            role="tab"
            type="button"
            aria-selected={on}
            onClick={(e) => { e.stopPropagation(); onChange(value); }}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${on ? 'text-gray-950' : 'text-gray-400 hover:text-white'}`}
          >
            {on && (
              <motion.span
                layoutId={`view-${id}`}
                className="absolute inset-0 rounded-full"
                style={{ background: accent }}
                transition={{ type: 'spring', stiffness: 420, damping: 34 }}
              />
            )}
            <Icon size={10} className="relative" />
            <span className="relative">{label}</span>
          </button>
        );
      })}
    </div>
  );
};

/* ── Flujo animado genérico ─────────────────────────────── */
interface Step {
  Icon: IconType;
  label: string;
  detail: string;
  tag?: string;
}

// Avanza solo mientras está visible; se detiene al pasar el cursor y cada paso se puede elegir.
const FlowDemo: React.FC<{ steps: Step[]; accent: string; caption: string; interval?: number; compact?: boolean }> = ({ steps, accent, caption, interval = 1800, compact }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-40px' });
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!inView || paused || reduced) return;
    const id = setTimeout(() => setActive((a) => (a + 1) % steps.length), interval);
    return () => clearTimeout(id);
  }, [active, inView, paused, reduced, steps.length, interval]);

  const step = steps[active];
  const pct = steps.length > 1 ? (active / (steps.length - 1)) * 100 : 0;

  return (
    <div
      ref={ref}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      className={`dark-surface h-full flex flex-col font-mono ${compact ? 'p-3' : 'p-4 md:p-5'}`}
      style={{ ['--accent' as string]: accent }}
    >
      <div className={`relative flex items-start justify-between ${compact ? 'mb-2' : 'mb-4'}`}>
        <div className="absolute left-7 right-7 top-4 h-px bg-white/10" />
        <motion.div
          className="absolute left-7 top-4 h-px origin-left"
          style={{ background: accent, width: 'calc(100% - 3.5rem)' }}
          animate={{ scaleX: pct / 100 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
        {steps.map(({ Icon, label }, i) => {
          const done = i <= active;
          return (
            <button
              key={label}
              type="button"
              onClick={(e) => { e.stopPropagation(); setActive(i); }}
              className="relative z-10 flex flex-col items-center gap-1.5 w-14 cursor-pointer group/step"
              aria-label={label}
              aria-current={i === active}
            >
              <motion.span
                animate={{ scale: i === active ? 1.15 : 1 }}
                className="w-8 h-8 rounded-full flex items-center justify-center border transition-colors duration-300"
                style={{
                  background: done ? accent : '#0d1117',
                  borderColor: done ? accent : 'rgb(255 255 255 / 0.15)',
                  color: done ? '#0b0f19' : '#9CA3AF',
                  boxShadow: i === active ? `0 0 0 4px color-mix(in srgb, ${accent} 25%, transparent)` : undefined,
                }}
              >
                <Icon size={12} />
              </motion.span>
              <span className={`text-[9px] leading-tight text-center transition-colors ${i === active ? 'text-gray-100' : 'text-gray-500 group-hover/step:text-gray-300'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 rounded-lg border border-white/5 bg-black/30 p-3 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <p className="text-[10px] text-gray-500 mb-1">
              <span style={{ color: accent }}>●</span> paso {active + 1}/{steps.length}
              {step.tag && <span className="ml-2 px-1.5 py-px rounded border border-white/10 text-gray-400">{step.tag}</span>}
            </p>
            <p className="text-[12px] md:text-[13px] text-gray-100 font-medium mb-1 font-lato">{step.label}</p>
            {!compact && <p className="text-[11px] leading-relaxed text-gray-400">{step.detail}</p>}
            {compact && <p className="text-[10px] leading-snug text-gray-400 line-clamp-2">{step.detail}</p>}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className={`mt-2 text-[9px] text-gray-600 flex items-center justify-between ${compact ? 'hidden' : ''}`}>
        <span>{caption}</span>
        <span>{paused ? 'en pausa' : 'clic en un paso para explorar'}</span>
      </p>
    </div>
  );
};

/* ── Vitrina: captura o flujo dentro de una ventana ─────── */
interface ShowcaseProps {
  title: string;
  accent: string;
  url?: string;
  image?: string;
  demo?: React.ReactNode;
  children?: React.ReactNode;
}

function Showcase({ title, accent, url, image, demo, children }: ShowcaseProps) {
  const [view, setView] = useState<View>('captura');
  const showDemo = view === 'flujo' && demo;

  return (
    <div className="showcase relative aspect-[16/10] overflow-hidden" style={{ ['--accent' as string]: accent }}>
      <div className="showcase-bg absolute inset-0" />
      {demo && (
        <div className="absolute top-3 left-3">
          <ViewToggle view={view} onChange={setView} accent={accent} />
        </div>
      )}
      <div
        className={`showcase-window dark-surface absolute left-[9%] w-[100%] rounded-tl-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/50 ${
          demo ? 'top-[20%]' : 'top-[13%]'
        }`}
      >
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
          <span className="w-2 h-2 rounded-full bg-white/15 transition-colors duration-300 group-hover:bg-red-400/80" />
          <span className="w-2 h-2 rounded-full bg-white/15 transition-colors duration-300 delay-75 group-hover:bg-yellow-400/80" />
          <span className="w-2 h-2 rounded-full bg-white/15 transition-colors duration-300 delay-150 group-hover:bg-emerald-400/80" />
          {url && <span className="ml-3 text-[10px] font-mono text-gray-500 truncate">{showDemo ? `${url} · flujo` : url}</span>}
        </div>
        <div className="aspect-[16/10] relative">
          <AnimatePresence mode="wait" initial={false}>
            {showDemo ? (
              <motion.div key="demo" className="absolute inset-0 pr-[9%]" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                {demo}
              </motion.div>
            ) : (
              <motion.div key="shot" className="absolute inset-0" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                {image ? (
                  <SmartImage
                    src={image}
                    alt={`Captura del proyecto ${title}`}
                    width={1200}
                    height={750}
                    wrapperClassName="w-full h-full"
                    className="block w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="h-full pr-[9%]">{children}</div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ── Tarjeta de proyecto ────────────────────────────────── */
interface CardProps {
  title: string;
  year?: string;
  description: string;
  tech: Tech[];
  github?: string;
  featured?: boolean;
  headerNode?: React.ReactNode;
  image?: string;
  highlights?: string[];
  accent: string;
  url?: string;
  demo?: React.ReactNode;
}

function ProjectCard({ title, year, description, tech, github, featured, headerNode, image, highlights, accent, url, demo }: CardProps) {
  return (
    <SpotlightCard
      tilt={3}
      whileHover={{ y: -6 }}
      className={`group flex flex-col h-full glass rounded-2xl overflow-hidden border transition-[border-color,box-shadow] duration-500 hover:shadow-2xl ${
        featured ? 'border-emerald-500/15 hover:border-emerald-500/35 hover:shadow-emerald-500/5' : 'border-white/5 hover:border-white/15 hover:shadow-black/40'
      }`}
    >
      <div className="relative">
        <Showcase image={image} title={title} accent={accent} url={url} demo={demo}>
          {headerNode}
        </Showcase>
        {year && (
          <span
            className={`absolute top-3 right-3 z-10 text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
              featured ? 'bg-emerald-500 text-gray-950' : 'bg-gray-900/90 text-gray-300 border border-white/10'
            }`}
          >
            {year}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-6">
        <h3 className="font-display text-lg font-bold mb-2 text-white transition-colors duration-300 group-hover:text-emerald-300">{title}</h3>
        <p className="text-sm text-gray-400 mb-4 leading-relaxed flex-1">{description}</p>

        {highlights && highlights.length > 0 && (
          <ul className="mb-4 space-y-1">
            {highlights.map((h) => (
              <li key={h} className="text-xs text-gray-500 font-mono flex items-start gap-2 transition-transform duration-200 hover:translate-x-1">
                <span className="text-emerald-500 mt-0.5">›</span>
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-1.5 mb-5">
          {tech.map((t) => <TechBadge key={t.label} {...t} />)}
        </div>

        {github && <GithubLink href={github} featured={featured} />}
      </div>
    </SpotlightCard>
  );
}

/* ── Visualizaciones por proyecto ───────────────────────── */
const kuniSteps: Step[] = [
  { Icon: FaClock, label: 'Tarea programada', tag: 'cron', detail: 'Genera los recordatorios del día: medicamentos, mediciones y citas de cada paciente.' },
  { Icon: FaLayerGroup, label: 'Cola de envíos', tag: 'postgres', detail: 'Cada recordatorio entra a una cola; se reintenta si el proveedor falla y expira si ya no aplica.' },
  { Icon: FaWhatsapp, label: 'WhatsApp o SMS', tag: 'twilio', detail: 'Se envía por WhatsApp con Twilio o por SMS como alternativa.' },
  { Icon: FaCheckDouble, label: 'Webhook firmado', tag: 'webhook', detail: 'El proveedor confirma entrega y respuesta; la firma se valida antes de guardar nada.' },
  { Icon: FaExclamationTriangle, label: 'Adherencia y alertas', tag: 'reglas', detail: 'Las respuestas alimentan la adherencia y las reglas clínicas explicables que priorizan pacientes.' },
];

const impaSteps: Step[] = [
  { Icon: FaFileAlt, label: 'Solicitud', tag: 'adoptante', detail: 'La persona interesada envía su solicitud de adopción desde la plataforma.' },
  { Icon: FaSearch, label: 'Revisión', tag: 'personal', detail: 'El personal revisa la solicitud; cada rol solo ve y modifica lo que le corresponde (RBAC).' },
  { Icon: FaCalendarCheck, label: 'Cita', tag: 'agenda', detail: 'Se agenda una cita para conocer a la mascota.' },
  { Icon: FaSyringe, label: 'Esterilización', tag: 'registro', detail: 'Se registra la esterilización como parte del proceso.' },
  { Icon: FaHome, label: 'Adopción', tag: 'cierre', detail: 'La adopción queda registrada y la mascota sale del catálogo.' },
];

const projexusSteps: Step[] = [
  { Icon: FaUserPlus, label: 'Inscripción', tag: 'participantes', detail: 'Escuelas y participantes se registran en el concurso.' },
  { Icon: FaUsers, label: 'Etapa local', tag: 'etapa 1', detail: 'La primera etapa filtra a quienes avanzan.' },
  { Icon: FaGavel, label: 'Evaluación', tag: 'jurado', detail: 'Los jurados califican según los criterios del concurso.' },
  { Icon: FaTrophy, label: 'Regional', tag: 'etapa final', detail: 'Los mejores avanzan a la etapa regional y se publican resultados.' },
];

// Métricas reales del modelo por conjunto de datos.
const fraudData = {
  PaySim: [
    { label: 'F1', value: 0.998 },
    { label: 'AUC-ROC', value: 1.0 },
  ],
  'Credit Card': [
    { label: 'F1', value: 0.875 },
    { label: 'AUC-ROC', value: 0.968 },
  ],
};

const FraudDemo: React.FC = () => {
  const [dataset, setDataset] = useState<keyof typeof fraudData>('PaySim');
  return (
    <div className="dark-surface h-full flex flex-col p-4 md:p-5 font-mono">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] text-gray-500">resultados en test</span>
        <div className="flex gap-1">
          {(Object.keys(fraudData) as (keyof typeof fraudData)[]).map((d) => (
            <button
              key={d}
              type="button"
              onClick={(e) => { e.stopPropagation(); setDataset(d); }}
              className={`px-2 py-1 rounded-md text-[10px] border transition-colors cursor-pointer ${
                dataset === d ? 'bg-sky-400/15 border-sky-400/50 text-sky-200' : 'border-white/10 text-gray-500 hover:text-gray-300'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-4">
        {fraudData[dataset].map((m, i) => (
          <div key={m.label}>
            <div className="flex justify-between text-[11px] mb-1.5">
              <span className="text-gray-400">{m.label}</span>
              <motion.span key={`${dataset}-${m.label}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-gray-100 font-bold">
                {m.value.toFixed(3)}
              </motion.span>
            </div>
            <div className="h-2.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full origin-left bg-gradient-to-r from-sky-500 to-violet-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: m.value }}
                transition={{ type: 'spring', stiffness: 90, damping: 18, delay: i * 0.08 }}
              />
            </div>
          </div>
        ))}
        <p className="text-[10px] text-gray-500 leading-relaxed">
          Modelo híbrido: XGBoost y Random Forest supervisados + Isolation Forest para anomalías. Supera al sistema de reglas en F1, AUC-ROC y AUC-PR.
        </p>
      </div>
    </div>
  );
};

/* ── Kuni: tarjeta destacada ────────────────────────────── */
const KuniVisual: React.FC = () => {
  const [view, setView] = useState<View>('captura');
  const accent = '#34D399';

  return (
    <div className="relative h-full min-h-[320px] md:min-h-[440px] overflow-hidden bg-gradient-to-br from-sky-950/70 via-gray-950 to-emerald-950/40 [perspective:1200px]">
      <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full" style={{ background: 'radial-gradient(closest-side, rgb(56 189 248 / 0.25), transparent)' }} />
      <div className="absolute top-4 left-4 z-20">
        <ViewToggle view={view} onChange={setView} accent={accent} />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {view === 'captura' ? (
          <motion.div key="shots" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="dark-surface absolute left-6 right-[-18%] top-16 md:top-20 rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 transition-transform duration-700 ease-out [transform:rotateY(-14deg)_rotateX(6deg)] group-hover:[transform:rotateY(-4deg)_rotateX(2deg)_translateX(-4%)]">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0d1117] border-b border-white/5">
                <span className="w-2 h-2 rounded-full bg-red-400/70" />
                <span className="w-2 h-2 rounded-full bg-yellow-400/70" />
                <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
                <span className="ml-3 text-[10px] font-mono text-gray-500">kuni · tablero clínico</span>
              </div>
              <SmartImage
                src="/img/kuni-dashboard.webp"
                alt="Tablero clínico de Kuni con pacientes priorizados, alertas y adherencia"
                width={1400}
                height={723}
                wrapperClassName="aspect-[1400/723]"
                className="w-full block"
              />
            </div>
            <div className="absolute left-4 bottom-5 w-[46%] rounded-lg overflow-hidden border border-white/15 shadow-2xl shadow-black/60 transition-transform duration-700 ease-out -rotate-3 group-hover:rotate-0 group-hover:-translate-y-2 group-hover:scale-105">
              <SmartImage src="/img/kuni-inicio.webp" alt="Pantalla de bienvenida de Kuni" width={1400} height={723} wrapperClassName="aspect-[1400/723]" className="w-full block" />
            </div>
            <div className="dark-surface absolute right-4 bottom-8 flex items-center gap-2 bg-gray-900/95 border border-white/10 rounded-xl rounded-br-sm px-3 py-2 shadow-xl transition-transform duration-500 group-hover:-translate-y-2">
              <FaWhatsapp className="text-emerald-400" size={14} />
              <span className="text-[11px] text-gray-300">¿Ya tomaste tu medicamento?</span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="flow"
            className="dark-surface absolute left-4 right-4 top-16 bottom-4 rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
          >
            <FlowDemo steps={kuniSteps} accent={accent} caption="recorrido de un recordatorio" interval={2200} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Kuni: React.FC = () => (
  <Reveal className="mb-6">
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }} className="group orbit-border rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10">
      <SpotlightCard className="grid grid-cols-1 md:grid-cols-2">
        <KuniVisual />
        <div className="p-7 md:p-8 flex flex-col">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/25">
              <FaFlagCheckered size={10} /> Innovation Fest 2026
            </span>
            <span className="text-xs font-mono text-gray-500">Hackatón · trabajo en equipo</span>
          </div>

          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-1 flex items-center gap-3">
            Kuni
            <FaHeartbeat className="text-emerald-400 group-hover:animate-pulse" size={22} />
          </h3>
          <p className="text-sm text-emerald-300 font-mono mb-4">Monitoreo remoto para enfermedades crónicas</p>

          <p className="text-sm text-gray-400 leading-relaxed mb-5">
            Plataforma de salud digital para seguimiento de pacientes con diabetes e hipertensión en
            unidades de IMSS-Bienestar. Recordatorios por WhatsApp/SMS, alertas clínicas explicables,
            adherencia al tratamiento y un tablero para que el personal médico priorice pacientes.
          </p>

          <p className="text-xs uppercase tracking-[0.2em] font-mono text-gray-500 mb-2">Mi rol · Backend e integraciones</p>
          <ul className="mb-6 space-y-1.5">
            {[
              'Persistencia clínica en PostgreSQL con RLS por unidad médica',
              'WhatsApp/Twilio y SMS con webhooks firmados y estados de entrega',
              'Cola de recordatorios y tareas programadas',
              'Autenticación SSR y control de acceso por roles',
            ].map((h) => (
              <li key={h} className="text-xs text-gray-400 font-mono flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">›</span>{h}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {([
              { label: 'Next.js 16', variant: 'gray' },
              { label: 'React 19', variant: 'cyan' },
              { label: 'TypeScript', variant: 'blue' },
              { label: 'Supabase', variant: 'emerald' },
              { label: 'RLS', variant: 'emerald' },
              { label: 'Twilio', variant: 'red' },
              { label: 'Zod', variant: 'purple' },
              { label: 'Vitest', variant: 'yellow' },
              { label: 'PWA', variant: 'pink' },
            ] as Tech[]).map((t) => <TechBadge key={t.label} {...t} />)}
          </div>

          <div className="mt-auto">
            <GithubLink href="https://github.com/Cesaredmyt/Kuni" featured />
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  </Reveal>
);

/* ── Proyectos anteriores ───────────────────────────────── */
const earlier: CardProps[] = [
  {
    year: '2025',
    title: 'ProjeXus',
    description: 'Plataforma para administrar concursos académicos y culturales por etapas a nivel regional. Diseño de BD y backend REST con Spring Boot.',
    tech: [
      { label: 'Next.js', variant: 'gray' },
      { label: 'Spring Boot', variant: 'emerald' },
      { label: 'PostgreSQL', variant: 'blue' },
    ],
    github: 'https://github.com/TonyMed12/ProjeXus',
    image: '/img/Projexus.webp',
    accent: '#A78BFA',
    url: 'projexus / concursos',
    demo: <FlowDemo steps={projexusSteps} accent="#A78BFA" caption="etapas de un concurso" compact />,
  },
  {
    title: 'Aquamarine Resort',
    description: 'Sitio web para un concepto de hotelería con sistema de reservas.',
    tech: [
      { label: 'HTML', variant: 'orange' },
      { label: 'CSS', variant: 'blue' },
      { label: 'PHP', variant: 'purple' },
    ],
    github: 'https://github.com/Cesaredmyt/Aquamarine-Resort',
    image: '/img/hotel.webp',
    accent: '#22D3EE',
    url: 'aquamarine / reservas',
  },
  {
    title: 'Biblioteca Digital',
    description: 'Sistema de gestión de bibliotecas para inventario y administración de préstamos.',
    tech: [
      { label: 'Java', variant: 'red' },
      { label: 'PHP', variant: 'purple' },
      { label: 'MySQL', variant: 'blue' },
    ],
    image: '/img/biblioteca.webp',
    accent: '#FBBF24',
    url: 'biblioteca / préstamos',
  },
];

const Projects: React.FC = () => (
  <section id="proyectos" className="py-24 px-6 md:px-12 scroll-mt-16">
    <div className="container mx-auto max-w-6xl">
      <SectionHeading
        index="02"
        title="Proyectos"
        subtitle="Plataformas construidas en equipo, desde la base de datos hasta la integración con servicios externos. Cambia a «Cómo funciona» para explorar cada una."
      />

      <p className="text-xs font-mono text-gray-500 tracking-[0.2em] uppercase mb-4">Destacados · 2026</p>

      <Kuni />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <Reveal className="h-full">
          <ProjectCard
            featured
            year="2026"
            title="IMPA — Plataforma de Adopciones"
            description="Plataforma full-stack para gestión municipal de bienestar animal: adopciones, citas, esterilizaciones y reportes de maltrato. Lideré la arquitectura backend."
            tech={[
              { label: 'Next.js', variant: 'gray' },
              { label: 'TypeScript', variant: 'blue' },
              { label: 'Supabase', variant: 'emerald' },
              { label: 'PostgreSQL', variant: 'blue' },
              { label: 'Docker', variant: 'cyan' },
              { label: 'Vitest', variant: 'yellow' },
            ]}
            highlights={[
              'Autenticación JWT + RBAC',
              'Esquema BD: adopción, citas, esterilizaciones, reportes',
              'Equipo de 4 — líder técnico backend',
            ]}
            github="https://github.com/Cesaredmyt/Adopciones-IMPA"
            image="/img/IMPA.webp"
            accent="#34D399"
            url="impa / adopciones"
            demo={<FlowDemo steps={impaSteps} accent="#34D399" caption="proceso de adopción" />}
          />
        </Reveal>

        <Reveal delay={0.12} className="h-full">
          <ProjectCard
            featured
            year="2026"
            title="Detección de Fraude y Phishing"
            description="Sistema híbrido de ML (supervisado + no supervisado) para detectar fraude en transacciones financieras, bajo metodología CRISP-DM con más de 6M de transacciones."
            tech={[
              { label: 'Python', variant: 'yellow' },
              { label: 'XGBoost', variant: 'orange' },
              { label: 'Random Forest', variant: 'orange' },
              { label: 'Isolation Forest', variant: 'orange' },
              { label: 'Pytest', variant: 'purple' },
            ]}
            highlights={[
              'PaySim → F1 0.998 · AUC-ROC 1.000',
              'Credit Card → F1 0.875 · AUC-ROC 0.968',
              'Supera al sistema basado en reglas en todas las métricas',
            ]}
            github="https://github.com/Cesaredmyt/fraud-detection-itm"
            accent="#60A5FA"
            url="fraud-detection / resultados"
            headerNode={<FraudDemo />}
          />
        </Reveal>
      </div>

      <p className="text-xs font-mono text-gray-500 tracking-[0.2em] uppercase mb-4">Proyectos anteriores</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {earlier.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.1} className="h-full">
            <ProjectCard {...p} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
