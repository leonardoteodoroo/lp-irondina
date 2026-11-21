import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { SERVICES_LIST, buildWhatsAppUrl } from '../data/content';

export const Sec03Servicos: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(SERVICES_LIST[0].id);
  const [previewId, setPreviewId] = useState<string>(SERVICES_LIST[0].id);

  const activePreview =
    SERVICES_LIST.find((item) => item.id === (openId ?? previewId)) ?? SERVICES_LIST[0];

  const toggleService = (id: string) => {
    setPreviewId(id);
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="servicos"
      aria-labelledby="servicos-heading"
      className="w-full py-16 lg:py-24"
      style={{ background: 'var(--gradient-services-to-about)' }}
    >
      <div className="editorial-container">
        {/* Título H2 — Zero Eyebrow e Zero Subtítulo conforme COPY_LP_IRONDINA.md v2 */}
        <div className="pb-8 border-b border-[var(--border-default)]">
          <h2
            id="servicos-heading"
            className="font-display font-normal text-[var(--text-primary)] leading-[var(--leading-heading)] max-w-[22ch]"
            style={{ fontSize: 'var(--text-display-section)' }}
          >
            Atendimento pensado para o <span className="italic text-[var(--action-primary)]">evento</span> e a fotografia
          </h2>
        </div>

        {/* Layout Screen UI Full-Width: Sanfona Padronizada (Esquerda) + Vitrine Fotográfica (Direita) */}
        <div className="mt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Lista Editorial em Sanfona Controlada (7 colunas no desktop) */}
          <div className="lg:col-span-7 divide-y divide-[var(--border-default)] border-b border-[var(--border-default)]">
            {SERVICES_LIST.map((service) => {
              const isOpen = openId === service.id;
              const panelId = `service-panel-${service.id}`;
              return (
                <div
                  key={service.id}
                  className={`py-4 sm:py-6 transition-colors duration-300 ${
                    isOpen ? 'bg-[var(--surface-section)]/60 -mx-3 px-3 rounded-xl' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleService(service.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full text-left flex items-center justify-between gap-4 min-h-[52px] cursor-pointer group"
                  >
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span
                        className={`font-display text-2xl sm:text-3xl transition-colors ${
                          isOpen ? 'text-[var(--action-primary)]' : 'text-[var(--text-muted)]/60'
                        }`}
                      >
                        {service.number}
                      </span>
                      <h3
                        className="font-display font-normal text-[var(--text-primary)] group-hover:text-[var(--action-primary)] transition-colors"
                        style={{ fontSize: 'var(--text-heading-md)' }}
                      >
                        {service.title}
                      </h3>
                      {service.badge && (
                        /* Regra WCAG: texto escuro #1E1816 sobre Blush #DFA194 (7.56:1 AAA) */
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full bg-[var(--accent-editorial)] text-[var(--text-primary)] text-xs font-semibold tracking-wide">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    {/* Cápsula circular padronizada com Sec07Faq */}
                    <span
                      className={`inline-flex items-center justify-center w-9 h-9 rounded-full border shrink-0 transition-colors duration-200 ${
                        isOpen
                          ? 'bg-[var(--color-espresso-950)] border-[var(--color-espresso-950)] text-[var(--color-alabaster-50)]'
                          : 'border-[var(--border-default)] text-[var(--action-primary)] group-hover:border-[var(--action-primary)]'
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : 'rotate-0'
                        }`}
                      />
                    </span>
                  </button>

                  {/* Corpo Animado da Sanfona (Abre e fecha suavemente ao clicar em Mobile & Desktop) */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={panelId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-3 pb-1 pl-0 sm:pl-10">
                          <div className="grid grid-cols-12 gap-4 items-center">
                            {/* Miniatura proporcional lado a lado apenas no mobile */}
                            <div className="col-span-4 lg:hidden">
                              <div className="overflow-hidden rounded-[var(--radius-media)] aspect-[4/5] bg-[var(--surface-editorial-band)] shadow-xs">
                                <img
                                  src={service.image}
                                  alt={service.imageAlt}
                                  width={720}
                                  height={900}
                                  loading="lazy"
                                  decoding="async"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>

                            <div className="col-span-8 lg:col-span-12">
                              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-[58ch]">
                                {service.description}
                              </p>

                              <div className="mt-4">
                                <a
                                  href={buildWhatsAppUrl(service.whatsappMessage)}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 min-h-[48px] text-xs sm:text-sm font-semibold text-[var(--action-primary)] hover:text-[var(--action-primary-hover)] group/link transition-colors"
                                >
                                  <span className="underline underline-offset-4 decoration-[var(--action-primary)]/40 group-hover/link:decoration-[var(--action-primary)]">
                                    {service.ctaLabel}
                                  </span>
                                  <ArrowRight
                                    className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover/link:translate-x-1"
                                    aria-hidden="true"
                                  />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Vitrine Fotográfica Sincronizada à Direita (5 colunas no desktop) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-24 pt-4">
            <motion.figure
              key={activePreview.id}
              initial={{ opacity: 0.35, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[var(--radius-media)] aspect-[4/5] bg-[var(--color-espresso-950)] shadow-[var(--shadow-editorial)]"
            >
              <img
                src={activePreview.image}
                alt={activePreview.imageAlt}
                width={720}
                height={900}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[var(--color-espresso-950)]/90 via-[var(--color-espresso-950)]/45 to-transparent px-6 pt-12 pb-5 text-[var(--color-alabaster-50)] flex items-end justify-between gap-4">
                <div>
                  <span className="font-display italic text-sm text-[var(--color-blush-400)] block">
                    {activePreview.number} · Irondina Mascarenhas
                  </span>
                  <p className="font-display text-2xl font-normal leading-tight mt-0.5">
                    {activePreview.title}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[var(--color-alabaster-50)]/15 backdrop-blur-xs text-xs text-[var(--color-alabaster-50)] shrink-0">
                  Goiânia–GO
                </span>
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  );
};
