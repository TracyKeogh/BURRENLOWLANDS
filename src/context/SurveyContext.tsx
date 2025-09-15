import React, { createContext, useContext, useEffect, useState } from 'react';
import { Survey, SurveyResponse, SurveyResults } from '../types/survey';
import { v4 as uuidv4 } from 'uuid';
import { demoSurveys, demoResponses } from '../utils/demoData';

interface SurveyContextType {
  surveys: Survey[];
  responses: SurveyResponse[];
  createSurvey: (survey: Omit<Survey, 'id' | 'createdAt'>) => void;
  updateSurvey: (id: string, survey: Partial<Survey>) => void;
  deleteSurvey: (id: string) => void;
  submitResponse: (surveyId: string, responses: { [questionId: string]: any }) => void;
  getSurveyResults: (surveyId: string) => SurveyResults | null;
  getSurvey: (id: string) => Survey | undefined;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (!context) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};

const STORAGE_KEYS = {
  SURVEYS: 'surveys',
  RESPONSES: 'survey-responses',
};

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedSurveys = localStorage.getItem(STORAGE_KEYS.SURVEYS);
    const savedResponses = localStorage.getItem(STORAGE_KEYS.RESPONSES);

    if (savedSurveys) {
      setSurveys(JSON.parse(savedSurveys).map((s: any) => ({
        ...s,
        createdAt: new Date(s.createdAt)
      })));
    } else {
      // Load demo data if no saved surveys exist
      setSurveys(demoSurveys);
    }

    if (savedResponses) {
      setResponses(JSON.parse(savedResponses).map((r: any) => ({
        ...r,
        submittedAt: new Date(r.submittedAt)
      })));
    } else {
      // Load demo responses if no saved responses exist
      setResponses(demoResponses);
    }
  }, []);

  // Save surveys to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SURVEYS, JSON.stringify(surveys));
  }, [surveys]);

  // Save responses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESPONSES, JSON.stringify(responses));
  }, [responses]);

  const createSurvey = (surveyData: Omit<Survey, 'id' | 'createdAt'>) => {
    const newSurvey: Survey = {
      ...surveyData,
      id: uuidv4(),
      createdAt: new Date(),
    };
    setSurveys(prev => [...prev, newSurvey]);
  };

  const updateSurvey = (id: string, surveyData: Partial<Survey>) => {
    setSurveys(prev => prev.map(survey => 
      survey.id === id ? { ...survey, ...surveyData } : survey
    ));
  };

  const deleteSurvey = (id: string) => {
    setSurveys(prev => prev.filter(survey => survey.id !== id));
    setResponses(prev => prev.filter(response => response.surveyId !== id));
  };

  const submitResponse = (surveyId: string, responseData: { [questionId: string]: any }) => {
    const newResponse: SurveyResponse = {
      id: uuidv4(),
      surveyId,
      responses: responseData,
      submittedAt: new Date(),
    };
    setResponses(prev => [...prev, newResponse]);
  };

  const getSurvey = (id: string) => {
    return surveys.find(survey => survey.id === id);
  };

  const getSurveyResults = (surveyId: string): SurveyResults | null => {
    const survey = surveys.find(s => s.id === surveyId);
    if (!survey) return null;

    const surveyResponses = responses.filter(r => r.surveyId === surveyId);
    const questionResults: { [questionId: string]: any } = {};

    survey.questions.forEach(question => {
      const questionResponses = surveyResponses
        .map(r => r.responses[question.id])
        .filter(r => r !== undefined && r !== null && r !== '');

      const result: any = {
        question,
        responses: questionResponses,
      };

      if (question.type === 'multiple-choice' || question.type === 'yes-no') {
        const optionCounts: { [option: string]: number } = {};
        questionResponses.forEach(response => {
          optionCounts[response] = (optionCounts[response] || 0) + 1;
        });
        result.summary = { optionCounts };
      } else if (question.type === 'rating') {
        const numericResponses = questionResponses.map(r => Number(r)).filter(r => !isNaN(r));
        const average = numericResponses.length > 0 
          ? numericResponses.reduce((sum, val) => sum + val, 0) / numericResponses.length 
          : 0;
        
        const distribution: { [rating: string]: number } = {};
        numericResponses.forEach(rating => {
          distribution[rating.toString()] = (distribution[rating.toString()] || 0) + 1;
        });

        result.summary = { average, distribution };
      } else if (question.type === 'text') {
        result.summary = { textResponses: questionResponses };
      }

      questionResults[question.id] = result;
    });

    return {
      survey,
      totalResponses: surveyResponses.length,
      questionResults,
    };
  };

  return (
    <SurveyContext.Provider value={{
      surveys,
      responses,
      createSurvey,
      updateSurvey,
      deleteSurvey,
      submitResponse,
      getSurveyResults,
      getSurvey,
    }}>
      {children}
    </SurveyContext.Provider>
  );
};