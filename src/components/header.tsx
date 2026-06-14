import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaDownload } from 'react-icons/fa';
import ParticleCanvas from './ParticleCanvas';

const roles = [
  'Full Stack Developer',
  'Backend Engineer',
  'ML Researcher',
  'TypeScript Developer',
];

const stats = [
  { value: '5+', label: 'Proyectos' },
  { value: '6.3M+', label: 'Datos ML procesados' },
  { value: '94', label: 'Promedio GPA' },
  { value: 'B2', label: 'Inglés' },
];

const Header: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping) {
      if (displayed.length < current.length) {
        timeout = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          80
        );
      } else {
        timeout = setTimeout(() => setIsTyping(false), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, isTyping, roleIndex]);

  return (
    <header
      id="inicio"
      className="relative bg-gray-950 text-white pt-28 pb-12 px-6 md:px-12 overflow-hidden"
    >
      {/* Particle animation */}
      <ParticleCanvas />

      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-emerald-500/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] items-center gap-10">

          {/* ── Info ── */}
          <div className="text-center md:text-left">
            <p className="text-emerald-400 font-mono text-sm mb-3 tracking-widest">
              <span className="opacity-40">// </span>hola, soy
            </p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight leading-none bg-gradient-to-r from-white via-gray-100 to-gray-400 bg-clip-text text-transparent">
              Cesar Enrique Diaz Maldonado
            </h1>

            {/* Typewriter */}
            <div className="flex items-center gap-0 mb-4 h-8 justify-center md:justify-start">
              <span className="text-emerald-400 font-mono text-xl font-semibold">
                {displayed}
              </span>
              <span className="inline-block w-0.5 h-5 bg-emerald-400 ml-0.5 animate-pulse" />
            </div>

            <p className="text-gray-500 font-mono text-xs mb-5 tracking-wide">
              Instituto Tecnológico de Morelia &nbsp;·&nbsp; Egreso 2027 &nbsp;·&nbsp; Promedio 94
            </p>

            <p className="text-base text-gray-300 max-w-xl mb-7 leading-relaxed">
              Estudiante de Ing. en Sistemas con especialidad en Tecnologías de Desarrollo de
              Software. Experiencia en proyectos full-stack, backend con Node.js / Spring Boot,
              ML para detección de fraude e investigación académica. Busco oportunidades junior
              o prácticas profesionales.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-7 justify-center md:justify-start">
              <span className="flex items-center gap-1.5 text-xs text-gray-400 border border-gray-700/60 px-3 py-1.5 rounded-full">
                <FaMapMarkerAlt className="text-emerald-400" size={11} />
                Morelia, Mich.
              </span>
              <span className="text-xs text-gray-400 border border-gray-700/60 px-3 py-1.5 rounded-full">
                Inglés B2
              </span>
              <span className="text-xs text-gray-400 border border-gray-700/60 px-3 py-1.5 rounded-full">
                Remoto · Híbrido · Presencial
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <a
                href="https://github.com/Cesaredmyt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-medium rounded-xl transition-all duration-200"
              >
                <FaGithub size={16} />
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/cesarenriquediazmaldonado"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-medium rounded-xl transition-all duration-200"
              >
                <FaLinkedin size={16} />
                LinkedIn
              </a>
              <a
                href="mailto:dcesar664@gmail.com"
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-gray-950 text-sm font-bold rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25 cursor-pointer"
              >
                <FaEnvelope size={13} />
                Contactar
              </a>
              <a
                href="/cv.pdf"
                download
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-medium rounded-xl transition-all duration-200"
              >
                <FaDownload size={13} />
                Descargar CV
              </a>
            </div>
          </div>

          {/* ── Photo ── */}
          <div className="flex justify-center md:justify-center">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="absolute -inset-3 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
                <div className="relative w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-emerald-500/40 shadow-2xl shadow-emerald-500/10">
                  <img
                    src="https://github.com/Cesaredmyt.png"
                    alt="César Enrique Díaz Maldonado"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <span className="bg-emerald-500 text-gray-950 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-emerald-500/30 tracking-wide">
                Open to work
              </span>
            </div>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="bg-white/3 border border-white/6 hover:border-emerald-500/20 hover:bg-white/5 rounded-xl p-4 text-center transition-all duration-200 cursor-default"
            >
              <p className="text-2xl font-extrabold text-emerald-400 font-mono mb-1">{value}</p>
              <p className="text-xs text-gray-500 leading-tight">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
