import React, { useEffect, useState } from 'react';
import { ArrowDown, MessageCircle } from 'lucide-react';
import { HERO_PRIMARY_SCENE, buildWhatsAppUrl } from '../data/hero-media';

const HERO_WHATSAPP_MSG =
  'Olá, Irondina! Vi seu portfólio no site e gostaria de consultar disponibilidade de data para atendimento.';

interface HeroSceneItem {
  id: string;
  src: string;
  srcSm: string;
  alt: string;
  caption: string;
  objectPos: string;
}

const HERO_CAPTIONS = [
  HERO_PRIMARY_SCENE.caption,
  'Textura Real & Viço Leve · Painel Oficial IRO',
  'Make & Penteado Integrados · Luz de Estúdio',
] as const;

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
  const [scenes, setScenes] = useState<HeroSceneItem[]>([HERO_PRIMARY_SCENE]);

  // Carrega Cenas 2 e 3 dinamicamente só após a Hero LCP já estar pintada (0 KiB extras em t=0)
  useEffect(() => {
    let cancelled = false;
    const prefetchTimer = window.setTimeout(async () => {
      try {
        const [s2Lg, s2Sm, s3Lg, s3Sm] = await Promise.all([
          import('../assets/media/hero-ig-06.webp'),
          import('../assets/media/hero-ig-06-sm.webp'),
          import('../assets/media/hero-stage-ig01.webp'),
          import('../assets/media/hero-stage-ig01-sm.webp'),
        ]);
        if (cancelled) return;
        setScenes([
          HERO_PRIMARY_SCENE,
          {
            id: 'scene-02',
            src: s2Lg.default,
            srcSm: s2Sm.default,
            alt: 'Produção de maquiagem clean iluminada por Irondina Mascarenhas no estúdio próprio',
            caption: HERO_CAPTIONS[1],
            objectPos: 'object-[center_top] lg:object-[75%_22%]',
          },
          {
            id: 'scene-03',
            src: s3Lg.default,
            srcSm: s3Sm.default,
            alt: 'Produção completa de maquiagem glow e penteado preso alto estilizado',
            caption: HERO_CAPTIONS[2],
            objectPos: 'object-[center_top] lg:object-[74%_18%]',
          },
        ]);
      } catch {
        // Fallback silencioso: mantém Cena 1 estática
      }
    }, 4000);

    return () => {
      cancelled = true;
      window.clearTimeout(prefetchTimer);
    };
  }, []);

  // Alternância cinematográfica automática das cenas carregadas
  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveScene((prev) => (prev + 1) % HERO_CAPTIONS.length);
    }, 4800);
    return () => window.clearInterval(timer);
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
          {scenes.map((scene, index) => {
            const isCurrent = index === activeScene % scenes.length;
            return (
              <img
                key={scene.id}
                src={scene.src}
                srcSet={`${scene.srcSm} 750w, ${scene.src} 960w`}
                sizes="(max-width: 1023px) 100vw, 68vw"
                alt={scene.alt}
                width={750}
                height={938}
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
        <div className="max-w-[660px] flex flex-col items-start animate-hero-enter">
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

          {/* Assinatura da Marca com Travessão Editorial Blush */}
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

          {/* CTAs: Botão Pill Alabastro Luminoso + Link Secundário com Seta */}
          <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
            <a
              href={buildWhatsAppUrl(HERO_WHATSAPP_MSG)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 min-h-[52px] px-7 py-3.5 rounded-full bg-[var(--color-alabaster-50)] hover:bg-[var(--color-blush-100)] text-[var(--color-espresso-950)] text-sm sm:text-base font-semibold tracking-[0.03em] shadow-[var(--shadow-floating)] transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
            >
              <MessageCircle
                className="w-4 h-4 text-[var(--color-whatsapp-500)] shrink-0"
                aria-hidden="true"
              />
              <span>Consultar minha data no WhatsApp</span>
            </a>

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

          {/* Indicador sutil GPU-only (scaleX em vez de width) mantendo altura fixa sem refluxo */}
          <div className="mt-7 h-5 flex items-center gap-3 text-xs text-[var(--color-sand-300)]/80 overflow-hidden w-full">
            <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
              {HERO_CAPTIONS.map((cap, idx) => (
                <span
                  key={cap}
                  className={`h-1 w-6 rounded-full origin-left transition-[transform,opacity] duration-500 ${
                    idx === activeScene
                      ? 'scale-x-100 opacity-100 bg-[var(--color-blush-400)]'
                      : 'scale-x-[0.28] opacity-35 bg-[var(--color-sand-300)]'
                  }`}
                />
              ))}
            </div>
            <span className="truncate">{HERO_CAPTIONS[activeScene]}</span>
          </div>
        </div>
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
