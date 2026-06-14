import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Volver arriba"
      className={`fixed bottom-6 right-6 z-50 w-11 h-11 bg-emerald-500 hover:bg-emerald-400 text-gray-950 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 transition-all duration-300 cursor-pointer ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <FaArrowUp size={15} />
    </button>
  );
};

export default ScrollToTop;
