import React from 'react';

const NAV_LINKS = [
  { label: 'Portfólio', href: '#galeria' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Cursos', href: '#cursos' },
];

export const Sec00Header: React.FC = () => {
  return (
    <header
      id="topo"
      className="sticky top-0 z-[var(--z-sticky)] w-full border-b border-[var(--border-default)]/70 bg-[var(--surface-page)]/95 backdrop-blur-md transition-colors duration-200"
    >
      <div className="editorial-container flex items-center justify-between gap-2 min-h-[4.5rem]">
        {/* Identidade à Esquerda: Monograma oficial IRO + IRONDINA MASCARENHAS · BEAUTY ARTIST */}
        <a
          href="#topo"
          className="group inline-flex items-center gap-3.5 min-h-[48px] px-1 py-2 text-[var(--text-primary)] no-underline shrink-0"
        >
          <span className="font-display text-[1.65rem] sm:text-[1.9rem] font-normal tracking-tight text-[var(--text-primary)] leading-none">
            IRO
          </span>
          <span
            className="hidden sm:inline-block h-5 w-[1px] bg-[var(--border-default)]"
            aria-hidden="true"
          />
          <span className="hidden sm:inline-block text-[0.72rem] tracking-[0.20em] uppercase text-[var(--text-primary)] font-semibold">
            IRONDINA MASCARENHAS{' '}
            <span className="text-[var(--text-muted)] font-normal mx-1">·</span>
            <span className="text-[var(--text-secondary)] font-medium">BEAUTY ARTIST</span>
          </span>
          <span className="sr-only"> — Início</span>
        </a>

        {/* Links de Navegação (4 âncoras compactas sem estouro no mobile) */}
        <nav aria-label="Navegação principal" className="flex items-center gap-0.5 sm:gap-3 lg:gap-6 min-w-0">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="inline-flex items-center justify-center min-h-[48px] px-1.5 sm:px-3 text-[0.66rem] sm:text-xs uppercase tracking-[0.06em] sm:tracking-[0.12em] font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-180 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Botão Pill Discreto Direita: Agendar */}
        <a
          href="#agendar"
          className="inline-flex items-center justify-center min-h-[40px] sm:min-h-[44px] px-3 sm:px-6 rounded-full border border-[var(--action-secondary-border)] text-[0.72rem] sm:text-xs font-medium tracking-[0.04em] sm:tracking-[0.06em] text-[var(--action-secondary-text)] hover:bg-[var(--action-primary)] hover:text-[var(--action-primary-text)] transition-all duration-200 shrink-0"
        >
          Agendar
        </a>
      </div>
    </header>
  );
};
