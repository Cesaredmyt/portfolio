export interface Layer {
  id: string;
  ring: number;
  title: string;
  short: string;
  items: { name: string; detail: string }[];
  why: string;
}

// ring: 0 = núcleo, 1..4 = órbitas del diagrama, 5 = satélites (agentes)
export const layers: Layer[] = [
  {
    id: 'red',
    ring: 1,
    title: 'Red y proxy inverso',
    short: 'Un solo punto de entrada',
    items: [
      { name: 'Caddy', detail: 'Reverse proxy con TLS interno; cada servicio en su subdominio' },
      { name: 'AdGuard Home', detail: 'DNS interno con wildcard *.red.casa hacia el servidor' },
      { name: 'dnsmasq', detail: 'DHCP propio en una red con doble interfaz WAN/LAN' },
    ],
    why: 'Certificados centralizados y servicios que entran o salen sin tocar la red: el patrón de cualquier infraestructura real.',
  },
  {
    id: 'seguridad',
    ring: 2,
    title: 'Identidad y seguridad',
    short: 'Cero puertos abiertos hacia afuera',
    items: [
      { name: 'Authelia', detail: 'SSO con 2FA (TOTP) frente a los paneles sensibles' },
      { name: 'CrowdSec', detail: 'Firewall colaborativo con bouncer sobre nftables' },
      { name: 'Tailscale', detail: 'VPN mesh para acceso remoto sin exponer puertos' },
    ],
    why: 'Separa autenticación (quién eres) de autorización (qué puedes tocar), con una sola puerta con doble factor.',
  },
  {
    id: 'resiliencia',
    ring: 3,
    title: 'Resiliencia',
    short: 'Diseñado para sobrevivir fallos',
    items: [
      { name: 'restart policies', detail: 'unless-stopped en todos los contenedores' },
      { name: 'UPS + NUT', detail: 'Apagado limpio ante cortes de energía, sin corromper el SSD' },
      { name: 'Duplicati', detail: 'Backups cifrados a Google Drive con pruebas de restauración' },
      { name: 'ntfy', detail: 'Notificaciones push centralizadas de fallos' },
    ],
    why: 'No basta con hacer backup: se verifica que restaura. El servidor sobrevive a errores propios y del hardware.',
  },
  {
    id: 'observabilidad',
    ring: 3,
    title: 'Observabilidad',
    short: 'Cada cambio se mide',
    items: [
      { name: 'Netdata', detail: 'CPU y RAM en tiempo real por contenedor' },
      { name: 'Uptime Kuma', detail: 'Monitoreo de disponibilidad' },
      { name: 'Homepage', detail: 'Dashboard central de acceso a todos los servicios' },
    ],
    why: 'Con 8 GB de RAM, cada instalación nueva se compara contra una línea base para ver su impacto real.',
  },
  {
    id: 'servicios',
    ring: 4,
    title: 'Servicios productivos',
    short: 'Uso diario, no demo',
    items: [
      { name: 'Vaultwarden', detail: 'Gestor de contraseñas propio, compatible con la app móvil vía TLS interno' },
      { name: 'Firefly III', detail: 'Finanzas personales' },
      { name: 'n8n', detail: 'Automatizaciones' },
      { name: 'Wiki.js', detail: 'Documentación del servidor, integrada vía API GraphQL' },
      { name: 'SearXNG', detail: 'Buscador propio y backend de búsqueda del agente de IA' },
    ],
    why: 'Reemplaza servicios de pago con herramientas propias que se usan todos los días.',
  },
  {
    id: 'agentes',
    ring: 5,
    title: 'Agentes de IA',
    short: 'Menor privilegio aplicado a un LLM',
    items: [
      { name: 'OpenClaw', detail: 'Plataforma self-hosted de agentes' },
      { name: 'Nano', detail: 'Agente conversacional en Telegram, sin acceso a infraestructura' },
      { name: 'Sysadmin', detail: 'Acceso controlado a Docker en sandbox con confirmación manual' },
    ],
    why: 'El diferenciador no es "usar IA", sino el diseño de seguridad alrededor del agente.',
  },
];

export const ringLabels = ['Ubuntu · Docker', 'Red', 'Seguridad', 'Operación', 'Servicios'];

// Nodos del diagrama: [ring, ángulo en grados, etiqueta]
export const nodes: [number, number, string][] = [
  [1, -60, 'Caddy'], [1, 120, 'AdGuard'], [1, 200, 'dnsmasq'],
  [2, 20, 'Authelia'], [2, 150, 'CrowdSec'], [2, 260, 'Tailscale'],
  [3, -20, 'Netdata'], [3, 80, 'Duplicati'], [3, 175, 'Uptime Kuma'], [3, 235, 'NUT'],
  [4, -35, 'Vaultwarden'], [4, 40, 'Firefly III'], [4, 110, 'n8n'], [4, 195, 'Wiki.js'], [4, 250, 'SearXNG'],
];

export const agents = [
  {
    name: 'Nano',
    role: 'Agente conversacional',
    channel: 'Bot de Telegram',
    perms: [
      { label: 'Memoria persistente entre sesiones', ok: true },
      { label: 'Resumen automático nocturno', ok: true },
      { label: 'Búsqueda web vía SearXNG', ok: true },
      { label: 'Acceso a la infraestructura', ok: false },
    ],
  },
  {
    name: 'Sysadmin',
    role: 'Agente de administración',
    channel: 'docker.sock en sandbox',
    perms: [
      { label: 'Lectura y control de contenedores', ok: true },
      { label: 'Allowlist explícita de comandos', ok: true },
      { label: 'Confirmación manual (ask:always)', ok: true },
      { label: 'Ejecución libre sin aprobación', ok: false },
    ],
  },
];
