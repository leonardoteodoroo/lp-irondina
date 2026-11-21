import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  MessageCircle,
  MoveRight,
  Pause,
  Play,
  Sparkles,
  X,
} from 'lucide-react';
import {
  GALLERY_CATEGORIES,
  GALLERY_ITEMS,
  GalleryCategory,
  GalleryItem,
  MEDIA,
  buildWhatsAppUrl,
} from '../data/content';
import { TrocarBadge } from '../components/TrocarBadge';

const LIGHTBOX_WHATSAPP_MSG =
  'Olá, Irondina! Gostei dessa produção do seu portfólio e gostaria de verificar disponibilidade para um atendimento parecido.';

const PAGE_SIZE = 4; // Carrossel 2x2 (2 fotos em cima + 2 embaixo por dobra)

export const Sec02Galeria: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('Social & Penteados');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [direction, setDirection] = useState<number>(1);
  const [afterPose, setAfterPose] = useState<'open' | 'closed'>('open');
  const [isAutoPlayingPose, setIsAutoPlayingPose] = useState<boolean>(true);
  const [isInViewport, setIsInViewport] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);
  const suppressNextClick = useRef<boolean>(false);

  // Detecta visibilidade para rodar a troca automática do Antes & Depois apenas na tela
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Crossfade automático entre Olhos Abertos (IG-06) e Detalhe Pálpebra (IG-05) a cada 2.6s (0 KB extra)
  useEffect(() => {
    if (!isAutoPlayingPose || !isInViewport) return;
    const interval = window.setInterval(() => {
      setAfterPose((prev) => (prev === 'open' ? 'closed' : 'open'));
    }, 2600);
    return () => window.clearInterval(interval);
  }, [isAutoPlayingPose, isInViewport]);

  const categoryCounts = useMemo(() => {
    const counts: Record<GalleryCategory, number> = {
      'Social & Penteados': 0,
      Ensaios: 0,
      'Noivas & Civil': 0,
      'Antes & Depois': 0,
    };
    for (const item of GALLERY_ITEMS) {
      counts[item.category] = (counts[item.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  const filteredItems = useMemo(
    () => GALLERY_ITEMS.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  const pages = useMemo(() => {
    const chunks: GalleryItem[][] = [];
    for (let i = 0; i < filteredItems.length; i += PAGE_SIZE) {
      chunks.push(filteredItems.slice(i, i + PAGE_SIZE));
    }
    return chunks;
  }, [filteredItems]);

  const totalPages = pages.length;
  const safePageIndex = Math.min(currentPage, Math.max(totalPages - 1, 0));
  const currentItems = pages[safePageIndex] ?? [];

  const handleSelectCategory = (category: GalleryCategory) => {
    if (category === activeCategory) return;
    const oldIdx = GALLERY_CATEGORIES.indexOf(activeCategory);
    const newIdx = GALLERY_CATEGORIES.indexOf(category);
    setDirection(newIdx >= oldIdx ? 1 : -1);
    setActiveCategory(category);
    setCurrentPage(0);
  };

  const goToPage = useCallback(
    (nextIndex: number) => {
      if (totalPages > 1) {
        const normalized = ((nextIndex % totalPages) + totalPages) % totalPages;
        setDirection(nextIndex >= safePageIndex ? 1 : -1);
        setCurrentPage(normalized);
        return;
      }
      // Quando a categoria tem 1 página única (ex: Noivas & Civil ou Antes & Depois),
      // deslizar navega fluidamente entre as categorias vizinhas!
      const catIndex = GALLERY_CATEGORIES.indexOf(activeCategory);
      const step = nextIndex >= safePageIndex ? 1 : -1;
      const targetCatIndex =
        (catIndex + step + GALLERY_CATEGORIES.length) % GALLERY_CATEGORIES.length;
      setDirection(step);
      setActiveCategory(GALLERY_CATEGORIES[targetCatIndex]);
      setCurrentPage(0);
    },
    [totalPages, safePageIndex, activeCategory]
  );

  const nextSlide = useCallback(() => goToPage(safePageIndex + 1), [goToPage, safePageIndex]);
  const prevSlide = useCallback(() => goToPage(safePageIndex - 1), [goToPage, safePageIndex]);

  // Suporte a Touch Swipe horizontal (com tolerância de scroll vertical)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    touchStartX.current = null;
    touchStartY.current = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) nextSlide();
      else prevSlide();
    }
  };

  // Suporte a Drag horizontal com mouse no desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    isDragging.current = true;
    suppressNextClick.current = false;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current || mouseStartX.current === null) return;
    isDragging.current = false;
    const dx = e.clientX - mouseStartX.current;
    mouseStartX.current = null;
    if (Math.abs(dx) > 45) {
      suppressNextClick.current = true;
      if (dx < 0) nextSlide();
      else prevSlide();
    }
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    mouseStartX.current = null;
  };

  const openLightbox = (item: GalleryItem) => {
    if (suppressNextClick.current) {
      suppressNextClick.current = false;
      return;
    }
    setSelectedItem(item);
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  };

  const closeLightbox = () => {
    if (dialogRef.current && dialogRef.current.open) {
      dialogRef.current.close();
    }
    setSelectedItem(null);
  };

  // Lightbox Light-Dismiss confiável em 100% dos navegadores ao clicar no ::backdrop
  const handleDialogClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      closeLightbox();
    }
  };

  return (
    <section
      ref={sectionRef}
      id="galeria"
      aria-labelledby="galeria-heading"
      className="w-full py-14 lg:py-24 overflow-x-clip"
      style={{ background: 'var(--gradient-gallery-to-services)' }}
    >
      <div className="editorial-container">
        {/* Cabeçalho da Seção — Zero Eyebrow e Zero Subtítulo conforme COPY_LP_IRONDINA.md v2 */}
        <div className="pb-6 border-b border-[var(--border-default)]">
          <h2
            id="galeria-heading"
            className="font-display font-normal text-[var(--text-primary)] leading-[var(--leading-heading)] max-w-[24ch]"
            style={{ fontSize: 'var(--text-display-section)' }}
          >
            Produções feitas para o <span className="italic text-[var(--action-primary)]">olhar</span> e para a lente
          </h2>
        </div>

        {/* Palco Escuro Editorial de Destaque: Antes & Depois em Crossfade Automático + Vídeo MVP Mudo */}
        <div className="mt-7 rounded-xl bg-[var(--color-espresso-950)] text-[var(--color-alabaster-50)] p-4 sm:p-7 lg:p-8 shadow-[var(--shadow-editorial)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Par Antes & Depois com Crossfade Automático de 2 Frames WebP na GPU */}
            <div className="lg:col-span-8 flex flex-col justify-between">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--color-blush-400)]" aria-hidden="true" />
                  <span className="text-xs sm:text-sm font-medium text-[var(--color-alabaster-50)]">
                    Transformação Real · {MEDIA.beforeAfter.clientName}
                  </span>
                </div>

                {/* Indicador vivo de alternância automática + botão discreto de Pause/Play */}
                <div className="inline-flex items-center gap-2 rounded-full bg-[#15100E] border border-[var(--border-on-dark)] px-3 py-1">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isAutoPlayingPose
                        ? 'bg-[var(--color-blush-400)] animate-pulse'
                        : 'bg-[var(--color-sand-300)]/50'
                    }`}
                    aria-hidden="true"
                  />
                  <span className="text-[0.72rem] text-[var(--color-sand-300)] font-medium">
                    {afterPose === 'open' ? 'Depois: Olhos abertos' : 'Depois: Detalhe pálpebra'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsAutoPlayingPose((prev) => !prev)}
                    aria-label={
                      isAutoPlayingPose
                        ? 'Pausar alternância automática entre olhos abertos e pálpebra'
                        : 'Ativar alternância automática entre olhos abertos e pálpebra'
                    }
                    className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--color-alabaster-50)]/10 hover:bg-[var(--color-alabaster-50)]/20 text-[var(--color-alabaster-50)] cursor-pointer transition-colors"
                  >
                    {isAutoPlayingPose ? (
                      <Pause className="w-3 h-3" aria-hidden="true" />
                    ) : (
                      <Play className="w-3 h-3 fill-current" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-5">
                {/* Foto Antes (IG-04) */}
                <figure className="relative overflow-hidden rounded-[var(--radius-media)] aspect-[3/4] bg-[#15100E]">
                  <img
                    src={MEDIA.beforeAfter.before}
                    alt="Sem maquiagem (Antes) — Pele natural de Berta Leite antes do atendimento"
                    width={750}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <figcaption className="absolute bottom-2.5 left-2.5 px-2.5 py-1 rounded-[var(--radius-media)] bg-[#15100E]/85 backdrop-blur-xs text-[var(--color-alabaster-50)] text-xs font-medium border border-[var(--border-on-dark)]">
                    Sem maquiagem (Antes)
                  </figcaption>
                </figure>

                {/* Foto Depois (Crossfade Automático Suave na GPU entre IG-06 e IG-05) */}
                <figure className="relative overflow-hidden rounded-[var(--radius-media)] aspect-[3/4] bg-[#15100E]">
                  <img
                    src={MEDIA.beforeAfter.afterOpen}
                    alt="Pele finalizada (Depois — Olhos abertos) — Maquiagem clean iluminada por Irondina Mascarenhas"
                    width={750}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-900 ease-in-out ${
                      afterPose === 'open' ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <img
                    src={MEDIA.beforeAfter.afterClosed}
                    alt="Pele finalizada (Depois — Detalhe da pálpebra e textura real) por Irondina Mascarenhas"
                    width={750}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-900 ease-in-out ${
                      afterPose === 'closed' ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {isAutoPlayingPose && (
                    <div
                      className="absolute top-0 inset-x-0 h-1 bg-[var(--color-espresso-950)]/40 z-10 overflow-hidden"
                      aria-hidden="true"
                    >
                      <div
                        key={afterPose}
                        className="h-full w-full bg-[var(--color-blush-400)] animate-progress-bar"
                      />
                    </div>
                  )}

                  <figcaption className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-[var(--radius-media)] bg-[var(--color-blush-400)] text-[var(--color-espresso-950)] text-xs font-semibold">
                      Pele finalizada (Depois)
                    </span>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#15100E]/80 text-[0.7rem] text-[var(--color-sand-300)]">
                      {afterPose === 'open' ? '1/2 · Olhar' : '2/2 · Pálpebra'}
                    </span>
                  </figcaption>
                </figure>
              </div>

              <p className="mt-3.5 text-xs sm:text-sm text-[var(--color-sand-300)] leading-relaxed">
                {MEDIA.beforeAfter.description}
              </p>
            </div>

            {/* Slot de Vídeo MVP Mudo (< 1.5 MB) com Tag HTML Central TROCAR */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3.5 min-h-[28px]">
                <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--color-alabaster-50)]">
                  <span
                    className="w-2 h-2 rounded-full bg-[var(--color-whatsapp-brand)] animate-pulse"
                    aria-hidden="true"
                  />
                  Acabamento em Movimento (Luz Real)
                </span>
              </div>

              <div className="relative overflow-hidden rounded-[var(--radius-media)] aspect-[4/5] bg-[#15100E]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={MEDIA.videoMvp.poster}
                  width={560}
                  height={700}
                  aria-label="Vídeo demonstrando textura real e acabamento de pele sob luz de estúdio"
                  className="w-full h-full object-cover"
                >
                  <source src={MEDIA.videoMvp.webm} type="video/webm" />
                  <source src={MEDIA.videoMvp.mp4} type="video/mp4" />
                </video>

                <TrocarBadge label={MEDIA.videoMvp.trocarLabel} />
              </div>

              <p className="mt-3.5 text-xs sm:text-sm text-[var(--color-sand-300)] leading-relaxed">
                Luz, câmera e edição não perdoam erros: pele construída para manter naturalidade ao
                vivo e no vídeo.
              </p>
            </div>
          </div>
        </div>

        {/* CARROSSEL EDITORIAL POR CATEGORIA (Seletor 2x2 colado à vitrine 2x2 — resposta visual na mesma dobra) */}
        <div className="mt-10 lg:mt-12" aria-label="Carrossel de produções por categoria">
          {/* Grade 2x2 de Categorias (Sem "Todas": Social & Penteados | Ensaios / Noivas & Civil | Antes & Depois) */}
          <div
            role="tablist"
            aria-label="Filtrar produções do carrossel por categoria"
            className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3"
          >
            {GALLERY_CATEGORIES.map((category) => {
              const isSelected = activeCategory === category;
              const count = categoryCounts[category] ?? 0;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => handleSelectCategory(category)}
                  className={`min-h-[48px] px-3 sm:px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 text-center ${
                    isSelected
                      ? 'bg-[var(--color-espresso-950)] text-[var(--color-alabaster-50)] shadow-sm'
                      : 'bg-[var(--surface-page)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-default)]'
                  }`}
                >
                  <span className="truncate">{category}</span>
                  <span
                    className={`text-[0.68rem] font-semibold tabular-nums ${
                      isSelected ? 'text-[var(--color-blush-400)]' : 'text-[var(--text-muted)]'
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Palco Deslizável (Swipe Touch & Mouse Drag) em Grade 2x2 (2 linhas × 2 colunas = 4 fotos por dobra) */}
          <div
            className="mt-4 sm:mt-5 relative touch-pan-y select-none cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${activeCategory}-${safePageIndex}`}
                initial={{ opacity: 0, x: direction > 0 ? 28 : -28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -28 : 28 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 items-start"
              >
                {currentItems.map((item) => (
                  <article key={item.id} className="group flex flex-col">
                    <button
                      type="button"
                      onClick={() => openLightbox(item)}
                      className="relative w-full overflow-hidden rounded-[var(--radius-media)] bg-[var(--surface-editorial-band)] aspect-[4/4.3] max-h-[210px] sm:max-h-[290px] cursor-pointer text-left shadow-xs focus-visible:outline-2 focus-visible:outline-[var(--border-focus)]"
                    >
                      <img
                        src={item.src}
                        alt={`Ampliar produção: ${item.title} — ${item.description}`}
                        width={item.width}
                        height={item.height}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />

                      {item.trocarLabel && <TrocarBadge label={item.trocarLabel} />}

                      <div
                        className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[var(--color-espresso-950)]/65 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-hidden="true"
                      />

                      <span
                        className="absolute top-2 right-2 z-20 inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-espresso-950)]/75 text-[var(--color-alabaster-50)] opacity-85 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </button>

                    <div className="mt-2 flex flex-col px-0.5">
                      <span className="text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.12em] font-semibold text-[var(--action-primary)] truncate">
                        {item.category}
                      </span>
                      <h3 className="mt-0.5 font-display text-sm sm:text-lg font-medium text-[var(--text-primary)] leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Barra de Controles do Carrossel: Indicador acima/esquerda + Setas e Pílulas sem colidir com botão flutuante */}
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-[var(--border-default)]">
            {/* Indicador de paginação + estímulo tátil de arrasto */}
            <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
              <span className="font-medium tabular-nums">
                Página {safePageIndex + 1} de {totalPages}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[var(--action-primary)] font-display italic text-sm">
                <span>Arraste para o lado</span>
                <MoveRight className="w-4 h-4 animate-pulse" aria-hidden="true" />
              </span>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Página anterior do carrossel"
                className="inline-flex items-center justify-center min-w-[48px] min-h-[48px] rounded-full bg-[var(--surface-page)] border border-[var(--border-default)] text-[var(--text-primary)] hover:bg-[var(--color-espresso-950)] hover:text-[var(--color-alabaster-50)] transition-colors cursor-pointer shadow-xs"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="flex items-center gap-1.5" role="group" aria-label="Páginas do carrossel">
                {Array.from({ length: totalPages }).map((_, idx) => {
                  const isCurrent = idx === safePageIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => goToPage(idx)}
                      aria-label={`Ir para página ${idx + 1} de ${totalPages}`}
                      aria-current={isCurrent ? 'true' : undefined}
                      className="inline-flex items-center justify-center min-w-[24px] min-h-[48px] cursor-pointer"
                    >
                      <span
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          isCurrent
                            ? 'w-7 bg-[var(--color-espresso-950)]'
                            : 'w-2 bg-[var(--color-sand-400)]/60 hover:bg-[var(--action-primary)]'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="Próxima página do carrossel"
                className="inline-flex items-center justify-center min-w-[48px] min-h-[48px] rounded-full bg-[var(--surface-page)] border border-[var(--border-default)] text-[var(--text-primary)] hover:bg-[var(--color-espresso-950)] hover:text-[var(--color-alabaster-50)] transition-colors cursor-pointer shadow-xs"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Nativo <dialog closedby="any"> Centralizado com Respiro e Fechamento pelo X ou Backdrop */}
      <dialog
        ref={dialogRef}
        {...({ closedby: 'any' } as React.DialogHTMLAttributes<HTMLDialogElement>)}
        aria-labelledby="lightbox-title"
        onClick={handleDialogClick}
        onClose={() => setSelectedItem(null)}
      >
        {selectedItem && (
          <div className="grid grid-cols-1 md:grid-cols-12 bg-[var(--surface-page)] text-[var(--text-primary)] max-h-[calc(100dvh-2.5rem)] overflow-y-auto">
            <div className="md:col-span-7 relative bg-[var(--color-espresso-950)] flex items-center justify-center min-h-[260px] max-h-[52dvh] md:max-h-[82dvh] overflow-hidden">
              <img
                src={selectedItem.src}
                alt={selectedItem.title}
                width={selectedItem.width}
                height={selectedItem.height}
                className="w-full h-full object-contain max-h-[52dvh] md:max-h-[82dvh]"
              />
              {selectedItem.trocarLabel && <TrocarBadge label={selectedItem.trocarLabel} />}
            </div>

            <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-[var(--surface-editorial-band)] text-xs font-medium text-[var(--text-primary)]">
                    {selectedItem.category}
                  </span>
                  <button
                    type="button"
                    onClick={closeLightbox}
                    aria-label="Fechar visualização ampliada"
                    className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-[var(--surface-editorial-band)] text-[var(--text-primary)] hover:bg-[var(--color-espresso-950)] hover:text-[var(--color-alabaster-50)] transition-colors cursor-pointer shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <h3
                  id="lightbox-title"
                  className="mt-5 font-display text-2xl sm:text-[1.75rem] font-normal text-[var(--text-primary)] leading-snug"
                >
                  {selectedItem.title}
                </h3>

                <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  {selectedItem.description}
                </p>

                {selectedItem.credit && (
                  <p className="mt-5 pt-3.5 border-t border-[var(--border-subtle)] text-xs font-medium text-[var(--text-secondary)]">
                    {selectedItem.credit}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                <a
                  href={buildWhatsAppUrl(LIGHTBOX_WHATSAPP_MSG)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-3 rounded-full bg-[var(--action-primary)] hover:bg-[var(--action-primary-hover)] text-[var(--action-primary-text)] text-xs sm:text-[0.8125rem] font-medium whitespace-nowrap transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>Quero essa proposta no WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={closeLightbox}
                  className="inline-flex items-center justify-center min-h-[48px] px-4 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                >
                  Voltar ao portfólio
                </button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
};
