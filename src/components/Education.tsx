import React from 'react';
import { motion } from 'motion/react';
import { FaGraduationCap, FaStar, FaCertificate, FaGoogle, FaExternalLinkAlt } from 'react-icons/fa';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import SpotlightCard from './ui/SpotlightCard';
import { useLanguage } from '../context/LanguageContext';

interface Cert {
  title: string;
  issuer: string;
  date: string;
  url?: string;
  courses?: string[];
  accent: 'blue';
}

const certs: Cert[] = [
  {
    title: 'Google AI Professional Certificate',
    issuer: 'Google · Coursera',
    date: 'Ago 2026',
    url: 'https://coursera.org/verify/professional-cert/YGE1TV7LKSU2',
    accent: 'blue',
    courses: [
      'AI Fundamentals',
      'Brainstorming and Planning',
      'Research and Insights',
      'Writing and Communicating',
      'Content Creation',
      'Data Analysis',
      'App Building',
    ],
  },
];

const inProgress = {
  title: 'Google Cloud Engineering Certificate',
  issuer: 'Google Cloud Career Launchpad · LatAm',
  progress: 22,
};

const accentClass = {
  blue: 'bg-blue-500/10 border-blue-500/20 text-blue-300',
};

const Education: React.FC = () => {
  const { language, tr } = useLanguage();

  return (
  <section id="certificaciones" className="py-24 px-6 md:px-12 scroll-mt-16">
    <div className="container mx-auto max-w-6xl">
      <SectionHeading index="05" title={tr('Formación y certificaciones', 'Education and certifications')} />

      <Reveal>
        <SpotlightCard
          tilt={3}
          className="group glass border border-white/5 hover:border-emerald-500/25 rounded-2xl p-6 md:p-7 transition-colors duration-300 flex flex-col md:flex-row items-start md:items-center gap-6 mb-6"
        >
          <div className="flex-shrink-0 w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
            <FaGraduationCap size={26} className="text-emerald-400" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-display font-bold text-white text-lg md:text-xl leading-tight">
              {tr('Ingeniería en Sistemas Computacionales', 'Computer Systems Engineering')}
            </h3>
            <p className="text-sm text-gray-400 mt-1">{tr('Especialidad en Tecnologías de Desarrollo de Software', 'Software Development Technologies specialization')}</p>
            <p className="text-sm text-gray-500 mt-1">Instituto Tecnológico de Morelia · TecNM</p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className="text-xs font-mono text-gray-400 border border-white/10 px-2.5 py-1 rounded-lg">
                {tr('En curso · egreso estimado 2027', 'In progress · expected 2027')}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                <FaStar size={9} className="transition-transform duration-700 group-hover:rotate-[144deg]" />
                {tr('Mejor promedio — 7° semestre', 'Top academic average — 7th semester')}
              </span>
            </div>
          </div>

          <div className="flex-shrink-0 text-center md:border-l border-white/5 md:pl-8">
            <p className="font-display text-5xl font-bold text-emerald-400 leading-none text-glow transition-transform duration-300 group-hover:scale-110">94</p>
            <p className="text-xs text-gray-500 mt-1 tracking-wide">{tr('Promedio', 'Average')}</p>
          </div>
        </SpotlightCard>
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {certs.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.1} className="h-full">
            <SpotlightCard
              tilt={7}
              className="group h-full glass border border-white/5 hover:border-white/15 rounded-2xl p-6 flex flex-col transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-transform duration-500 group-hover:rotate-[360deg] ${accentClass[c.accent]}`}>
                  {c.issuer.startsWith('Google') ? <FaGoogle size={15} /> : <FaCertificate size={16} />}
                </div>
                <span className="text-xs font-mono text-gray-500">{language === 'es' ? c.date : c.date.replace('Ago', 'Aug')}</span>
              </div>
              <h4 className="font-display font-semibold text-white leading-snug">{c.title}</h4>
              <p className="text-sm text-gray-500 mt-1 mb-4">{c.issuer}</p>

              {c.courses && (
                <div className="mb-4">
                  <p className="text-xs font-mono text-gray-500 mb-2">{c.courses.length} {tr('cursos', 'courses')}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {c.courses.map((course, k) => (
                      <span
                        key={course}
                        style={{ transitionDelay: `${k * 30}ms` }}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-gray-400 transition-all duration-300 group-hover:border-blue-400/30 group-hover:text-gray-200"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {c.url && (
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link relative z-10 mt-auto inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-emerald-200 w-fit"
                >
                  {tr('Verificar credencial', 'Verify credential')}
                  <FaExternalLinkAlt size={9} className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </a>
              )}
            </SpotlightCard>
          </Reveal>
        ))}

        <Reveal delay={0.2} className="h-full">
          <SpotlightCard
            tilt={7}
            className="group h-full glass border border-dashed border-sky-500/25 hover:border-sky-500/50 rounded-2xl p-6 flex flex-col transition-colors duration-300"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-300 transition-transform duration-500 group-hover:rotate-[360deg]">
                <FaGoogle size={15} />
              </div>
              <span className="flex items-center gap-1.5 text-xs font-mono text-sky-300">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" /> {tr('en curso', 'in progress')}
              </span>
            </div>
            <h4 className="font-display font-semibold text-white leading-snug">{inProgress.title}</h4>
            <p className="text-sm text-gray-500 mt-1 mb-5">{inProgress.issuer}</p>
            <div className="mt-auto">
              <div className="flex justify-between text-[11px] font-mono text-gray-500 mb-1.5">
                <span>{tr('progreso', 'progress')}</span>
                <span>{inProgress.progress}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  style={{ width: `${inProgress.progress}%`, originX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400"
                />
              </div>
            </div>
          </SpotlightCard>
        </Reveal>
      </div>
    </div>
  </section>
  );
};

export default Education;
