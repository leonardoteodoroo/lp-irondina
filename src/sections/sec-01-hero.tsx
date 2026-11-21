import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, MessageCircle } from 'lucide-react';
import { MEDIA, buildWhatsAppUrl } from '../data/content';

const HERO_WHATSAPP_MSG =
  'Olá, Irondina! Vi seu portfólio no site e gostaria de consultar disponibilidade de data para atendimento.';

const HERO_SCENES = [
  {
    id: 'scene-01',
    src: MEDIA.hero.stagePrimary,
    srcSm: MEDIA.hero.stagePrimarySm,
    alt: 'Retrato editorial de beleza e posicionamento por Irondina Mascarenhas em Goiânia',
    caption: 'Pele Iluminada & Cachos 3D · Estúdio Goiânia',
    objectPos: 'object-[center_top] lg:object-[72%_20%]',
  },
  {
    id: 'scene-02',
    src: MEDIA.hero.stageSecondary,
    srcSm: MEDIA.hero.mainSm,
    alt: 'Produção de maquiagem clean iluminada por Irondina Mascarenhas no estúdio próprio',
    caption: 'Textura Real & Viço Leve · Painel Oficial IRO',
    objectPos: 'object-[center_top] lg:object-[75%_22%]',
  },
  {
    id: 'scene-03',
    src: MEDIA.hero.stageTertiary,
    srcSm: MEDIA.hero.stageTertiarySm,
    alt: 'Produção completa de maquiagem glow e penteado preso alto estilizado',
    caption: 'Make & Penteado Integrados · Luz de Estúdio',
    objectPos: 'object-[center_top] lg:object-[74%_18%]',
  },
];

const CREDENTIALS = [
  {
    num: '01',
    title: 'Desde 2017 em Goiânia',
    sublabel: '+9 anos',
    detail: 'Estúdio próprio com hora marcada',
  },
  {
    num: '02',
    title: 'Make & Penteado completos',
    detail: 'Produção integrada no mesmo horário',
  },
  {
    num: '03',
    title: 'Ensaios em Goiânia, BH e SP',
    detail: 'Preparo técnico para luz e câmera',
  },
  {
    num: '04',
    title: 'Imprensa/TV & Fotógrafas',
    detail: 'Troféu Maguito Vilela e estúdios parceiros',
  },
];

