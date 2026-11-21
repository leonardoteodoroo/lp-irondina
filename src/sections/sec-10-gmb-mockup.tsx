import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Globe,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  Search,
  Star,
} from 'lucide-react';
import {
  MEDIA,
  TESTIMONIALS_LIST,
  WHATSAPP_DISPLAY,
  buildWhatsAppUrl,
} from '../data/content';

type GmbTab = 'visao-geral' | 'avaliacoes' | 'fotos' | 'servicos';

const GMB_REVIEWS = [
  {
    id: 'gmb-1',
    name: TESTIMONIALS_LIST[0].name,
    meta: 'Guia Local · 14 avaliações · 6 fotos',
    time: 'há 2 semanas',
    text: 'Fiz ensaio com a Irondina e fiquei apaixonada. Pele super leve, iluminada, segurou horas e nas fotos do estúdio parecia pele de capa sem parecer carregada. Atendimento pontual e impecável.',
    avatar: TESTIMONIALS_LIST[0].avatar,
    photo: MEDIA.about.mainPortrait,
    reply:
      'Muito obrigada, Sara! Foi uma alegria produzir você para o seu ensaio. Sempre um prazer te receber no estúdio!',
  },
  {
    id: 'gmb-2',
    name: TESTIMONIALS_LIST[1].name,
    meta: '9 avaliações · 4 fotos',
    time: 'há 1 mês',
    text: 'O glow dessa make não tem igual em Goiânia! Ela respeitou totalmente meu tom de pele e os cachos, super atenciosa do início ao fim. Indico de olhos fechados para ensaio profissional.',
    avatar: TESTIMONIALS_LIST[1].avatar,
    photo: MEDIA.about.secondaryPortrait,
    reply:
      'Obrigada pelo carinho e confiança, Fernanda! Seu ensaio ficou maravilhoso.',
  },
  {
    id: 'gmb-3',
    name: TESTIMONIALS_LIST[3].name,
    meta: '6 avaliações · 2 fotos',
    time: 'há 1 mês',
    text: 'Agendei maquiagem + penteado no mesmo horário e saí pronta direto para o evento. O semipreso com ondas durou a festa inteira intacto e a pele ficou linda até de madrugada!',
    avatar: TESTIMONIALS_LIST[3].avatar,
    photo: MEDIA.hero.secondary,
    reply:
      'Que bom que aproveitou cada minuto do evento, Júlia! Te espero na próxima produção.',
  },
  {
    id: 'gmb-4',
    name: TESTIMONIALS_LIST[4].name,
    meta: '12 avaliações · 5 fotos',
    time: 'há 2 meses',
    text: 'Me produziu para o casamento civil e chorou todo mundo sem borrar nada! Acabamento clean, natural e elegante exatamente como eu sonhava. Gratidão eterna!',
    avatar: TESTIMONIALS_LIST[4].avatar,
    photo: MEDIA.beforeAfter.afterOpen,
    reply:
      'Foi emocionante fazer parte desse dia tão especial, Renata! Felicidades sem fim.',
  },
];

const GMB_SERVICES = [
  'Maquiagem Clean & Social',
  'Penteados Presos e Semipresos',
  'Combo Make + Penteado Integrados',
  'Maquiagem para Ensaio Fotográfico (Goiânia, BH e SP)',
  'Produção de Noivas e Casamento Civil',
  'Curso de Automaquiagem & Iniciante Profissional',
];

const GMB_PHOTOS = [
  { src: MEDIA.about.mainPortrait, alt: 'Irondina Mascarenhas — Beauty Artist' },
  { src: MEDIA.about.secondaryPortrait, alt: 'Irondina Mascarenhas em estúdio' },
  { src: MEDIA.hero.secondary, alt: 'Maquiagem Social e Semipreso' },
  { src: MEDIA.beforeAfter.afterOpen, alt: 'Acabamento de pele iluminada real' },
  { src: MEDIA.beforeAfter.afterClosed, alt: 'Detalhe de esfumado leve em estúdio' },
  { src: MEDIA.courses.profissional, alt: 'Curso Profissional Iniciante' },
];

