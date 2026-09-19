import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import type { IconType } from 'react-icons';
import {
  FaGithub, FaExternalLinkAlt, FaWhatsapp, FaFlagCheckered, FaHeartbeat, FaClock, FaLayerGroup, FaCheckDouble,
  FaExclamationTriangle, FaFileAlt, FaSearch, FaCalendarCheck, FaSyringe, FaHome, FaUserPlus, FaUsers, FaTrophy, FaGavel,
  FaImage, FaProjectDiagram, FaDatabase, FaShieldAlt, FaServer, FaChartLine, FaCodeBranch, FaArrowRight, FaCode,
} from 'react-icons/fa';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import SpotlightCard from './ui/SpotlightCard';
import SmartImage from './ui/SmartImage';
import TechBadge, { type Tech } from './ui/TechBadge';
import { useLanguage } from '../context/LanguageContext';

/* ── Piezas comunes ─────────────────────────────────────── */
function GithubLink({ href, featured }: { href: string; featured?: boolean }) {
  const { tr } = useLanguage();
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
      {tr('Ver repositorio', 'View repository')}
      <FaExternalLinkAlt size={10} className="opacity-50 transition-transform duration-200 group-hover/gh:translate-x-0.5 group-hover/gh:-translate-y-0.5" />
    </a>
  );
}

type View = 'resultado' | 'arquitectura' | 'flujo';

