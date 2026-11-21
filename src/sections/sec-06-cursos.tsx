import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { MEDIA, buildWhatsAppUrl } from '../data/content';
import { TrocarBadge } from '../components/TrocarBadge';

const COURSES_DATA = [
  {
    id: 'automaquiagem',
    title: 'Automaquiagem',
    description:
      'Para quem quer ganhar segurança ao se maquiar no dia a dia e em eventos, entendendo preparo de pele e escolhas que funcionam para o próprio rosto.',
    ctaLabel: 'Consultar próximas turmas',
    whatsappMessage:
      'Olá, Irondina! Tenho interesse no Curso de Automaquiagem. Como funcionam as próximas datas?',
    image: MEDIA.courses.automaquiagemPlaceholder,
    imageAlt: 'Aula prática de Automaquiagem com Irondina Mascarenhas',
    trocarLabel: MEDIA.courses.automaquiagemTrocarLabel,
  },
  {
    id: 'profissional-iniciante',
    title: 'Curso Profissional Iniciante',
    description:
      'Focado em técnicas voltadas para atendimento real de clientes — da construção de pele limpa a acabamentos clássicos para eventos.',
    ctaLabel: 'Lista de interesse profissional',
    whatsappMessage:
      'Olá, Irondina! Quero informações sobre o Curso Profissional Iniciante.',
    image: MEDIA.courses.profissional,
    imageAlt: 'Resultado técnico de aula prática no Curso Profissional Iniciante (@eugabriellyleticia)',
  },
];

export const Sec06Cursos: React.FC = () => {
  return (
    <section
      id="cursos"
      aria-labelledby="cursos-heading"
      className="w-full py-16 lg:py-24"
      style={{ background: 'var(--gradient-courses-to-faq)' }}
    >
      <div className="editorial-container">
        {/* Cabeçalho — Zero Eyebrow + Subtítulo aprovado */}
        <div className="pb-8 border-b border-[var(--border-default)] flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <h2
            id="cursos-heading"
            className="font-display font-normal text-[var(--text-primary)] leading-[var(--leading-heading)]"
            style={{ fontSize: 'var(--text-display-section)' }}
          >
            Aprenda a técnica <span className="italic text-[var(--action-primary)]">na prática</span>
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-[46ch] leading-relaxed">
            Turmas e horários sob consulta para quem quer dominar a própria rotina de pele ou
            começar nos atendimentos.
          </p>
        </div>

        {/* 2 Blocos Lado a Lado */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {COURSES_DATA.map((course) => (
            <article
              key={course.id}
              className="grid grid-cols-12 gap-4 sm:gap-6 items-center pt-4 border-t border-[var(--border-subtle)] md:border-t-0 md:pt-0"
            >
              {/* Mídia 4:5 (Foto Provisória com Tag Central TROCAR para Automaquiagem + IG-41 Real para Profissional) */}
              <div className="col-span-5 relative overflow-hidden rounded-[var(--radius-media)] aspect-[4/5] bg-[var(--color-espresso-950)] shadow-[var(--shadow-subtle)]">
                <img
                  src={course.image}
                  alt={course.imageAlt}
                  width={720}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                {course.trocarLabel && <TrocarBadge label={course.trocarLabel} />}
              </div>

              <div className="col-span-7 flex flex-col items-start">
                <h3
                  className="font-display font-normal text-[var(--text-primary)] leading-snug"
                  style={{ fontSize: 'var(--text-heading-md)' }}
                >
                  {course.title}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {course.description}
                </p>
                <a
                  href={buildWhatsAppUrl(course.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 min-h-[48px] px-5 py-2.5 rounded-full border border-[var(--action-secondary-border)] text-xs sm:text-sm font-medium text-[var(--action-secondary-text)] hover:bg-[var(--action-primary)] hover:text-[var(--action-primary-text)] transition-colors"
                >
                  <span>{course.ctaLabel}</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
