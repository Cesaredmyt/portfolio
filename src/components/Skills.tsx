import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import type { IconType } from 'react-icons';
import { FaJava, FaPython, FaReact, FaNodeJs, FaGitAlt, FaDatabase, FaDesktop, FaServer, FaCheck } from 'react-icons/fa';
import {
  SiPostgresql, SiMysql, SiSpringboot, SiTypescript, SiJavascript, SiPhp, SiTailwindcss, SiNextdotjs, SiSupabase,
  SiDocker, SiUbuntu, SiCaddy, SiTailscale, SiAuthelia, SiNetdata, SiGooglecloud, SiTwilio,
  SiVitest, SiZod, SiReactquery, SiDotnet, SiEslint, SiPwa,
} from 'react-icons/si';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import SpotlightCard from './ui/SpotlightCard';

interface Skill {
  label: string;
  Icon: IconType;
  color: string;
  /** Habilidad principal: se muestra destacada. */
  core?: boolean;
}

const cardBase =
  'group h-full glass border border-white/5 hover:border-white/15 rounded-2xl p-6 flex flex-col transition-colors duration-300';

const CardTitle: React.FC<{ title: string; skills: Skill[] }> = ({ title, skills }) => (
  <div className="flex items-baseline justify-between gap-3 mb-5">
    <h3 className="font-display text-xl font-bold text-white">{title}</h3>
    <span className="text-[11px] font-mono text-gray-600">
      {skills.filter((s) => s.core).length} principales · {skills.length} total
    </span>
  </div>
);

/* ── 1. Lenguajes: editor con un fragmento por lenguaje ─── */
const languages: (Skill & { file: string; code: string[] })[] = [
  { label: 'TypeScript', Icon: SiTypescript, color: '#3178C6', core: true, file: 'recordatorios.ts', code: ['const recordatorio = schema.parse(body);', 'await cola.encolar(recordatorio);'] },
  { label: 'Python', Icon: FaPython, color: '#4B8BBE', core: true, file: 'modelo.py', code: ['modelo = XGBClassifier(n_estimators=400)', 'modelo.fit(X_train, y_train)'] },
  { label: 'SQL', Icon: FaDatabase, color: '#34D399', core: true, file: 'politicas.sql', code: ['create policy "por_unidad" on pacientes', '  using (unidad_id = auth_unidad());'] },
  { label: 'Java', Icon: FaJava, color: '#F89820', core: true, file: 'ConcursoController.java', code: ['@GetMapping("/concursos/{id}")', 'public Concurso buscar(@PathVariable Long id)'] },
  { label: 'JavaScript', Icon: SiJavascript, color: '#F7DF1E', file: 'citas.js', code: ['const res = await fetch("/api/citas");', 'render(await res.json());'] },
  { label: 'C#', Icon: SiDotnet, color: '#A179DC', file: 'Reservas.cs', code: ['var reserva = new Reserva(cliente);', 'await repo.GuardarAsync(reserva);'] },
  { label: 'PHP', Icon: SiPhp, color: '#8993BE', file: 'reserva.php', code: ['$stmt = $pdo->prepare($sql);', '$stmt->execute([$habitacion]);'] },
];

const CYCLE_MS = 3200;

const LanguagesCard: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const lang = languages[index];

  useEffect(() => {
    if (paused || reduced) return;
    const id = setTimeout(() => setIndex((i) => (i + 1) % languages.length), CYCLE_MS);
    return () => clearTimeout(id);
  }, [index, paused, reduced]);

  return (
    <SpotlightCard tilt={2} className={cardBase} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
      <CardTitle title="Lenguajes" skills={languages} />

      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-5 flex-1">
        <div className="flex flex-wrap md:flex-col gap-1.5 content-start">
          {languages.map((l, i) => {
            const on = i === index;
            return (
              <button
                key={l.label}
                type="button"
                aria-pressed={on}
                onClick={() => setIndex(i)}
                onPointerEnter={() => setIndex(i)}
                className={`relative z-10 flex items-center gap-2 rounded-lg border transition-colors duration-200 cursor-pointer ${
                  l.core ? 'px-3 py-2 text-sm font-medium' : 'px-2.5 py-1.5 text-xs'
                } ${on ? 'bg-white/[0.07] text-white' : `border-transparent ${l.core ? 'text-gray-200' : 'text-gray-500'} hover:text-white`}`}
                style={{ borderColor: on ? `${l.color}80` : undefined }}
              >
                <l.Icon
                  className={`flex-shrink-0 transition-transform duration-200 ${l.core ? 'w-4 h-4' : 'w-3.5 h-3.5'}`}
                  style={{ color: on || l.core ? l.color : undefined, transform: on ? 'scale(1.15)' : undefined }}
                />
                {l.label}
              </button>
            );
          })}
        </div>

        <div className="rounded-xl bg-[#0d1117] border border-white/5 overflow-hidden flex flex-col min-h-[150px]">
          <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
            <span className="w-2 h-2 rounded-full transition-colors duration-300" style={{ background: lang.color }} />
            <span className="text-[11px] font-mono text-gray-400">{lang.file}</span>
          </div>
          <div className="px-4 py-4 font-mono text-[12.5px] leading-6 overflow-x-auto flex-1">
            <AnimatePresence mode="wait">
              <motion.div key={lang.label} initial="hidden" animate="show" exit="exit" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
                {lang.code.map((line, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, x: -8 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.22 } },
                      exit: { opacity: 0, transition: { duration: 0.1 } },
                    }}
                    className="whitespace-pre text-gray-300"
                  >
                    <span className="text-gray-700 select-none mr-3">{i + 1}</span>
                    {line}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="h-0.5 bg-white/5">
            {!paused && !reduced && (
              <motion.div
                key={index}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }}
                className="h-full origin-left"
                style={{ background: lang.color }}
              />
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};

