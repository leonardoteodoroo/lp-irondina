import React from 'react';
import { PRESS_AND_PARTNERS, TESTIMONIALS_LIST } from '../data/content';
import { TrocarBadge } from '../components/TrocarBadge';

export const Sec05ProvaSocial: React.FC = () => {
  return (
    <section
      id="prova-social"
      aria-labelledby="prova-social-heading"
      className="w-full py-16 lg:py-24 overflow-x-clip"
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

        {/* Faixa A — Grade 2x3 Proporcional Padronizada (Todos os avatares exatamente do mesmo tamanho) */}
        <div className="mt-8 cq-grid">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 items-stretch">
            {TESTIMONIALS_LIST.map((item) => (
              <article
                key={item.id}
                className="h-full min-w-0 flex flex-col justify-between p-3 sm:p-6 rounded-xl bg-[var(--surface-page)]/85 border border-[var(--border-default)] shadow-xs"
              >
                <div>
                  <span
                    className="font-display text-3xl sm:text-4xl text-[var(--color-blush-600)] leading-none select-none block -mb-2"
                    aria-hidden="true"
                  >
                    “
                  </span>
                  <blockquote className="font-display italic text-[0.95rem] sm:text-lg text-[var(--text-primary)] leading-snug font-normal">
                    {item.quote}
                  </blockquote>
                </div>

                <div className="mt-4 pt-3.5 border-t border-[var(--border-subtle)] flex items-center gap-2 sm:gap-3 h-[4.85rem] sm:h-[5.5rem] shrink-0 overflow-hidden">
                  {/* Padronização estrita 1:1 — mesma dimensão e mesma altura vertical de linha divisória em todos os cards */}
                  <div className="relative w-11 h-11 sm:w-16 sm:h-16 overflow-hidden rounded-[var(--radius-media)] bg-[var(--surface-editorial-band)] shadow-xs shrink-0">
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

                  <div className="min-w-0 flex-1 overflow-hidden">
                    <p className="font-sans-editorial text-[0.72rem] sm:text-sm font-semibold text-[var(--text-primary)] truncate">
                      {item.name}
                    </p>
                    <p className="text-[0.65rem] sm:text-xs text-[var(--action-primary)] font-medium truncate">
                      {item.handle}
                    </p>
                    <p className="text-[0.62rem] sm:text-xs text-[var(--text-secondary)] truncate">
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
