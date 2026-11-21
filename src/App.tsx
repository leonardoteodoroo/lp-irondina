import React from 'react';
import { Sec00Header } from './sections/sec-00-header';
import { Sec01Hero } from './sections/sec-01-hero';
import { Sec02Galeria } from './sections/sec-02-galeria';
import { Sec03Servicos } from './sections/sec-03-servicos';
import { Sec04AssinaturaSobre } from './sections/sec-04-assinatura-sobre';
import { Sec05ProvaSocial } from './sections/sec-05-prova-social';
import { Sec06Cursos } from './sections/sec-06-cursos';
import { Sec07Faq } from './sections/sec-07-faq';
import { Sec08CtaConcierge } from './sections/sec-08-cta-concierge';
import { Sec09Footer } from './sections/sec-09-footer';

export const App: React.FC = () => {
  return (
    <div className="min-h-dvh flex flex-col bg-[var(--surface-page)] text-[var(--text-primary)]">
      <Sec00Header />
      <main id="conteudo-principal" className="flex-1">
        <Sec01Hero />
        <Sec02Galeria />
        <Sec03Servicos />
        <Sec04AssinaturaSobre />
        <Sec05ProvaSocial />
        <Sec06Cursos />
        <Sec07Faq />
        <Sec08CtaConcierge />
      </main>
      <Sec09Footer />
    </div>
  );
};

export default App;
