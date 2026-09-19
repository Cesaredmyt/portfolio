import { lazy, Suspense } from 'react';
import { ReactLenis } from 'lenis/react';
import Starfield from './components/Starfield';
import Nav from './components/Nav';
import Header from './components/header';
import ScrollToTop from './components/ScrollToTop';
import SideRails from './components/SideRails';
import SmoothAnchors from './components/SmoothAnchors';
import { SectionSkeleton } from './components/ui/Skeleton';

// Solo el hero va en la carga inicial; el resto se descarga en paralelo y muestra un esqueleto mientras llega.
const About = lazy(() => import('./components/About'));
const Projects = lazy(() => import('./components/projects'));
const HomeLab = lazy(() => import('./components/HomeLab'));
const Education = lazy(() => import('./components/Education'));
const Skills = lazy(() => import('./components/Skills'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      <div className="relative isolate text-white font-lato">
        <SmoothAnchors />
        <Starfield />
        <Nav />
        <SideRails />
        <main>
          <Header />
          <Suspense fallback={<SectionSkeleton />}><Projects /></Suspense>
          <Suspense fallback={<SectionSkeleton variant="split" />}><About /></Suspense>
          <Suspense fallback={<SectionSkeleton variant="split" />}><HomeLab /></Suspense>
          <Suspense fallback={<SectionSkeleton />}><Skills /></Suspense>
          <Suspense fallback={<SectionSkeleton />}><Education /></Suspense>
          <Suspense fallback={<SectionSkeleton variant="split" />}><Contact /></Suspense>
        </main>
        <ScrollToTop />
      </div>
    </ReactLenis>
  );
}

export default App;
