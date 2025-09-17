// src/App.tsx
import React from 'react';
import Header from './components/header';
import Projects from './components/projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

function App() {
  return (
    <main className="bg-gray-900 text-white font-lato">
      <Header />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}

export default App;