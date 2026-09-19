export interface Layer {
  id: string;
  ring: number;
  title: string;
  titleEn: string;
  short: string;
  shortEn: string;
  items: { name: string; detail: string; detailEn: string }[];
  why: string;
  whyEn: string;
}

// ring: 0 = núcleo, 1..4 = órbitas del diagrama, 5 = satélites (agentes)
export const layers: Layer[] = [
  {
    id: 'red',
    ring: 1,
    title: 'Red y proxy inverso',
    titleEn: 'Network and reverse proxy',
    short: 'Un solo punto de entrada',
    shortEn: 'One entry point',
    items: [
      { name: 'Caddy', detail: 'Reverse proxy con TLS interno; cada servicio en su subdominio', detailEn: 'Reverse proxy with internal TLS; each service uses its own subdomain' },
      { name: 'AdGuard Home', detail: 'DNS interno con wildcard *.red.casa hacia el servidor', detailEn: 'Internal DNS with a wildcard domain pointing to the server' },
      { name: 'dnsmasq', detail: 'DHCP propio en una red con doble interfaz WAN/LAN', detailEn: 'Self-managed DHCP on a dual-interface WAN/LAN network' },
    ],
    why: 'Certificados centralizados y servicios que entran o salen sin tocar la red: el patrón de cualquier infraestructura real.',
    whyEn: 'Centralized certificates and services that can change without redesigning the network: a production infrastructure pattern.',
  },
  {
    id: 'seguridad',
    ring: 2,
    title: 'Identidad y seguridad',
    titleEn: 'Identity and security',
    short: 'Cero puertos abiertos hacia afuera',
    shortEn: 'No public inbound ports',
    items: [
      { name: 'Authelia', detail: 'SSO con 2FA (TOTP) frente a los paneles sensibles', detailEn: 'SSO with TOTP-based 2FA in front of sensitive dashboards' },
      { name: 'CrowdSec', detail: 'Firewall colaborativo con bouncer sobre nftables', detailEn: 'Collaborative firewall with an nftables bouncer' },
      { name: 'Tailscale', detail: 'VPN mesh para acceso remoto sin exponer puertos', detailEn: 'Mesh VPN for remote access without exposed ports' },
    ],
    why: 'Separa autenticación (quién eres) de autorización (qué puedes tocar), con una sola puerta con doble factor.',
    whyEn: 'Separates authentication from authorization behind a single two-factor entry point.',
  },
  {
    id: 'resiliencia',
    ring: 3,
    title: 'Resiliencia',
    titleEn: 'Resilience',
    short: 'Diseñado para sobrevivir fallos',
    shortEn: 'Designed to survive failures',
    items: [
      { name: 'restart policies', detail: 'unless-stopped en todos los contenedores', detailEn: 'unless-stopped across all containers' },
      { name: 'UPS + NUT', detail: 'Apagado limpio ante cortes de energía, sin corromper el SSD', detailEn: 'Clean shutdown during outages to protect storage' },
      { name: 'Duplicati', detail: 'Backups cifrados a Google Drive con pruebas de restauración', detailEn: 'Encrypted Google Drive backups with restore tests' },
      { name: 'ntfy', detail: 'Notificaciones push centralizadas de fallos', detailEn: 'Centralized push notifications for failures' },
    ],
    why: 'No basta con hacer backup: se verifica que restaura. El servidor sobrevive a errores propios y del hardware.',
    whyEn: 'A backup is not enough: restores are tested. The server is designed for both software and hardware failures.',
  },
  {
    id: 'observabilidad',
    ring: 3,
    title: 'Observabilidad',
    titleEn: 'Observability',
    short: 'Cada cambio se mide',
    shortEn: 'Every change is measured',
    items: [
      { name: 'Netdata', detail: 'CPU y RAM en tiempo real por contenedor', detailEn: 'Real-time CPU and RAM metrics per container' },
      { name: 'Uptime Kuma', detail: 'Monitoreo de disponibilidad', detailEn: 'Availability monitoring' },
      { name: 'Homepage', detail: 'Dashboard central de acceso a todos los servicios', detailEn: 'Central access dashboard for all services' },
    ],
    why: 'Con 8 GB de RAM, cada instalación nueva se compara contra una línea base para ver su impacto real.',
    whyEn: 'With 8 GB of RAM, every new deployment is measured against a baseline to understand its real cost.',
  },
  {
    id: 'servicios',
    ring: 4,
    title: 'Servicios productivos',
    titleEn: 'Production services',
    short: 'Uso diario, no demo',
    shortEn: 'Daily use, not a demo',
    items: [
      { name: 'Vaultwarden', detail: 'Gestor de contraseñas propio, compatible con la app móvil vía TLS interno', detailEn: 'Self-hosted password manager with mobile access over internal TLS' },
      { name: 'Firefly III', detail: 'Finanzas personales', detailEn: 'Personal finance management' },
      { name: 'n8n', detail: 'Automatizaciones', detailEn: 'Workflow automation' },
      { name: 'Wiki.js', detail: 'Documentación del servidor, integrada vía API GraphQL', detailEn: 'Server documentation integrated through a GraphQL API' },
      { name: 'SearXNG', detail: 'Buscador propio y backend de búsqueda del agente de IA', detailEn: 'Self-hosted search and search backend for the AI agent' },
    ],
    why: 'Reemplaza servicios de pago con herramientas propias que se usan todos los días.',
    whyEn: 'Replaces paid services with self-managed tools used every day.',
  },
  {
    id: 'agentes',
    ring: 5,
    title: 'Agentes de IA',
    titleEn: 'AI agents',
    short: 'Menor privilegio aplicado a un LLM',
    shortEn: 'Least privilege applied to an LLM',
    items: [
      { name: 'OpenClaw', detail: 'Plataforma self-hosted de agentes', detailEn: 'Self-hosted agent platform' },
      { name: 'Nano', detail: 'Agente conversacional en Telegram, sin acceso a infraestructura', detailEn: 'Telegram conversational agent with no infrastructure access' },
      { name: 'Sysadmin', detail: 'Acceso controlado a Docker en sandbox con confirmación manual', detailEn: 'Sandboxed Docker access with manual confirmation' },
    ],
    why: 'El diferenciador no es "usar IA", sino el diseño de seguridad alrededor del agente.',
    whyEn: 'The differentiator is not using AI; it is the security model around the agent.',
  },
];

