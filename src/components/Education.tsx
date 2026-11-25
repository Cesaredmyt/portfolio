import React from 'react';
import { FaGraduationCap, FaStar, FaCertificate, FaGoogle, FaExternalLinkAlt } from 'react-icons/fa';
import SectionHeading from './ui/SectionHeading';
import Reveal from './ui/Reveal';
import SpotlightCard from './ui/SpotlightCard';
import { useLanguage } from '../context/LanguageContext';

interface Cert {
  title: string;
  titleEn?: string;
  issuer: string;
  issuerEn?: string;
  date: string;
  detail?: string;
  detailEn?: string;
  url?: string;
  extra?: { url: string; es: string; en: string };
  courses?: string[];
  accent: 'blue';
}

const certs: Cert[] = [
  {
    title: 'Google Cloud Engineering Certificate',
    issuer: 'Google Cloud',
    date: 'Nov 2026',
    url: 'https://www.credly.com/badges/b6d93cb1-a902-4b4b-8cc1-673106845d63',
    extra: {
      url: 'https://www.skills.google/public_profiles/f63a31d6-8a03-46d7-b0dd-08d93673b2ab',
      es: 'Ver las 10 insignias en Google Skills',
      en: 'See the 10 badges on Google Skills',
    },
    accent: 'blue',
  },
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
  {
    title: 'Inteligencia Artificial Aplicada, nivel intermedio',
    titleEn: 'Applied Artificial Intelligence, intermediate level',
    issuer: 'INFOTEC · Gobierno de México',
    issuerEn: 'INFOTEC · Government of Mexico',
    date: '2026',
    detail: 'Curso de 30 horas · 20 jul – 21 ago 2026',
    detailEn: '30-hour course · Jul 20 – Aug 21, 2026',
    url: 'https://www.epc.gob.mx/acreditacion/9e3ff94c-76c0-45aa-b754-cf2c39e2a105',
    accent: 'blue',
  },
];

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
              <h4 className="font-display font-semibold text-white leading-snug">{language === 'es' ? c.title : c.titleEn ?? c.title}</h4>
              <p className="text-sm text-gray-500 mt-1 mb-4">{language === 'es' ? c.issuer : c.issuerEn ?? c.issuer}</p>
              {c.detail && <p className="text-xs font-mono text-gray-500 mb-4">{language === 'es' ? c.detail : c.detailEn ?? c.detail}</p>}

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

              <div className="mt-auto flex flex-col gap-2">
                {[
                  ...(c.url ? [{ url: c.url, label: tr('Verificar credencial', 'Verify credential') }] : []),
                  ...(c.extra ? [{ url: c.extra.url, label: tr(c.extra.es, c.extra.en) }] : []),
                ].map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/link relative z-10 inline-flex items-center gap-1.5 text-xs text-emerald-300 hover:text-emerald-200 w-fit"
                  >
                    {link.label}
                    <FaExternalLinkAlt size={9} className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                ))}
              </div>
            </SpotlightCard>
          </Reveal>
        ))}

      </div>
    </div>
  </section>
  );
};

export default Education;