/* ── 2. Infraestructura: terminal con docker ps ─────────── */
const infra: (Skill & { status: string; learning?: boolean })[] = [
  { label: 'docker', Icon: SiDocker, color: '#2496ED', status: 'contenedores', core: true },
  { label: 'ubuntu', Icon: SiUbuntu, color: '#E95420', status: 'linux server', core: true },
  { label: 'caddy', Icon: SiCaddy, color: '#22B638', status: 'reverse proxy', core: true },
  { label: 'authelia', Icon: SiAuthelia, color: '#4B8BF5', status: 'sso + 2fa', core: true },
  { label: 'tailscale', Icon: SiTailscale, color: '#E5E7EB', status: 'vpn mesh', core: true },
  { label: 'netdata', Icon: SiNetdata, color: '#00AB44', status: 'métricas' },
  { label: 'google-cloud', Icon: SiGooglecloud, color: '#4285F4', status: 'aprendiendo', learning: true },
];

const InfraCard: React.FC = () => (
  <SpotlightCard tilt={3} className={cardBase}>
    <CardTitle title="Infraestructura" skills={infra} />
    <div className="rounded-xl bg-[#0d1117] border border-white/5 p-4 font-mono text-[12px] flex-1 flex flex-col">
      <p className="text-gray-500 mb-3">
        <span className="text-emerald-400">cesar@homelab</span>:~$ docker ps
      </p>
      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
        className="space-y-1"
      >
        {infra.map((s) => (
          <motion.li
            key={s.label}
            variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0 } }}
            className={`brand-row relative z-10 flex items-center gap-3 rounded-md px-2 -mx-2 ${s.core ? 'py-2 text-[13px]' : 'py-1.5 opacity-70'}`}
            style={{ ['--brand' as string]: s.color }}
          >
            <span className="brand-row-bar absolute left-0 top-1/2 h-4 w-0.5 rounded-full" />
            <s.Icon className={`brand-row-icon ${s.core ? 'w-4 h-4' : 'w-3.5 h-3.5 text-gray-500'}`} style={s.core ? { color: s.color } : undefined} />
            <span className={`w-24 truncate ${s.core ? 'text-gray-100 font-medium' : 'text-gray-400'}`}>{s.label}</span>
            <span className="text-gray-600 flex-1 truncate">{s.status}</span>
            {s.learning ? (
              <span className="flex items-center gap-1.5 text-sky-300">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" /> 22%
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> up
              </span>
            )}
          </motion.li>
        ))}
      </motion.ul>
      <p className="text-gray-600 mt-auto pt-3">
        <span className="text-emerald-400">cesar@homelab</span>:~$ <span className="caret inline-block w-2 h-3.5 align-middle bg-gray-400" />
      </p>
    </div>
  </SpotlightCard>
);

/* ── 3. Backend y datos: flujo cliente → api → bd ───────── */
const backend: Skill[] = [
  { label: 'Node.js', Icon: FaNodeJs, color: '#5FA04E', core: true },
  { label: 'Spring Boot', Icon: SiSpringboot, color: '#6DB33F', core: true },
  { label: 'PostgreSQL', Icon: SiPostgresql, color: '#6A9FD8', core: true },
  { label: 'Supabase', Icon: SiSupabase, color: '#3ECF8E', core: true },
  { label: 'MySQL', Icon: SiMysql, color: '#00A0C6' },
  { label: 'Twilio', Icon: SiTwilio, color: '#F22F46' },
  { label: 'Zod', Icon: SiZod, color: '#6C8EEF' },
];

const FlowNode: React.FC<{ icon: React.ReactNode; label: string }> = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-1.5">
    <div className="w-11 h-11 rounded-xl bg-[#0d1117] border border-white/10 flex items-center justify-center text-gray-400 transition-colors duration-300 group-hover:text-emerald-300 group-hover:border-emerald-500/40">
      {icon}
    </div>
    <span className="text-[10px] font-mono text-gray-500">{label}</span>
  </div>
);

