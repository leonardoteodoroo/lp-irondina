import React, { useRef } from 'react';
import { ArrowUp, ArrowUpRight, X } from 'lucide-react';
import { INSTAGRAM_URL, WHATSAPP_DISPLAY } from '../data/content';

export const Sec09Footer: React.FC = () => {
  const lgpdDialogRef = useRef<HTMLDialogElement>(null);
  const creditsDialogRef = useRef<HTMLDialogElement>(null);

  const handleScrollTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackdropDismiss = (
    event: React.MouseEvent<HTMLDialogElement>,
    dialog: HTMLDialogElement | null
  ) => {
    if (event.target === event.currentTarget) {
      dialog?.close();
    }
  };

  return (
    <>
      {/* Footer Editorial Claro — Estrutura idêntica à Imagem 3 enviada pelo usuário */}
      <footer className="w-full bg-[var(--surface-page)] text-[var(--text-primary)] border-t border-[var(--border-default)] py-12 lg:py-16">
        <div className="editorial-container">
          {/* Zona Superior (Pós-CTA — Anti-Vazamento) */}
          <div className="pb-10 border-b border-[var(--border-default)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="text-sm sm:text-base text-[var(--text-primary)] font-medium">
              Quer acompanhar produções recentes e bastidores do dia a dia?
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[48px] px-5 py-2.5 rounded-full border border-[var(--action-secondary-border)] text-xs sm:text-sm font-semibold text-[var(--action-secondary-text)] hover:bg-[var(--action-primary)] hover:text-[var(--action-primary-text)] transition-colors self-start sm:self-auto"
            >
              <span>Seguir @irondina_ero no Instagram</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
          </div>

          {/* Zona Principal (Monograma IRO Grande à Esquerda + Âncoras à Direita — igual à Imagem 3) */}
          <div className="py-10 border-b border-[var(--border-default)] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-1.5">
              <span className="font-display text-3xl sm:text-4xl text-[var(--text-primary)] leading-none block">
                IRO
              </span>
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)] font-medium">
                Goiânia–GO · Atendimento com hora marcada · Deslocamentos para ensaios em BH e SP
              </p>
            </div>

            <nav aria-label="Links do rodapé" className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm font-medium text-[var(--text-secondary)]">
              <a href="#galeria" className="min-h-[48px] inline-flex items-center hover:text-[var(--text-primary)] transition-colors">
                Portfólio
              </a>
              <a href="#servicos" className="min-h-[48px] inline-flex items-center hover:text-[var(--text-primary)] transition-colors">
                Serviços
              </a>
              <a href="#sobre" className="min-h-[48px] inline-flex items-center hover:text-[var(--text-primary)] transition-colors">
                Sobre
              </a>
              <a href="#cursos" className="min-h-[48px] inline-flex items-center hover:text-[var(--text-primary)] transition-colors">
                Cursos
              </a>
            </nav>
          </div>

          {/* Zona Base (Copyright + Modais LGPD / Direitos de Imagem + Topo) */}
          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[var(--text-secondary)]">
            <p>© 2026 Irondina Mascarenhas — Beauty Artist. Todos os direitos reservados.</p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => lgpdDialogRef.current?.showModal()}
                className="min-h-[48px] px-1 py-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline underline-offset-4 cursor-pointer"
              >
                Política de Privacidade (LGPD)
              </button>

              <button
                type="button"
                onClick={() => creditsDialogRef.current?.showModal()}
                className="min-h-[48px] px-1 py-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] underline underline-offset-4 cursor-pointer"
              >
                Direitos de Imagem &amp; Créditos
              </button>

              <a
                href="#topo"
                onClick={handleScrollTop}
                aria-label="Voltar ao topo da página"
                className="inline-flex items-center gap-1 min-h-[48px] px-3 py-1.5 rounded-full border border-[var(--border-default)] text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--surface-section)] transition-colors cursor-pointer"
              >
                <span>Topo</span>
                <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Nativo <dialog closedby="any"> — Política de Privacidade (LGPD) */}
      <dialog
        ref={lgpdDialogRef}
        {...({ closedby: 'any' } as React.DialogHTMLAttributes<HTMLDialogElement>)}
        aria-labelledby="lgpd-dialog-title"
        onClick={(e) => handleBackdropDismiss(e, lgpdDialogRef.current)}
        className="max-w-[580px]!"
      >
        <div className="p-6 sm:p-8 bg-[var(--surface-page)] text-[var(--text-primary)] max-h-[calc(100dvh-2.5rem)] overflow-y-auto">
          <div className="flex items-start justify-between gap-4 pb-5 border-b border-[var(--border-default)]">
            <h2 id="lgpd-dialog-title" className="font-display text-2xl sm:text-[1.75rem] font-normal leading-tight">
              Política de Privacidade (LGPD)
            </h2>
            <button
              type="button"
              onClick={() => lgpdDialogRef.current?.close()}
              aria-label="Fechar Política de Privacidade"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[var(--surface-editorial-band)] text-[var(--text-primary)] hover:bg-[var(--color-espresso-950)] hover:text-[var(--color-alabaster-50)] transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-5 space-y-3.5 text-sm text-[var(--text-secondary)] leading-relaxed">
            <p>
              Esta página opera em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei
              nº 13.709/2018 — LGPD). Não coletamos formulários ocultos, cadastros em banco de dados
              nem cookies invasivos de rastreamento pessoal.
            </p>
            <p>
              Toda solicitação de agendamento ou consulta de turmas ocorre por iniciativa direta da
              usuária ao acionar o redirecionamento para o aplicativo oficial WhatsApp comercial de{' '}
              <strong>Irondina Mascarenhas Pereira</strong> (CNPJ 45.937.603/0001-52 · Goiânia–GO ·{' '}
              {WHATSAPP_DISPLAY}).
            </p>
            <p>
              As informações compartilhadas voluntariamente na conversa de WhatsApp destinam-se
              exclusivamente à verificação de agenda, orçamento e atendimento contratado.
            </p>
          </div>

          <div className="mt-7 pt-4 border-t border-[var(--border-subtle)] flex justify-end">
            <button
              type="button"
              onClick={() => lgpdDialogRef.current?.close()}
              className="min-h-[48px] px-7 py-2.5 rounded-full bg-[var(--action-primary)] hover:bg-[var(--action-primary-hover)] text-[var(--action-primary-text)] text-sm font-medium transition-colors cursor-pointer"
            >
              Entendi
            </button>
          </div>
        </div>
      </dialog>

      {/* Modal Nativo <dialog closedby="any"> — Direitos de Imagem & Créditos */}
      <dialog
        ref={creditsDialogRef}
        {...({ closedby: 'any' } as React.DialogHTMLAttributes<HTMLDialogElement>)}
        aria-labelledby="credits-dialog-title"
        onClick={(e) => handleBackdropDismiss(e, creditsDialogRef.current)}
        className="max-w-[580px]!"
      >
        <div className="p-6 sm:p-8 bg-[var(--surface-page)] text-[var(--text-primary)] max-h-[calc(100dvh-2.5rem)] overflow-y-auto">
          <div className="flex items-start justify-between gap-4 pb-5 border-b border-[var(--border-default)]">
            <h2 id="credits-dialog-title" className="font-display text-2xl sm:text-[1.75rem] font-normal leading-tight">
              Direitos de Imagem &amp; Créditos Editoriais
            </h2>
            <button
              type="button"
              onClick={() => creditsDialogRef.current?.close()}
              aria-label="Fechar Direitos de Imagem e Créditos"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[var(--surface-editorial-band)] text-[var(--text-primary)] hover:bg-[var(--color-espresso-950)] hover:text-[var(--color-alabaster-50)] transition-colors cursor-pointer shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-5 space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
            <p>
              As fotografias de produções reais exibidas neste portfólio pertencem ao acervo oficial
              de <strong>Irondina Mascarenhas — Beauty Artist</strong> (<code>@irondina_ero</code> /{' '}
              <code>@iro_mascarenhas</code>), sendo vedada a reprodução comercial por terceiros sem
              autorização prévia.
            </p>
            <p>
              Créditos editoriais às fotógrafas, estúdios e profissionais parceiros registrados nas
              produções colaborativas:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[var(--text-primary)]">
              <li>
                <strong>Grazielle Prado</strong> (<code>@souquemsoufotografia</code> /{' '}
                <code>@graziellepradofotografia</code>)
              </li>
              <li>
                <strong>Darah Coelho</strong> (<code>@darahcoelho</code>) &amp;{' '}
                <strong>Luíza Monteiro</strong> (<code>@luiza_trancistx</code>)
              </li>
              <li>
                <strong>Cristianne Costa</strong> (<code>@cristiannecostafotografia</code>)
              </li>
              <li>
                <strong>Jhonata Brito</strong> (<code>@jhonata_brito</code>)
              </li>
              <li>
                <strong>Cobertura de Imprensa / TV:</strong> Troféu Maguito Vilela (
                <code>@alotvbrasil</code> · <code>@taianichagass</code>)
              </li>
            </ul>

            <div className="p-4 rounded-xl bg-[var(--surface-editorial-band)]/70 border border-[var(--border-default)] text-xs sm:text-sm text-[var(--text-primary)]">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-[var(--accent-editorial)] text-[var(--text-primary)] text-[0.7rem] font-semibold uppercase tracking-wider mb-1.5">
                A confirmar
              </span>
              <p className="leading-relaxed text-[var(--text-secondary)]">
                Nota suplementar (A confirmar): Fichas técnicas complementares, termos de autorização
                de imagem e créditos editoriais adicionais encontram-se com status{' '}
                <strong className="text-[var(--text-primary)]">A confirmar</strong> junto à curadoria
                final da profissional.
              </p>
            </div>
          </div>

          <div className="mt-7 pt-4 border-t border-[var(--border-subtle)] flex justify-end">
            <button
              type="button"
              onClick={() => creditsDialogRef.current?.close()}
              className="min-h-[48px] px-7 py-2.5 rounded-full bg-[var(--action-primary)] hover:bg-[var(--action-primary-hover)] text-[var(--action-primary-text)] text-sm font-medium transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};
