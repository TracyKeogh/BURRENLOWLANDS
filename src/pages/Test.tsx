import React from 'react';

const Test: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🎉 SurveyHub is Working!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your survey application has loaded successfully.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="text-3xl mb-2">📝</div>
            <h3 className="font-semibold text-gray-900">Create Surveys</h3>
            <p className="text-sm text-gray-600">Build custom surveys with multiple question types</p>
          </div>
          
          <div className="bg-green-50 p-6 rounded-lg">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold text-gray-900">Collect Responses</h3>
            <p className="text-sm text-gray-600">Gather feedback from your audience</p>
          </div>
          
          <div className="bg-purple-50 p-6 rounded-lg">
            <div className="text-3xl mb-2">📈</div>
            <h3 className="font-semibold text-gray-900">View Analytics</h3>
            <p className="text-sm text-gray-600">Analyze results with interactive charts</p>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-lg">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibent text-gray-900">Manage Surveys</h3>
            <p className="text-sm text-gray-600">Organize and publish your surveys</p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-500">
          <p>✅ React 18 + TypeScript</p>
          <p>✅ Tailwind CSS Styling</p>
          <p>✅ React Router Navigation</p>
          <p>✅ Recharts Visualizations</p>
          <p>✅ LocalStorage Persistence</p>
        </div>
      </div>
    </div>
  );
};

export default Test;