const Wire: React.FC<{ delay: string }> = ({ delay }) => (
  <div className="relative flex-1 h-px bg-white/10 mb-5 overflow-hidden">
    <span className="flow-packet" style={{ animationDelay: delay }} />
  </div>
);

const TieredChips: React.FC<{ skills: Skill[] }> = ({ skills }) => (
  <div className="mt-auto space-y-3">
    <div className="grid grid-cols-2 gap-2">
      {skills.filter((s) => s.core).map((s) => (
        <span
          key={s.label}
          className="brand-chip relative z-10 flex items-center gap-2.5 text-sm font-medium px-3 py-2.5 rounded-xl border border-white/10 bg-white/[0.03] text-gray-100 cursor-default"
          style={{ ['--brand' as string]: s.color }}
        >
          <s.Icon className="w-4 h-4 flex-shrink-0" style={{ color: s.color }} />
          {s.label}
        </span>
      ))}
    </div>
    <div className="flex flex-wrap items-center gap-1.5">
      {skills.filter((s) => !s.core).map((s) => (
        <span
          key={s.label}
          className="brand-chip relative z-10 flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-md border border-white/5 text-gray-500 cursor-default"
          style={{ ['--brand' as string]: s.color }}
        >
          <s.Icon className="w-3 h-3" />
          {s.label}
        </span>
      ))}
    </div>
  </div>
);

const BackendCard: React.FC = () => (
  <SpotlightCard tilt={4} className={cardBase}>
    <CardTitle title="Backend y datos" skills={backend} />
    <div className="flex items-center gap-2 mb-6 px-1">
      <FlowNode icon={<FaDesktop size={16} />} label="cliente" />
      <Wire delay="0s" />
      <FlowNode icon={<FaServer size={16} />} label="api" />
      <Wire delay="0.45s" />
      <FlowNode icon={<FaDatabase size={16} />} label="postgres" />
    </div>
    <TieredChips skills={backend} />
  </SpotlightCard>
);

/* ── 4. Frontend y calidad: ejecución de pruebas ────────── */
const frontend: (Skill & { detail: string })[] = [
  { label: 'Next.js', Icon: SiNextdotjs, color: '#E5E7EB', detail: 'SSR y rutas', core: true },
  { label: 'React', Icon: FaReact, color: '#61DAFB', detail: 'componentes y estado', core: true },
  { label: 'Tailwind', Icon: SiTailwindcss, color: '#38BDF8', detail: 'interfaces responsivas', core: true },
  { label: 'Git', Icon: FaGitAlt, color: '#F05032', detail: 'ramas y pull requests', core: true },
  { label: 'React Query', Icon: SiReactquery, color: '#FF4154', detail: 'caché de datos' },
  { label: 'Vitest', Icon: SiVitest, color: '#FCC72B', detail: 'pruebas unitarias' },
  { label: 'ESLint', Icon: SiEslint, color: '#8080F2', detail: 'calidad de código' },
  { label: 'PWA', Icon: SiPwa, color: '#A78BFA', detail: 'app instalable' },
];

const FrontendCard: React.FC = () => (
  <SpotlightCard tilt={4} className={cardBase}>
    <CardTitle title="Frontend y calidad" skills={frontend} />
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
      variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
      className="font-mono space-y-0.5 flex-1"
    >
      {frontend.map((s) => (
        <motion.li
          key={s.label}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          className={`brand-row relative z-10 flex items-center gap-2.5 rounded-md px-2 -mx-2 ${s.core ? 'py-1.5 text-[13px]' : 'py-1 text-[11.5px] opacity-70'}`}
          style={{ ['--brand' as string]: s.color }}
        >
          <motion.span
            variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { type: 'spring', stiffness: 400, damping: 15 } } }}
            className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0"
          >
            <FaCheck size={7} />
          </motion.span>
          <s.Icon className={`brand-row-icon flex-shrink-0 ${s.core ? 'w-4 h-4' : 'w-3.5 h-3.5 text-gray-500'}`} style={s.core ? { color: s.color } : undefined} />
          <span className={`whitespace-nowrap ${s.core ? 'text-gray-100 font-medium' : 'text-gray-400'}`}>{s.label}</span>
          <span className="text-gray-600 truncate">› {s.detail}</span>
        </motion.li>
      ))}
    </motion.ul>
    <p className="mt-4 pt-3 border-t border-white/5 font-mono text-[12px] text-gray-500">
      Tests <span className="text-emerald-400">{frontend.length} passed</span> ({frontend.length})
    </p>
  </SpotlightCard>
);