// Selector de vistas con indicador deslizante.
const ViewToggle: React.FC<{ view: View; views: View[]; onChange: (v: View) => void; accent: string }> = ({ view, views, onChange, accent }) => {
  const { tr } = useLanguage();
  const id = useId();
  const options: { value: View; label: string; Icon: IconType }[] = [
    { value: 'resultado', label: tr('Resultado', 'Result'), Icon: FaImage },
    { value: 'arquitectura', label: tr('Arquitectura', 'Architecture'), Icon: FaCodeBranch },
    { value: 'flujo', label: tr('Flujo', 'Flow'), Icon: FaProjectDiagram },
  ];
  return (
    <div role="group" aria-label={tr('Vista del proyecto', 'Project view')} className="dark-surface relative z-20 inline-flex max-w-[calc(100vw-4rem)] p-1 rounded-full bg-gray-950/90 border border-white/10 shadow-lg">
      {options.filter(({ value }) => views.includes(value)).map(({ value, label, Icon }) => {
        const on = view === value;
        return (
          <button
            key={value}
            type="button"
            aria-pressed={on}
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
  labelEn?: string;
  detail: string;
  detailEn?: string;
  tag?: string;
}

// Avanza solo mientras está visible; se detiene al pasar el cursor y cada paso se puede elegir.
const FlowDemo: React.FC<{ steps: Step[]; accent: string; caption: string; captionEn?: string; interval?: number; compact?: boolean }> = ({ steps, accent, caption, captionEn, interval = 1800, compact }) => {
  const { language, tr } = useLanguage();
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
        {steps.map(({ Icon, label, labelEn }, i) => {
          const done = i <= active;
          const localizedLabel = language === 'es' ? label : labelEn ?? label;
          return (
            <button
              key={label}
              type="button"
              onClick={(e) => { e.stopPropagation(); setActive(i); }}
              className="relative z-10 flex flex-col items-center gap-1.5 w-14 cursor-pointer group/step"
              aria-label={localizedLabel}
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
                {localizedLabel}
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
              <span style={{ color: accent }}>●</span> {tr('paso', 'step')} {active + 1}/{steps.length}
              {step.tag && <span className="ml-2 px-1.5 py-px rounded border border-white/10 text-gray-400">{step.tag}</span>}
            </p>
            <p className="text-xs md:text-[13px] text-gray-100 font-medium mb-1 font-lato">{language === 'es' ? step.label : step.labelEn ?? step.label}</p>
            {!compact && <p className="text-xs leading-relaxed text-gray-400">{language === 'es' ? step.detail : step.detailEn ?? step.detail}</p>}
            {compact && <p className="text-[11px] leading-snug text-gray-400 line-clamp-2">{language === 'es' ? step.detail : step.detailEn ?? step.detail}</p>}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className={`mt-2 text-[9px] text-gray-600 flex items-center justify-between ${compact ? 'hidden' : ''}`}>
        <span>{language === 'es' ? caption : captionEn ?? caption}</span>
        <span>{paused ? tr('en pausa', 'paused') : tr('clic en un paso para explorar', 'click a step to explore')}</span>
      </p>
    </div>
  );
};

interface ArchitectureNode {
  Icon: IconType;
  label: string;
  labelEn?: string;
  detail: string;
  detailEn?: string;
}

const ArchitectureDiagram: React.FC<{
  nodes: ArchitectureNode[];
  accent: string;
  caption: string;
  captionEn: string;
}> = ({ nodes, accent, caption, captionEn }) => {
  const { language, tr } = useLanguage();
  const reduced = useReducedMotion();

  return (
    <div className="dark-surface h-full p-3.5 md:p-4 font-mono flex flex-col" style={{ ['--accent' as string]: accent }}>
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-[11px] uppercase tracking-[0.16em]" style={{ color: accent }}>
          {tr('Arquitectura backend', 'Backend architecture')}
        </span>
        <span className="hidden sm:inline text-[10px] text-gray-500">request → response</span>
      </div>
      <div className="relative grid grid-cols-2 gap-2 flex-1 content-center">
        <motion.div
          aria-hidden="true"
          className="absolute left-[25%] right-[25%] top-1/2 h-px origin-left"
          style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
          initial={reduced ? false : { scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        />
        {nodes.map(({ Icon, label, labelEn, detail, detailEn }, index) => (
          <motion.div
            key={label}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="relative z-10 min-w-0 rounded-lg border border-white/10 bg-gray-950/90 p-2.5 transition-colors hover:border-white/20"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="w-7 h-7 shrink-0 rounded-md flex items-center justify-center" style={{ color: accent, background: `color-mix(in srgb, ${accent} 12%, transparent)` }}>
                <Icon size={12} />
              </span>
              <span className="text-[10px] md:text-[11px] font-bold leading-tight text-gray-100 line-clamp-2">{language === 'es' ? label : labelEn ?? label}</span>
            </div>
            <p className="text-[10px] leading-snug text-gray-500 line-clamp-2">{language === 'es' ? detail : detailEn ?? detail}</p>
          </motion.div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-400">
        <FaArrowRight size={9} style={{ color: accent }} />
        <span>{language === 'es' ? caption : captionEn}</span>
      </div>
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
  architecture?: React.ReactNode;
  children?: React.ReactNode;
}

function Showcase({ title, accent, url, image, demo, architecture, children }: ShowcaseProps) {
  const { tr } = useLanguage();
  const [view, setView] = useState<View>('resultado');
  const views: View[] = ['resultado', ...(architecture ? ['arquitectura' as const] : []), ...(demo ? ['flujo' as const] : [])];
  const showDemo = view === 'flujo' && demo;
  const showArchitecture = view === 'arquitectura' && architecture;

  return (
    <div className="showcase relative aspect-[16/10] overflow-hidden" style={{ ['--accent' as string]: accent }}>
      <div className="showcase-bg absolute inset-0" />
      {(architecture || demo) && (
        <div className="absolute top-3 left-3">
          <ViewToggle view={view} views={views} onChange={setView} accent={accent} />
        </div>
      )}
      <div
        className={`showcase-window dark-surface absolute left-[9%] w-[100%] rounded-tl-xl overflow-hidden border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/50 ${
          architecture || demo ? 'top-[20%]' : 'top-[13%]'
        }`}
      >
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
          <span className="w-2 h-2 rounded-full bg-white/15 transition-colors duration-300 group-hover:bg-red-400/80" />
          <span className="w-2 h-2 rounded-full bg-white/15 transition-colors duration-300 delay-75 group-hover:bg-yellow-400/80" />
          <span className="w-2 h-2 rounded-full bg-white/15 transition-colors duration-300 delay-150 group-hover:bg-emerald-400/80" />
          {url && <span className="ml-3 text-[10px] font-mono text-gray-500 truncate">{showDemo ? `${url} · ${tr('flujo', 'flow')}` : showArchitecture ? `${url} · architecture` : url}</span>}
        </div>
        <div className="aspect-[16/10] relative">
          <AnimatePresence mode="wait" initial={false}>
            {showDemo ? (
              <motion.div key="demo" className="absolute inset-0 pr-[9%]" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                {demo}
              </motion.div>
            ) : showArchitecture ? (
              <motion.div key="architecture" className="absolute inset-0 pr-[9%]" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                {architecture}
              </motion.div>
            ) : (
              <motion.div key="shot" className="absolute inset-0" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                {image ? (
                  <SmartImage
                    src={image}
                    alt={`${tr('Captura del proyecto', 'Screenshot of project')} ${title}`}
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
  titleEn?: string;
  year?: string;
  role?: string;
  roleEn?: string;
  description: string;
  descriptionEn?: string;
  metrics?: { value: string; label: string; labelEn?: string }[];
  tech: Tech[];
  github?: string;
  featured?: boolean;
  headerNode?: React.ReactNode;
  image?: string;
  highlights?: string[];
  highlightsEn?: string[];
  caseStudy?: { problem: string; contribution: string; result: string };
  caseStudyEn?: { problem: string; contribution: string; result: string };
  accent: string;
  url?: string;
  demo?: React.ReactNode;
  architecture?: React.ReactNode;
}

function ProjectCard({ title, titleEn, year, role, roleEn, description, descriptionEn, metrics, tech, github, featured, headerNode, image, highlights, highlightsEn, caseStudy, caseStudyEn, accent, url, demo, architecture }: CardProps) {
  const { language, tr } = useLanguage();
  const [showCase, setShowCase] = useState(false);
  const localizedTitle = language === 'es' ? title : titleEn ?? title;
  const localizedRole = language === 'es' ? role : roleEn ?? role;
  const localizedDescription = language === 'es' ? description : descriptionEn ?? description;
  const localizedHighlights = language === 'es' ? highlights : highlightsEn ?? highlights;
  const localizedCase = language === 'es' ? caseStudy : caseStudyEn ?? caseStudy;

  return (
    <SpotlightCard
      tilt={3}
      whileHover={{ y: -6 }}
      className={`group flex flex-col h-full glass rounded-2xl overflow-hidden border transition-[border-color,box-shadow] duration-500 hover:shadow-2xl ${
        featured ? 'border-emerald-500/15 hover:border-emerald-500/35 hover:shadow-emerald-500/5' : 'border-white/5 hover:border-white/15 hover:shadow-black/40'
      }`}
    >
      <div className="relative">
        <Showcase image={image} title={localizedTitle} accent={accent} url={url} demo={demo} architecture={architecture}>
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
        {localizedRole && (
          <span className="inline-flex items-center gap-1.5 self-start mb-3 rounded-full border border-emerald-500/25 bg-emerald-500/5 px-2.5 py-1 text-[11px] font-mono font-bold text-emerald-300">
            <FaCode size={10} /> {localizedRole}
          </span>
        )}
        <h3 className="font-display text-lg font-bold mb-2 text-white transition-colors duration-300 group-hover:text-emerald-300">{localizedTitle}</h3>
        <p className="text-sm text-gray-400 mb-4 leading-relaxed">{localizedDescription}</p>

        {metrics && metrics.length > 0 && (
          <div className={`grid gap-2 mb-5 ${metrics.length >= 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
            {metrics.map(({ value, label, labelEn }) => (
              <div key={`${value}-${label}`} className="rounded-xl border border-white/5 bg-white/[0.025] px-2 py-2.5 text-center transition-colors group-hover:border-white/10">
                <p className="font-display text-base font-bold text-white">{value}</p>
                <p className="mt-0.5 text-[10px] leading-tight text-gray-500">{language === 'es' ? label : labelEn ?? label}</p>
              </div>
            ))}
          </div>
        )}

        {localizedHighlights && localizedHighlights.length > 0 && (
          <ul className="mb-4 space-y-1">
            {localizedHighlights.map((h) => (
              <li key={h} className="text-xs text-gray-500 font-mono flex items-start gap-2 transition-transform duration-200 hover:translate-x-1">
                <span className="text-emerald-500 mt-0.5">›</span>
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-1.5 mb-5">
          {tech.slice(0, 5).map((t) => <TechBadge key={t.label} {...t} />)}
          {tech.length > 5 && (
            <span title={tech.slice(5).map(({ label }) => label).join(', ')} className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-mono text-gray-400">
              +{tech.length - 5}
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-wrap items-center gap-2">
          {localizedCase && (
            <button
              type="button"
              onClick={() => setShowCase((value) => !value)}
              aria-expanded={showCase}
              className="shine inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-gray-950 transition-colors hover:bg-emerald-400 cursor-pointer"
            >
              <FaProjectDiagram size={12} />
              {showCase ? tr('Ocultar caso', 'Hide case study') : tr('Ver caso de estudio', 'View case study')}
            </button>
          )}
          {github && <GithubLink href={github} featured={featured} />}
        </div>

        <AnimatePresence initial={false}>
          {showCase && localizedCase && (
            <motion.dl
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className="overflow-hidden rounded-xl border border-white/10 bg-black/20"
            >
              <div className="space-y-3 p-4">
                {([
                  [tr('Problema', 'Problem'), localizedCase.problem],
                  [tr('Contribución', 'Contribution'), localizedCase.contribution],
                  [tr('Resultado', 'Result'), localizedCase.result],
                ] as const).map(([label, value]) => (
                  <div key={label} className="text-xs leading-relaxed">
                    <dt className="font-mono text-emerald-400 mb-0.5">{label}</dt>
                    <dd className="text-gray-400">{value}</dd>
                  </div>
                ))}
              </div>
            </motion.dl>
          )}
        </AnimatePresence>
      </div>
    </SpotlightCard>
  );
}

/* ── Visualizaciones por proyecto ───────────────────────── */
const kuniSteps: Step[] = [
  { Icon: FaClock, label: 'Tarea programada', labelEn: 'Scheduled job', tag: 'cron', detail: 'Genera los recordatorios del día: medicamentos, mediciones y citas de cada paciente.', detailEn: 'Creates the day’s medication, measurement and appointment reminders for each patient.' },
  { Icon: FaLayerGroup, label: 'Cola de envíos', labelEn: 'Outbox queue', tag: 'postgres', detail: 'Cada recordatorio entra a una cola; se reintenta si el proveedor falla y expira si ya no aplica.', detailEn: 'Each reminder enters an outbox; failed deliveries are retried and stale messages expire.' },
  { Icon: FaWhatsapp, label: 'WhatsApp o SMS', labelEn: 'WhatsApp or SMS', tag: 'twilio', detail: 'Se envía por WhatsApp con Twilio o por SMS como alternativa.', detailEn: 'Messages are sent through Twilio WhatsApp, with SMS as an alternative channel.' },
  { Icon: FaCheckDouble, label: 'Webhook firmado', labelEn: 'Signed webhook', tag: 'webhook', detail: 'El proveedor confirma entrega y respuesta; la firma se valida antes de guardar nada.', detailEn: 'The provider confirms delivery and replies; signatures are validated before persistence.' },
  { Icon: FaExclamationTriangle, label: 'Adherencia y alertas', labelEn: 'Adherence and alerts', tag: 'rules', detail: 'Las respuestas alimentan la adherencia y las reglas clínicas explicables que priorizan pacientes.', detailEn: 'Replies feed adherence metrics and explainable clinical rules used to prioritize patients.' },
];

const impaSteps: Step[] = [
  { Icon: FaFileAlt, label: 'Solicitud', labelEn: 'Application', tag: 'adopter', detail: 'La persona interesada envía su solicitud de adopción desde la plataforma.', detailEn: 'An interested adopter submits an application through the platform.' },
  { Icon: FaSearch, label: 'Revisión', labelEn: 'Review', tag: 'staff', detail: 'El personal revisa la solicitud; cada rol solo ve y modifica lo que le corresponde (RBAC).', detailEn: 'Staff review the application; RBAC limits what each role can view and change.' },
  { Icon: FaCalendarCheck, label: 'Cita', labelEn: 'Appointment', tag: 'schedule', detail: 'Se agenda una cita para conocer a la mascota.', detailEn: 'An appointment is scheduled to meet the animal.' },
  { Icon: FaSyringe, label: 'Esterilización', labelEn: 'Sterilization', tag: 'record', detail: 'Se registra la esterilización como parte del proceso.', detailEn: 'Sterilization is recorded as part of the workflow.' },
  { Icon: FaHome, label: 'Adopción', labelEn: 'Adoption', tag: 'close', detail: 'La adopción queda registrada y la mascota sale del catálogo.', detailEn: 'The adoption is recorded and the animal leaves the public catalog.' },
];

const projexusSteps: Step[] = [
  { Icon: FaUserPlus, label: 'Inscripción', labelEn: 'Registration', tag: 'participants', detail: 'Escuelas y participantes se registran en el concurso.', detailEn: 'Schools and participants register for a competition.' },
  { Icon: FaUsers, label: 'Etapa local', labelEn: 'Local stage', tag: 'stage 1', detail: 'La primera etapa filtra a quienes avanzan.', detailEn: 'The first stage selects who advances.' },
  { Icon: FaGavel, label: 'Evaluación', labelEn: 'Evaluation', tag: 'jury', detail: 'Los jurados califican según los criterios del concurso.', detailEn: 'Judges score entries against the competition criteria.' },
  { Icon: FaTrophy, label: 'Regional', labelEn: 'Regional', tag: 'final', detail: 'Los mejores avanzan a la etapa regional y se publican resultados.', detailEn: 'Top entries advance to the regional stage and results are published.' },
];

const kuniArchitecture: ArchitectureNode[] = [
  { Icon: FaHeartbeat, label: 'Panel clínico', labelEn: 'Clinical dashboard', detail: 'PWA para personal y pacientes', detailEn: 'PWA for staff and patients' },
  { Icon: FaServer, label: 'Servicios Next.js', labelEn: 'Next.js services', detail: 'Reglas, cron y API', detailEn: 'Rules, cron jobs and API' },
  { Icon: FaDatabase, label: 'PostgreSQL + RLS', detail: '20 tablas y 6 vistas', detailEn: '20 tables and 6 views' },
  { Icon: FaWhatsapp, label: 'Twilio + webhooks', detail: 'Outbox, WhatsApp y SMS', detailEn: 'Outbox, WhatsApp and SMS' },
];

const impaArchitecture: ArchitectureNode[] = [
  { Icon: FaImage, label: 'Cliente Next.js', labelEn: 'Next.js client', detail: 'Catálogo y paneles por rol', detailEn: 'Catalog and role-based dashboards' },
  { Icon: FaServer, label: 'API y dominio', labelEn: 'API and domain', detail: 'Validación y flujos municipales', detailEn: 'Validation and municipal workflows' },
  { Icon: FaShieldAlt, label: 'JWT + RBAC', detail: 'Autenticación y permisos', detailEn: 'Authentication and permissions' },
  { Icon: FaDatabase, label: 'PostgreSQL', detail: 'Modelo relacional en Supabase', detailEn: 'Relational model on Supabase' },
];

const fraudArchitecture: ArchitectureNode[] = [
  { Icon: FaDatabase, label: 'Datasets públicos', labelEn: 'Public datasets', detail: 'PaySim y Credit Card', detailEn: 'PaySim and Credit Card' },
  { Icon: FaCodeBranch, label: 'Preparación', labelEn: 'Preparation', detail: 'Limpieza y partición reproducible', detailEn: 'Reproducible cleaning and split' },
  { Icon: FaServer, label: 'Modelos', labelEn: 'Models', detail: 'Supervisados y no supervisados', detailEn: 'Supervised and unsupervised' },
  { Icon: FaChartLine, label: 'Evaluación final', labelEn: 'Final evaluation', detail: 'F1, AUC-ROC y AUC-PR', detailEn: 'F1, AUC-ROC and AUC-PR' },
];

// Métricas reales del modelo por conjunto de datos.
const fraudData = {
  PaySim: [
    { label: 'F1', value: 0.9976 },
    { label: 'AUC-ROC', value: 1.0 },
    { label: 'AUC-PR', value: 0.9995 },
  ],
  'Credit Card': [
    { label: 'F1', value: 0.875 },
    { label: 'AUC-ROC', value: 0.9675 },
    { label: 'AUC-PR', value: 0.7917 },
  ],
};

const FraudDemo: React.FC = () => {
  const { tr } = useLanguage();
  const [dataset, setDataset] = useState<keyof typeof fraudData>('PaySim');
  return (
    <div className="dark-surface h-full flex flex-col p-4 md:p-5 font-mono">
      <div className="flex items-center justify-between mb-4">
        <span className="text-[11px] text-gray-500">{tr('resultados en test final', 'final test results')}</span>
        <div className="flex gap-1">
          {(Object.keys(fraudData) as (keyof typeof fraudData)[]).map((d) => (
            <button
              key={d}
              type="button"
              onClick={(e) => { e.stopPropagation(); setDataset(d); }}
              className={`px-2 py-1 rounded-md text-[11px] border transition-colors cursor-pointer ${
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
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-400">{m.label}</span>
              <motion.span key={`${dataset}-${m.label}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-gray-100 font-bold">
                {m.value.toFixed(4)}
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
        <p className="text-[11px] text-gray-400 leading-relaxed">
          {tr(
            'Resultados sobre datasets públicos; PaySim es simulado y no representa desempeño bancario en producción.',
            'Results on public datasets; PaySim is simulated and does not represent production banking performance.',
          )}
        </p>
      </div>
    </div>
  );
};

/* ── Kuni: tarjeta destacada ────────────────────────────── */
const KuniVisual: React.FC = () => {
  const { tr } = useLanguage();
  const [view, setView] = useState<View>('resultado');
  const accent = '#34D399';

  return (
    <div className="relative h-full min-h-[320px] md:min-h-[440px] overflow-hidden bg-gradient-to-br from-sky-950/70 via-gray-950 to-emerald-950/40 [perspective:1200px]">
      <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full" style={{ background: 'radial-gradient(closest-side, rgb(56 189 248 / 0.25), transparent)' }} />
      <div className="absolute top-4 left-4 z-20">
        <ViewToggle view={view} views={['resultado', 'arquitectura', 'flujo']} onChange={setView} accent={accent} />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {view === 'resultado' ? (
          <motion.div key="shots" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="dark-surface absolute left-6 right-[-18%] top-16 md:top-20 rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 transition-transform duration-700 ease-out [transform:rotateY(-14deg)_rotateX(6deg)] group-hover:[transform:rotateY(-4deg)_rotateX(2deg)_translateX(-4%)]">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-[#0d1117] border-b border-white/5">
                <span className="w-2 h-2 rounded-full bg-red-400/70" />
                <span className="w-2 h-2 rounded-full bg-yellow-400/70" />
                <span className="w-2 h-2 rounded-full bg-emerald-400/70" />
                <span className="ml-3 text-[11px] font-mono text-gray-500">{tr('kuni · tablero clínico', 'kuni · clinical dashboard')}</span>
              </div>
              <SmartImage
                src="/img/kuni-dashboard.webp"
                alt={tr('Tablero clínico de Kuni con pacientes priorizados, alertas y adherencia', 'Kuni clinical dashboard with prioritized patients, alerts and adherence')}
                width={1400}
                height={723}
                wrapperClassName="aspect-[1400/723]"
                className="w-full block"
              />
            </div>
            <div className="absolute left-4 bottom-5 w-[46%] rounded-lg overflow-hidden border border-white/15 shadow-2xl shadow-black/60 transition-transform duration-700 ease-out -rotate-3 group-hover:rotate-0 group-hover:-translate-y-2 group-hover:scale-105">
              <SmartImage src="/img/kuni-inicio.webp" alt={tr('Pantalla de bienvenida de Kuni', 'Kuni welcome screen')} width={1400} height={723} wrapperClassName="aspect-[1400/723]" className="w-full block" />
            </div>
            <div className="dark-surface absolute right-4 bottom-8 flex items-center gap-2 bg-gray-900/95 border border-white/10 rounded-xl rounded-br-sm px-3 py-2 shadow-xl transition-transform duration-500 group-hover:-translate-y-2">
              <FaWhatsapp className="text-emerald-400" size={14} />
              <span className="text-xs text-gray-300">{tr('¿Ya tomaste tu medicamento?', 'Did you take your medication?')}</span>
            </div>
          </motion.div>
        ) : view === 'arquitectura' ? (
          <motion.div
            key="architecture"
            className="dark-surface absolute left-4 right-4 top-16 bottom-4 rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.3 }}
          >
            <ArchitectureDiagram
              nodes={kuniArchitecture}
              accent={accent}
              caption="Panel → servicios → datos → mensajería"
              captionEn="Dashboard → services → data → messaging"
            />
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
            <FlowDemo steps={kuniSteps} accent={accent} caption="recorrido de un recordatorio" captionEn="reminder lifecycle" interval={2200} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Kuni: React.FC = () => {
  const { tr } = useLanguage();
  const [showCase, setShowCase] = useState(false);

  return (
  <Reveal className="mb-6">
    <motion.div whileHover={{ y: -4 }} transition={{ type: 'spring', stiffness: 260, damping: 22 }} className="group orbit-border rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10">
      <SpotlightCard className="grid grid-cols-1 md:grid-cols-2">
        <KuniVisual />
        <div className="p-7 md:p-8 flex flex-col">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/25">
              <FaFlagCheckered size={10} /> Innovation Fest 2026
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-500/5 text-emerald-300 border border-emerald-500/25">
              <FaCode size={10} /> {tr('Backend e integraciones', 'Backend and integrations')}
            </span>
            <span className="text-xs font-mono text-gray-500">{tr('Hackatón · equipo de 3', 'Hackathon · team of 3')}</span>
          </div>

          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-1 flex items-center gap-3">
            Kuni
            <FaHeartbeat className="text-emerald-400 group-hover:animate-pulse" size={22} />
          </h3>
          <p className="text-sm text-emerald-300 font-mono mb-4">{tr('Monitoreo remoto para enfermedades crónicas', 'Remote monitoring for chronic conditions')}</p>
          <p className="text-sm text-gray-400 leading-relaxed mb-5">{tr('Recordatorios, seguimiento y alertas clínicas conectados mediante WhatsApp y SMS.', 'Reminders, follow-up and clinical alerts connected through WhatsApp and SMS.')}</p>

          <div className="grid grid-cols-3 gap-2 mb-5">
            {[
              ['20', tr('tablas', 'tables')],
              ['6', tr('vistas SQL', 'SQL views')],
              ['E2E', tr('demo funcional', 'working demo')],
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl border border-white/5 bg-white/[0.025] px-2 py-3 text-center transition-colors group-hover:border-white/10">
                <p className="font-display text-lg font-bold text-white">{value}</p>
                <p className="mt-0.5 text-[10px] leading-tight text-gray-500">{label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {([
              { label: 'PostgreSQL', variant: 'blue' },
              { label: 'RLS', variant: 'emerald' },
              { label: 'Twilio', variant: 'red' },
              { label: 'Next.js 16', variant: 'gray' },
              { label: 'TypeScript', variant: 'blue' },
              { label: 'Supabase', variant: 'emerald' },
              { label: 'React 19', variant: 'cyan' },
              { label: 'Zod', variant: 'purple' },
              { label: 'Vitest', variant: 'yellow' },
              { label: 'PWA', variant: 'pink' },
            ] as Tech[]).slice(0, 5).map((t) => <TechBadge key={t.label} {...t} />)}
            <span title="Supabase, React 19, Zod, Vitest, PWA" className="inline-flex items-center rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-mono text-gray-400">+5</span>
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCase((value) => !value)}
              aria-expanded={showCase}
              className="shine inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-bold text-gray-950 transition-colors hover:bg-emerald-400 cursor-pointer"
            >
              <FaProjectDiagram size={12} />
              {showCase ? tr('Ocultar caso', 'Hide case study') : tr('Ver caso de estudio', 'View case study')}
            </button>
            <GithubLink href="https://github.com/Cesaredmyt/Kuni" featured />
          </div>

          <AnimatePresence initial={false}>
            {showCase && (
              <motion.dl
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden rounded-xl border border-white/10 bg-black/20"
              >
                <div className="space-y-3 p-4 text-sm leading-relaxed">
                  <div><dt className="font-mono text-xs text-emerald-400 mb-0.5">{tr('Problema', 'Problem')}</dt><dd className="text-gray-400">{tr('El seguimiento por canales separados dificulta detectar omisiones y priorizar pacientes.', 'Fragmented follow-up channels make missed events harder to detect and patients harder to prioritize.')}</dd></div>
                  <div><dt className="font-mono text-xs text-emerald-400 mb-0.5">{tr('Contribución', 'Contribution')}</dt><dd className="text-gray-400">{tr('Persistencia PostgreSQL/RLS, transporte WhatsApp/SMS, webhooks firmados y cola de recordatorios.', 'PostgreSQL/RLS persistence, WhatsApp/SMS transport, signed webhooks and the reminder outbox.')}</dd></div>
                  <div><dt className="font-mono text-xs text-emerald-400 mb-0.5">{tr('Resultado', 'Result')}</dt><dd className="text-gray-400">{tr('Demo end-to-end del ciclo alta → mensaje → alerta → revisión, con 20 tablas y 6 vistas versionadas.', 'End-to-end demo from enrollment → message → alert → review, backed by 20 versioned tables and 6 views.')}</dd></div>
                </div>
              </motion.dl>
            )}
          </AnimatePresence>
        </div>
      </SpotlightCard>
    </motion.div>
  </Reveal>
  );
};

/* ── Proyectos anteriores ───────────────────────────────── */
const earlier: CardProps[] = [
  {
    year: '2025',
    title: 'ProjeXus',
    role: 'Backend Developer',
    roleEn: 'Backend Developer',
    description: 'Backend REST y modelo relacional para administrar inscripciones, evaluaciones y resultados de concursos regionales por etapas.',
    descriptionEn: 'REST backend and relational model for registrations, evaluations and results across multi-stage regional competitions.',
    tech: [
      { label: 'Next.js', variant: 'gray' },
      { label: 'Spring Boot', variant: 'emerald' },
      { label: 'PostgreSQL', variant: 'blue' },
    ],
    github: 'https://github.com/TonyMed12/ProjeXus',
    image: '/img/Projexus.webp',
    accent: '#A78BFA',
    url: 'projexus / concursos',
    demo: <FlowDemo steps={projexusSteps} accent="#A78BFA" caption="etapas de un concurso" captionEn="competition stages" compact />,
    caseStudy: {
      problem: 'Las inscripciones, evaluaciones y resultados de cada etapa necesitaban una fuente de datos común.',
      contribution: 'Backend REST con Spring Boot, modelo relacional en PostgreSQL e integración con el cliente Next.js.',
      result: 'Flujo unificado desde el registro hasta la publicación de resultados regionales.',
    },
    caseStudyEn: {
      problem: 'Registrations, evaluations and results for each stage needed a shared source of truth.',
      contribution: 'Spring Boot REST backend, PostgreSQL relational model and Next.js client integration.',
      result: 'A unified flow from registration through regional result publication.',
    },
  },
  {
    title: 'Aquamarine Resort',
    role: 'Full Stack Developer',
    roleEn: 'Full Stack Developer',
    description: 'Aplicación web de hotelería con catálogo, disponibilidad y flujo de reservaciones implementado con PHP.',
    descriptionEn: 'Hospitality web application with a catalog, availability and a booking flow implemented in PHP.',
    tech: [
      { label: 'HTML', variant: 'orange' },
      { label: 'CSS', variant: 'blue' },
      { label: 'PHP', variant: 'purple' },
    ],
    github: 'https://github.com/Cesaredmyt/Aquamarine-Resort',
    image: '/img/hotel.webp',
    accent: '#22D3EE',
    url: 'aquamarine / reservas',
    caseStudy: {
      problem: 'El catálogo, la disponibilidad y las reservaciones debían funcionar dentro de una sola experiencia web.',
      contribution: 'Implementé el flujo de datos y reservaciones en PHP junto con la interfaz responsive.',
      result: 'Aplicación que conecta consulta de habitaciones, disponibilidad y solicitud de reserva.',
    },
    caseStudyEn: {
      problem: 'The catalog, availability and bookings needed to work within a single web experience.',
      contribution: 'Implemented the PHP data and booking flow together with the responsive interface.',
      result: 'An application connecting room discovery, availability and booking requests.',
    },
  },
  {
    title: 'Biblioteca Digital',
    titleEn: 'Digital Library',
    role: 'Backend y datos',
    roleEn: 'Backend and data',
    description: 'Sistema CRUD para inventario, usuarios y administración de préstamos sobre una base de datos MySQL.',
    descriptionEn: 'CRUD system for inventory, users and loan management backed by a MySQL database.',
    tech: [
      { label: 'Java', variant: 'red' },
      { label: 'PHP', variant: 'purple' },
      { label: 'MySQL', variant: 'blue' },
    ],
    image: '/img/biblioteca.webp',
    accent: '#FBBF24',
    url: 'biblioteca / préstamos',
    caseStudy: {
      problem: 'El inventario, los usuarios y los préstamos requerían control centralizado y operaciones consistentes.',
      contribution: 'Diseñé el esquema MySQL y las operaciones CRUD implementadas con Java y PHP.',
      result: 'Gestión integrada del catálogo, usuarios y ciclo de préstamos.',
    },
    caseStudyEn: {
      problem: 'Inventory, users and loans required centralized control and consistent operations.',
      contribution: 'Designed the MySQL schema and CRUD operations implemented with Java and PHP.',
      result: 'Integrated management for the catalog, users and the lending lifecycle.',
    },
  },
];

const Projects: React.FC = () => {
  const { tr } = useLanguage();
  const [showEarlier, setShowEarlier] = useState(false);

  return (
  <section id="proyectos" className="py-24 px-6 md:px-12 scroll-mt-16">
    <div className="container mx-auto max-w-6xl">
      <SectionHeading
        index="01"
        title={tr('Proyectos', 'Projects')}
        subtitle={tr('Casos de estudio con problema, contribución y resultado verificable.', 'Case studies organized around the problem, my contribution and a verifiable result.')}
      />

      <p className="text-xs font-mono text-gray-500 tracking-[0.2em] uppercase mb-4">{tr('Casos destacados · 2026', 'Featured case studies · 2026')}</p>

      <Kuni />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <Reveal className="h-full">
          <ProjectCard
            featured
            year="2026"
            title="IMPA — Plataforma de Adopciones"
            titleEn="IMPA — Adoption Platform"
            role="Backend Lead · equipo de 4"
            roleEn="Backend Lead · team of 4"
            description="Centraliza adopciones, agenda, esterilizaciones y reportes mediante permisos por rol."
            descriptionEn="Centralizes adoptions, scheduling, sterilizations and reports through role-based access."
            metrics={[
              { value: 'JWT', label: 'autenticación', labelEn: 'authentication' },
              { value: 'RBAC', label: 'permisos por rol', labelEn: 'role permissions' },
              { value: '4', label: 'flujos conectados', labelEn: 'connected flows' },
            ]}
            tech={[
              { label: 'PostgreSQL', variant: 'blue' },
              { label: 'Supabase', variant: 'emerald' },
              { label: 'TypeScript', variant: 'blue' },
              { label: 'Docker', variant: 'cyan' },
              { label: 'Next.js', variant: 'gray' },
              { label: 'Vitest', variant: 'yellow' },
            ]}
            caseStudy={{
              problem: 'Adopciones, citas, esterilizaciones y reportes necesitaban un flujo centralizado con permisos por rol.',
              contribution: 'Lideré el backend en un equipo de 4: arquitectura, modelo relacional, JWT/RBAC e integración con el frontend.',
              result: 'MVP con flujos conectados para adopciones, agenda, esterilizaciones y reportes de maltrato.',
            }}
            caseStudyEn={{
              problem: 'Adoptions, appointments, sterilizations and reports needed one role-aware workflow.',
              contribution: 'I led backend work in a four-person team: architecture, relational modeling, JWT/RBAC and frontend integration.',
              result: 'MVP with connected adoption, scheduling, sterilization and animal-abuse reporting workflows.',
            }}
            github="https://github.com/Cesaredmyt/Adopciones-IMPA"
            image="/img/IMPA.webp"
            accent="#34D399"
            url="impa / adopciones"
            demo={<FlowDemo steps={impaSteps} accent="#34D399" caption="proceso de adopción" captionEn="adoption workflow" />}
            architecture={<ArchitectureDiagram nodes={impaArchitecture} accent="#34D399" caption="Cliente → API → autorización → datos" captionEn="Client → API → authorization → data" />}
          />
        </Reveal>

        <Reveal delay={0.12} className="h-full">
          <ProjectCard
            featured
            year="2026"
            title="Detección de Fraude y Phishing"
            titleEn="Fraud and Phishing Detection"
            role="ML y pipeline de datos · coautor"
            roleEn="ML and data pipeline · co-author"
            description="Pipeline reproducible que compara modelos supervisados, no supervisados y reglas bajo CRISP-DM."
            descriptionEn="Reproducible pipeline comparing supervised, unsupervised and rule-based approaches under CRISP-DM."
            metrics={[
              { value: '6.36M', label: 'registros PaySim', labelEn: 'PaySim records' },
              { value: '0.9976', label: 'F1 en PaySim', labelEn: 'PaySim F1' },
              { value: '0.9995', label: 'AUC-PR PaySim', labelEn: 'PaySim AUC-PR' },
            ]}
            tech={[
              { label: 'Python', variant: 'yellow' },
              { label: 'XGBoost', variant: 'orange' },
              { label: 'Random Forest', variant: 'orange' },
              { label: 'Isolation Forest', variant: 'orange' },
              { label: 'Pytest', variant: 'purple' },
            ]}
            caseStudy={{
              problem: 'Detectar una clase minoritaria extrema y comparar ML contra una línea base de reglas.',
              contribution: 'Coautor del pipeline reproducible: preparación, modelos supervisados/no supervisados, pruebas y evaluación final sobre TEST.',
              result: 'PaySim completo: 6,362,620 filas, TEST de 954,393 y F1 0.9976. Credit Card: TEST de 42,288 y F1 0.8750.',
            }}
            caseStudyEn={{
              problem: 'Detect an extremely imbalanced minority class and compare ML against a rule-based baseline.',
              contribution: 'Co-authored the reproducible pipeline: preparation, supervised/unsupervised models, tests and one-time final TEST evaluation.',
              result: 'Full PaySim: 6,362,620 rows, 954,393-row TEST and 0.9976 F1. Credit Card: 42,288-row TEST and 0.8750 F1.',
            }}
            github="https://github.com/Cesaredmyt/fraud-detection-itm"
            accent="#60A5FA"
            url="fraud-detection / resultados"
            headerNode={<FraudDemo />}
            architecture={<ArchitectureDiagram nodes={fraudArchitecture} accent="#60A5FA" caption="Datos → preparación → modelos → evaluación" captionEn="Data → preparation → models → evaluation" />}
          />
        </Reveal>
      </div>

      <div className="flex items-center justify-between gap-4 mb-4">
        <p className="text-xs font-mono text-gray-500 tracking-[0.2em] uppercase">{tr('Proyectos anteriores', 'Earlier projects')}</p>
        <button
          type="button"
          onClick={() => setShowEarlier((value) => !value)}
          aria-expanded={showEarlier}
          className="text-xs font-mono text-emerald-300 border border-emerald-500/25 hover:bg-emerald-500/10 px-3 py-2 rounded-lg transition-colors cursor-pointer"
        >
          {showEarlier ? tr('Ocultar', 'Hide') : tr('Ver 3 proyectos', 'View 3 projects')}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {showEarlier && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-1">
              {earlier.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.08} className="h-full">
                  <ProjectCard {...p} />
                </Reveal>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </section>
  );
};

export default Projects;
