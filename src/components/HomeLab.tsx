import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimationFrame, useInView, useReducedMotion } from 'motion/react';
import { FaCheck, FaTimes, FaRobot, FaTelegramPlane, FaUserAstronaut, FaChessPawn, FaChessRook } from 'react-icons/fa';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import SpotlightCard from './ui/SpotlightCard';
import { agents, layers, nodes, ringLabels, ringLabelsEn } from '../data/homelab';
import { useLanguage } from '../context/LanguageContext';

const RADII = [42, 86, 128, 170, 212];
const SAT_ORBIT = 242;

const polar = (r: number, deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return { x: r * Math.cos(rad), y: r * Math.sin(rad) };
};

const OrbitDiagram: React.FC<{ activeRing: number; onRing: (ring: number) => void; labels: string[]; ariaLabel: string }> = ({ activeRing, onRing, labels, ariaLabel }) => {
  const satRef = useRef<SVGGElement>(null);
  const labelRefs = useRef<(SVGGElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const reduced = useReducedMotion();
  // Solo anima los satélites mientras el diagrama está en pantalla.
  const visible = useInView(svgRef, { margin: '100px' });

  useAnimationFrame((t) => {
    if (reduced || !visible || !satRef.current) return;
    const deg = (t / 1000) * 9;
    satRef.current.setAttribute('transform', `rotate(${deg})`);
    labelRefs.current.forEach((el) => {
      if (!el) return;
      const x = el.dataset.x ?? '0';
      const y = el.dataset.y ?? '0';
      el.setAttribute('transform', `rotate(${-deg} ${x} ${y})`);
    });
  });

  const dim = (ring: number) => activeRing !== -1 && activeRing !== ring;

  return (
    <svg ref={svgRef} viewBox="-270 -270 540 540" className="w-full h-auto select-none" role="img" aria-label={ariaLabel}>
      <defs>
        <radialGradient id="core-glow">
          <stop offset="0%" stopColor="rgb(16 185 129)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="rgb(16 185 129)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {RADII.slice(1).map((r, i) => {
        const ring = i + 1;
        const on = activeRing === ring;
        return (
          <g key={r} onPointerEnter={() => onRing(ring)} className="cursor-pointer">
            <circle r={r} fill="none" stroke="transparent" strokeWidth={34} />
            <circle
              r={r}
              fill="none"
              stroke={on ? 'rgb(52 211 153)' : 'currentColor'}
              strokeOpacity={on ? 0.8 : 0.14}
              strokeWidth={on ? 1.4 : 1}
              strokeDasharray={ring % 2 ? '2 6' : undefined}
              className="text-gray-400 transition-all duration-300"
            />
            <text
              x={0}
              y={-r + 13}
              textAnchor="middle"
              className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${on ? 'fill-emerald-400' : 'fill-gray-500'}`}
            >
              {labels[ring]}
            </text>
          </g>
        );
      })}

      <circle
        r={SAT_ORBIT}
        fill="none"
        stroke={activeRing === 5 ? 'rgb(129 140 248)' : 'currentColor'}
        strokeOpacity={activeRing === 5 ? 0.7 : 0.08}
        strokeDasharray="1 5"
        className="text-gray-400 transition-all duration-300"
      />

      {nodes.map(([ring, angle, label]) => {
        const { x, y } = polar(RADII[ring], angle);
        const out = polar(RADII[ring] + 1, angle);
        const faded = dim(ring);
        const on = activeRing === ring;
        return (
          <g key={label} style={{ opacity: faded ? 0.25 : 1 }} className="lab-node transition-opacity duration-300">
            <circle cx={x} cy={y} r={on ? 5 : 3.5} className={on ? 'fill-emerald-400' : 'fill-gray-300'} />
            {on && <circle cx={x} cy={y} r={11} className="fill-emerald-400/20" />}
            <text
              x={out.x + (Math.cos((angle * Math.PI) / 180) >= 0 ? 9 : -9)}
              y={out.y + 3.5}
              textAnchor={Math.cos((angle * Math.PI) / 180) >= 0 ? 'start' : 'end'}
              className={`font-mono text-[10.5px] ${on ? 'fill-white' : 'fill-gray-400'}`}
            >
              {label}
            </text>
          </g>
        );
      })}

      {/* Núcleo */}
      <g onPointerEnter={() => onRing(-1)}>
        <circle r={80} fill="url(#core-glow)" />
        <circle r={RADII[0]} className="fill-gray-950 stroke-emerald-400/60" strokeWidth={1.2} />
        <text y={-3} textAnchor="middle" className="font-display text-[12px] font-bold fill-white">Ubuntu</text>
        <text y={12} textAnchor="middle" className="font-mono text-[9px] fill-emerald-400">docker</text>
      </g>

      {/* Satélites: agentes de IA */}
      <g ref={satRef} style={{ opacity: dim(5) ? 0.3 : 1 }} className="transition-opacity duration-300">
        {[
          { angle: 30, label: 'Nano', color: 'fill-sky-400' },
          { angle: 210, label: 'Sysadmin', color: 'fill-amber-400' },
        ].map(({ angle, label, color }, i) => {
          const { x, y } = polar(SAT_ORBIT, angle);
          return (
            <g key={label} ref={(el) => { labelRefs.current[i] = el; }} data-x={x} data-y={y}>
              <rect x={x - 7} y={y - 4} width={14} height={8} rx={2} className={color} />
              <rect x={x - 17} y={y - 2} width={8} height={4} className="fill-indigo-300/60" />
              <rect x={x + 9} y={y - 2} width={8} height={4} className="fill-indigo-300/60" />
              <text x={x} y={y + 20} textAnchor="middle" className="font-mono text-[10px] fill-gray-300">{label}</text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

const HomeLab: React.FC = () => {
  const { language, tr } = useLanguage();
  const [activeId, setActiveId] = useState('agentes');
  const [showAgents, setShowAgents] = useState(false);
  const active = layers.find((l) => l.id === activeId)!;

  const selectRing = (ring: number) => {
    const match = layers.find((l) => l.ring === ring);
    if (match) setActiveId(match.id);
  };

  return (
    <section id="homelab" className="relative py-24 px-6 md:px-12 scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          title="Home Lab"
          badge={
            <span className="flex items-center gap-2 text-xs font-medium text-emerald-300 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-full">
              <FaUserAstronaut size={12} /> {tr('Proyecto personal', 'Personal project')}
            </span>
          }
          subtitle={tr('Servidor self-hosted que diseño, despliego y opero: red, identidad, respaldos, observabilidad y agentes con permisos segmentados.', 'A self-hosted server I design, deploy and operate: networking, identity, backups, observability and agents with segmented permissions.')}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 items-start">
          <Reveal className="lg:sticky lg:top-24">
            <OrbitDiagram
              activeRing={active.ring}
              onRing={selectRing}
              labels={language === 'es' ? ringLabels : ringLabelsEn}
              ariaLabel={tr('Diagrama orbital de la arquitectura del home lab', 'Orbital diagram of the home lab architecture')}
            />
          </Reveal>

          <div className="flex flex-col gap-2">
            {layers.map((layer, i) => {
              const on = layer.id === activeId;
              return (
                <Reveal key={layer.id} delay={i * 0.05}>
                  <motion.button
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    onClick={() => setActiveId(layer.id)}
                    onPointerEnter={() => setActiveId(layer.id)}
                    className={`w-full text-left rounded-xl border px-5 py-4 transition-colors duration-300 cursor-pointer ${
                      on ? 'glass border-emerald-500/30' : 'border-white/5 hover:border-white/10 hover:bg-white/2'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`font-mono text-xs ${on ? 'text-emerald-400' : 'text-gray-600'}`}>0{i + 1}</span>
                      <span className={`font-display font-semibold ${on ? 'text-white' : 'text-gray-300'}`}>{language === 'es' ? layer.title : layer.titleEn}</span>
                      <span className="ml-auto text-xs text-gray-500 hidden sm:block">{language === 'es' ? layer.short : layer.shortEn}</span>
                    </div>
                    <AnimatePresence initial={false}>
                      {on && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <ul className="mt-4 space-y-2">
                            {layer.items.map((it) => (
                              <li key={it.name} className="text-sm text-gray-400 flex gap-2">
                                <span className="text-emerald-500 mt-0.5">›</span>
                                <span><span className="font-mono text-gray-200">{it.name}</span> — {language === 'es' ? it.detail : it.detailEn}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="mt-4 text-sm text-emerald-300/90 border-l-2 border-emerald-500/40 pl-3">{language === 'es' ? layer.why : layer.whyEn}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAgents((value) => !value)}
            aria-expanded={showAgents}
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-300 border border-emerald-500/25 hover:bg-emerald-500/10 px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
          >
            <FaRobot size={13} />
            {showAgents ? tr('Ocultar modelo de seguridad de agentes', 'Hide agent security model') : tr('Explorar seguridad de agentes', 'Explore agent security')}
          </button>
        </div>

        <AnimatePresence initial={false}>
        {showAgents && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
        <div className="mt-16">
          <Reveal className="text-center mb-10">
            <h3 className="font-display text-3xl md:text-4xl font-bold text-white">{tr('Dos agentes, dos niveles de confianza', 'Two agents, two trust levels')}</h3>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
              {tr('El foco no es solo usar IA: es aplicar segmentación de permisos, sandboxing y menor privilegio sobre infraestructura real.', 'The focus is not merely using AI: it is applying permission boundaries, sandboxing and least privilege to real infrastructure.')}
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {agents.map((agent, i) => (
              <Reveal key={agent.name} delay={i * 0.12} className="h-full">
                <SpotlightCard tilt={6} className="group h-full glass border border-white/8 hover:border-white/15 rounded-2xl p-6 transition-colors duration-300">
                  <div className="flex items-center gap-3 mb-5">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6 ${
                      i === 0 ? 'bg-sky-500/10 border-sky-500/25 text-sky-300' : 'bg-amber-500/10 border-amber-500/25 text-amber-300'
                    }`}>
                      {i === 0 ? <FaTelegramPlane size={18} /> : <FaRobot size={18} />}
                    </div>
                    <div>
                      <p className="font-display text-xl font-bold text-white flex items-center gap-2">
                        {agent.name}
                        <span
                          title={i === 0 ? tr('Peón: pocos movimientos, ningún acceso a la infraestructura', 'Pawn: limited moves and no infrastructure access') : tr('Torre: más alcance, siempre bajo reglas', 'Rook: broader reach, always constrained by rules')}
                          className="agent-piece text-gray-600 group-hover:text-gray-300"
                        >
                          {i === 0 ? <FaChessPawn size={13} /> : <FaChessRook size={13} />}
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">{language === 'es' ? agent.role : agent.roleEn} · <span className="font-mono">{language === 'es' ? agent.channel : agent.channelEn}</span></p>
                    </div>
                  </div>
                  <ul className="space-y-2.5">
                    {agent.perms.map((p) => (
                      <li key={p.label} className="flex items-center gap-3 text-sm transition-transform duration-200 hover:translate-x-1">
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 ${
                          p.ok ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                          {p.ok ? <FaCheck size={9} /> : <FaTimes size={9} />}
                        </span>
                        <span className={p.ok ? 'text-gray-300' : 'text-gray-500 line-through decoration-red-500/40'}>{language === 'es' ? p.label : p.labelEn}</span>
                      </li>
                    ))}
                  </ul>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
        </motion.div>
        )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HomeLab;
