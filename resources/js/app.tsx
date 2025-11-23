import './bootstrap';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { TranslationProvider } from './lib/TranslationContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './Components/ui/sonner';

const appName = import.meta.env.VITE_APP_NAME || 'Apointa';

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx')
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);
    root.render(
      <QueryClientProvider client={new QueryClient()}>
        <TranslationProvider>
          <App {...props} />
          <Toaster position="top-right" />
        </TranslationProvider>
      </QueryClientProvider>
    );
  },
  progress: {
    color: '#4F46E5',
  },
});
