import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSurvey } from '../context/SurveyContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, BarChart3, Star, MessageSquare } from 'lucide-react';

const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', '#F97316', '#06B6D4', '#84CC16'];

const SurveyResults: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getSurveyResults } = useSurvey();
  
  const results = getSurveyResults(id!);

  if (!results) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
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

  const { survey, totalResponses, questionResults } = results;

  const renderQuestionResult = (questionResult: any, index: number) => {
    const { question, summary } = questionResult;

    if (question.type === 'multiple-choice' || question.type === 'yes-no') {
      const data = Object.entries(summary.optionCounts || {}).map(([option, count]) => ({
        name: option,
        value: count,
        percentage: totalResponses > 0 ? ((count as number) / totalResponses * 100).toFixed(1) : '0',
      }));

      return (
        <div key={question.id} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {index + 1}. {question.title}
          </h3>
          
          {data.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value, 'Responses']} />
                    <Bar dataKey="value" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No responses yet</p>
          )}

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {data.map((item, idx) => (
              <div key={idx} className="text-center p-3 bg-gray-50 rounded">
                <div className="text-2xl font-bold text-gray-900">{item.value}</div>
                <div className="text-sm text-gray-600">{item.name}</div>
                <div className="text-xs text-gray-500">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (question.type === 'rating') {
      const { average, distribution } = summary;
      const data = Object.entries(distribution || {}).map(([rating, count]) => ({
        name: `${rating} Star${rating !== '1' ? 's' : ''}`,
        value: count,
        rating: parseInt(rating),
      })).sort((a, b) => a.rating - b.rating);

      return (
        <div key={question.id} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {index + 1}. {question.title}
          </h3>
          
          <div className="mb-6 text-center">
            <div className="inline-flex items-center space-x-2 bg-yellow-50 px-4 py-2 rounded-lg">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-xl font-bold text-gray-900">
                {average?.toFixed(1) || '0.0'}
              </span>
              <span className="text-gray-600">/ 5.0</span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Average Rating</p>
          </div>

          {data.length > 0 ? (
            <div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [value, 'Responses']} />
                  <Bar dataKey="value" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>

              <div className="mt-4 grid grid-cols-5 gap-2">
                {data.map((item, idx) => (
                  <div key={idx} className="text-center p-2 bg-gray-50 rounded">
                    <div className="text-lg font-bold text-gray-900">{item.value}</div>
                    <div className="text-xs text-gray-600">{item.rating}★</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No responses yet</p>
          )}
        </div>
      );
    }

    if (question.type === 'text') {
      const { textResponses } = summary;

      return (
        <div key={question.id} className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {index + 1}. {question.title}
          </h3>
          
          <div className="mb-4 flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">
              {textResponses?.length || 0} text responses
            </span>
          </div>

          {textResponses && textResponses.length > 0 ? (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {textResponses.map((response, idx) => (
                <div key={idx} className="bg-gray-50 p-3 rounded border-l-4 border-blue-400">
                  <p className="text-gray-800">{response}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No responses yet</p>
          )}
        </div>
      );
    }

    return null;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">{survey.title}</h1>
          {survey.description && (
            <p className="text-gray-600 mt-2">{survey.description}</p>
          )}
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-3">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalResponses}</div>
              <div className="text-sm text-gray-600">Total Responses</div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-3">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{survey.questions.length}</div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-3">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {survey.isPublished ? 'Published' : 'Draft'}
              </div>
              <div className="text-sm text-gray-600">Status</div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {totalResponses === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Responses Yet</h3>
          <p className="text-gray-600 mb-6">
            This survey hasn't received any responses yet. Share it with others to start collecting data!
          </p>
          {survey.isPublished && (
            <button
              onClick={() => navigate(`/surveys/${survey.id}`)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Take Survey
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {survey.questions.map((question, index) => 
            renderQuestionResult(questionResults[question.id], index)
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => navigate('/')}
          className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Back to Home
        </button>
        {survey.isPublished && (
          <button
            onClick={() => navigate(`/surveys/${survey.id}`)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Take Survey
          </button>
        )}
      </div>
    </div>
  );
};

export default SurveyResults;