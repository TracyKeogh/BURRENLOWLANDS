import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSurvey } from '../context/SurveyContext';
import { CheckCircle, Star } from 'lucide-react';

const TakeSurvey: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSurvey, submitResponse } = useSurvey();
  
  const survey = getSurvey(id!);
  const [responses, setResponses] = useState<{ [questionId: string]: any }>({});
  const [submitted, setSubmitted] = useState(false);

  if (!survey) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Survey Not Found</h1>
        <p className="text-gray-600 mb-6">The survey you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Home
        </button>
      </div>
    );
  }

  if (!survey.isPublished) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Survey Not Available</h1>
        <p className="text-gray-600 mb-6">This survey is not currently published and cannot be taken.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Home
        </button>
      </div>
    );
  }

  const handleResponseChange = (questionId: string, value: any) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required questions
    const requiredQuestions = survey.questions.filter(q => q.required);
    const missingResponses = requiredQuestions.filter(q => 
      !responses[q.id] || (typeof responses[q.id] === 'string' && responses[q.id].trim() === '')
    );

    if (missingResponses.length > 0) {
      alert('Please answer all required questions before submitting.');
      return;
    }

    submitResponse(survey.id, responses);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Your response has been submitted successfully.
        </p>
        <div className="space-x-4">
          <button
            onClick={() => navigate(`/results/${survey.id}`)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Results
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Take Another Survey
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">{survey.title}</h1>
          {survey.description && (
            <p className="text-gray-600 mt-2">{survey.description}</p>
          )}
          <div className="mt-3 text-sm text-gray-500">
            {survey.questions.length} questions • Required questions marked with *
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {survey.questions.map((question, index) => (
            <div key={question.id} className="space-y-3">
              <label className="block text-lg font-medium text-gray-900">
                {index + 1}. {question.title}
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {question.type === 'multiple-choice' && question.options && (
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name={question.id}
                        value={option}
                        checked={responses[question.id] === option}
                        onChange={(e) => handleResponseChange(question.id, e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {question.type === 'yes-no' && (
                <div className="space-y-2">
                  {['Yes', 'No'].map((option) => (
                    <label key={option} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name={question.id}
                        value={option}
                        checked={responses[question.id] === option}
                        onChange={(e) => handleResponseChange(question.id, e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              )}

              {question.type === 'text' && (
                <textarea
                  value={responses[question.id] || ''}
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your answer..."
                />
              )}

              {question.type === 'rating' && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => handleResponseChange(question.id, rating)}
                        className={`p-2 rounded-full transition-colors ${
                          responses[question.id] === rating
                            ? 'text-yellow-400'
                            : 'text-gray-300 hover:text-yellow-300'
                        }`}
                      >
                        <Star className="h-8 w-8 fill-current" />
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Poor</span>
                    <span>Excellent</span>
                  </div>
                  {responses[question.id] && (
                    <div className="text-sm text-gray-700">
                      Selected: {responses[question.id]} star{responses[question.id] !== 1 ? 's' : ''}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          <div className="pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Submit Survey
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TakeSurvey;