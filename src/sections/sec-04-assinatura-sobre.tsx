import React from 'react';
import { MEDIA } from '../data/content';

export const Sec04AssinaturaSobre: React.FC = () => {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-heading"
      className="w-full py-16 lg:py-24"
      style={{ background: 'var(--gradient-about-to-proof)' }}
    >
      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Composição Fotográfica Real Estilo Revista (IRO-04 com Monograma Overlay + IRO-03 + Painel IG-05) */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-3.5 sm:gap-5 items-end relative">
            {/* Retrato Principal IRO-04 (Alfaiataria bege, 3:4) */}
            <figure className="col-span-7 relative overflow-hidden rounded-[var(--radius-media)] aspect-[3/4] bg-[var(--color-espresso-950)] shadow-[var(--shadow-editorial)]">
              <img
                src={MEDIA.about.mainPortrait}
                alt="Retrato autoral de Irondina Mascarenhas — Beauty Artist em Goiânia"
                width={750}
                height={1000}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              {/* Selo Monograma IRO no canto superior direito (inspirado no protótipo Stitch) */}
              <div
                className="absolute top-3.5 right-3.5 bg-[var(--color-alabaster-50)]/92 backdrop-blur-xs px-3 py-2 rounded-[var(--radius-media)] border border-[var(--border-default)] text-center"
                aria-hidden="true"
              >
                <span className="font-display text-lg text-[var(--action-primary)] block leading-none">
                  IRO
                </span>
                <span className="text-[0.6rem] tracking-[0.2em] uppercase text-[var(--text-primary)] font-semibold block mt-0.5">
                  Artist
                </span>
              </div>
              <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[var(--color-espresso-950)]/90 via-[var(--color-espresso-950)]/45 to-transparent p-4 text-[var(--color-alabaster-50)]">
                <p className="font-display text-xl sm:text-2xl font-normal leading-none">
                  Irondina <span className="italic text-[var(--color-blush-400)]">Mascarenhas</span>
                </p>
              </figcaption>
            </figure>

            {/* Coluna Lateral com IRO-03 (Golden Hour) e IG-05 (Painel Assinado do Estúdio) */}
            <div className="col-span-5 flex flex-col gap-3.5 sm:gap-5">
              <figure className="overflow-hidden rounded-[var(--radius-media)] aspect-[3/4] bg-[var(--surface-editorial-band)] shadow-[var(--shadow-subtle)]">
                <img
                  src={MEDIA.about.secondaryPortrait}
                  alt="Irondina Mascarenhas em ensaio editorial de estúdio"
                  width={750}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </figure>

              <figure className="relative overflow-hidden rounded-[var(--radius-media)] aspect-[4/5] bg-[var(--color-espresso-950)] shadow-[var(--shadow-subtle)]">
                <img
                  src={MEDIA.about.studioPanel}
                  alt="Estúdio próprio com painel assinado Irondina Mascarenhas Beauty Artist"
                  width={750}
                  height={1000}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <figcaption className="absolute bottom-0 inset-x-0 bg-[var(--color-espresso-950)]/85 px-2.5 py-1.5 text-[0.7rem] text-[var(--color-alabaster-50)] font-medium">
                  Estúdio Próprio · Goiânia
                </figcaption>
              </figure>
            </div>
          </div>

          {/* Narrativa Editorial (3 Parágrafos Curtos Fatuais — Zero Eyebrow e Zero Subtítulo) */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <h2
              id="sobre-heading"
              className="font-display font-normal text-[var(--text-primary)] leading-[var(--leading-heading)]"
              style={{ fontSize: 'var(--text-display-section)' }}
            >
              Nove anos dedicados à beleza que{' '}
              <span className="italic text-[var(--action-primary)]">reconhece quem você é</span> no
              espelho
            </h2>

            <div className="mt-6 space-y-4 text-sm sm:text-base text-[var(--text-secondary)] leading-[var(--leading-body)] max-w-[60ch]">
              <p>
                Em ensaios e eventos, luz forte e câmera mostram tudo. Por isso cada pele nasce de
                camadas finas e bem assentadas, respeitando textura, subtom e traços originais sem
                mascarar quem você é.
              </p>
              <p>
                Irondina Mascarenhas atua desde 2017 em Goiânia e acompanha produções fotográficas
                em Belo Horizonte e São Paulo. Além do atendimento no próprio estúdio, concilia a
                rotina com a graduação em Educação Física — duas escolhas guiadas por disciplina,
                cuidado e bom humor.
              </p>
              <p className="text-[var(--text-primary)] font-medium">
                Quando uma cliente volta para o segundo ensaio ou indica uma amiga para o próximo
                casamento, o motivo raramente é apenas a maquiagem: é sair segura antes mesmo de a
                primeira foto acontecer.
              </p>
            </div>

            {/* Faixa de Assinatura Editorial */}
            <div className="mt-8 pt-5 border-t border-[var(--border-default)] w-full flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-[var(--text-secondary)]">
              <span>Fotos autorais: @souquemsoufotografia</span>
              <span className="font-display italic text-lg text-[var(--action-primary)]">
                “Make embelezadora. Não transforma, realça.”
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
