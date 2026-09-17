import React from 'react';

export const Skeleton: React.FC<{ className?: string; style?: React.CSSProperties }> = ({ className = '', style }) => (
  <div aria-hidden="true" className={`skeleton rounded-lg ${className}`} style={style} />
);

// Marcador de una sección mientras se descarga su código.
export const SectionSkeleton: React.FC<{ variant?: 'grid' | 'split' }> = ({ variant = 'grid' }) => (
  <div className="py-24 px-6 md:px-12" aria-busy="true" aria-label="Cargando sección">
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col items-center mb-14">
        <Skeleton className="h-12 w-64 max-w-full" />
        <Skeleton className="h-1 w-24 mt-5" />
        <Skeleton className="h-4 w-96 max-w-full mt-5" />
      </div>
      {variant === 'split' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-3">
            <Skeleton className="h-8 w-11/12" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-full mt-6" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
          <Skeleton className="h-72 rounded-2xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <Skeleton className="h-80 rounded-2xl md:col-span-2" />
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-64 rounded-2xl md:col-span-2" />
        </div>
      )}
    </div>
  </div>
);

export default Skeleton;
