import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  tr: <T,>(spanish: T, english: T) => T;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'es',
  setLanguage: () => {},
  toggleLanguage: () => {},
  tr: (spanish) => spanish,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('portfolio-language');
    return saved === 'en' ? 'en' : 'es';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-language', language);
    document.documentElement.lang = language;

    const metadata = language === 'es'
      ? {
          title: 'César Díaz — Portfolio',
          description: 'Portafolio de César Díaz, estudiante de Ingeniería en Sistemas con enfoque backend y capacidad full stack: APIs REST, PostgreSQL, TypeScript y Docker.',
          social: 'Estudiante de Ingeniería en Sistemas con enfoque backend y capacidad full stack: APIs REST, PostgreSQL, seguridad y Docker.',
          locale: 'es_MX',
        }
      : {
          title: 'César Díaz — Portfolio',
          description: 'Portfolio of César Díaz, a Computer Systems Engineering student focused on backend development with full-stack capabilities: REST APIs, PostgreSQL, TypeScript and Docker.',
          social: 'Computer Systems Engineering student focused on backend development with full-stack capabilities: REST APIs, PostgreSQL, security and Docker.',
          locale: 'en_US',
        };

    document.title = metadata.title;
    const setMeta = (selector: string, content: string) => {
      document.querySelector<HTMLMetaElement>(selector)?.setAttribute('content', content);
    };
    setMeta('meta[name="description"]', metadata.description);
    setMeta('meta[property="og:title"]', metadata.title);
    setMeta('meta[property="og:description"]', metadata.social);
    setMeta('meta[property="og:locale"]', metadata.locale);
    setMeta('meta[name="twitter:title"]', metadata.title);
    setMeta('meta[name="twitter:description"]', metadata.social);
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((current) => (current === 'es' ? 'en' : 'es'));
  }, []);

  const tr = useCallback(<T,>(spanish: T, english: T) => (
    language === 'es' ? spanish : english
  ), [language]);

  const value = useMemo(
    () => ({ language, setLanguage, toggleLanguage, tr }),
    [language, toggleLanguage, tr],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// El hook comparte módulo con el provider para mantener una API pequeña.
// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);
