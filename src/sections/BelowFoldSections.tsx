import React from 'react';
import { Sec02Galeria } from './sec-02-galeria';
import { Sec03Servicos } from './sec-03-servicos';
import { Sec04AssinaturaSobre } from './sec-04-assinatura-sobre';
import { Sec05ProvaSocial } from './sec-05-prova-social';
import { Sec06Cursos } from './sec-06-cursos';
import { Sec07Faq } from './sec-07-faq';
import { Sec08CtaConcierge } from './sec-08-cta-concierge';
import { Sec09Footer } from './sec-09-footer';
import { Sec10GmbMockup } from './sec-10-gmb-mockup';

export const BelowFoldSections: React.FC = () => {
  return (
    <>
      <Sec02Galeria />
      <Sec03Servicos />
      <Sec04AssinaturaSobre />
      <Sec05ProvaSocial />
      <Sec06Cursos />
      <Sec07Faq />
      <Sec08CtaConcierge />
      <Sec09Footer />
      <Sec10GmbMockup />
    </>
  );
};

export default BelowFoldSections;
