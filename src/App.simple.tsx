import React, { useState } from 'react';

interface SurveyResponse {
  businessType: string;
  location: string;
  businessStatus: string;
  challenges: string[];
  supports: string[];
  futureNeeds: string;
  contactInfo: string;
  participateInWorkshop: boolean;
  scheduleInterview: boolean;
}

function App() {
  const [view, setView] = useState('home');
  const [surveyResponse, setSurveyResponse] = useState<Partial<SurveyResponse>>({});
  const [completedSurveys, setCompletedSurveys] = useState(127); // Mock data
  
  if (view === 'home') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              🏔️ Burren Lowlands Business Research
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Action Research for Economic Development
            </p>
            <p className="text-lg text-gray-500">
              Led by Tracy Keogh, Spremt Labs | In partnership with local communities
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Help Shape the Future of Business in the Burren Lowlands
            </h2>
            <p className="text-gray-600 mb-6 max-w-3xl mx-auto">
              We're conducting action research to understand the lived experiences of businesses in our region. 
              Your voice matters - whether you're a current business owner, former entrepreneur, or aspiring to start something new.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">{completedSurveys}</div>
                <div className="text-sm text-gray-600">Responses Collected</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">€100</div>
                <div className="text-sm text-gray-600">Prize Draw</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">10 min</div>
                <div className="text-sm text-gray-600">Survey Length</div>
              </div>
            </div>
            
            <button
              onClick={() => setView('survey')}
              className="bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-800 text-lg font-semibold mb-4"
            >
              📝 Take the Survey - Enter €100 Draw
            </button>
            
            <p className="text-sm text-gray-500">
              Survey closes March 31st, 2024. All responses are confidential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">📞 Book a 1-on-1 Interview</h3>
              <p className="text-gray-600 mb-4">
                Want to share more detailed insights? Book a confidential phone call with Tracy Keogh.
              </p>
              <button 
                onClick={() => window.open('mailto:tracykeogh0@gmail.com?subject=Burren Lowlands Interview Request', '_blank')}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
              >
                Schedule Interview
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">🏛️ View Live Results</h3>
              <p className="text-gray-600 mb-4">
                See how responses are evolving in real-time. Transparent, community-driven research.
              </p>
              <button
                onClick={() => setView('results')}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
              >
                View Dashboard
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6">About This Research</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3 text-gray-900">Our Approach</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✅ Action research methodology</li>
                  <li>✅ Community-participatory design</li>
                  <li>✅ Evidence-based strategy development</li>
                  <li>✅ Transparent, open process</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-gray-900">Target Areas</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>🏘️ Gort, Kinvara, Loughrea</li>
                  <li>🏘️ Ennistymon, Lisdoonvarna</li>
                  <li>🏘️ Crusheen & surrounding areas</li>
                  <li>🌐 Online participants welcome</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-gray-900 font-medium">💡 Our Promise</p>
              <p className="text-gray-700 text-sm mt-1">We exist to solve problems and will proceed until solutions are found. This research directly informs economic development strategy.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'survey') {
    const updateResponse = (field: keyof SurveyResponse, value: any) => {
      setSurveyResponse(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
      // In real app, would send to backend
      console.log('Survey submitted:', surveyResponse);
      setCompletedSurveys(prev => prev + 1);
      setView('thankyou');
    };

    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">Burren Lowlands Business Research Survey</h1>
                <p className="text-sm text-gray-600">Led by Tracy Keogh, Spremt Labs • Estimated time: 10 minutes</p>
              </div>
              <button onClick={() => setView('home')} className="text-blue-600 hover:text-blue-800">
                ← Back
              </button>
            </div>
            
            <div className="space-y-8">
              {/* Business Status */}
              <div>
                <label className="block text-lg font-semibold mb-3">
                  1. What best describes your relationship to business in the Burren Lowlands?
                </label>
                <div className="space-y-2">
                  {[
                    'Current business owner',
                    'Former business owner (closed within last 5 years)',
                    'Aspiring entrepreneur (considering starting)',
                    'Community leader/volunteer',
                    'Local resident interested in economic development',
                    'Other'
                  ].map(option => (
                    <label key={option} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="businessStatus"
                        value={option}
                        onChange={(e) => updateResponse('businessStatus', e.target.value)}
                        className="h-4 w-4"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-lg font-semibold mb-3">
                  2. Which area are you primarily connected to?
                </label>
                <select
                  onChange={(e) => updateResponse('location', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="">Select your area</option>
                  <option value="Gort">Gort</option>
                  <option value="Kinvara">Kinvara</option>
                  <option value="Loughrea">Loughrea</option>
                  <option value="Ennistymon">Ennistymon</option>
                  <option value="Lisdoonvarna">Lisdoonvarna</option>
                  <option value="Crusheen">Crusheen</option>
                  <option value="Other Burren Lowlands">Other Burren Lowlands area</option>
                  <option value="Online/Remote">Online participant</option>
                </select>
              </div>

              {/* Business Type */}
              <div>
                <label className="block text-lg font-semibold mb-3">
                  3. What type of business/enterprise are you involved with? (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Tourism/Hospitality',
                    'Retail/Shop',
                    'Food/Restaurant',
                    'Agriculture/Farming',
                    'Arts/Crafts',
                    'Professional Services',
                    'Technology/Online',
                    'Construction/Trades',
                    'Community Enterprise',
                    'Other'
                  ].map(type => (
                    <label key={type} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          const current = surveyResponse.businessType?.split(',') || [];
                          if (e.target.checked) {
                            current.push(type);
                          } else {
                            const index = current.indexOf(type);
                            if (index > -1) current.splice(index, 1);
                          }
                          updateResponse('businessType', current.join(','));
                        }}
                        className="h-4 w-4"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Challenges */}
              <div>
                <label className="block text-lg font-semibold mb-3">
                  4. What are the biggest challenges facing businesses in your area? (Select top 3)
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    'Access to customers/footfall',
                    'High costs (rent, utilities, etc.)',
                    'Lack of skilled workers',
                    'Limited transport/connectivity',
                    'Access to funding/investment',
                    'Planning/regulatory barriers',
                    'Competition from larger towns/online',
                    'Lack of business support/mentoring',
                    'Seasonal variations',
                    'Infrastructure limitations (broadband, parking, etc.)'
                  ].map(challenge => (
                    <label key={challenge} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          const current = surveyResponse.challenges || [];
                          if (e.target.checked && current.length < 3) {
                            current.push(challenge);
                          } else if (!e.target.checked) {
                            const index = current.indexOf(challenge);
                            if (index > -1) current.splice(index, 1);
                          }
                          updateResponse('challenges', current);
                        }}
                        className="h-4 w-4"
                      />
                      <span className="text-sm">{challenge}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Supports Needed */}
              <div>
                <label className="block text-lg font-semibold mb-3">
                  5. What supports would be most valuable for businesses in your area?
                </label>
                <textarea
                  rows={4}
                  onChange={(e) => updateResponse('futureNeeds', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Share your thoughts on what would help businesses thrive..."
                />
              </div>

              {/* Follow-up */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="font-semibold mb-4">Follow-up Opportunities</h3>
                
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      onChange={(e) => updateResponse('participateInWorkshop', e.target.checked)}
                      className="h-4 w-4"
                    />
                    <span>I'd like to participate in a local workshop (Gort, Kinvara, Loughrea, Ennistymon, Lisdoonvarna, or Crusheen)</span>
                  </label>
                  
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      onChange={(e) => updateResponse('scheduleInterview', e.target.checked)}
                      className="h-4 w-4"
                    />
                    <span>I'd be interested in a 1-on-1 phone interview with Tracy Keogh</span>
                  </label>
                </div>

                {(surveyResponse.participateInWorkshop || surveyResponse.scheduleInterview) && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-2">
                      Contact information (for follow-up only):
                    </label>
                    <input
                      type="text"
                      onChange={(e) => updateResponse('contactInfo', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="Email or phone number"
                    />
                  </div>
                )}
              </div>

              <div className="text-center">
                <button
                  onClick={handleSubmit}
                  className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 text-lg font-semibold"
                >
                  Submit Survey & Enter €100 Draw
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  All responses are confidential and will be used for research purposes only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'thankyou') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-2xl mx-auto text-center py-16">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-6xl mb-6">🎉</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You for Your Response!
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Your insights are invaluable to shaping the future of business in the Burren Lowlands.
            </p>
            
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">✅ You're entered in the €100 prize draw!</h3>
              <p className="text-gray-700 text-sm">Winner will be announced March 31st, 2024</p>
            </div>

            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                <p><strong>What happens next?</strong></p>
                <ul className="mt-2 space-y-1 text-left max-w-md mx-auto">
                  <li>• Your response joins {completedSurveys} others in our analysis</li>
                  <li>• We'll synthesize findings across surveys, interviews, and workshops</li>
                  <li>• Results will inform economic development strategy</li>
                  <li>• Community feedback loop ensures transparency</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <button
                  onClick={() => setView('results')}
                  className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800"
                >
                  View Live Results
                </button>
                <button
                  onClick={() => window.open('mailto:tracykeogh0@gmail.com?subject=Burren Lowlands Follow-up', '_blank')}
                  className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                >
                  Book Interview
                </button>
                <button
                  onClick={() => setView('home')}
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200"
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }


  if (view === 'results') {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold">📊 Burren Lowlands Business Research - Live Results</h1>
                <p className="text-sm text-gray-600">Real-time insights from our action research • Updated continuously</p>
              </div>
              <button onClick={() => setView('home')} className="text-blue-600 hover:text-blue-800">
                ← Back to Home
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{completedSurveys}</div>
                <div className="text-sm text-gray-600">Survey Responses</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">23</div>
                <div className="text-sm text-gray-600">Interviews Booked</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">6</div>
                <div className="text-sm text-gray-600">Workshops Planned</div>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">€100</div>
                <div className="text-sm text-gray-600">Prize Draw</div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Business Status Distribution</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Current business owners', count: 48, width: '40%' },
                    { label: 'Former business owners', count: 31, width: '25%' },
                    { label: 'Aspiring entrepreneurs', count: 28, width: '22%' },
                    { label: 'Community leaders', count: 12, width: '10%' },
                    { label: 'Interested residents', count: 8, width: '6%' }
                  ].map(item => (
                    <div key={item.label} className="flex items-center space-x-3">
                      <div className="w-32 text-sm">{item.label}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gray-700 h-3 rounded-full"
                          style={{ width: item.width }}
                        />
                      </div>
                      <div className="w-8 text-sm text-gray-600">{item.count}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Geographic Distribution</h3>
                <div className="space-y-3">
                  {[
                    { area: 'Gort', count: 34, width: '28%' },
                    { area: 'Kinvara', count: 29, width: '24%' },
                    { area: 'Loughrea', count: 25, width: '20%' },
                    { area: 'Ennistymon', count: 18, width: '15%' },
                    { area: 'Lisdoonvarna', count: 12, width: '10%' },
                    { area: 'Crusheen', count: 9, width: '7%' }
                  ].map(item => (
                    <div key={item.area} className="flex items-center space-x-3">
                      <div className="w-24 text-sm">{item.area}</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gray-700 h-3 rounded-full" 
                          style={{ width: item.width }}
                        />
                      </div>
                      <div className="w-8 text-sm text-gray-600">{item.count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Top Business Challenges (Most Selected)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { challenge: 'Access to customers/footfall', responses: 89, severity: 'high' },
                  { challenge: 'High costs (rent, utilities)', responses: 76, severity: 'high' },
                  { challenge: 'Limited transport/connectivity', responses: 68, severity: 'medium' },
                  { challenge: 'Seasonal variations', responses: 54, severity: 'medium' },
                  { challenge: 'Infrastructure limitations', responses: 47, severity: 'medium' },
                  { challenge: 'Access to funding/investment', responses: 43, severity: 'low' }
                ].map(item => (
                  <div key={item.challenge} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{item.challenge}</div>
                      <div className="text-xs text-gray-500">{item.responses} responses</div>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs ${
                      item.severity === 'high' ? 'bg-red-100 text-red-800' :
                      item.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.severity}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Business Types in Region</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { type: 'Tourism', count: 42 },
                  { type: 'Agriculture', count: 38 },
                  { type: 'Retail', count: 31 },
                  { type: 'Food/Restaurant', count: 28 },
                  { type: 'Professional Services', count: 24 },
                  { type: 'Arts/Crafts', count: 19 },
                  { type: 'Technology', count: 15 },
                  { type: 'Construction', count: 12 },
                  { type: 'Community Enterprise', count: 8 },
                  { type: 'Other', count: 6 }
                ].map(item => (
                  <div key={item.type} className="text-center">
                    <div className="bg-gray-700 text-white rounded-lg p-3 mb-2">
                      <div className="text-lg font-bold">{item.count}</div>
                    </div>
                    <div className="text-xs text-gray-600">{item.type}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">🎯 Action Research Process</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">📊</div>
                  <h4 className="font-semibold mb-2">Data Collection</h4>
                  <p className="text-sm text-gray-600">Surveys, interviews, and workshops gathering lived experiences</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🔍</div>
                  <h4 className="font-semibold mb-2">Analysis & Synthesis</h4>
                  <p className="text-sm text-gray-600">Identifying patterns, challenges, and opportunities</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🚀</div>
                  <h4 className="font-semibold mb-2">Strategy Development</h4>
                  <p className="text-sm text-gray-600">Co-designing solutions with the community</p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button
                  onClick={() => setView('survey')}
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 mr-4"
                >
                  Add Your Voice
                </button>
                <button
                  onClick={() => window.open('mailto:tracykeogh0@gmail.com?subject=Burren Lowlands Research Inquiry', '_blank')}
                  className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                >
                  Contact Researcher
                </button>
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