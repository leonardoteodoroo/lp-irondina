// Centralizador da Copy Consolidada v2 (COPY_LP_IRONDINA.md) e Mapeamento de Ativos
import heroIg06 from '../assets/media/hero-ig-06.webp';
import heroIg06Sm from '../assets/media/hero-ig-06-sm.webp';
import heroIg09 from '../assets/media/hero-ig-09.webp';
import heroStageIg03 from '../assets/media/hero-stage-ig03.webp';
import heroStageIg03Sm from '../assets/media/hero-stage-ig03-sm.webp';
import heroStageIg01 from '../assets/media/hero-stage-ig01.webp';
import heroStageIg01Sm from '../assets/media/hero-stage-ig01-sm.webp';

import ig01 from '../assets/media/ig-01.webp';
import ig01Sm from '../assets/media/ig-01-sm.webp';
import ig03 from '../assets/media/ig-03.webp';
import ig03Sm from '../assets/media/ig-03-sm.webp';
import ig04Antes from '../assets/media/ig-04-antes.webp';
import ig04AntesSm from '../assets/media/ig-04-antes-sm.webp';
import ig05DepoisOlhos from '../assets/media/ig-05-depois-olhos.webp';
import ig05DepoisOlhosSm from '../assets/media/ig-05-depois-olhos-sm.webp';
import ig06Depois from '../assets/media/ig-06-depois.webp';
import ig06DepoisSm from '../assets/media/ig-06-depois-sm.webp';
import ig09 from '../assets/media/ig-09.webp';
import ig09Sm from '../assets/media/ig-09-sm.webp';
import ig10 from '../assets/media/ig-10.webp';
import ig10Sm from '../assets/media/ig-10-sm.webp';
import ig11 from '../assets/media/ig-11.webp';
import ig11Sm from '../assets/media/ig-11-sm.webp';
import ig12 from '../assets/media/ig-12.webp';
import ig12Sm from '../assets/media/ig-12-sm.webp';
import ig13 from '../assets/media/ig-13.webp';
import ig13Sm from '../assets/media/ig-13-sm.webp';
import ig16 from '../assets/media/ig-16.webp';
import ig16Sm from '../assets/media/ig-16-sm.webp';
import ig18 from '../assets/media/ig-18.webp';
import ig18Sm from '../assets/media/ig-18-sm.webp';
import ig19 from '../assets/media/ig-19.webp';
import ig19Sm from '../assets/media/ig-19-sm.webp';
import ig20 from '../assets/media/ig-20.webp';
import ig20Sm from '../assets/media/ig-20-sm.webp';
import ig24 from '../assets/media/ig-24.webp';
import ig24Sm from '../assets/media/ig-24-sm.webp';
import ig28 from '../assets/media/ig-28.webp';
import ig28Sm from '../assets/media/ig-28-sm.webp';
import ig30 from '../assets/media/ig-30.webp';
import ig30Sm from '../assets/media/ig-30-sm.webp';
import ig31 from '../assets/media/ig-31.webp';
import ig31Sm from '../assets/media/ig-31-sm.webp';
import ig32 from '../assets/media/ig-32.webp';
import ig32Sm from '../assets/media/ig-32-sm.webp';
import ig33 from '../assets/media/ig-33.webp';
import ig33Sm from '../assets/media/ig-33-sm.webp';
import ig37 from '../assets/media/ig-37.webp';
import ig37Sm from '../assets/media/ig-37-sm.webp';
import ig38 from '../assets/media/ig-38.webp';
import ig38Sm from '../assets/media/ig-38-sm.webp';
import ig41Curso from '../assets/media/ig-41-curso.webp';
import ig44 from '../assets/media/ig-44.webp';
import ig44Sm from '../assets/media/ig-44-sm.webp';
import ig49 from '../assets/media/ig-49.webp';
import ig49Sm from '../assets/media/ig-49-sm.webp';
import ig59 from '../assets/media/ig-59.webp';
import ig59Sm from '../assets/media/ig-59-sm.webp';
import ig66 from '../assets/media/ig-66.webp';
import ig66Sm from '../assets/media/ig-66-sm.webp';

import iro03 from '../assets/media/iro-03.webp';
import iro06 from '../assets/media/iro-06.webp';