/* ── Complementarias (segundo plano) ────────────────────── */
const complementary = [
  { group: 'ML y datos', items: ['scikit-learn', 'XGBoost', 'Random Forest', 'Isolation Forest', 'Pandas', 'NumPy', 'CRISP-DM'] },
  { group: 'Arquitectura', items: ['REST APIs', 'JWT / RBAC', 'Row Level Security', 'Webhooks', 'MVC', 'POO', 'Agile'] },
  { group: 'Calidad en Python', items: ['Pytest', 'Ruff', 'Mypy'] },
  { group: 'Self-hosting', items: ['CrowdSec', 'AdGuard Home', 'Uptime Kuma', 'Duplicati', 'n8n', 'Wiki.js', 'Vaultwarden', 'SearXNG'] },
];

/* ── Idiomas: medidor tipo tacómetro sobre la escala MCER ─ */
const CEFR = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Nativo'];

const polar = (deg: number, r: number) => {
  const rad = (deg * Math.PI) / 180;
  return { x: 80 + r * Math.cos(rad), y: 80 + r * Math.sin(rad) };
};

const LanguageGauge: React.FC<{ name: string; code: string; level: number; label: string; color: string }> = ({ name, code, level, label, color }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const frac = level / (CEFR.length - 1);
  const needleDeg = -180 + frac * 180;

  return (
    <SpotlightCard tilt={5} className="group glass border border-white/5 hover:border-white/15 rounded-2xl p-6 flex items-center gap-6 transition-colors duration-300">
      <div ref={ref} className="relative w-40 flex-shrink-0">
        <svg viewBox="0 0 160 96" className="w-full h-auto overflow-visible" aria-hidden="true">
          <path d="M 12 80 A 68 68 0 0 1 148 80" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="8" strokeLinecap="round" className="text-gray-300" />
          <path
            d="M 12 80 A 68 68 0 0 1 148 80"
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            style={{ strokeDashoffset: inView ? 1 - frac : 1, transition: 'stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.2s' }}
          />
          {CEFR.map((c, i) => {
            const deg = -180 + (i / (CEFR.length - 1)) * 180;
            const a = polar(deg, 56);
            const b = polar(deg, 50);
            const t = polar(deg, 40);
            const on = i === level;
            return (
              <g key={c}>
                <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="currentColor" strokeOpacity={on ? 0.9 : 0.3} className="text-gray-300" />
                {c !== 'Nativo' && (
                  <text x={t.x} y={t.y + 3} textAnchor="middle" className={`font-mono text-[7px] ${on ? 'fill-white' : 'fill-gray-600'}`}>{c}</text>
                )}
              </g>
            );
          })}
          <g
            className="gauge-needle"
            style={{ transform: `rotate(${inView ? needleDeg + 180 : 0}deg)` }}
          >
            <line x1="80" y1="80" x2="30" y2="80" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          </g>
          <circle cx="80" cy="80" r="5" className="fill-gray-200" />
        </svg>
      </div>

      <div className="min-w-0">
        <span className="inline-block text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border mb-2" style={{ color, borderColor: `${color}55` }}>
          {code}
        </span>
        <p className="font-display text-2xl font-bold text-white leading-none">{name}</p>
        <p className="text-sm text-gray-400 mt-2">{label}</p>
      </div>
    </SpotlightCard>
  );
};

const Skills: React.FC = () => (
  <section id="habilidades" className="py-24 px-6 md:px-12 scroll-mt-16">
    <div className="container mx-auto max-w-6xl">
      <SectionHeading index="05" title="Habilidades" subtitle="Lo que uso en el día a día, mostrado como lo verías trabajando conmigo." />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Reveal className="lg:col-span-2">
          <LanguagesCard />
        </Reveal>
        <Reveal delay={0.08} className="lg:row-span-2">
          <InfraCard />
        </Reveal>
        <Reveal delay={0.12}>
          <BackendCard />
        </Reveal>
        <Reveal delay={0.16}>
          <FrontendCard />
        </Reveal>
      </div>

      <Reveal className="mt-10">
        <div className="rounded-2xl border border-dashed border-white/10 p-6">
          <p className="text-sm font-medium text-gray-400 mb-5">También he trabajado con</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {complementary.map(({ group, items }) => (
              <div key={group}>
                <p className="text-[11px] font-mono uppercase tracking-widest text-gray-600 mb-2.5">{group}</p>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-0.5 rounded-md border border-white/5 text-gray-500 transition-colors duration-200 hover:text-emerald-300 hover:border-emerald-500/30 cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
        <Reveal>
          <LanguageGauge name="Español" code="ES" level={6} label="Lengua materna" color="#34D399" />
        </Reveal>
        <Reveal delay={0.1}>
          <LanguageGauge name="Inglés" code="EN" level={3} label="B2 · Upper Intermediate" color="#60A5FA" />
        </Reveal>
      </div>
    </div>
  </section>
);

export default Skills;
