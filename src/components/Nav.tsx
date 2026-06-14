import React, { useEffect, useState } from 'react';
import { FaGithub, FaSun, FaMoon, FaDownload } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-950/90 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto max-w-6xl px-6 py-4 flex items-center justify-between gap-4">
        <a
          href="#inicio"
          className="font-mono text-sm text-emerald-400 hover:text-emerald-300 transition-colors duration-200 flex-shrink-0"
        >
          &lt;Cesar /&gt;
        </a>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Proyectos', id: 'proyectos' },
            { label: 'Habilidades', id: 'habilidades' },
            { label: 'Contacto', id: 'contacto' },
          ].map(({ label, id }) => (
            <a
              key={id}
              href={`#${id}`}
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* CV download */}
          <a
            href="/cv.pdf"
            download
            className="hidden md:flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg transition-all duration-200"
          >
            <FaDownload size={11} />
            CV
          </a>

          {/* Theme toggle */}
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all duration-200 cursor-pointer"
          >
            {theme === 'dark' ? <FaSun size={15} /> : <FaMoon size={15} />}
          </button>

          {/* GitHub */}
          <a
            href="https://github.com/Cesaredmyt"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 hover:border-white/20 text-gray-400 hover:text-white transition-all duration-200 cursor-pointer"
          >
            <FaGithub size={17} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
