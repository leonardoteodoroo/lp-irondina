// Ativos mínimos críticos da primeira dobra (Hero) — desacoplados do portfólio completo abaixo da dobra
import heroStageIg03 from '../assets/media/hero-stage-ig03.webp';
import heroStageIg03Sm from '../assets/media/hero-stage-ig03-sm.webp';

export const WHATSAPP_NUMBER = '5562985653419';
export const WHATSAPP_DISPLAY = '(62) 98565-3419';
export const INSTAGRAM_URL = 'https://www.instagram.com/irondina_ero/';

export function buildWhatsAppUrl(message: string): string {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
}

export const HERO_PRIMARY_SCENE = {
  id: 'scene-01',
  src: heroStageIg03,
  srcSm: heroStageIg03Sm,
  alt: 'Retrato editorial de beleza e posicionamento por Irondina Mascarenhas em Goiânia',
  caption: 'Pele Iluminada & Cachos 3D · Estúdio Goiânia',
  objectPos: 'object-[center_top] lg:object-[72%_20%]',
} as const;
