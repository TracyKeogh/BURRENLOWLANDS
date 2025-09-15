import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import SimpleApp from './App.simple.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

console.log('SurveyHub main.tsx loaded');
console.log('Environment:', import.meta.env.MODE);

const rootElement = document.getElementById('root');
console.log('Root element found:', !!rootElement);

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <SimpleApp />
      </ErrorBoundary>
    </StrictMode>
  );
  console.log('App rendered successfully');
} else {
  console.error('Root element not found!');
}
