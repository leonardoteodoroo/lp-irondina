import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Injeta <link rel="preload"> no <head> do build final para os arquivos críticos
 * com hash gerados pelo Vite (imagem LCP responsiva da Hero e fontes WOFF2 latin críticas),
 * eliminando o atraso de descoberta da cadeia HTML -> JS -> CSS -> Fonte/LCP.
 */
function preloadCriticalAssets(): Plugin {
  return {
    name: 'preload-critical-assets',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;

        const fileNames = Object.keys(ctx.bundle);
        const heroSm = fileNames.find((f) => /assets\/hero-stage-ig03-sm-.*\.webp$/.test(f));
        const heroLg = fileNames.find((f) => /assets\/hero-stage-ig03-(?!sm).*\.webp$/.test(f));
        const fontDisplay = fileNames.find((f) =>
          /assets\/eb-garamond-latin-400-normal-.*\.woff2$/.test(f)
        );
        const fontDisplayItalic = fileNames.find((f) =>
          /assets\/eb-garamond-latin-400-italic-.*\.woff2$/.test(f)
        );
        const fontSans = fileNames.find((f) =>
          /assets\/dm-sans-latin-400-normal-.*\.woff2$/.test(f)
        );

        const tags: string[] = [];
        if (heroSm && heroLg) {
          tags.push(
            `    <link rel="preload" as="image" type="image/webp" imagesrcset="/${heroSm} 750w, /${heroLg} 960w" imagesizes="(max-width: 1023px) 100vw, 68vw" fetchpriority="high" />`
          );
        }
        for (const fontFile of [fontDisplay, fontDisplayItalic, fontSans]) {
          if (fontFile) {
            tags.push(
              `    <link rel="preload" as="font" type="font/woff2" href="/${fontFile}" crossorigin />`
            );
          }
        }

        if (tags.length === 0) return html;
        return html.replace('</head>', `${tags.join('\n')}\n  </head>`);
      },
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss(), preloadCriticalAssets()],
  build: {
    target: 'esnext',
    cssMinify: true,
    minify: 'esbuild',
    modulePreload: {
      resolveDependencies: (_filename, deps) =>
        deps.filter((dep) => !dep.includes('motion') && !dep.includes('BelowFoldSections')),
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-dom/client'],
          motion: ['motion/react'],
        },
      },
    },
  },
});
