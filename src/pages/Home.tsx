import React from 'react';
import { Link } from 'react-router-dom';
import { useSurvey } from '../context/SurveyContext';
import { BarChart3, FileText, Plus, Users, TrendingUp } from 'lucide-react';

const Home: React.FC = () => {
  const { surveys, responses } = useSurvey();
  
  const publishedSurveys = surveys.filter(survey => survey.isPublished);
  const totalResponses = responses.length;

  const stats = [
    {
      name: 'Total Surveys',
      value: surveys.length,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      name: 'Published Surveys',
      value: publishedSurveys.length,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      name: 'Total Responses',
      value: totalResponses,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg text-white p-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to SurveyHub
          </h1>
          <p className="text-xl text-blue-100 mb-6">
            Create engaging surveys, collect responses, and analyze results with beautiful visualizations.
            Get insights from your audience in minutes.
          </p>
          <div className="flex space-x-4">
            <Link
              to="/create"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Survey
            </Link>
            <Link
              to="/my-surveys"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors inline-flex items-center"
            >
              <FileText className="h-5 w-5 mr-2" />
              My Surveys
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Surveys */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Available Surveys</h2>
          <p className="text-sm text-gray-600">Take surveys created by the community</p>
        </div>
        <div className="p-6">
          {publishedSurveys.length === 0 ? (
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No surveys available</h3>
              <p className="text-gray-600 mb-4">Be the first to create a survey and share it with others!</p>
              <Link
                to="/create"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create First Survey
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {publishedSurveys.map((survey) => {
                const surveyResponses = responses.filter(r => r.surveyId === survey.id);
                return (
                  <div key={survey.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <h3 className="font-semibold text-gray-900 mb-2">{survey.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{survey.description}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>{survey.questions.length} questions</span>
                      <span>{surveyResponses.length} responses</span>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        to={`/surveys/${survey.id}`}
                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-center text-sm font-medium hover:bg-blue-700 transition-colors"
                      >
                        Take Survey
                      </Link>
                      <Link
                        to={`/results/${survey.id}`}
                        className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded text-center text-sm font-medium hover:bg-gray-200 transition-colors"
                      >
                        View Results
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;