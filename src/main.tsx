import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { SurveyProvider } from './context/SurveyContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SurveyProvider>
        <App />
      </SurveyProvider>
    </BrowserRouter>
  </StrictMode>
);
