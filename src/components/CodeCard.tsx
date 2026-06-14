import React from 'react';
import { useInView } from '../hooks/useInView';

const lines = [
  { indent: 0, tokens: [{ t: 'keyword', v: 'const ' }, { t: 'var', v: 'cesar' }, { t: 'op', v: ' = {' }] },
  { indent: 1, tokens: [{ t: 'key', v: 'rol' }, { t: 'op', v: ': ' }, { t: 'str', v: '"Full Stack Developer"' }, { t: 'op', v: ',' }] },
  { indent: 1, tokens: [{ t: 'key', v: 'stack' }, { t: 'op', v: ': [' }, { t: 'str', v: '"TypeScript"' }, { t: 'op', v: ', ' }, { t: 'str', v: '"Python"' }, { t: 'op', v: ', ' }, { t: 'str', v: '"Next.js"' }, { t: 'op', v: ', ' }, { t: 'str', v: '"Spring Boot"' }, { t: 'op', v: '],' }] },
  { indent: 1, tokens: [{ t: 'key', v: 'bases_de_datos' }, { t: 'op', v: ': [' }, { t: 'str', v: '"PostgreSQL"' }, { t: 'op', v: ', ' }, { t: 'str', v: '"MySQL"' }, { t: 'op', v: ', ' }, { t: 'str', v: '"Supabase"' }, { t: 'op', v: '],' }] },
  { indent: 1, tokens: [{ t: 'key', v: 'investigacion' }, { t: 'op', v: ': ' }, { t: 'str', v: '"ML para detección de fraude"' }, { t: 'op', v: ',' }] },
  { indent: 1, tokens: [{ t: 'key', v: 'metodologias' }, { t: 'op', v: ': [' }, { t: 'str', v: '"CRISP-DM"' }, { t: 'op', v: ', ' }, { t: 'str', v: '"Agile"' }, { t: 'op', v: ', ' }, { t: 'str', v: '"REST"' }, { t: 'op', v: ', ' }, { t: 'str', v: '"MVC"' }, { t: 'op', v: '],' }] },
  { indent: 1, tokens: [{ t: 'key', v: 'disponible' }, { t: 'op', v: ': ' }, { t: 'bool', v: 'true' }, { t: 'op', v: ',' }] },
  { indent: 1, tokens: [{ t: 'key', v: 'contacto' }, { t: 'op', v: ': ' }, { t: 'str', v: '"dcesar664@gmail.com"' }] },
  { indent: 0, tokens: [{ t: 'op', v: '};' }] },
];

const colorMap: Record<string, string> = {
  keyword: 'text-purple-400',
  var:     'text-blue-300',
  key:     'text-red-300',
  str:     'text-emerald-300',
  bool:    'text-yellow-300',
  op:      'text-gray-400',
};

const CodeCard: React.FC = () => {
  const { ref, inView } = useInView();

  return (
    <section className="bg-gray-950 px-6 md:px-12 pb-2">
      <div className="container mx-auto max-w-6xl">
        <div
          ref={ref}
          className={`reveal ${inView ? 'visible' : ''}`}
        >
          <div className="bg-[#0d1117] border border-white/8 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
            {/* Window bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/2">
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/60" />
              <span className="ml-4 text-xs text-gray-600 font-mono tracking-wide">about-me.ts</span>
              <span className="ml-auto text-xs text-gray-700 font-mono">TypeScript</span>
            </div>

            {/* Code */}
            <div className="px-6 py-5 font-mono text-sm leading-7 overflow-x-auto">
              {lines.map((line, i) => (
                <div key={i} style={{ paddingLeft: `${line.indent * 1.5}rem` }}>
                  {line.tokens.map((tok, j) => (
                    <span key={j} className={colorMap[tok.t]}>
                      {tok.v}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-emerald-500/10 border-t border-emerald-500/10">
              <span className="text-xs font-mono text-emerald-400/70">● disponible: <span className="text-emerald-400 font-semibold">true</span></span>
              <span className="text-xs font-mono text-gray-600">Ln 9, Col 2</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeCard;
