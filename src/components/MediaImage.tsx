import { Code2 } from 'lucide-react';
import { useState } from 'react';

interface MediaImageProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
}

export default function MediaImage({ src, alt, title, className = '' }: MediaImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 dark:from-[#121826] dark:via-[#161F33] dark:to-[#0E1420] p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Code2 className="h-8 w-8 text-blue-600 dark:text-blue-400" aria-hidden="true" />
        <span className="font-display text-sm font-semibold text-slate-700 dark:text-slate-200">
          {title}
        </span>
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
      loading="lazy"
    />
  );
}
