import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import { FAQ_LIST, buildWhatsAppUrl } from '../data/content';

const FAQ_WHATSAPP_MSG =
  'Olá, Irondina! Vi seu site e gostaria de tirar uma dúvida sobre atendimento.';

export const Sec07Faq: React.FC = () => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_LIST[0].id);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="w-full py-16 lg:py-24 bg-[var(--surface-page)] border-t border-[var(--border-default)]"
    >
      <div className="editorial-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Coluna Esquerda: Título H2 sem eyebrow + link WhatsApp verde */}
          <div className="lg:col-span-4">
            <h2
              id="faq-heading"
              className="font-display font-normal text-[var(--text-primary)] leading-[var(--leading-heading)]"
              style={{ fontSize: 'var(--text-display-section)' }}
            >
              Antes de chamar no <span className="italic text-[var(--action-primary)]">WhatsApp</span>
            </h2>

            <a
              href={buildWhatsAppUrl(FAQ_WHATSAPP_MSG)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 min-h-[48px] text-xs sm:text-sm font-semibold text-[var(--action-whatsapp)] hover:underline"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>Chamar no WhatsApp de Atendimento</span>
            </a>
          </div>

          {/* Coluna Direita: Sanfona Animada Padronizada com Sec03Servicos */}
          <div className="lg:col-span-8 divide-y divide-[var(--border-default)] border-b border-[var(--border-default)]">
            {FAQ_LIST.map((faq) => {
              const isOpen = openFaqId === faq.id;
              const panelId = `faq-panel-${faq.id}`;
              return (
                <div
                  key={faq.id}
                  className={`py-3.5 px-3 transition-colors duration-300 rounded-xl ${
                    isOpen ? 'bg-[var(--surface-section)]/65' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="w-full flex items-center justify-between gap-4 min-h-[52px] py-1.5 text-left cursor-pointer group"
                  >
                    <span className="font-display text-lg sm:text-xl font-medium text-[var(--text-primary)] group-hover:text-[var(--action-primary)] transition-colors">
                      {faq.question}
                    </span>

                    {/* Cápsula circular padronizada com Sec03Servicos */}
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
                        <div className="pb-3 pt-1.5 pr-8 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-[64ch]">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
