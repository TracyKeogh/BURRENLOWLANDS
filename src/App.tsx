import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load components to help with bundle size and potential loading issues
const Home = React.lazy(() => import('./pages/Home'));
const CreateSurvey = React.lazy(() => import('./pages/CreateSurvey'));
const TakeSurvey = React.lazy(() => import('./pages/TakeSurvey'));
const SurveyResults = React.lazy(() => import('./pages/SurveyResults'));
const MySurveys = React.lazy(() => import('./pages/MySurveys'));

function App() {
  console.log('SurveyHub App is starting...');
  
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateSurvey />} />
          <Route path="/surveys/:id" element={<TakeSurvey />} />
          <Route path="/results/:id" element={<SurveyResults />} />
          <Route path="/my-surveys" element={<MySurveys />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
