import React from 'react';
import { PRESS_AND_PARTNERS, TESTIMONIALS_LIST } from '../data/content';
import { TrocarBadge } from '../components/TrocarBadge';

export const Sec05ProvaSocial: React.FC = () => {
  return (
    <section
      id="prova-social"
      aria-labelledby="prova-social-heading"
      className="w-full py-16 lg:py-24"
      style={{ background: 'var(--gradient-proof-to-courses)' }}
    >
      <div className="editorial-container">
        {/* Título H2 — Zero Eyebrow e Zero Subtítulo conforme COPY_LP_IRONDINA.md v2 */}
        <div className="pb-8 border-b border-[var(--border-default)]">
          <h2
            id="prova-social-heading"
            className="font-display font-normal text-[var(--text-primary)] leading-[var(--leading-heading)] max-w-[22ch]"
            style={{ fontSize: 'var(--text-display-section)' }}
          >
            A sensação de se olhar no espelho e{' '}
            <span className="italic text-[var(--action-primary)]">se reconhecer</span>
          </h2>
        </div>

        {/* Faixa A — Grade 2x3 Proporcional (2 Colunas Lado a Lado no Mobile, 3 no Desktop) */}
        <div className="mt-8 cq-grid">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-10">
            {TESTIMONIALS_LIST.map((item) => (
              <article
                key={item.id}
                className="flex flex-col justify-between pt-5 border-t border-[var(--border-default)]"
              >
                <div>
                  <span
                    className="font-display text-4xl sm:text-5xl text-[var(--color-blush-600)] leading-none select-none block -mb-3"
                    aria-hidden="true"
                  >
                    “
                  </span>
                  <blockquote className="font-display italic text-base sm:text-xl text-[var(--text-primary)] leading-snug font-normal">
                    {item.quote}
                  </blockquote>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  {/* Mini-Avatar WebP (128x128) ou Avatar Provisório com Tag Central TROCAR */}
                  <div
                    className={`relative overflow-hidden rounded-[var(--radius-media)] bg-[var(--surface-editorial-band)] shadow-xs shrink-0 ${
                      item.trocarLabel
                        ? 'w-20 h-20 sm:w-24 sm:h-24'
                        : 'w-12 h-12 sm:w-14 sm:h-14'
                    }`}
                  >
                    <img
                      src={item.avatar}
                      alt={`Retrato de ${item.name} (${item.handle})`}
                      width={128}
                      height={128}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                    {item.trocarLabel && <TrocarBadge label={item.trocarLabel} compact />}
                  </div>

                  <div className="min-w-0">
                    <p className="font-sans-editorial text-xs sm:text-sm font-semibold text-[var(--text-primary)] truncate">
                      {item.name}
                    </p>
                    <p className="text-[0.75rem] text-[var(--action-primary)] font-medium truncate">
                      {item.handle}
                    </p>
                    <p className="text-[0.75rem] text-[var(--text-secondary)] truncate">
                      {item.context}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Faixa B — Chancelas & Parceiras (1 linha limpa com divisória 1px) */}
        <div className="mt-12 pt-6 border-t border-[var(--border-default)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
          <span className="font-semibold text-[var(--text-primary)] shrink-0">
            Bastidores de imprensa &amp; fotografia:
          </span>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[var(--text-secondary)]">
            {PRESS_AND_PARTNERS.map((partner, idx) => (
              <li key={partner} className="inline-flex items-center gap-4">
                <span>{partner}</span>
                {idx < PRESS_AND_PARTNERS.length - 1 && (
                  <span className="text-[var(--border-default)]" aria-hidden="true">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
