import React from 'react';
import { FaGraduationCap, FaStar } from 'react-icons/fa';
import { useInView } from '../hooks/useInView';

const Education: React.FC = () => {
  const { ref, inView } = useInView();

  return (
    <section className="bg-gray-950 px-6 md:px-12 py-8">
      <div className="container mx-auto max-w-6xl">
        <div ref={ref} className={`reveal ${inView ? 'visible' : ''}`}>
          <p className="text-xs font-mono text-gray-600 tracking-[0.2em] uppercase mb-4">
            Educación
          </p>
          <div className="bg-gray-900 border border-white/5 hover:border-emerald-500/15 rounded-2xl p-6 transition-all duration-300 flex flex-col md:flex-row items-start md:items-center gap-6">

            {/* Icon */}
            <div className="flex-shrink-0 w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
              <FaGraduationCap size={26} className="text-emerald-400" />
            </div>

            {/* Main info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white text-base md:text-lg leading-tight">
                Ingeniería en Sistemas Computacionales
              </h3>
              <p className="text-sm text-gray-400 mt-0.5">
                Especialidad en Tecnologías de Desarrollo de Software
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Instituto Tecnológico de Morelia &nbsp;·&nbsp; TecNM
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-xs font-mono text-gray-500 border border-white/8 px-2.5 py-1 rounded-lg">
                  2022 – 2027 (est.)
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                  <FaStar size={9} />
                  Mejor promedio — 7° semestre
                </span>
              </div>
            </div>

            {/* GPA */}
            <div className="flex-shrink-0 text-center border-l border-white/5 pl-6 hidden md:block">
              <p className="text-4xl font-extrabold font-mono text-emerald-400 leading-none">94</p>
              <p className="text-xs text-gray-600 mt-1 tracking-wide">Promedio</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
