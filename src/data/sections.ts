// Única fuente del orden de secciones: la usan el menú, el riel lateral y los títulos.
export const sections = [
  { id: 'proyectos', label: 'Proyectos', labelEn: 'Projects' },
  { id: 'sobre-mi', label: 'Sobre mí', labelEn: 'About' },
  { id: 'homelab', label: 'Home Lab', labelEn: 'Home Lab' },
  { id: 'habilidades', label: 'Habilidades', labelEn: 'Skills' },
  { id: 'certificaciones', label: 'Formación', labelEn: 'Education' },
  { id: 'contacto', label: 'Contacto', labelEn: 'Contact' },
] as const;

export type SectionId = (typeof sections)[number]['id'];

export const sectionNumber = (id: SectionId) =>
  String(sections.findIndex((s) => s.id === id) + 1).padStart(2, '0');
