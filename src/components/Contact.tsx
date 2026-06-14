import React from 'react';
import { FaGithub, FaLinkedin, FaPhoneAlt } from 'react-icons/fa';
import { HiMail, HiLocationMarker } from 'react-icons/hi';
import { useInView } from '../hooks/useInView';

const Contact: React.FC = () => {
  const { ref, inView } = useInView();

  return (
    <section
      id="contacto"
      className="bg-gray-950 text-white py-14 px-6 md:px-12 border-t border-white/5"
    >
      <div className="container mx-auto max-w-6xl">
        <div ref={ref} className={`reveal ${inView ? 'visible' : ''}`}>
          <div className="text-center mb-10">
            <p className="text-emerald-400 font-mono text-sm mb-2 tracking-widest">
              <span className="opacity-40">// </span>hablemos
            </p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Contacto</h2>
            <p className="text-gray-400 text-base max-w-md mx-auto">
              ¿Tienes un proyecto o una oportunidad? No dudes en escribirme.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-900 rounded-2xl border border-white/5 divide-y divide-white/5 overflow-hidden">
              {[
                {
                  icon: <HiMail size={22} className="text-emerald-400" />,
                  label: 'Email',
                  display: 'dcesar664@gmail.com',
                  href: 'mailto:dcesar664@gmail.com',
                },
                {
                  icon: <FaLinkedin size={20} className="text-blue-400" />,
                  label: 'LinkedIn',
                  display: 'cesarenriquediazmaldonado',
                  href: 'https://linkedin.com/in/cesarenriquediazmaldonado',
                  external: true,
                },
                {
                  icon: <FaGithub size={20} className="text-gray-300" />,
                  label: 'GitHub',
                  display: 'Cesaredmyt',
                  href: 'https://github.com/Cesaredmyt',
                  external: true,
                },
                {
                  icon: <FaPhoneAlt size={18} className="text-emerald-400/70" />,
                  label: 'Teléfono',
                  display: '+52 417 130 7288',
                  href: 'tel:+524171307288',
                },
                {
                  icon: <HiLocationMarker size={22} className="text-gray-500" />,
                  label: 'Ubicación',
                  display: 'Morelia, Michoacán',
                  href: undefined,
                },
              ].map(({ icon, label, display, href, external }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-white/3 transition-colors duration-200"
                >
                  <div className="w-8 flex-shrink-0 flex justify-center">{icon}</div>
                  <span className="text-xs font-mono text-gray-600 w-20 flex-shrink-0">{label}</span>
                  {href ? (
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="text-sm text-white hover:text-emerald-300 transition-colors duration-200 font-medium"
                    >
                      {display}
                    </a>
                  ) : (
                    <span className="text-sm text-gray-400 font-medium">{display}</span>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <a
                href="mailto:dcesar664@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-gray-950 font-bold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 cursor-pointer"
              >
                <HiMail size={18} />
                Enviar un mensaje
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center text-gray-700 font-mono text-xs">
        <p>© 2026 César Enrique Díaz Maldonado</p>
      </div>
    </section>
  );
};

export default Contact;
