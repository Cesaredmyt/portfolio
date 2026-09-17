// Única fuente del orden de secciones: la usan el menú, el riel lateral y los títulos.
export const sections = [
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'homelab', label: 'Home Lab' },
  { id: 'certificaciones', label: 'Formación' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'contacto', label: 'Contacto' },
] as const;

export type SectionId = (typeof sections)[number]['id'];

export const sectionNumber = (id: SectionId) =>
  String(sections.findIndex((s) => s.id === id) + 1).padStart(2, '0');
