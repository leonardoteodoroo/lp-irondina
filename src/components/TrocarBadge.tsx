import React from 'react';

interface TrocarBadgeProps {
  label: string;
  compact?: boolean;
}

/**
 * Overlay obrigatório centralizado BEM NO MEIO da mídia provisória
 * (pointer-events-none, alto contraste WCAG AAA, nunca escondido nas bordas).
 */
export const TrocarBadge: React.FC<TrocarBadgeProps> = ({ label, compact = false }) => {
  return (
    <div
      className="absolute inset-0 z-10 flex items-center justify-center p-2 pointer-events-none select-none"
      data-placeholder-trocar={label}
      aria-hidden="true"
    >
      <span
        className={`inline-flex items-center justify-center text-center font-sans-editorial font-semibold uppercase tracking-wider rounded-[var(--radius-media)] shadow-[var(--shadow-floating)] border border-[var(--color-alabaster-50)]/90 bg-[var(--color-espresso-950)]/90 text-[var(--color-alabaster-50)] ${
          compact
            ? 'px-2 py-1 text-[0.6875rem] leading-tight max-w-[96%]'
            : 'px-3 py-2 text-xs sm:text-sm leading-snug max-w-[88%]'
        }`}
      >
        {label}
      </span>
    </div>
  );
};
