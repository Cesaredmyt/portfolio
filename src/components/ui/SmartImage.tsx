import React, { useState } from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  /** Clases del contenedor (tamaño, bordes, proporción). */
  wrapperClassName?: string;
};

// Imagen con esqueleto brillante mientras carga y aparición suave al terminar.
const SmartImage: React.FC<Props> = ({ wrapperClassName = '', className = '', onLoad, loading = 'lazy', ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${wrapperClassName}`}>
      {!loaded && <div aria-hidden="true" className="skeleton absolute inset-0" />}
      <img
        {...rest}
        loading={loading}
        decoding="async"
        ref={(img) => { if (img?.complete && img.naturalWidth && !loaded) setLoaded(true); }}
        onLoad={(e) => { setLoaded(true); onLoad?.(e); }}
        className={`${className} transition-[opacity,filter,transform] duration-700 ${loaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md scale-[1.02]'}`}
      />
    </div>
  );
};

export default SmartImage;
