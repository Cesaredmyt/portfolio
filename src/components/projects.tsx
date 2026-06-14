import React from 'react';
import { FaShieldAlt, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { MdBarChart } from 'react-icons/md';
import { useInView } from '../hooks/useInView';

type BadgeVariant = 'blue' | 'emerald' | 'yellow' | 'purple' | 'orange' | 'gray' | 'red' | 'cyan';

interface Tech {
  label: string;
  variant: BadgeVariant;
}

const variantClass: Record<BadgeVariant, string> = {
  blue:    'bg-blue-500/15 text-blue-300 border border-blue-500/20',
  emerald: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20',
  yellow:  'bg-yellow-500/15 text-yellow-300 border border-yellow-500/20',
  purple:  'bg-purple-500/15 text-purple-300 border border-purple-500/20',
  orange:  'bg-orange-500/15 text-orange-300 border border-orange-500/20',
  gray:    'bg-gray-700/50 text-gray-300 border border-gray-600/30',
  red:     'bg-red-500/15 text-red-300 border border-red-500/20',
  cyan:    'bg-cyan-500/15 text-cyan-300 border border-cyan-500/20',
};

function TechBadge({ label, variant }: Tech) {
  return (
    <span className={`text-xs font-mono px-2.5 py-1 rounded-md ${variantClass[variant]}`}>
      {label}
    </span>
  );
}

function ProjectCard({
  title,
  year,
  description,
  tech,
  github,
  featured,
  headerNode,
  image,
  highlights,
}: {
  title: string;
  year?: string;
  description: string;
  tech: Tech[];
  github?: string;
  featured?: boolean;
  headerNode?: React.ReactNode;
  image?: string;
  highlights?: string[];
}) {
  return (
    <div
      className={`group flex flex-col h-full bg-gray-900 rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        featured
          ? 'border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-emerald-500/5'
          : 'border-white/5 hover:border-white/15 hover:shadow-black/40'
      }`}
    >
      {/* Header visual */}
      <div className="relative aspect-video overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={`Imagen del proyecto ${title}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          headerNode
        )}
        {year && (
          <span
            className={`absolute top-3 right-3 text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
              featured
                ? 'bg-emerald-500 text-gray-950'
                : 'bg-gray-800/90 text-gray-300 border border-white/10'
            }`}
          >
            {year}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
        <p className="text-sm text-gray-400 mb-4 leading-relaxed flex-1">{description}</p>

        {highlights && highlights.length > 0 && (
          <ul className="mb-4 space-y-1">
            {highlights.map((h) => (
              <li key={h} className="text-xs text-gray-500 font-mono flex items-start gap-2">
                <span className="text-emerald-500 mt-0.5">›</span>
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-1.5 mb-5">
          {tech.map((t) => (
            <TechBadge key={t.label} {...t} />
          ))}
        </div>

        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 w-fit cursor-pointer ${
              featured
                ? 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/20'
                : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
            }`}
          >
            <FaGithub size={14} />
            Ver en GitHub
            <FaExternalLinkAlt size={10} className="opacity-50" />
          </a>
        )}
      </div>
    </div>
  );
}

const Projects: React.FC = () => {
  const { ref: headRef, inView: headInView } = useInView();
  const { ref: featuredRef, inView: featuredInView } = useInView();
  const { ref: earlierRef, inView: earlierInView } = useInView();

  return (
    <section id="proyectos" className="bg-gray-950 text-white py-14 px-6 md:px-12">
      <div className="container mx-auto max-w-6xl">

        {/* Section header */}
        <div ref={headRef} className={`text-center mb-10 reveal ${headInView ? 'visible' : ''}`}>
          <p className="text-emerald-400 font-mono text-sm mb-2 tracking-widest">
            <span className="opacity-40">// </span>mis trabajos
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Proyectos</h2>
        </div>

        {/* ── Featured 2026 ── */}
        <p className="text-xs font-mono text-gray-600 tracking-[0.2em] uppercase mb-4">
          Destacados · 2026
        </p>
        <div ref={featuredRef} className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <div className={`reveal h-full ${featuredInView ? 'visible' : ''}`} style={{ transitionDelay: '0s' }}>
            <ProjectCard
              featured
              year="2026"
              title="IMPA — Plataforma de Adopciones"
              description="Plataforma full-stack para gestión municipal de bienestar animal: adopciones, citas, esterilizaciones y reportes de maltrato. Lideré la arquitectura backend con autenticación JWT y control de acceso basado en roles (RBAC)."
              tech={[
                { label: 'Next.js', variant: 'gray' },
                { label: 'TypeScript', variant: 'blue' },
                { label: 'Supabase', variant: 'emerald' },
                { label: 'PostgreSQL', variant: 'blue' },
                { label: 'Docker', variant: 'cyan' },
                { label: 'Vitest', variant: 'yellow' },
              ]}
              highlights={[
                'JWT + RBAC auth system',
                'Esquema BD: adopción, citas, esterilizaciones, reportes',
                'Containerizado con Docker',
                'Equipo de 4 — Líder técnico backend',
              ]}
              github="https://github.com/Cesaredmyt/Adopciones-IMPA"
              image="/img/IMPA.png"
            />
          </div>

          <div className={`reveal h-full ${featuredInView ? 'visible' : ''}`} style={{ transitionDelay: '0.15s' }}>
            <ProjectCard
              featured
              year="2026"
              title="Detección de Fraude & Phishing"
              description="Sistema híbrido de ML (supervisado + no supervisado) para detectar fraude en transacciones financieras. Investigación académica bajo metodología CRISP-DM, entrenado en 2 datasets públicos con +6M transacciones."
              tech={[
                { label: 'Python', variant: 'yellow' },
                { label: 'scikit-learn', variant: 'orange' },
                { label: 'XGBoost', variant: 'orange' },
                { label: 'Random Forest', variant: 'orange' },
                { label: 'Isolation Forest', variant: 'orange' },
                { label: 'PostgreSQL', variant: 'blue' },
                { label: 'Pytest', variant: 'purple' },
              ]}
              highlights={[
                'PaySim → F1: 0.998 | AUC-ROC: 1.000',
                'Credit Card → F1: 0.875 | AUC-ROC: 0.968',
                'Supera sistema basado en reglas en todas las métricas',
                '281K + 6.3M transacciones evaluadas',
              ]}
              github="https://github.com/Cesaredmyt/fraud-detection-itm"
              headerNode={
                <div className="w-full h-full bg-gradient-to-br from-blue-950 via-gray-900 to-gray-950 flex items-center justify-center relative">
                  <FaShieldAlt size={90} className="text-blue-500/10 absolute" />
                  <div className="flex flex-col items-center gap-2 z-10">
                    <div className="flex items-center gap-3">
                      <FaShieldAlt size={36} className="text-blue-400/80" />
                      <MdBarChart size={44} className="text-blue-300/60" />
                    </div>
                    <span className="font-mono text-xs text-blue-400/40 tracking-wider">fraud-detection-itm</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                </div>
              }
            />
          </div>
        </div>

        {/* ── Earlier projects ── */}
        <p className="text-xs font-mono text-gray-600 tracking-[0.2em] uppercase mb-4">
          Proyectos anteriores
        </p>
        <div ref={earlierRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              year: '2025',
              title: 'ProjeXus',
              description: 'Plataforma web para administración de concursos académicos y culturales por etapas a nivel regional. Responsable del diseño de BD y backend REST con Spring Boot.',
              tech: [
                { label: 'Next.js', variant: 'gray' as BadgeVariant },
                { label: 'Spring Boot', variant: 'emerald' as BadgeVariant },
                { label: 'PostgreSQL', variant: 'blue' as BadgeVariant },
              ],
              github: 'https://github.com/TonyMed12/ProjeXus',
              image: '/img/Projexus.jpg',
            },
            {
              title: 'Aquamarine Resort',
              description: 'Diseño y desarrollo de un sitio web para un concepto de hotelería con sistema de reservas.',
              tech: [
                { label: 'HTML', variant: 'orange' as BadgeVariant },
                { label: 'CSS', variant: 'blue' as BadgeVariant },
                { label: 'PHP', variant: 'purple' as BadgeVariant },
              ],
              github: 'https://github.com/Cesaredmyt/Aquamarine-Resort',
              image: '/img/hotel.png',
            },
            {
              title: 'Biblioteca Digital',
              description: 'Sistema de gestión de bibliotecas para optimizar el inventario y la administración de préstamos.',
              tech: [
                { label: 'Java', variant: 'red' as BadgeVariant },
                { label: 'PHP', variant: 'purple' as BadgeVariant },
                { label: 'MySQL', variant: 'blue' as BadgeVariant },
              ],
              image: '/img/biblioteca.jpg',
            },
          ].map((p, i) => (
            <div
              key={p.title}
              className={`reveal h-full ${earlierInView ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <ProjectCard {...p} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Projects;
