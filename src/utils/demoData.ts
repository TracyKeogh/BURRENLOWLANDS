import { Survey, SurveyResponse } from '../types/survey';
import { v4 as uuidv4 } from 'uuid';

export const demoSurveys: Survey[] = [
  {
    id: 'demo-survey-1',
    title: 'Customer Satisfaction Survey',
    description: 'Help us understand how we can improve our services by sharing your feedback.',
    isPublished: true,
    createdAt: new Date('2024-01-15'),
    questions: [
      {
        id: 'q1',
        type: 'rating',
        title: 'How satisfied are you with our service overall?',
        required: true,
      },
      {
        id: 'q2',
        type: 'multiple-choice',
        title: 'Which aspect of our service do you value most?',
        options: ['Speed', 'Quality', 'Price', 'Customer Support'],
        required: true,
      },
      {
        id: 'q3',
        type: 'yes-no',
        title: 'Would you recommend our service to others?',
        required: true,
      },
      {
        id: 'q4',
        type: 'text',
        title: 'What improvements would you like to see?',
        required: false,
      },
    ],
  },
  {
    id: 'demo-survey-2',
    title: 'Website Usability Study',
    description: 'Share your experience using our website to help us make it better.',
    isPublished: true,
    createdAt: new Date('2024-01-20'),
    questions: [
      {
        id: 'q5',
        type: 'multiple-choice',
        title: 'How did you first discover our website?',
        options: ['Search Engine', 'Social Media', 'Word of Mouth', 'Advertisement', 'Other'],
        required: true,
      },
      {
        id: 'q6',
        type: 'rating',
        title: 'How easy was it to find what you were looking for?',
        required: true,
      },
      {
        id: 'q7',
        type: 'multiple-choice',
        title: 'What device did you primarily use?',
        options: ['Desktop Computer', 'Laptop', 'Tablet', 'Mobile Phone'],
        required: true,
      },
      {
        id: 'q8',
        type: 'text',
        title: 'Any additional comments about your experience?',
        required: false,
      },
    ],
  },
];

export const demoResponses: SurveyResponse[] = [
  // Customer Satisfaction Survey responses
  {
    id: uuidv4(),
    surveyId: 'demo-survey-1',
    submittedAt: new Date('2024-01-16'),
    responses: {
      q1: 5,
      q2: 'Quality',
      q3: 'Yes',
      q4: 'More payment options would be great',
    },
  },
  {
    id: uuidv4(),
    surveyId: 'demo-survey-1',
    submittedAt: new Date('2024-01-17'),
    responses: {
      q1: 4,
      q2: 'Speed',
      q3: 'Yes',
      q4: 'Faster response times',
    },
  },
  {
    id: uuidv4(),
    surveyId: 'demo-survey-1',
    submittedAt: new Date('2024-01-18'),
    responses: {
      q1: 5,
      q2: 'Customer Support',
      q3: 'Yes',
      q4: '',
    },
  },
  {
    id: uuidv4(),
    surveyId: 'demo-survey-1',
    submittedAt: new Date('2024-01-19'),
    responses: {
      q1: 3,
      q2: 'Price',
      q3: 'No',
      q4: 'Lower prices and better quality control',
    },
  },
  {
    id: uuidv4(),
    surveyId: 'demo-survey-1',
    submittedAt: new Date('2024-01-20'),
    responses: {
      q1: 4,
      q2: 'Quality',
      q3: 'Yes',
      q4: 'More product variety',
    },
  },
  // Website Usability Study responses
  {
    id: uuidv4(),
    surveyId: 'demo-survey-2',
    submittedAt: new Date('2024-01-21'),
    responses: {
      q5: 'Search Engine',
      q6: 4,
      q7: 'Desktop Computer',
      q8: 'Great website overall!',
    },
  },
  {
    id: uuidv4(),
    surveyId: 'demo-survey-2',
    submittedAt: new Date('2024-01-22'),
    responses: {
      q5: 'Social Media',
      q6: 5,
      q7: 'Mobile Phone',
      q8: 'Mobile version works perfectly',
    },
  },
  {
    id: uuidv4(),
    surveyId: 'demo-survey-2',
    submittedAt: new Date('2024-01-23'),
    responses: {
      q5: 'Word of Mouth',
      q6: 3,
      q7: 'Laptop',
      q8: 'Navigation could be clearer',
    },
  },
];