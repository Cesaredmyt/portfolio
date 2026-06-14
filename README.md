# Cesar Enrique Diaz Maldonado — Portafolio Personal

Portafolio personal desarrollado con React, TypeScript y Tailwind CSS. Muestra mis proyectos, habilidades técnicas e información de contacto.

🌐 **Live:** (https://portfolio-xplq.vercel.app/)

---

## Características

- **Diseño responsive** — adaptado para móvil, tablet y escritorio
- **Dark / Light mode** — toggle con persistencia en `localStorage`
- **Animaciones on-scroll** — elementos con fade-up al entrar al viewport via Intersection Observer
- **Partículas interactivas** — canvas animado en el header con nodos conectados
- **Typewriter effect** — rotación animada de roles en el hero
- **Scroll to top** — botón flotante que aparece al bajar la página
- **Descarga de CV** — acceso directo al PDF desde el header y la navegación

---

## Stack técnico

| Categoría | Tecnología |
|---|---|
| Framework | React 19 |
| Lenguaje | TypeScript |
| Estilos | Tailwind CSS v4 |
| Build tool | Vite 7 |
| Iconos | react-icons v5 |

---

## Estructura del proyecto

```
src/
├── components/
│   ├── Nav.tsx           # Navegación sticky con toggle de tema
│   ├── header.tsx        # Hero: foto, typewriter, stats, partículas
│   ├── ParticleCanvas.tsx# Animación de partículas en canvas
│   ├── CodeCard.tsx      # Bloque de código estilo VS Code
│   ├── Education.tsx     # Tarjeta de formación académica
│   ├── projects.tsx      # Grid de proyectos con cards animadas
│   ├── Skills.tsx        # Habilidades con iconos y badges
│   ├── Contact.tsx       # Información de contacto
│   └── ScrollToTop.tsx   # Botón flotante volver arriba
├── context/
│   └── ThemeContext.tsx  # Contexto dark/light mode
├── hooks/
│   └── useInView.ts      # Hook Intersection Observer
├── App.tsx
├── main.tsx
└── index.css
```

---

## Correr en local

```bash
# Clonar el repositorio
git clone https://github.com/Cesaredmyt/portfolio.git
cd portfolio

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

### Otros comandos

```bash
npm run build    # Build de producción
npm run preview  # Vista previa del build
npm run lint     # Linter ESLint
```

---

## Proyectos incluidos

### Destacados 2026

- **IMPA — Plataforma de Adopciones** · Next.js · TypeScript · Supabase · Docker · Vitest  
  Plataforma full-stack para gestión municipal de bienestar animal con autenticación JWT y RBAC.  
  [github.com/Cesaredmyt/Adopciones-IMPA](https://github.com/Cesaredmyt/Adopciones-IMPA)

- **Detección de Fraude & Phishing** · Python · scikit-learn · XGBoost · Random Forest  
  Sistema híbrido de ML bajo metodología CRISP-DM. F1: 0.998 | AUC-ROC: 1.000 en PaySim (6.3M transacciones).  
  [github.com/Cesaredmyt/fraud-detection-itm](https://github.com/Cesaredmyt/fraud-detection-itm)

### Proyectos anteriores

- **ProjeXus** · Next.js · Spring Boot · PostgreSQL
- **Aquamarine Resort** · HTML · CSS · PHP
- **Biblioteca Digital** · Java · PHP · MySQL

---

## Contacto

- **Email:** dcesar664@gmail.com
- **LinkedIn:** [linkedin.com/in/cesarenriquediazmaldonado](https://linkedin.com/in/cesarenriquediazmaldonado)
- **GitHub:** [github.com/Cesaredmyt](https://github.com/Cesaredmyt)
- **Ubicación:** Morelia, Michoacán — disponible para reubicación y trabajo remoto

---

© 2026 César Enrique Díaz Maldonado
