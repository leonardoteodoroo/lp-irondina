import React, { Suspense, lazy } from 'react';
import { Sec00Header } from './sections/sec-00-header';
import { Sec01Hero } from './sections/sec-01-hero';

const BelowFoldSections = lazy(() => import('./sections/BelowFoldSections'));

export const App: React.FC = () => {
  return (
    <div className="min-h-dvh w-full max-w-[100vw] overflow-x-clip flex flex-col bg-[var(--surface-page)] text-[var(--text-primary)]">
      <Sec00Header />
      <main id="conteudo-principal" className="flex-1 w-full overflow-x-clip">
        <Sec01Hero />
        <Suspense fallback={<div className="min-h-[80vh]" aria-hidden="true" />}>
          <BelowFoldSections />
        </Suspense>
      </main>
    </div>
  );
};

export default App;