export const Sec10GmbMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<GmbTab>('visao-geral');

  return (
    <section
      id="google-meu-negocio-preview"
      aria-labelledby="gmb-preview-title"
      className="w-full py-12 lg:py-16 bg-[#F1F3F4] text-[#202124] border-t border-[#DADCE0] overflow-x-clip"
    >
      <div className="editorial-container">
        {/* Identificação transparente da simulação visual abaixo do Footer */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#DADCE0]">
          <div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E8F0FE] text-[#1967D2] text-[0.7rem] font-semibold uppercase tracking-wider">
              Mockup Interativo HTML · Google Meu Negócio
            </span>
            <h2
              id="gmb-preview-title"
              className="mt-1.5 font-sans-editorial text-base sm:text-lg font-semibold text-[#202124]"
            >
              Simulação de como o perfil da Irondina aparece ao pesquisar no Google
            </h2>
          </div>
          <span className="text-xs text-[#5F6368]">
            Prévia ilustrativa pós-cadastro &amp; verificação no Google Business Profile
          </span>
        </div>

        {/* Simulador de Interface de Busca do Google */}
        <div className="rounded-2xl bg-white border border-[#DADCE0] shadow-sm overflow-hidden">
          {/* Barra Superior do Buscador */}
          <div className="px-4 sm:px-6 pt-4 pb-3 border-b border-[#EBECEF]">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
              {/* Logo Google em SVG (sr-only evita aria-label em div sem role) */}
              <div className="flex items-center gap-1 shrink-0">
                <span className="sr-only">Google</span>
                <svg className="h-6 w-auto" viewBox="0 0 272 92" aria-hidden="true">
                  <path
                    fill="#EA4335"
                    d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"
                  />
                  <path
                    fill="#4285F4"
                    d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"
                  />
                  <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z" />
                  <path
                    fill="#EA4335"
                    d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"
                  />
                  <path
                    fill="#4285F4"
                    d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01C53.27 65.99 45.55 69.36 35.29 69.36 16.4 69.36.5 53.97.5 35.09.5 16.21 16.4.81 35.29.81c10.45 0 17.88 4.09 23.48 9.43l-6.6 6.6c-4.01-3.77-9.43-6.7-16.88-6.7-13.79 0-24.59 11.12-24.59 24.94 0 13.81 10.8 24.94 24.59 24.94 8.95 0 14.06-3.59 17.34-6.87 2.66-2.66 4.41-6.48 5.1-11.74H35.29z"
                  />
                </svg>
              </div>

              {/* Barra de Pesquisa */}
              <div className="flex-1 flex items-center justify-between gap-3 px-4 py-2.5 rounded-full bg-white border border-[#DFE1E5] shadow-xs">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Search className="w-4 h-4 text-[#4285F4] shrink-0" aria-hidden="true" />
                  <span className="text-sm text-[#202124] truncate font-medium">
                    maquiadora e penteados em goiânia
                  </span>
                </div>
                    <span className="hidden sm:inline-block text-[0.7rem] text-[#5F6368] shrink-0">
                  Goiânia – GO
                </span>
              </div>
            </div>

            {/* Filtros da SERP */}
            <div className="mt-3 flex items-center gap-4 text-xs text-[#5F6368] overflow-x-auto pb-0.5">
              <span className="text-[#1A73E8] font-semibold border-b-2 border-[#1A73E8] pb-1.5 whitespace-nowrap">
                Tudo
              </span>
              <span className="pb-1.5 whitespace-nowrap">Maps</span>
              <span className="pb-1.5 whitespace-nowrap">Imagens</span>
              <span className="pb-1.5 whitespace-nowrap">Avaliações</span>
            </div>
          </div>

          {/* Grade SERP: Resultados à esquerda (5 cols) + Painel Google Meu Negócio à direita (7 cols) */}
          <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 bg-[#FAFAFA]">
            {/* Coluna Esquerda — Resultado Orgânico do Novo Site + Destaque Local */}
            <div className="lg:col-span-5 space-y-5">
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#E8EAED]">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="w-7 h-7 rounded-full bg-[#1E1816] text-[#DFA194] font-display text-xs flex items-center justify-center shrink-0">
                    IRO
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#202124] truncate">
                      Irondina Mascarenhas — Beauty Artist
                    </p>
                    <p className="text-[0.7rem] text-[#4D5156] truncate">
                      https://irondina.semprenamoda.com.br
                    </p>
                  </div>
                </div>
                <h3 className="text-lg font-medium text-[#1A0DAB] leading-snug">
                  Irondina Mascarenhas | Maquiagem Clean, Social &amp; Penteados em Goiânia
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-[#4D5156] leading-relaxed">
                  Maquiagem embelezadora sem pesar desde 2017 (+9 anos). Atendimento em estúdio
                  próprio em Goiânia–GO e ensaios em BH e SP. Confira produções reais e consulte
                  sua data pelo WhatsApp.
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#4D5156]">
                  <span className="font-semibold text-[#202124]">5,0</span>
                  <span className="flex items-center text-[#FBBC04]" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </span>
                  <span>(48 avaliações) · Goiânia–GO</span>
                </div>
              </div>

              {/* Lista Rápida de Serviços no Snippet */}
              <div className="p-4 rounded-xl bg-white border border-[#E8EAED]">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#5F6368] mb-2.5">
                  Pesquisas relacionadas ao perfil
                </p>
                <div className="grid grid-cols-1 gap-1.5 text-xs text-[#1A0DAB]">
                  <span>• Maquiagem clean em Goiânia para eventos</span>
                  <span>• Maquiadora e penteadista hora marcada Goiânia</span>
                  <span>• Produção maquiagem para ensaio fotográfico</span>
                  <span>• Curso de automaquiagem presencial Irondina Mascarenhas</span>
                </div>
              </div>
            </div>

            {/* Coluna Direita — Cartão Oficial Simulado do Google Meu Negócio */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-[#DADCE0] overflow-hidden shadow-xs">
              {/* Mosaico de Fotos do Perfil com altura estritamente contida */}
              <div className="grid grid-cols-12 gap-1 h-44 sm:h-52 bg-[#1E1816] overflow-hidden">
                <div className="col-span-6 h-full relative overflow-hidden">
                  <img
                    src={MEDIA.about.mainPortrait}
                    alt="Irondina Mascarenhas no Perfil Google"
                    width={750}
                    height={1000}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[0.65rem] text-white font-medium">
                    Foto de capa · Artista
                  </span>
                </div>
                <div className="col-span-3 h-full overflow-hidden grid grid-rows-2 gap-1">
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={MEDIA.hero.secondary}
                      alt="Make Social e Penteado"
                      width={720}
                      height={900}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={MEDIA.beforeAfter.afterOpen}
                      alt="Pele iluminada real"
                      width={720}
                      height={900}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
                <div className="col-span-3 h-full overflow-hidden grid grid-rows-2 gap-1">
                  <div className="w-full h-full overflow-hidden">
                    <img
                      src={MEDIA.about.secondaryPortrait}
                      alt="Estúdio Irondina Mascarenhas"
                      width={720}
                      height={900}
                      loading="lazy"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('fotos')}
                    className="relative w-full h-full overflow-hidden cursor-pointer group"
                  >
                    <img
                      src={MEDIA.courses.profissional}
                      alt="Ver fotos no Google Meu Negócio"
                      width={720}
                      height={900}
                      loading="lazy"
                      className="w-full h-full object-cover object-top brightness-75 group-hover:brightness-50 transition-all"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-white text-xs font-semibold">
                      + Ver fotos
                    </span>
                  </button>
                </div>
              </div>

              {/* Cabeçalho do Perfil Comercial */}
              <div className="p-4 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl sm:text-2xl font-semibold text-[#202124] leading-tight">
                        Irondina Mascarenhas — Beauty Artist
                      </h3>
                      <CheckCircle2
                        className="w-5 h-5 text-[#1A73E8] shrink-0"
                        aria-label="Empresa verificada no Google"
                      />
                    </div>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                      <span className="font-semibold text-[#202124]">5,0</span>
                      <span className="flex items-center text-[#FBBC04]" aria-hidden="true">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveTab('avaliacoes')}
                        className="text-[#1A73E8] hover:underline font-medium cursor-pointer"
                      >
                        48 avaliações no Google
                      </button>
                      <span className="text-[#5F6368]">·</span>
                      <span className="text-[#5F6368]">Maquiadora em Goiânia, GO</span>
                    </div>
                  </div>
                </div>

                {/* Botões de Ação Rápida Estilo Google (Site, WhatsApp, Rotas, Ligar) */}
                <div className="mt-4 grid grid-cols-4 gap-2">
                  <a
                    href="#topo"
                    className="flex flex-col items-center justify-center gap-1 min-h-[54px] p-2 rounded-xl bg-[#E8F0FE] text-[#1967D2] hover:bg-[#D2E3FC] transition-colors text-xs font-medium"
                  >
                    <Globe className="w-4 h-4" aria-hidden="true" />
                    <span>Site</span>
                  </a>
                  <a
                    href={buildWhatsAppUrl(
                      'Olá, Irondina! Vi seu perfil no Google e gostaria de consultar disponibilidade de data.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center gap-1 min-h-[54px] p-2 rounded-xl bg-[#E6F4EA] text-[#137333] hover:bg-[#CEEAD6] transition-colors text-xs font-semibold"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="#agendar"
                    className="flex flex-col items-center justify-center gap-1 min-h-[54px] p-2 rounded-xl bg-[#F1F3F4] text-[#202124] hover:bg-[#E8EAED] transition-colors text-xs font-medium"
                  >
                    <Navigation className="w-4 h-4 text-[#1A73E8]" aria-hidden="true" />
                    <span>Agendar</span>
                  </a>
                  <a
                    href="tel:+5562985653419"
                    className="flex flex-col items-center justify-center gap-1 min-h-[54px] p-2 rounded-xl bg-[#F1F3F4] text-[#202124] hover:bg-[#E8EAED] transition-colors text-xs font-medium"
                  >
                    <Phone className="w-4 h-4 text-[#1A73E8]" aria-hidden="true" />
                    <span>Ligar</span>
                  </a>
                </div>

                {/* Abas da Ficha Google */}
                <div
                  role="tablist"
                  aria-label="Abas do perfil no Google Meu Negócio"
                  className="mt-5 flex items-center gap-5 border-b border-[#E8EAED] text-xs sm:text-sm overflow-x-auto"
                >
                  {(
                    [
                      { id: 'visao-geral', label: 'Visão geral' },
                      { id: 'avaliacoes', label: 'Avaliações (48)' },
                      { id: 'servicos', label: 'Serviços' },
                      { id: 'fotos', label: 'Fotos' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      role="tab"
                      type="button"
                      aria-selected={activeTab === tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-2.5 whitespace-nowrap font-medium border-b-2 transition-colors cursor-pointer ${
                        activeTab === tab.id
                          ? 'border-[#1A73E8] text-[#1A73E8]'
                          : 'border-transparent text-[#5F6368] hover:text-[#202124]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Conteúdo Dinâmico das Abas */}
                <div className="mt-4">
                  {activeTab === 'visao-geral' && (
                    <div className="space-y-4">
                      <div className="space-y-2.5 text-xs sm:text-sm text-[#3C4043]">
                        <div className="flex items-start gap-2.5">
                          <MapPin className="w-4 h-4 text-[#1A73E8] mt-0.5 shrink-0" />
                          <span>
                            <strong>Área de atendimento:</strong> Goiânia – GO (estúdio próprio) ·
                            Viagens para ensaios em BH e SP
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Clock className="w-4 h-4 text-[#137333] mt-0.5 shrink-0" />
                          <span>
                            <strong className="text-[#137333]">Atendimento com hora marcada</strong> ·
                            Resposta direta no WhatsApp
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <Phone className="w-4 h-4 text-[#1A73E8] mt-0.5 shrink-0" />
                          <span>{WHATSAPP_DISPLAY}</span>
                        </div>
                      </div>

                      {/* Destaque de 2 Avaliações dentro da Visão Geral */}
                      <div className="pt-3 border-t border-[#E8EAED] space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-[#202124]">
                            Resumo das avaliações (5,0 ★)
                          </p>
                          <button
                            type="button"
                            onClick={() => setActiveTab('avaliacoes')}
                            className="text-xs font-medium text-[#1A73E8] hover:underline cursor-pointer"
                          >
                            Ver todas →
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {GMB_REVIEWS.slice(0, 2).map((rev) => (
                            <div
                              key={rev.id}
                              className="p-3 rounded-xl bg-[#F8F9FA] border border-[#E8EAED] space-y-2"
                            >
                              <div className="flex items-center gap-2">
                                <img
                                  src={rev.avatar}
                                  alt={rev.name}
                                  width={36}
                                  height={36}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <div className="min-w-0">
                                  <p className="text-xs font-semibold text-[#202124] truncate">
                                    {rev.name}
                                  </p>
                                  <div className="flex items-center gap-1">
                                    <span className="flex text-[#FBBC04]">
                                      {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className="w-3 h-3 fill-current" />
                                      ))}
                                    </span>
                                    <span className="text-[0.65rem] text-[#5F6368]">{rev.time}</span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-xs text-[#3C4043] leading-relaxed line-clamp-3">
                                “{rev.text}”
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'avaliacoes' && (
                    <div className="space-y-4">
                      {GMB_REVIEWS.map((rev) => (
                        <div
                          key={rev.id}
                          className="pb-4 border-b border-[#E8EAED] last:border-b-0 last:pb-0 space-y-2.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={rev.avatar}
                                alt={rev.name}
                                width={40}
                                height={40}
                                className="w-9 h-9 rounded-full object-cover"
                              />
                              <div>
                                <p className="text-xs sm:text-sm font-semibold text-[#202124]">
                                  {rev.name}
                                </p>
                                <p className="text-[0.68rem] text-[#5F6368]">{rev.meta}</p>
                              </div>
                            </div>
                            <span className="text-[0.7rem] text-[#5F6368]">{rev.time}</span>
                          </div>

                          <div className="flex items-center gap-1 text-[#FBBC04]">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className="w-3.5 h-3.5 fill-current" />
                            ))}
                          </div>

                          <p className="text-xs sm:text-sm text-[#3C4043] leading-relaxed">
                            {rev.text}
                          </p>

                          <div className="p-2.5 rounded-lg bg-[#F8F9FA] border border-[#D2E3FC] text-xs text-[#4D5156]">
                            <strong className="text-[#202124] block mb-0.5">
                              Resposta do proprietário:
                            </strong>
                            {rev.reply}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'servicos' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {GMB_SERVICES.map((srv) => (
                        <div
                          key={srv}
                          className="p-3 rounded-xl bg-[#F8F9FA] border border-[#E8EAED] flex items-center justify-between gap-2 text-xs sm:text-sm text-[#202124]"
                        >
                          <span>{srv}</span>
                          <span className="text-[0.68rem] font-semibold text-[#137333] shrink-0">
                            Disponível
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'fotos' && (
                    <div className="grid grid-cols-3 gap-2">
                      {GMB_PHOTOS.map((pic, idx) => (
                        <div
                          key={idx}
                          className="overflow-hidden rounded-lg aspect-[4/5] bg-[#1E1816]"
                        >
                          <img
                            src={pic.src}
                            alt={pic.alt}
                            width={720}
                            height={900}
                            loading="lazy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
