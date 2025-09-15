export interface Survey {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  createdAt: Date;
  isPublished: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  options?: string[];
  required: boolean;
}

export type QuestionType = 'multiple-choice' | 'text' | 'rating' | 'yes-no';

export interface SurveyResponse {
  id: string;
  surveyId: string;
  responses: { [questionId: string]: any };
  submittedAt: Date;
}

export interface SurveyResults {
  survey: Survey;
  totalResponses: number;
  questionResults: { [questionId: string]: QuestionResult };
}

export interface QuestionResult {
  question: Question;
  responses: any[];
  summary?: {
    // For multiple choice and yes-no
    optionCounts?: { [option: string]: number };
    // For rating
    average?: number;
    distribution?: { [rating: string]: number };
    // For text
    textResponses?: string[];
  };
}