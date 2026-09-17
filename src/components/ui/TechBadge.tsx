import React from 'react';

export type BadgeVariant = 'blue' | 'emerald' | 'yellow' | 'purple' | 'orange' | 'gray' | 'red' | 'cyan' | 'pink';

const variantClass: Record<BadgeVariant, string> = {
  blue:    'bg-blue-500/10 text-blue-300 border-blue-500/20 hover:border-blue-400/60 hover:shadow-blue-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:border-emerald-400/60 hover:shadow-emerald-500/20',
  yellow:  'bg-yellow-500/10 text-yellow-300 border-yellow-500/20 hover:border-yellow-400/60 hover:shadow-yellow-500/20',
  purple:  'bg-purple-500/10 text-purple-300 border-purple-500/20 hover:border-purple-400/60 hover:shadow-purple-500/20',
  orange:  'bg-orange-500/10 text-orange-300 border-orange-500/20 hover:border-orange-400/60 hover:shadow-orange-500/20',
  gray:    'bg-white/5 text-gray-300 border-white/10 hover:border-white/30 hover:shadow-white/10',
  red:     'bg-red-500/10 text-red-300 border-red-500/20 hover:border-red-400/60 hover:shadow-red-500/20',
  cyan:    'bg-cyan-500/10 text-cyan-300 border-cyan-500/20 hover:border-cyan-400/60 hover:shadow-cyan-500/20',
  pink:    'bg-pink-500/10 text-pink-300 border-pink-500/20 hover:border-pink-400/60 hover:shadow-pink-500/20',
};

export interface Tech {
  label: string;
  variant: BadgeVariant;
}

const TechBadge: React.FC<Tech> = ({ label, variant }) => (
  <span
    className={`relative z-10 text-xs font-mono px-2.5 py-1 rounded-md border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg cursor-default ${variantClass[variant]}`}
  >
    {label}
  </span>
);

export default TechBadge;
