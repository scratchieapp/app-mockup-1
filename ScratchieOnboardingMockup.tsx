import React, { useState } from 'react';
import { ChevronLeft, Award, Users, HardHat, Camera, CheckCircle, Menu, ToggleLeft, ToggleRight } from 'lucide-react';

const ScratchieOnboarding = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [userGoal, setUserGoal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSector, setSector] = useState(null);
  const [userMode, setUserMode] = useState('worker');
  const [searchTerm, setSearchTerm] = useState('');

  const primaryCategories = [
    { id: 'construction', label: 'Construction & Infrastructure', icon: '🏗️' },
    { id: 'manufacturing', label: 'Manufacturing & Industrial', icon: '🏭' },
    { id: 'healthcare', label: 'Healthcare & Services', icon: '🏥' },
    { id: 'resources', label: 'Resources & Energy', icon: '⚡' },
    { id: 'transport', label: 'Transportation & Logistics', icon: '🚚' },
    { id: 'other', label: 'Other Industries', icon: '🏢' }
  ];

  const sectorsByCategory = {
    construction: [
      'Commercial Construction',
      'Residential Building',
      'Civil & Infrastructure',
      'Specialist Trades',
      'Mining Construction',
      'Demolition'
    ],
    manufacturing: [
      'Food & Beverage',
      'Automotive',
      'Electronics',
      'Pharmaceuticals',
      'Textiles',
      'Chemicals'
    ],
    healthcare: [
      'Hospitals',
      'Aged Care',
      'Medical Practices',
      'Dental Services',
      'Allied Health',
      'Pathology'
    ],
    resources: [
      'Mining',
      'Oil & Gas',
      'Renewable Energy',
      'Utilities',
      'Waste Management',
      'Water Treatment'
    ],
    transport: [
      'Road Transport',
      'Rail',
      'Aviation',
      'Maritime',
      'Warehousing',
      'Courier Services'
    ],
    other: [
      'Quick Service Restaurants',
      'Retail',
      'Agriculture',
      'Education',
      'Government',
      'Professional Services'
    ]
  };

  const handleGoalSelect = (goal) => {
    setUserGoal(goal);
    if (goal === 'both') {
      setUserMode('worker'); // Default to worker view
    } else {
      setUserMode(goal);
    }
    setCurrentScreen('sector-category');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentScreen('sector-specific');
  };

  const handleSectorSelect = (sector) => {
    setSector(sector);
    if (userGoal === 'manager') {
      setCurrentScreen('manager-dashboard');
    } else {
      setCurrentScreen('worker-dashboard');
    }
  };

  const handleBack = () => {
    if (currentScreen === 'goal') setCurrentScreen('welcome');
    else if (currentScreen === 'sector-category') setCurrentScreen('goal');
    else if (currentScreen === 'sector-specific') setCurrentScreen('sector-category');
  };

  const toggleMode = () => {
    setUserMode(userMode === 'worker' ? 'manager' : 'worker');
    setCurrentScreen(userMode === 'worker' ? 'manager-dashboard' : 'worker-dashboard');
  };

  const renderMobileFrame = (children) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <div className="w-full max-w-md">
        <div className="bg-black rounded-3xl p-2 shadow-2xl">
          <div className="bg-white rounded-3xl overflow-hidden" style={{ height: '812px' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );

  if (currentScreen === 'welcome') {
    return renderMobileFrame(
      <div className="flex flex-col h-full bg-gradient-to-b from-orange-400 to-orange-500">
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-white">
          <div className="mb-8">
            <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <HardHat className="w-14 h-14 text-orange-500" />
            </div>
            <h1 className="text-4xl font-bold text-center mb-2">Scratchie</h1>
            <p className="text-xl text-center opacity-90">Reward safe work.</p>
            <p className="text-xl text-center opacity-90">Get noticed.</p>
          </div>
          
          <button
            onClick={() => setCurrentScreen('goal')}
            className="w-full bg-white text-orange-500 py-4 px-8 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          >
            Get Started
          </button>
          
          <button className="mt-6 text-white/80 underline text-sm">
            I'll explore on my own
          </button>
        </div>
        <div className="flex justify-center pb-8">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'goal') {
    return renderMobileFrame(
      <div className="flex flex-col h-full bg-white">
        <div className="p-4 border-b">
          <button onClick={handleBack} className="p-2">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 px-6 py-8">
          <h2 className="text-2xl font-bold mb-2">What would you like to do today?</h2>
          <p className="text-gray-600 mb-8">Choose your primary focus. You can always switch later.</p>
          
          <div className="space-y-4">
            <button
              onClick={() => handleGoalSelect('manager')}
              className="w-full p-6 bg-blue-50 border-2 border-blue-200 rounded-2xl hover:border-blue-400 transition-all text-left group"
            >
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-xl group-hover:bg-blue-200 transition-all">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-lg mb-1">Run safety rewards and review team work</h3>
                  <p className="text-sm text-gray-600">For managers and supervisors</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => handleGoalSelect('worker')}
              className="w-full p-6 bg-green-50 border-2 border-green-200 rounded-2xl hover:border-green-400 transition-all text-left group"
            >
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-xl group-hover:bg-green-200 transition-all">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-lg mb-1">Share my safety wins and get recognised</h3>
                  <p className="text-sm text-gray-600">For workers and team members</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => handleGoalSelect('both')}
              className="w-full p-6 bg-purple-50 border-2 border-purple-200 rounded-2xl hover:border-purple-400 transition-all text-left group"
            >
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-xl group-hover:bg-purple-200 transition-all">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold text-lg mb-1">Both - I wear multiple hats</h3>
                  <p className="text-sm text-gray-600">Switch between modes anytime</p>
                </div>
              </div>
            </button>
          </div>
        </div>
        
        <div className="flex justify-center pb-8">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'sector-category') {
    return renderMobileFrame(
      <div className="flex flex-col h-full bg-white">
        <div className="p-4 border-b">
          <button onClick={handleBack} className="p-2">
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 px-6 py-6 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-2">What industry are you in?</h2>
          <p className="text-gray-600 mb-6">This helps us customise your experience</p>
          
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search for your industry..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-orange-400 focus:outline-none"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {primaryCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className="p-6 bg-gray-50 border-2 border-gray-200 rounded-2xl hover:border-orange-400 transition-all"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <p className="text-sm font-medium text-gray-800">{category.label}</p>
              </button>
            ))}
          </div>
          
          <button className="w-full text-gray-500 underline text-sm mb-4">
            Tell me later
          </button>
        </div>
        
        <div className="flex justify-center pb-8">
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'sector-specific') {
    return renderMobileFrame(
      <div className="flex flex-col h-full bg-white">
        <div className="p-4 border-b flex items-center">
          <button onClick={handleBack} className="p-2">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="ml-2 text-sm text-gray-600">
            {primaryCategories.find(c => c.id === selectedCategory)?.label}
          </span>
        </div>
        
        <div className="flex-1 px-6 py-6">
          <h2 className="text-2xl font-bold mb-2">Select your specific sector</h2>
          <p className="text-gray-600 mb-6">Choose the one that best describes your work</p>
          
          <div className="space-y-3">
            {sectorsByCategory[selectedCategory]?.map((sector) => (
              <button
                key={sector}
                onClick={() => handleSectorSelect(sector)}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl hover:border-orange-400 hover:bg-orange-50 transition-all text-left"
              >
                <span className="font-medium">{sector}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'manager-dashboard') {
    return renderMobileFrame(
      <div className="flex flex-col h-full bg-gray-50">
        <div className="bg-blue-600 text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <Menu className="w-6 h-6" />
            {userGoal === 'both' && (
              <button onClick={toggleMode} className="flex items-center bg-blue-700 px-3 py-1 rounded-full">
                <span className="text-xs mr-2">Manager Mode</span>
                <ToggleRight className="w-5 h-5" />
              </button>
            )}
          </div>
          <h1 className="text-2xl font-bold mb-1">Welcome, Manager!</h1>
          <p className="opacity-90">{selectedSector || 'Your Industry'}</p>
        </div>
        
        <div className="flex-1 p-6">
          <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Scratchie Awards Game</h2>
              <Award className="w-6 h-6 text-yellow-500" />
            </div>
            <p className="text-gray-600 mb-4">Run instant rewards for safe behaviour</p>
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">
              Set Up First Award
            </button>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Convo Cards to Review</h2>
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-3 flex items-center justify-center">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 mb-3">No cards to review yet</p>
              <p className="text-sm text-gray-400 mb-4">Your team will share their safety wins here</p>
              <button className="bg-blue-100 text-blue-600 px-6 py-2 rounded-full font-medium">
                Invite Team
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentScreen === 'worker-dashboard') {
    return renderMobileFrame(
      <div className="flex flex-col h-full bg-gray-50">
        <div className="bg-green-600 text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <Menu className="w-6 h-6" />
            {userGoal === 'both' && (
              <button onClick={toggleMode} className="flex items-center bg-green-700 px-3 py-1 rounded-full">
                <span className="text-xs mr-2">Worker Mode</span>
                <ToggleLeft className="w-5 h-5" />
              </button>
            )}
          </div>
          <h1 className="text-2xl font-bold mb-1">G'day!</h1>
          <p className="opacity-90">{selectedSector || 'Your Industry'}</p>
        </div>
        
        <div className="flex-1 p-6">
          <div className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Create a Convo Card</h2>
            <p className="text-gray-600 mb-6">Share your safety win or report a hazard</p>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
                <span className="text-2xl mb-2 block">⚠️</span>
                <span className="text-sm">Report Hazard</span>
              </button>
              <button className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <span className="text-2xl mb-2 block">✨</span>
                <span className="text-sm">Great Work</span>
              </button>
              <button className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <span className="text-2xl mb-2 block">📝</span>
                <span className="text-sm">Toolbox Talk</span>
              </button>
              <button className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
                <span className="text-2xl mb-2 block">💬</span>
                <span className="text-sm">Custom</span>
              </button>
            </div>
            
            <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center">
              <Camera className="w-5 h-5 mr-2" />
              Take Photo & Create Card
            </button>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Your Points</h3>
              <span className="text-2xl font-bold text-green-600">0</span>
            </div>
            <p className="text-sm text-gray-500">Create cards to earn points!</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ScratchieOnboarding;