import avatarSaraIg38 from '../assets/media/avatar-sara-ig38.webp';
import avatarFernandaIg01 from '../assets/media/avatar-fernanda-ig01.webp';
import avatarPolianaIg32 from '../assets/media/avatar-poliana-ig32.webp';
import avatarJuliaIg09 from '../assets/media/avatar-julia-ig09.webp';
import avatarRenataIg31 from '../assets/media/avatar-renata-ig31.webp';

import placeholderPenteadoCostas from '../assets/media/placeholder-penteado-costas.webp';
import placeholderPenteadoCostasSm from '../assets/media/placeholder-penteado-costas-sm.webp';
import placeholderNoivaCartorio from '../assets/media/placeholder-noiva-cartorio.webp';
import placeholderNoivaCartorioSm from '../assets/media/placeholder-noiva-cartorio-sm.webp';
import placeholderCursoAutomaquiagem from '../assets/media/placeholder-curso-automaquiagem.webp';
import placeholderAvatarFabiane from '../assets/media/placeholder-avatar-fabiane.webp';

import videoMvpWebm from '../assets/media/video-mvp-galeria.webm';
import videoMvpMp4 from '../assets/media/video-mvp-galeria.mp4';
import videoMvpPoster from '../assets/media/video-mvp-poster.webp';

import videoSobreWebm from '../assets/media/video-sobre-bastidores.webm';
import videoSobreMp4 from '../assets/media/video-sobre-bastidores.mp4';
import videoSobrePoster from '../assets/media/video-sobre-poster.webp';

export const WHATSAPP_NUMBER = '5562985653419';
export const WHATSAPP_DISPLAY = '(62) 98565-3419';
export const INSTAGRAM_URL = 'https://www.instagram.com/irondina_ero/';

