import { useEffect } from 'react';
import { useLenis } from 'lenis/react';

const NAV_OFFSET = -88;
const easeInOutExpo = (t: number) =>
  t === 0 ? 0 : t === 1 ? 1 : t < 0.5 ? 2 ** (20 * t - 10) / 2 : (2 - 2 ** (-20 * t + 10)) / 2;

// Intercepta los enlaces "#seccion" de toda la página: desplazamiento suave con Lenis,
// aviso al fondo de estrellas para el efecto de velocidad y un pulso en la sección de llegada.
const SmoothAnchors: React.FC = () => {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!link) return;
      const id = link.getAttribute('href')!.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;

      e.preventDefault();
      const distance = Math.abs(target.getBoundingClientRect().top);
      const duration = Math.min(1.8, Math.max(0.9, distance / 2600));
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      window.dispatchEvent(new CustomEvent('portfolio:warp', { detail: { duration } }));
      lenis.scrollTo(target, {
        offset: id === 'inicio' ? 0 : NAV_OFFSET,
        duration: reduced ? 0 : duration,
        easing: easeInOutExpo,
        immediate: reduced,
        onComplete: () => {
          target.classList.remove('section-arrive');
          void target.offsetWidth; // reinicia la animación si se repite el clic
          target.classList.add('section-arrive');
          window.setTimeout(() => target.classList.remove('section-arrive'), 1400);
        },
      });
      history.replaceState(null, '', `#${id}`);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [lenis]);

  return null;
};

export default SmoothAnchors;
