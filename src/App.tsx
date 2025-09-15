import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CreateSurvey from './pages/CreateSurvey';
import TakeSurvey from './pages/TakeSurvey';
import SurveyResults from './pages/SurveyResults';
import MySurveys from './pages/MySurveys';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateSurvey />} />
        <Route path="/surveys/:id" element={<TakeSurvey />} />
        <Route path="/results/:id" element={<SurveyResults />} />
        <Route path="/my-surveys" element={<MySurveys />} />
      </Routes>
    </Layout>
  );
}

export default App;