export function buildWhatsAppUrl(message: string): string {
  return `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
}

export const MEDIA = {
  hero: {
    main: heroIg06,
    mainSm: heroIg06Sm,
    secondary: heroIg09,
    stagePrimary: heroStageIg03,
    stagePrimarySm: heroStageIg03Sm,
    stageSecondary: heroIg06,
    stageTertiary: heroStageIg01,
    stageTertiarySm: heroStageIg01Sm,
  },
  videoMvp: {
    webm: videoMvpWebm,
    mp4: videoMvpMp4,
    poster: videoMvpPoster,
    trocarLabel: '[MVP — TROCAR: Vídeo editado Motion Graphics]',
  },
  beforeAfter: {
    before: ig04Antes,
    beforeSm: ig04AntesSm,
    afterOpen: ig06Depois,
    afterOpenSm: ig06DepoisSm,
    afterClosed: ig05DepoisOlhos,
    afterClosedSm: ig05DepoisOlhosSm,
    clientName: 'Berta Leite (@leiteberta)',
    description:
      'Pele iluminada em camadas finas com textura real preservada, blush rosado luminoso, delineado fino e preenchimento suave respeitando o tom ruivo natural.',
  },
  about: {
    mainPortrait: iro03,
    secondaryPortrait: iro06,
    studioPanel: ig05DepoisOlhos,
    brollVideo: {
      webm: videoSobreWebm,
      mp4: videoSobreMp4,
      poster: videoSobrePoster,
    },
  },
  courses: {
    profissional: ig41Curso,
    automaquiagemPlaceholder: placeholderCursoAutomaquiagem,
    automaquiagemTrocarLabel: 'TROCAR: Foto Irondina ensinando / Automaquiagem',
  },
};

export type GalleryCategory =
  | 'Social & Penteados'
  | 'Ensaios'
  | 'Noivas & Civil'
  | 'Antes & Depois';

export interface GalleryItem {
  id: string;
  tag: string;
  category: GalleryCategory;
  title: string;
  description: string;
  credit?: string;
  src: string;
  srcSm?: string;
  smWidth?: number;
  width: number;
  height: number;
  aspectClass: 'aspect-[4/5]' | 'aspect-[3/4]' | 'aspect-square';
  trocarLabel?: string;
}

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'Social & Penteados',
  'Ensaios',
  'Noivas & Civil',
  'Antes & Depois',
];

export const GALLERY_ITEMS: GalleryItem[] = [
  // Social & Penteados (Padrão Inicial)
  {
    id: 'gal-ig-09',
    tag: 'IG-09',
    category: 'Social & Penteados',
    title: 'Make Social & Semipreso com Ondas',
    description:
      'Produção integrada de maquiagem iluminada e penteado semipreso polido com ondas definidas para evento social.',
    credit: 'Cliente: @juliafrohllich_',
    src: ig09,
    srcSm: ig09Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-ig-10',
    tag: 'IG-10',
    category: 'Social & Penteados',
    title: 'Pele Bronze Iluminada & Ondas Soltas',
    description:
      'Esfumado marrom quente suave, delineado fino e pele translúcida de longa duração sem pesar.',
    credit: 'Cliente: @nanda_rsoares',
    src: ig10,
    srcSm: ig10Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-ig-20',
    tag: 'IG-20',
    category: 'Social & Penteados',
    title: 'Pele Negra Radiante & Cachos Naturais',
    description:
      'Pele iluminada em camadas leves e colorimetria que respeita o subtom natural, sem acinzentar.',
    src: ig20,
    srcSm: ig20Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-ig-59',
    tag: 'IG-59',
    category: 'Social & Penteados',
    title: 'Coque Preso Clássico & Esfumado Neutro',
    description:
      'Penteado preso em coque elegante combinado a acabamento acetinado e batom nude caramelo.',
    src: ig59,
    srcSm: ig59Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-trocar-penteado',
    tag: 'SLOT-PENTEADO',
    category: 'Social & Penteados',
    title: 'Detalhe de Costas — Penteado Preso',
    description:
      'Acabamento técnico de estrutura, fixação limpa de grampos e polimento de mechas visto de costas.',
    src: placeholderPenteadoCostas,
    srcSm: placeholderPenteadoCostasSm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
    trocarLabel: 'TROCAR: Costas de Penteado Preso',
  },
  {
    id: 'gal-ig-12',
    tag: 'IG-12',
    category: 'Social & Penteados',
    title: 'Viço Natural & Esfumado Quente',
    description:
      'Pele corrigida com leveza, contorno suave e lábios nude rosados para eventos noturnos.',
    credit: 'Collab: @rafaeellalopez',
    src: ig12,
    srcSm: ig12Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-ig-16',
    tag: 'IG-16',
    category: 'Social & Penteados',
    title: 'Delineado Preciso & Cabelo Alinhado',
    description:
      'Pálpebra clara acetinada, delineado gráfico fino e pele uniforme sob luz natural.',
    src: ig16,
    srcSm: ig16Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-ig-19',
    tag: 'IG-19',
    category: 'Social & Penteados',
    title: 'Pele Translúcida & Delineado Gatinho',
    description:
      'Cobertura leve que preserva sardas naturais com pálpebra champagne e ondas douradas.',
    src: ig19,
    srcSm: ig19Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-ig-24',
    tag: 'IG-24',
    category: 'Social & Penteados',
    title: 'Make Social Champagne & Gloss Nude',
    description:
      'Luminosidade controlada na pele e pálpebra rosê-champagne para festas e formaturas.',
    src: ig24,
    srcSm: ig24Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-ig-49',
    tag: 'IG-49',
    category: 'Social & Penteados',
    title: 'Rabo de Cavalo Meio Alto & Glam Leve',
    description:
      'Penteado preso meio alto com ondas soltas e maquiagem em tons quentes bronze.',
    src: ig49,
    srcSm: ig49Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-ig-66',
    tag: 'IG-66',
    category: 'Social & Penteados',
    title: 'Rabo Alto Alinhado & Beleza Atemporal',
    description:
      'Pele negra clara uniforme com rabo de cavalo alto polido e esfumado marrom clássico.',
    src: ig66,
    srcSm: ig66Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-ig-28',
    tag: 'IG-28',
    category: 'Social & Penteados',
    title: 'Ondas Longas Polidas & Delineado Alongado',
    description:
      'Acabamento clássico de evento social com pele aveludada e ondas definidas.',
    src: ig28,
    srcSm: ig28Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },

  // Ensaios (8 fotos = 2 páginas 2x2)
  {
    id: 'gal-ig-01',
    tag: 'IG-01',
    category: 'Ensaios',
    title: 'Ensaio Editorial & Coque Estilizado',
    description:
      'Pele negra iluminada pensada para flash de estúdio e edição fotográfica, sem estourar.',
    credit: 'Foto: @darahcoelho · Hair: @luiza_trancistx · Cliente: @fer.nandaugc',
    src: ig01,
    srcSm: ig01Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-ig-03',
    tag: 'IG-03',
    category: 'Ensaios',
    title: 'Posicionamento & Cachos 3D em Estúdio',
    description:
      'Acabamento glow quente e contorno labial equilibrado sob iluminação contínua de estúdio.',
    credit: 'Foto: @darahcoelho · Hair: @luiza_trancistx · Cliente: @fer.nandaugc',
    src: ig03,
    srcSm: ig03Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-ig-13',
    tag: 'IG-13',
    category: 'Ensaios',
    title: 'Retrato Corporativo & Pele Acetinada',
    description:
      'Beleza executiva limpa em tons neutros que transmite autoridade sem competir com o retrato.',
    credit: 'Foto: @cristiannecostafotografia · Cliente: @lourrainy_depaula',
    src: ig13,
    srcSm: ig13Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-ig-32',
    tag: 'IG-32',
    category: 'Ensaios',
    title: 'Ensaio de Marca Pessoal em Cobre Suave',
    description:
      'Sombra rosê-cobre cintilante suave e pele luminosa quente para posicionamento profissional.',
    credit: 'Cliente: @bypolianasouza',
    src: ig32,
    srcSm: ig32Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-ig-38',
    tag: 'IG-38',
    category: 'Ensaios',
    title: 'Ensaio Comemorativo & Clássico Vermelho',
    description:
      'Pele natural equilibrada com esfumado clássico suave e lábios vermelhos de alta precisão.',
    credit: 'Cliente: @saralidiamorais',
    src: ig38,
    srcSm: ig38Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-ig-33',
    tag: 'IG-33',
    category: 'Ensaios',
    title: 'Fotografia de Especialista & Pele Viçosa',
    description:
      'Harmonia entre luz de estúdio, textura de pele real e acabamento clean durável.',
    credit: 'Cliente: @bypolianasouza',
    src: ig33,
    srcSm: ig33Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-ig-37',
    tag: 'IG-37',
    category: 'Ensaios',
    title: 'Ensaio Profissional em Paleta Areia',
    description:
      'Sombra champagne luminosa e lábios terracota acetinados alinhados ao figurino.',
    src: ig37,
    srcSm: ig37Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-ig-44',
    tag: 'IG-44',
    category: 'Ensaios',
    title: 'Retrato Executivo Clean em Fundo Infinito',
    description:
      'Maquiagem neutra atemporal e ondas soltas para fotos de perfil e comunicação profissional.',
    src: ig44,
    srcSm: ig44Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },

  // Noivas & Civil (4 fotos para fechar grade 2x2)
  {
    id: 'gal-ig-30',
    tag: 'IG-30',
    category: 'Noivas & Civil',
    title: 'Noiva Civil — Pele Suave & Trança Lateral',
    description:
      'Beleza delicada em tons rosê iluminados com trança embutida lateral pensada para luz diurna.',
    credit: 'Noiva: @renatadfelipe',
    src: ig30,
    srcSm: ig30Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-ig-31',
    tag: 'IG-31',
    category: 'Noivas & Civil',
    title: 'Casamento Civil — Frescor & Durabilidade',
    description:
      'Acabamento à prova de emoção e abraços, mantendo a identidade natural da noiva nas fotos.',
    credit: 'Noiva: @renatadfelipe',
    src: ig31,
    srcSm: ig31Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-trocar-noiva',
    tag: 'SLOT-NOIVA',
    category: 'Noivas & Civil',
    title: 'Cerimônia & Registro de Casamento Civil',
    description:
      'Produção completa de maquiagem e penteado para cerimônia civil e registros externos.',
    credit: 'Parceria fotográfica: @jhonata_brito',
    src: placeholderNoivaCartorio,
    srcSm: placeholderNoivaCartorioSm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
    trocarLabel: 'TROCAR: Foto Noiva / Cartório',
  },
  {
    id: 'gal-ig-18-noiva',
    tag: 'IG-18',
    category: 'Noivas & Civil',
    title: 'Produção Delicada Champagne — Cerimônia',
    description:
      'Pálpebra pêssego/champagne suave, delineado fino e pele leve para madrinhas e cerimônias diurnas.',
    src: ig18,
    srcSm: ig18Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },

  // Antes & Depois (4 fotos para fechar grade 2x2)
  {
    id: 'gal-ig-04-ba',
    tag: 'IG-04',
    category: 'Antes & Depois',
    title: 'Antes — Pele Natural sem Maquiagem',
    description:
      'Registro prévio sem maquiagem evidenciando o ponto de partida real para construção de camadas leves.',
    credit: 'Cliente: @leiteberta',
    src: ig04Antes,
    srcSm: ig04AntesSm,
    smWidth: 420,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-ig-06-ba',
    tag: 'IG-06',
    category: 'Antes & Depois',
    title: 'Depois — Pele Finalizada (Olhos Abertos)',
    description:
      'Acabamento leve e viçoso que realça traços e preserva a naturalidade diante do painel oficial do estúdio.',
    credit: 'Cliente: @leiteberta',
    src: ig06Depois,
    srcSm: ig06DepoisSm,
    smWidth: 420,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-ig-05-ba',
    tag: 'IG-05',
    category: 'Antes & Depois',
    title: 'Depois — Detalhe de Pálpebra & Textura',
    description:
      'Sombra champagne suave, delineado fino e preenchimento de sobrancelha respeitando o subtom ruivo.',
    credit: 'Cliente: @leiteberta',
    src: ig05DepoisOlhos,
    srcSm: ig05DepoisOlhosSm,
    smWidth: 420,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-ig-11-ba',
    tag: 'IG-11',
    category: 'Antes & Depois',
    title: 'Resultado Final — Viço & Expressão Natural',
    description:
      'Sorriso espontâneo evidenciando luminosidade equilibrada sem acúmulo em linhas de expressão.',
    credit: 'Cliente: @nanda_rsoares',
    src: ig11,
    srcSm: ig11Sm,
    width: 720,
    height: 900,
    aspectClass: 'aspect-[4/5]',
  },
];

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  badge?: string;
  description: string;
  ctaLabel: string;
  whatsappMessage: string;
  image: string;
  secondaryImage?: string;
  imageAlt: string;
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'make-social',
    number: '01',
    title: 'Maquiagem Clean & Social',
    badge: 'Mais procurado',
    description:
      'Para festas, formaturas, madrinhas e eventos. Pele corrigida com translucidez e luminosidade sem oleosidade, que segura a noite toda sem marcar linhas.',
    ctaLabel: 'Consultar make social',
    whatsappMessage:
      'Olá, Irondina! Gostaria de consultar disponibilidade para Maquiagem Clean & Social.',
    image: ig10,
    secondaryImage: heroIg06,
    imageAlt: 'Maquiagem Clean e Social por Irondina Mascarenhas em Goiânia',
  },
  {
    id: 'penteados-combo',
    number: '02',
    title: 'Penteados & Produção Completa',
    description:
      'Maquiagem e cabelo planejados em conjunto no mesmo atendimento, do semipreso com ondas ao preso elegante, para você sair pronta do estúdio.',
    ctaLabel: 'Agendar combo Make + Penteado',
    whatsappMessage:
      'Olá, Irondina! Tenho interesse na produção completa (maquiagem e penteado) e gostaria de consultar datas.',
    image: ig09,
    secondaryImage: ig59,
    imageAlt: 'Produção completa de Maquiagem e Penteado por Irondina Mascarenhas',
  },
  {
    id: 'ensaios-posicionamento',
    number: '03',
    title: 'Ensaios Fotográficos & Posicionamento',
    description:
      'Preparo técnico pensado para luz de estúdio, externa e edição de imagem, sem estourar no flash. Atendimentos em Goiânia e agendas de viagem em BH e SP.',
    ctaLabel: 'Agendar para ensaio',
    whatsappMessage:
      'Olá, Irondina! Vou fazer um ensaio fotográfico e gostaria de consultar sua disponibilidade.',
    image: ig01,
    secondaryImage: ig13,
    imageAlt: 'Maquiagem para Ensaio Fotográfico e Posicionamento por Irondina Mascarenhas',
  },
  {
    id: 'noivas-civil',
    number: '04',
    title: 'Noivas & Casamento Civil',
    description:
      'Beleza atemporal para cerimônias e registros de casamento civil, equilibrando durabilidade para abraços, emoção e fotos de arquivo.',
    ctaLabel: 'Consultar data de casamento',
    whatsappMessage:
      'Olá, Irondina! Gostaria de consultar disponibilidade para atendimento de noiva / casamento civil.',
    image: ig30,
    secondaryImage: ig31,
    imageAlt: 'Maquiagem e Penteado para Noivas e Casamento Civil por Irondina Mascarenhas',
  },
];

export interface TestimonialItem {
  id: string;
  name: string;
  handle: string;
  context: string;
  quote: string;
  avatar: string;
  trocarLabel?: string;
}

export const TESTIMONIALS_LIST: TestimonialItem[] = [
  {
    id: 'sara',
    name: 'Sara Lidia',
    handle: '@saralidiamorais',
    context: 'Ensaio fotográfico',
    quote: 'Como não ficar maravilhosa pelas suas mãos? Impossível. Você é uma artista.',
    avatar: avatarSaraIg38,
  },
  {
    id: 'fernanda',
    name: 'Fernanda Rodrigues',
    handle: '@fer.nandaugc',
    context: 'Ensaio de posicionamento',
    quote:
      'O glow dessa make maravilhosa. Descobrindo uma versão top model de mim no meu primeiro ensaio.',
    avatar: avatarFernandaIg01,
  },
  {
    id: 'poliana',
    name: 'Poliana Souza',
    handle: '@bypolianasouza',
    context: 'Ensaio profissional',
    quote: 'Não teria beleza sem vocês. Você fez um milagre.',
    avatar: avatarPolianaIg32,
  },
  {
    id: 'julia',
    name: 'Júlia Frohlich',
    handle: '@juliafrohllich_',
    context: 'Social · Make + Penteado',
    quote: 'Você arrasa ❤️❤️❤️',
    avatar: avatarJuliaIg09,
  },
  {
    id: 'renata',
    name: 'Renata Felipe',
    handle: '@renatadfelipe',
    context: 'Noiva',
    quote: 'Você arrasa! 😍',
    avatar: avatarRenataIg31,
  },
  {
    id: 'fabiane',
    name: 'Fabiane Costa',
    handle: '@fabianecostaoliveira',
    context: 'Aluna · Automaquiagem',
    quote:
      'Você é uma profissional fantástica. Obrigada pela oportunidade de aprender com você.',
    avatar: placeholderAvatarFabiane,
    trocarLabel: 'TROCAR: Avatar Aluna Fabiane',
  },
];

export const PRESS_AND_PARTNERS = [
  'Troféu Maguito Vilela (@alotvbrasil · @taianichagass)',
  '@souquemsoufotografia',
  '@darahcoelho',
  '@cristiannecostafotografia',
  '@jhonata_brito',
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_LIST: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Posso agendar maquiagem e penteado no mesmo atendimento?',
    answer:
      'Sim. A Irondina realiza maquiagem e penteado de forma integrada no mesmo horário, alinhando o estilo do cabelo ao acabamento da produção para festas, madrinhas, ensaios e casamento civil.',
  },
  {
    id: 'faq-2',
    question: 'A maquiagem clean dura o evento inteiro e fica boa com flash?',
    answer:
      'Sim. A preparação prioriza pele hidratada, luminosidade sem oleosidade e camadas leves de alta fixação, pensadas justamente para resistir ao calor e não estourar ou marcar sob luz forte de câmera e edição.',
  },
  {
    id: 'faq-3',
    question: 'Você atende todos os tons de pele e tipos de cabelo?',
    answer:
      'Sim. O portfólio reúne produções em peles claras, médias, negras, retintas e ruivas, além de cabelos lisos, ondulados e cacheados — com colorimetria que respeita o subtom natural, sem acinzentar.',
  },
  {
    id: 'faq-4',
    question: 'Onde os atendimentos acontecem? Você atende em outras cidades?',
    answer:
      'A base fica em Goiânia–GO, em estúdio próprio com atendimento por hora marcada. Para ensaios fotográficos e produções específicas, também há agendas programadas em Belo Horizonte e São Paulo.',
  },
  {
    id: 'faq-5',
    question: 'Como faço para saber valores e reservar minha data?',
    answer:
      'Os valores variam conforme o tipo de produção (make social, make + penteado, ensaio ou noiva) e data. Use o seletor logo abaixo para abrir o WhatsApp já com seu pedido pronto e receber o retorno direto.',
  },
];

export const CONCIERGE_SERVICES = [
  'Maquiagem Social',
  'Make + Penteado',
  'Ensaio Fotográfico',
  'Noiva / Civil',
  'Cursos',
] as const;

export const CONCIERGE_LOCATIONS = [
  'Goiânia – GO',
  'Viagem (BH, SP ou outra cidade)',
] as const;