export const Sec01Hero: React.FC = () => {
  const [activeScene, setActiveScene] = useState(0);
  const ctaSlotRef = useRef<HTMLSpanElement>(null);
  const ctaBtnRef = useRef<HTMLAnchorElement>(null);

  // Troca cinematográfica automática suave das fotos de fundo da Hero (sem exigir clique)
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveScene((prev) => (prev + 1) % HERO_SCENES.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, []);

  // Morph contínuo do CTA da Hero -> Botão fixo WhatsApp no canto inferior direito ao rolar (referência mendes-fotografia)
  useEffect(() => {
    const slot = ctaSlotRef.current;
    const btn = ctaBtnRef.current;
    if (!slot || !btn) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const lerp = (start: number, end: number, progress: number) => start + (end - start) * progress;

    interface MorphMetrics {
      sourceLeft: number;
      sourceTop: number;
      sourceWidth: number;
      sourceHeight: number;
      targetLeft: number;
      targetTop: number;
      targetRight: number;
      targetBottom: number;
      targetSize: number;
      startScroll: number;
      travel: number;
    }

    let morphMetrics: MorphMetrics | null = null;
    let morphFrame: number | null = null;
    let hideAtBottom = false;

    const preserveFocusWhile = (callback: () => void) => {
      const hadFocus = document.activeElement === btn;
      callback();
      if (hadFocus) btn.focus({ preventScroll: true });
    };

    const returnCtaToHero = () => {
      if (btn.parentElement === slot && !btn.classList.contains('is-morphing')) return;
      preserveFocusWhile(() => {
        btn.classList.remove('is-docked', 'is-morphing', 'is-hidden-at-bottom');
        slot.appendChild(btn);
      });
    };

    const moveCtaToViewport = () => {
      if (btn.parentElement === document.body) return;
      preserveFocusWhile(() => document.body.appendChild(btn));
    };

    const measureMorph = (): MorphMetrics => {
      preserveFocusWhile(() => {
        btn.classList.remove('is-docked', 'is-morphing', 'is-hidden-at-bottom');
        slot.classList.remove('is-reserved');
        slot.style.removeProperty('--hero-cta-slot-width');
        slot.style.removeProperty('--hero-cta-slot-height');
        slot.appendChild(btn);
      });

      const sourceRect = btn.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      const sourceDocumentTop = sourceRect.top + scrollY;
      const startScroll = Math.max(24, sourceDocumentTop - window.innerHeight * 0.65);
      const travel = clamp(window.innerHeight * 0.45, 260, 420);
      const targetSize = window.innerWidth <= 768 ? 56 : 58;

      slot.style.setProperty('--hero-cta-slot-width', `${sourceRect.width}px`);
      slot.style.setProperty('--hero-cta-slot-height', `${sourceRect.height}px`);
      slot.classList.add('is-reserved');

      moveCtaToViewport();
      btn.classList.add('is-morphing');
      btn.style.setProperty('--morph-width', `${targetSize}px`);
      btn.style.setProperty('--morph-height', `${targetSize}px`);
      btn.style.setProperty('--morph-x', '0px');
      btn.style.setProperty('--morph-y', '0px');
      const targetRect = btn.getBoundingClientRect();

      return {
        sourceLeft: sourceRect.left,
        sourceTop: sourceDocumentTop - startScroll,
        sourceWidth: sourceRect.width,
        sourceHeight: sourceRect.height,
        targetLeft: targetRect.left,
        targetTop: targetRect.top,
        targetRight: targetRect.right,
        targetBottom: targetRect.bottom,
        targetSize,
        startScroll,
        travel,
      };
    };

    const applyMorph = (progress: number) => {
      if (!morphMetrics) return;
      const easedProgress = progress * progress * (3 - 2 * progress);
      const width = lerp(morphMetrics.sourceWidth, morphMetrics.targetSize, easedProgress);
      const height = lerp(morphMetrics.sourceHeight, morphMetrics.targetSize, easedProgress);
      const desiredLeft = lerp(morphMetrics.sourceLeft, morphMetrics.targetLeft, easedProgress);
      const desiredTop = lerp(morphMetrics.sourceTop, morphMetrics.targetTop, easedProgress);
      const anchoredLeft = morphMetrics.targetRight - width;
      const anchoredTop = morphMetrics.targetBottom - height;
      const textOpacity = 1 - clamp((progress - 0.1) / 0.48);
      const iconOpacity = clamp((progress - 0.36) / 0.4);

      moveCtaToViewport();
      btn.classList.add('is-morphing');
      btn.classList.toggle('is-docked', progress >= 0.995);
      btn.classList.toggle('is-hidden-at-bottom', hideAtBottom && progress >= 0.995);
      btn.style.setProperty('--morph-width', `${width.toFixed(2)}px`);
      btn.style.setProperty('--morph-height', `${height.toFixed(2)}px`);
      btn.style.setProperty('--morph-x', `${(desiredLeft - anchoredLeft).toFixed(2)}px`);
      btn.style.setProperty('--morph-y', `${(desiredTop - anchoredTop).toFixed(2)}px`);
      btn.style.setProperty('--morph-text-opacity', textOpacity.toFixed(3));
      btn.style.setProperty('--morph-icon-opacity', iconOpacity.toFixed(3));
      btn.style.setProperty('--morph-icon-scale', lerp(0.72, 1, iconOpacity).toFixed(3));
    };

    const updateMorph = () => {
      morphFrame = null;
      if (!morphMetrics) morphMetrics = measureMorph();

      if (reducedMotion.matches) {
        const sourceHasLeftViewport = slot.getBoundingClientRect().bottom <= 0;
        if (sourceHasLeftViewport) applyMorph(1);
        else returnCtaToHero();
        return;
      }

      const scrollY = window.scrollY || window.pageYOffset;
      const progress = clamp((scrollY - morphMetrics.startScroll) / morphMetrics.travel);

      if (progress <= 0) returnCtaToHero();
      else applyMorph(progress);
    };

    const scheduleMorphUpdate = () => {
      if (morphFrame !== null) return;
      morphFrame = window.requestAnimationFrame(updateMorph);
    };

    const invalidateMorphMetrics = () => {
      morphMetrics = null;
      scheduleMorphUpdate();
    };

    // Oculta o botão morphado quando entra na seção final #agendar, footer ou mockup GMB
    const hideTargets = [
      document.getElementById('agendar'),
      document.querySelector('footer'),
      document.getElementById('google-meu-negocio-preview'),
    ].filter((el): el is HTMLElement => el !== null);

    const visibleMap = new Map<Element, boolean>();
    const bottomObserver =
      hideTargets.length > 0
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                visibleMap.set(entry.target, entry.isIntersecting);
              }
              hideAtBottom = Array.from(visibleMap.values()).some(Boolean);
              if (btn.classList.contains('is-morphing')) {
                btn.classList.toggle('is-hidden-at-bottom', hideAtBottom);
              }
            },
            { threshold: 0.06 }
          )
        : null;

    for (const el of hideTargets) bottomObserver?.observe(el);

    window.addEventListener('scroll', scheduleMorphUpdate, { passive: true });
    window.addEventListener('resize', invalidateMorphMetrics, { passive: true });
    window.addEventListener('orientationchange', invalidateMorphMetrics, { passive: true });
    window.addEventListener('pageshow', invalidateMorphMetrics);
    window.visualViewport?.addEventListener('resize', invalidateMorphMetrics, { passive: true });
    reducedMotion.addEventListener?.('change', invalidateMorphMetrics);

    invalidateMorphMetrics();

    return () => {
      if (morphFrame !== null) window.cancelAnimationFrame(morphFrame);
      bottomObserver?.disconnect();
      window.removeEventListener('scroll', scheduleMorphUpdate);
      window.removeEventListener('resize', invalidateMorphMetrics);
      window.removeEventListener('orientationchange', invalidateMorphMetrics);
      window.removeEventListener('pageshow', invalidateMorphMetrics);
      window.visualViewport?.removeEventListener('resize', invalidateMorphMetrics);
      reducedMotion.removeEventListener?.('change', invalidateMorphMetrics);
      // Restaura nó DOM dentro do slot antes da desmontagem do React
      if (btn.parentElement !== slot) {
        btn.classList.remove('is-docked', 'is-morphing', 'is-hidden-at-bottom');
        slot.appendChild(btn);
      }
    };
  }, []);

  return (
    <section
      id="hero"
      data-surface="impact"
      aria-labelledby="hero-heading"
      className="relative w-full min-h-[calc(100dvh-4.5rem)] flex flex-col justify-between overflow-hidden bg-[var(--surface-stage-dark)] text-[var(--text-on-dark)]"
    >
      {/* Palco Fotográfico Full-Bleed Cinematográfico (Mobile estilo Tai Vilela & Desktop estilo Stitch Variant 3) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-hidden">
        <div className="relative w-full h-[58%] lg:h-full overflow-hidden">
          {HERO_SCENES.map((scene, index) => {
            const isCurrent = index === activeScene;
            return (
              <img
                key={scene.id}
                src={scene.src}
                srcSet={`${scene.srcSm} 720w, ${scene.src} 1200w`}
                sizes="(max-width: 1023px) 100vw, 68vw"
                alt={scene.alt}
                width={1200}
                height={1500}
                fetchPriority={index === 0 ? 'high' : undefined}
                decoding={index === 0 ? 'sync' : 'async'}
                className={`absolute inset-0 w-full h-full lg:w-[68%] lg:ml-auto object-cover ${scene.objectPos} animate-ken-burns transition-opacity duration-1000 ease-out ${
                  isCurrent ? 'opacity-95' : 'opacity-0'
                }`}
              />
            );
          })}
        </div>

        {/* Scrim Direcional Desktop: Escuro profundo à esquerda (#120E0C) abrindo para a foto à direita */}
        <div
          className="hidden lg:block absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, #120E0C 0%, #120E0C 34%, rgba(18, 14, 12, 0.86) 54%, rgba(18, 14, 12, 0.22) 82%, rgba(18, 14, 12, 0.08) 100%)',
          }}
        />

        {/* Scrim Mobile Progressivo Preto: Rosto 100% visível e limpo no topo + base preta sólida atrás do texto */}
        <div
          className="lg:hidden absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(18, 14, 12, 0.14) 0%, rgba(18, 14, 12, 0.02) 30%, rgba(18, 14, 12, 0.72) 41%, #120E0C 52%, #120E0C 100%)',
          }}
        />

        {/* Scrim Vertical sutil Desktop para a barra inferior */}
        <div
          className="hidden lg:block absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(18, 14, 12, 0.22) 0%, rgba(18, 14, 12, 0) 24%, rgba(18, 14, 12, 0.65) 86%, #120E0C 100%)',
          }}
        />
      </div>

      {/* Conteúdo Editorial Sobreposto ao Palco Escuro (CTA 100% visível acima da dobra em 360x800) */}
      <div className="editorial-container relative z-10 flex-1 flex flex-col justify-end lg:justify-center pt-[38dvh] sm:pt-[44dvh] lg:pt-16 pb-6 lg:pb-14">
        <motion.div
          initial={{ opacity: 0, translateY: 16 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[660px] flex flex-col items-start"
        >
          {/* Título Principal H1 — Zero Eyebrow, EB Garamond com destaque em itálico Blush (#DFA194) */}
          <h1
            id="hero-heading"
            className="font-display font-normal text-[var(--color-alabaster-50)] leading-[1.06] tracking-[-0.02em]"
            style={{ fontSize: 'var(--text-display-hero)' }}
          >
            Make embelezadora para realçar sua{' '}
            <span className="italic font-normal text-[var(--color-blush-400)]">
              beleza sem pesar
            </span>
          </h1>

          {/* Assinatura da Marca com Travessão Editorial Blush (Idêntico à Imagem 2) */}
          <div className="mt-4 sm:mt-5 flex items-center gap-3.5">
            <span
              className="w-8 sm:w-10 h-[1px] bg-[var(--color-blush-400)]/80 shrink-0"
              aria-hidden="true"
            />
            <p className="font-display italic text-xl sm:text-2xl text-[var(--color-blush-100)] font-normal tracking-wide">
              Make embelezadora. Não transforma, realça.
            </p>
          </div>

          {/* Subtítulo (1 frase enxuta e sensorial) */}
          <p
            className="mt-4 sm:mt-5 text-[var(--color-sand-300)] leading-relaxed max-w-[54ch]"
            style={{ fontSize: 'var(--text-lead)' }}
          >
            Produções de maquiagem e penteado em Goiânia para eventos sociais, ensaios e noivas:
            pele iluminada, leve e resistente à luz, câmera e emoção.
          </p>

          {/* CTAs: Botão Pill Alabastro Luminoso com Morph Contínuo no Scroll + Link Secundário com Seta */}
          <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
            <span ref={ctaSlotRef} className="hero-cta-slot w-full sm:w-auto">
              <a
                ref={ctaBtnRef}
                href={buildWhatsAppUrl(HERO_WHATSAPP_MSG)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Consultar minha data no WhatsApp"
                className="hero-whatsapp-cta inline-flex items-center justify-center gap-2.5 min-h-[52px] w-full sm:w-auto px-7 py-3.5 rounded-full bg-[var(--color-alabaster-50)] hover:bg-[var(--color-blush-100)] text-[var(--color-espresso-950)] text-sm sm:text-base font-semibold tracking-[0.03em] shadow-[var(--shadow-floating)] transition-colors duration-200"
              >
                <svg className="hero-whatsapp-icon" viewBox="5 5 14 14" aria-hidden="true" focusable="false">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z" />
                </svg>
                <span className="hero-whatsapp-text inline-flex items-center justify-center gap-2.5">
                  <MessageCircle
                    className="w-4 h-4 text-[var(--color-whatsapp-500)] shrink-0"
                    aria-hidden="true"
                  />
                  <span>Consultar minha data no WhatsApp</span>
                </span>
              </a>
            </span>

            <a
              href="#galeria"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-3 py-2 text-sm sm:text-base font-medium text-[var(--color-alabaster-50)]/90 hover:text-[var(--color-blush-400)] transition-colors duration-200 group"
            >
              <span>Ver produções reais</span>
              <ArrowDown
                className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-y-1"
                aria-hidden="true"
              />
            </a>
          </div>

          {/* Indicador sutil de altura fixa para evitar refluxo na troca automática */}
          <div className="mt-7 h-5 flex items-center gap-3 text-xs text-[var(--color-sand-300)]/80 overflow-hidden w-full">
            <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
              {HERO_SCENES.map((s, idx) => (
                <span
                  key={s.id}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    idx === activeScene
                      ? 'w-6 bg-[var(--color-blush-400)]'
                      : 'w-1.5 bg-[var(--color-sand-300)]/35'
                  }`}
                />
              ))}
            </div>
            <span className="truncate">{HERO_SCENES[activeScene].caption}</span>
          </div>
        </motion.div>
      </div>

      {/* Barra Horizontal Integrada de Credenciais em Dark Glass (01..04 em Blush — Idêntica à Imagem 2) */}
      <div className="relative z-10 w-full border-t border-[var(--border-on-dark)] bg-[#120E0C]/85 backdrop-blur-md cq-grid">
        <div className="editorial-container py-5">
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-4 sm:gap-x-8">
            {CREDENTIALS.map((cred) => (
              <div
                key={cred.title}
                className="grid grid-cols-[auto_1fr] items-start gap-x-3"
              >
                <dt className="contents">
                  <span
                    className="row-span-3 font-display text-2xl sm:text-[1.75rem] text-[var(--color-blush-400)] font-normal leading-none mt-0.5 shrink-0"
                    aria-hidden="true"
                  >
                    {cred.num}
                  </span>
                  <span className="col-start-2 font-sans-editorial text-xs sm:text-sm uppercase tracking-[0.06em] font-semibold text-[var(--color-alabaster-50)] leading-snug">
                    {cred.title}
                  </span>
                </dt>
                {cred.sublabel && (
                  <dd className="col-start-2 mt-1 inline-flex items-center w-fit px-2 py-0.5 rounded-[var(--radius-media)] bg-[var(--color-blush-400)] text-[var(--color-espresso-950)] text-xs font-semibold tracking-wider uppercase">
                    {cred.sublabel}
                  </dd>
                )}
                <dd className="col-start-2 mt-1 text-xs text-[var(--color-sand-300)]/85 leading-relaxed">
                  {cred.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
