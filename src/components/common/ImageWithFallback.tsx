import React, { useState } from 'react';
import { Package } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackText?: string;
  categoryHint?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Product Image',
  fallbackText,
  categoryHint,
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-4 select-none ${className}`}
        aria-label={alt}
      >
        <Package className="w-8 h-8 text-slate-300 stroke-[1.5] mb-1" />
        <span className="text-xs font-medium text-slate-500 text-center line-clamp-1">
          {fallbackText || alt}
        </span>
        {categoryHint && (
          <span className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
            {categoryHint}
          </span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};
