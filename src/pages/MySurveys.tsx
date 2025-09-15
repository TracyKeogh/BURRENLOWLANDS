import React from 'react';
import { Link } from 'react-router-dom';
import { useSurvey } from '../context/SurveyContext';
import { Plus, Eye, BarChart3, Trash2, Edit, Users, Globe, Lock } from 'lucide-react';

const MySurveys: React.FC = () => {
  const { surveys, responses, deleteSurvey, updateSurvey } = useSurvey();

  const togglePublishStatus = (surveyId: string, currentStatus: boolean) => {
    updateSurvey(surveyId, { isPublished: !currentStatus });
  };

  const handleDeleteSurvey = (surveyId: string, surveyTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${surveyTitle}"? This action cannot be undone.`)) {
      deleteSurvey(surveyId);
    }
  };

  const getSurveyResponseCount = (surveyId: string) => {
    return responses.filter(r => r.surveyId === surveyId).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Surveys</h1>
          <p className="text-gray-600 mt-1">Manage your surveys and view their performance</p>
        </div>
        <Link
          to="/create"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Create New Survey
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Surveys</p>
              <p className="text-2xl font-semibold text-gray-900">{surveys.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Globe className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-semibold text-gray-900">
                {surveys.filter(s => s.isPublished).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Lock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-semibold text-gray-900">
                {surveys.filter(s => !s.isPublished).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Responses</p>
              <p className="text-2xl font-semibold text-gray-900">{responses.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Surveys List */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Your Surveys</h2>
        </div>

        {surveys.length === 0 ? (
          <div className="p-12 text-center">
            <BarChart3 className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No surveys yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first survey to start collecting responses from your audience.
            </p>
            <Link
              to="/create"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Your First Survey
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {surveys.map((survey) => {
              const responseCount = getSurveyResponseCount(survey.id);
              return (
                <div key={survey.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{survey.title}</h3>
                        <div className="flex items-center space-x-2">
                          {survey.isPublished ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Globe className="h-3 w-3 mr-1" />
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                              <Lock className="h-3 w-3 mr-1" />
                              Draft
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {survey.description && (
                        <p className="text-gray-600 mb-3 line-clamp-2">{survey.description}</p>
                      )}
                      
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <span>{survey.questions.length} questions</span>
                        <span>{responseCount} responses</span>
                        <span>Created {survey.createdAt.toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-6">
                      {survey.isPublished && (
                        <Link
                          to={`/surveys/${survey.id}`}
                          className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                          title="Take Survey"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>
                      )}
                      
                      <Link
                        to={`/results/${survey.id}`}
                        className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                        title="View Results"
                      >
                        <BarChart3 className="h-5 w-5" />
                      </Link>

                      <button
                        onClick={() => togglePublishStatus(survey.id, survey.isPublished)}
                        className={`p-2 rounded-lg transition-colors ${
                          survey.isPublished
                            ? 'text-gray-400 hover:text-yellow-600 hover:bg-yellow-50'
                            : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                        }`}
                        title={survey.isPublished ? 'Unpublish' : 'Publish'}
                      >
                        {survey.isPublished ? <Lock className="h-5 w-5" /> : <Globe className="h-5 w-5" />}
                      </button>

                      <button
                        onClick={() => handleDeleteSurvey(survey.id, survey.title)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        title="Delete Survey"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-semibold text-gray-900">{survey.questions.length}</div>
                      <div className="text-xs text-gray-600">Questions</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-semibold text-gray-900">{responseCount}</div>
                      <div className="text-xs text-gray-600">Responses</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-semibold text-gray-900">
                        {survey.questions.filter(q => q.required).length}
                      </div>
                      <div className="text-xs text-gray-600">Required</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-lg font-semibold text-gray-900">
                        {responseCount > 0 ? ((responseCount / (survey.isPublished ? 1 : 1)) * 100).toFixed(0) : 0}%
                      </div>
                      <div className="text-xs text-gray-600">Engagement</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MySurveys;