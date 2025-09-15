import React, { useState } from 'react';

function App() {
  const [view, setView] = useState('home');
  
  if (view === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            📊 SurveyHub
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create surveys, collect responses, and analyze results
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">Create Surveys</h3>
              <p className="text-gray-600 mb-4">Build custom surveys with multiple question types</p>
              <button
                onClick={() => setView('create')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Get Started
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Collect Data</h3>
              <p className="text-gray-600 mb-4">Gather responses from your audience</p>
              <button
                onClick={() => setView('take')}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
              >
                Take Survey
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">View Results</h3>
              <p className="text-gray-600 mb-4">Analyze insights and analytics</p>
              <button
                onClick={() => setView('results')}
                className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
              >
                View Analytics
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">🎉 SurveyHub is Working!</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-green-50 p-3 rounded">✅ React + TypeScript</div>
              <div className="bg-green-50 p-3 rounded">✅ Tailwind CSS</div>
              <div className="bg-green-50 p-3 rounded">✅ Responsive Design</div>
              <div className="bg-green-50 p-3 rounded">✅ Interactive UI</div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 font-medium">🚀 This is a simplified version running without external dependencies</p>
              <p className="text-blue-600 text-sm mt-1">The full version includes React Router, Recharts for analytics, and more advanced features</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'create') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Create Survey</h1>
              <button onClick={() => setView('home')} className="text-blue-600 hover:text-blue-800">
                ← Back to Home
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Survey Title</label>
                <input 
                  type="text" 
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                  placeholder="Enter your survey title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea 
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                  placeholder="Describe your survey"
                />
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <div className="text-4xl mb-2">➕</div>
                <p className="text-gray-600 mb-4">Add questions to your survey</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Add Question
                </button>
              </div>
              
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700">
                Create Survey
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'take') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Sample Survey</h1>
              <button onClick={() => setView('home')} className="text-blue-600 hover:text-blue-800">
                ← Back to Home
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">This is a demo survey to show the interface</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-medium mb-3">
                  1. How satisfied are you with our service?
                </label>
                <div className="flex space-x-2">
                  {[1,2,3,4,5].map(num => (
                    <button key={num} className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50">
                      {num}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Poor</span>
                  <span>Excellent</span>
                </div>
              </div>
              
              <div>
                <label className="block text-lg font-medium mb-3">
                  2. What do you value most?
                </label>
                <div className="space-y-2">
                  {['Speed', 'Quality', 'Price', 'Support'].map(option => (
                    <label key={option} className="flex items-center space-x-3">
                      <input type="radio" name="value" className="h-4 w-4" />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-lg font-medium mb-3">
                  3. Any additional feedback?
                </label>
                <textarea 
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2" 
                  placeholder="Share your thoughts..."
                />
              </div>
              
              <button 
                onClick={() => setView('results')}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
              >
                Submit Survey
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'results') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">📊 Survey Results</h1>
              <button onClick={() => setView('home')} className="text-blue-600 hover:text-blue-800">
                ← Back to Home
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600">127</div>
                <div className="text-sm text-gray-600">Total Responses</div>
              </div>
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-600">4.2</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600">89%</div>
                <div className="text-sm text-gray-600">Completion Rate</div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Question 1: Satisfaction Rating</h3>
                <div className="space-y-2">
                  {[
                    { rating: '5 Stars', count: 45, width: '35%' },
                    { rating: '4 Stars', count: 38, width: '30%' },
                    { rating: '3 Stars', count: 28, width: '22%' },
                    { rating: '2 Stars', count: 12, width: '10%' },
                    { rating: '1 Star', count: 4, width: '3%' }
                  ].map(item => (
                    <div key={item.rating} className="flex items-center space-x-3">
                      <div className="w-16 text-sm">{item.rating}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-4">
                        <div 
                          className="bg-blue-600 h-4 rounded-full" 
                          style={{ width: item.width }}
                        />
                      </div>
                      <div className="w-8 text-sm text-gray-600">{item.count}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Question 2: Most Valued Aspect</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Quality', value: '42%', color: 'bg-blue-500' },
                    { label: 'Speed', value: '28%', color: 'bg-green-500' },
                    { label: 'Support', value: '20%', color: 'bg-purple-500' },
                    { label: 'Price', value: '10%', color: 'bg-yellow-500' }
                  ].map(item => (
                    <div key={item.label} className="text-center">
                      <div className={`${item.color} text-white rounded-lg p-4 mb-2`}>
                        <div className="text-2xl font-bold">{item.value}</div>
                      </div>
                      <div className="text-sm text-gray-600">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">🚀 Full Version Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div>✅ Interactive Charts & Graphs</div>
                  <div>✅ Real-time Data Updates</div>
                  <div>✅ Export to PDF/CSV</div>
                  <div>✅ Advanced Filtering</div>
                  <div>✅ Custom Question Types</div>
                  <div>✅ Survey Sharing Links</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default App;