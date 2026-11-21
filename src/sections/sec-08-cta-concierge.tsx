import React, { useState } from 'react';
import { Calendar, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import {
  CONCIERGE_LOCATIONS,
  CONCIERGE_SERVICES,
  WHATSAPP_DISPLAY,
  buildWhatsAppUrl,
} from '../data/content';

export const Sec08CtaConcierge: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>(CONCIERGE_SERVICES[1]); // Make + Penteado
  const [selectedLocation, setSelectedLocation] = useState<string>(CONCIERGE_LOCATIONS[0]); // Goiânia – GO

  const dynamicMessage = `Olá, Irondina! Vim pelo seu site e gostaria de consultar disponibilidade e valores para ${selectedService} em ${selectedLocation}. Minha data prevista é ___.`;

  return (
    <section
      id="agendar"
      data-surface="impact"
      aria-labelledby="concierge-heading"
      className="relative w-full py-16 lg:py-24 overflow-hidden"
    >
      {/* Atmosfera luminosa quente no canto inferior direito (igual ao protótipo Stitch da Imagem 3) */}
      <div
        className="absolute -right-28 -bottom-28 w-96 h-96 rounded-full bg-[var(--color-espresso-700)]/20 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="editorial-container relative z-10">
        {/* Grid 8/4 idêntico à Imagem 3: Coluna Principal à esquerda + Card IRO STUDIO à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Coluna Esquerda (8 colunas): Título + Seletor 2 Toques + Botão Pill Luminoso */}
          <div className="lg:col-span-8">
            <h2
              id="concierge-heading"
              className="font-display font-normal text-[var(--color-alabaster-50)] leading-[1.08]"
              style={{ fontSize: 'var(--text-display-section)' }}
            >
              Sua data merece uma beleza que{' '}
              <span className="italic text-[var(--color-blush-400)]">pareça você</span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-[var(--color-sand-300)] leading-relaxed max-w-[54ch]">
              Selecione o que você procura para abrir o WhatsApp com sua mensagem já organizada.
            </p>

            {/* Micro-concierge em 2 Toques */}
            <div className="mt-7 space-y-5 pt-6 border-t border-[var(--border-on-dark)]">
              {/* Toque 1 — Qual produção você precisa? */}
              <fieldset>
                <legend className="text-xs sm:text-sm font-medium text-[var(--color-sand-300)] mb-2.5">
                  1. Qual produção você precisa?
                </legend>
                <div className="flex flex-wrap gap-2">
                  {CONCIERGE_SERVICES.map((service) => {
                    const active = selectedService === service;
                    return (
                      <button
                        key={service}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setSelectedService(service)}
                        className={`min-h-[48px] px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                          active
                            ? 'bg-[var(--color-blush-400)] text-[var(--color-espresso-950)] font-semibold shadow-sm'
                            : 'bg-transparent text-[var(--color-alabaster-50)] border border-[var(--border-on-dark)] hover:border-[var(--color-sand-300)]'
                        }`}
                      >
                        {service}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Toque 2 — Onde será o atendimento? */}
              <fieldset>
                <legend className="text-xs sm:text-sm font-medium text-[var(--color-sand-300)] mb-2.5">
                  2. Onde será o atendimento?
                </legend>
                <div className="flex flex-wrap gap-2">
                  {CONCIERGE_LOCATIONS.map((location) => {
                    const active = selectedLocation === location;
                    return (
                      <button
                        key={location}
                        type="button"
                        aria-pressed={active}
                        onClick={() => setSelectedLocation(location)}
                        className={`min-h-[48px] px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                          active
                            ? 'bg-[var(--color-blush-400)] text-[var(--color-espresso-950)] font-semibold shadow-sm'
                            : 'bg-transparent text-[var(--color-alabaster-50)] border border-[var(--border-on-dark)] hover:border-[var(--color-sand-300)]'
                        }`}
                      >
                        {location}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Preview Discreto da Mensagem */}
              <p className="text-xs text-[var(--color-sand-300)]/85 italic leading-relaxed">
                Mensagem pronta: “{dynamicMessage}”
              </p>

              {/* Botão Principal Pill Alabastro (Idêntico à Imagem 3) */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href={buildWhatsAppUrl(dynamicMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 min-h-[54px] px-8 py-3.5 rounded-full bg-[var(--color-alabaster-50)] hover:bg-[var(--color-blush-100)] text-[var(--color-espresso-950)] text-sm sm:text-base font-semibold tracking-[0.03em] shadow-xl transition-all duration-200 hover:scale-[1.01]"
                >
                  <Calendar
                    className="w-4 h-4 text-[var(--action-whatsapp)] shrink-0"
                    aria-hidden="true"
                  />
                  <span>Enviar solicitação no WhatsApp</span>
                </a>

                <span className="text-xs sm:text-sm text-[var(--color-sand-300)]/85">
                  Atendimento direto no WhatsApp comercial · {WHATSAPP_DISPLAY}
                </span>
              </div>
            </div>
          </div>

          {/* Coluna Direita (4 colunas): Card IRO STUDIO · GOIÂNIA–GO (Idêntico à Imagem 3!) */}
          <div className="lg:col-span-4">
            <div className="bg-[#15100E]/85 border border-[var(--border-on-dark)] p-7 sm:p-8 rounded-xl backdrop-blur-sm space-y-6 shadow-[var(--shadow-editorial)]">
              <div className="space-y-1">
                <span className="font-display text-2xl text-[var(--color-blush-400)] tracking-wide block">
                  IRO STUDIO
                </span>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-sand-300)] font-medium">
                  Goiânia–GO
                </p>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-[var(--color-alabaster-50)]/85">
                <div className="flex items-start gap-3">
                  <MapPin
                    className="w-4 h-4 text-[var(--color-blush-400)] mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    Goiânia – GO · Estúdio próprio + agendas de ensaios em BH e São Paulo
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <MessageCircle
                    className="w-4 h-4 text-[var(--color-blush-400)] mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{WHATSAPP_DISPLAY}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles
                    className="w-4 h-4 text-[var(--color-blush-400)] mt-0.5 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Maquiagem Clean, Social, Penteados, Ensaios &amp; Noivas</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-on-dark)] flex items-center justify-between text-xs text-[var(--color-sand-300)]">
                <span>Atendimento com hora marcada</span>
                <span
                  className="inline-block w-2 h-2 rounded-full bg-[var(--color-whatsapp-brand)] animate-pulse"
                  aria-hidden="true"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
