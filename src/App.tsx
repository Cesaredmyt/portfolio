import Nav from './components/Nav';
import Header from './components/header';
import CodeCard from './components/CodeCard';
import Education from './components/Education';
import Projects from './components/projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <div className="bg-gray-950 text-white font-lato">
      <Nav />
      <Header />
      <CodeCard />
      <Education />
      <Projects />
      <Skills />
      <Contact />
      <ScrollToTop />
    </div>
  );
}

export default App;