export const ringLabels = ['Ubuntu · Docker', 'Red', 'Seguridad', 'Operación', 'Servicios'];
export const ringLabelsEn = ['Ubuntu · Docker', 'Network', 'Security', 'Operations', 'Services'];

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
    roleEn: 'Conversational agent',
    channel: 'Bot de Telegram',
    channelEn: 'Telegram bot',
    perms: [
      { label: 'Memoria persistente entre sesiones', labelEn: 'Persistent memory across sessions', ok: true },
      { label: 'Resumen automático nocturno', labelEn: 'Automated nightly summary', ok: true },
      { label: 'Búsqueda web vía SearXNG', labelEn: 'Web search through SearXNG', ok: true },
      { label: 'Acceso a la infraestructura', labelEn: 'Infrastructure access', ok: false },
    ],
  },
  {
    name: 'Sysadmin',
    role: 'Agente de administración',
    roleEn: 'Administration agent',
    channel: 'docker.sock en sandbox',
    channelEn: 'sandboxed docker.sock',
    perms: [
      { label: 'Lectura y control de contenedores', labelEn: 'Read and control containers', ok: true },
      { label: 'Allowlist explícita de comandos', labelEn: 'Explicit command allowlist', ok: true },
      { label: 'Confirmación manual (ask:always)', labelEn: 'Manual confirmation (ask:always)', ok: true },
      { label: 'Ejecución libre sin aprobación', labelEn: 'Unrestricted execution without approval', ok: false },
    ],
  },
];
