import React from 'react';
import {
  FaJava,
  FaJs,
  FaPython,
  FaReact,
  FaNodeJs,
  FaDocker,
  FaGitAlt,
  FaDatabase,
  FaCode,
  FaPhp,
} from 'react-icons/fa';
import { SiPostgresql, SiMysql, SiSpringboot, SiTypescript, SiTailwindcss } from 'react-icons/si';
import { TbBrandNextjs } from 'react-icons/tb';
import { useInView } from '../hooks/useInView';

interface SkillIcon {
  icon: React.ReactNode;
  label: string;
}

function SkillItem({ icon, label, delay = 0 }: SkillIcon & { delay?: number }) {
  return (
    <div
      className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-white/5 hover:border-emerald-500/25 hover:bg-white/4 transition-all duration-200 group cursor-default"
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="text-gray-500 group-hover:text-white transition-colors duration-200">
        {icon}
      </div>
      <span className="text-xs font-medium text-gray-600 group-hover:text-gray-300 transition-colors duration-200 text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

function TextBadge({ label, color = 'gray' }: { label: string; color?: 'orange' | 'purple' | 'blue' | 'gray' | 'emerald' }) {
  const colorMap = {
    orange:  'border-orange-500/20 text-orange-300/70 hover:text-orange-300 hover:border-orange-500/40 hover:bg-orange-500/5',
    purple:  'border-purple-500/20 text-purple-300/70 hover:text-purple-300 hover:border-purple-500/40 hover:bg-purple-500/5',
    blue:    'border-blue-500/20 text-blue-300/70 hover:text-blue-300 hover:border-blue-500/40 hover:bg-blue-500/5',
    emerald: 'border-emerald-500/20 text-emerald-300/70 hover:text-emerald-300 hover:border-emerald-500/40 hover:bg-emerald-500/5',
    gray:    'border-gray-700/40 text-gray-500 hover:text-gray-300 hover:border-gray-500/40 hover:bg-white/3',
  };
  return (
    <span className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition-all duration-200 cursor-default ${colorMap[color]}`}>
      {label}
    </span>
  );
}

const languages: (SkillIcon & { delay?: number })[] = [
  { icon: <SiTypescript size={44} />, label: 'TypeScript', delay: 0 },
  { icon: <FaJs size={44} />, label: 'JavaScript', delay: 0.05 },
  { icon: <FaPython size={44} />, label: 'Python', delay: 0.10 },
  { icon: <FaJava size={44} />, label: 'Java', delay: 0.15 },
  { icon: <FaCode size={44} />, label: 'C#', delay: 0.20 },
  { icon: <FaPhp size={44} />, label: 'PHP', delay: 0.25 },
  { icon: <FaDatabase size={44} />, label: 'SQL', delay: 0.30 },
];

const frontend: (SkillIcon & { delay?: number })[] = [
  { icon: <TbBrandNextjs size={44} />, label: 'Next.js', delay: 0 },
  { icon: <FaReact size={44} />, label: 'React', delay: 0.07 },
  { icon: <SiTailwindcss size={44} />, label: 'Tailwind CSS', delay: 0.14 },
];

const backend: (SkillIcon & { delay?: number })[] = [
  { icon: <FaNodeJs size={44} />, label: 'Node.js', delay: 0 },
  { icon: <SiSpringboot size={44} />, label: 'Spring Boot', delay: 0.07 },
];

const databases: (SkillIcon & { delay?: number })[] = [
  { icon: <SiPostgresql size={44} />, label: 'PostgreSQL', delay: 0 },
  { icon: <SiMysql size={44} />, label: 'MySQL', delay: 0.07 },
];

const devops: (SkillIcon & { delay?: number })[] = [
  { icon: <FaDocker size={44} />, label: 'Docker', delay: 0 },
  { icon: <FaGitAlt size={44} />, label: 'Git', delay: 0.07 },
];

function SkillGroup({ title, items, inView }: { title: string; items: (SkillIcon & { delay?: number })[]; inView: boolean }) {
  return (
    <div className="mb-8">
      <p className="text-xs font-mono text-gray-600 tracking-[0.2em] uppercase mb-4">{title}</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className={`reveal ${inView ? 'visible' : ''}`}
            style={{ transitionDelay: `${item.delay ?? 0}s` }}
          >
            <SkillItem {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}

const langs = [
  { name: 'Español', level: 'Nativo', pct: 100, color: 'bg-emerald-500' },
  { name: 'Inglés', level: 'B2 Upper Intermediate', pct: 72, color: 'bg-blue-400' },
];

function LanguageBars() {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`reveal ${inView ? 'visible' : ''}`}>
      <p className="text-xs font-mono text-gray-600 tracking-[0.2em] uppercase mb-4">Idiomas</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {langs.map(({ name, level, pct, color }) => (
          <div key={name} className="bg-gray-900 border border-white/5 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2.5">
              <span className="text-sm font-semibold text-white">{name}</span>
              <span className="text-xs font-mono text-gray-500">{level}</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: inView ? `${pct}%` : '0%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Skills: React.FC = () => {
  const { ref: headRef, inView: headInView } = useInView();
  const { ref: iconRef, inView: iconInView } = useInView(0.08);
  const { ref: badgeRef, inView: badgeInView } = useInView();

  return (
    <section id="habilidades" className="bg-gray-950 text-white py-14 px-6 md:px-12 border-t border-white/5">
      <div className="container mx-auto max-w-6xl">

        <div ref={headRef} className={`text-center mb-10 reveal ${headInView ? 'visible' : ''}`}>
          <p className="text-emerald-400 font-mono text-sm mb-2 tracking-widest">
            <span className="opacity-40">// </span>stack técnico
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Habilidades</h2>
        </div>

        <div ref={iconRef}>
          <SkillGroup title="Lenguajes de programación" items={languages} inView={iconInView} />
          <SkillGroup title="Frontend" items={frontend} inView={iconInView} />
          <SkillGroup title="Backend" items={backend} inView={iconInView} />
          <SkillGroup title="Bases de datos" items={databases} inView={iconInView} />
          <SkillGroup title="DevOps & Herramientas" items={devops} inView={iconInView} />
        </div>

        {/* Text-badge sections */}
        <div ref={badgeRef} className={`reveal ${badgeInView ? 'visible' : ''}`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-2 mb-10">
            <div>
              <p className="text-xs font-mono text-gray-600 tracking-[0.2em] uppercase mb-4">ML & Datos</p>
              <div className="flex flex-wrap gap-2">
                {['scikit-learn', 'XGBoost', 'Random Forest', 'Isolation Forest', 'Pandas', 'NumPy', 'CRISP-DM'].map(
                  (t) => <TextBadge key={t} label={t} color="orange" />
                )}
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-gray-600 tracking-[0.2em] uppercase mb-4">Testing & Calidad</p>
              <div className="flex flex-wrap gap-2">
                {['Vitest', 'Pytest', 'ESLint', 'Ruff', 'Mypy'].map(
                  (t) => <TextBadge key={t} label={t} color="purple" />
                )}
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-gray-600 tracking-[0.2em] uppercase mb-4">Metodologías</p>
              <div className="flex flex-wrap gap-2">
                {['REST APIs', 'Agile', 'MVC', 'OOP', 'CRISP-DM', 'JWT / RBAC'].map(
                  (t) => <TextBadge key={t} label={t} color="emerald" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Language bars */}
        <LanguageBars />

      </div>
    </section>
  );
};

export default Skills;
