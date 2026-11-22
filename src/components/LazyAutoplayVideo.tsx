import React, { useEffect, useRef } from 'react';

interface LazyAutoplayVideoProps {
  webmSrc: string;
  mp4Src: string;
  poster: string;
  width: number;
  height: number;
  ariaLabel: string;
  className?: string;
}

/**
 * Renderiza vídeo de autoplay silencioso sem baixar mídia alguma na abertura da página:
 * - No SSR / mount inicial existem apenas poster leve + atributos estruturais (0 KiB de vídeo).
 * - Quando o usuário rola a até ~250px do componente, escolhe apenas 1 codec suportado (WebM VP9 ou MP4 H.264)
 *   via `canPlayType`, atribuindo um único `src` para nunca baixar os dois formatos.
 * - Inicia/pausa a reprodução conforme visibilidade real na viewport.
 */
export const LazyAutoplayVideo: React.FC<LazyAutoplayVideoProps> = ({
  webmSrc,
  mp4Src,
  poster,
  width,
  height,
  ariaLabel,
  className,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    let hasAttachedSource = false;
    let isCurrentlyVisible = false;

    const attachSingleSourceAndPlay = () => {
      if (!hasAttachedSource) {
        const supportsWebm =
          videoEl.canPlayType('video/webm; codecs="vp9"') !== '' ||
          videoEl.canPlayType('video/webm') !== '';
        videoEl.src = supportsWebm ? webmSrc : mp4Src;
        videoEl.preload = 'auto';
        hasAttachedSource = true;
      }
      if (isCurrentlyVisible) {
        videoEl.play().catch(() => {});
      }
    };

    const preloadObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          attachSingleSourceAndPlay();
          preloadObserver.disconnect();
        }
      },
      { rootMargin: '250px 0px', threshold: 0.01 }
    );

    const playbackObserver = new IntersectionObserver(
      ([entry]) => {
        isCurrentlyVisible = entry.isIntersecting;
        if (entry.isIntersecting) {
          attachSingleSourceAndPlay();
          videoEl.play().catch(() => {});
        } else if (hasAttachedSource) {
          videoEl.pause();
        }
      },
      { threshold: 0.15 }
    );

    preloadObserver.observe(videoEl);
    playbackObserver.observe(videoEl);

    return () => {
      preloadObserver.disconnect();
      playbackObserver.disconnect();
    };
  }, [webmSrc, mp4Src]);

  return (
    <video
      ref={videoRef}
      loop
      muted
      playsInline
      preload="none"
      poster={poster}
      width={width}
      height={height}
      aria-label={ariaLabel}
      className={className}
    />
  );
};
