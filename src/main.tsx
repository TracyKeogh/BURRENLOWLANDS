import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App.tsx';
import SimpleApp from './App.simple.tsx';
import { SurveyProvider } from './context/SurveyContext.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import './index.css';

console.log('SurveyHub main.tsx loaded');
console.log('Environment:', import.meta.env.MODE);

// Use simple app first to test basic functionality
const USE_SIMPLE_APP = false;

const rootElement = document.getElementById('root');
console.log('Root element found:', !!rootElement);

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        {USE_SIMPLE_APP ? (
          <SimpleApp />
        ) : (
          <HashRouter>
            <SurveyProvider>
              <App />
            </SurveyProvider>
          </HashRouter>
        )}
      </ErrorBoundary>
    </StrictMode>
  );
  console.log('App rendered successfully');
} else {
  console.error('Root element not found!');
}
