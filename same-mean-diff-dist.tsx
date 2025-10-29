//interactive example on descriptive analytics generated with Claude.ai

import React, { useState } from 'react';
import { BarChart3, AlertCircle, TrendingUp } from 'lucide-react';

const SameMeanDifferentDistributions = () => {
  const [showStats, setShowStats] = useState(true);
  const [showInterpretation, setShowInterpretation] = useState(false);

  // Dataset 1: Normal distribution around 75
  const dataset1 = [
    { range: '0-20', count: 0, midpoint: 10 },
    { range: '21-40', count: 1, midpoint: 30.5 },
    { range: '41-60', count: 8, midpoint: 50.5 },
    { range: '61-80', count: 42, midpoint: 70.5 },
    { range: '81-100', count: 9, midpoint: 90.5 }
  ];

  // Dataset 2: Bimodal distribution (also mean ~75)
  const dataset2 = [
    { range: '0-20', count: 0, midpoint: 10 },
    { range: '21-40', count: 15, midpoint: 30.5 },
    { range: '41-60', count: 5, midpoint: 50.5 },
    { range: '61-80', count: 5, midpoint: 70.5 },
    { range: '81-100', count: 35, midpoint: 90.5 }
  ];

  // Dataset 3: Right-skewed distribution
  const dataset3 = [
    { range: '0-20', count: 2, midpoint: 10 },
    { range: '21-40', count: 3, midpoint: 30.5 },
    { range: '41-60', count: 8, midpoint: 50.5 },
    { range: '61-80', count: 20, midpoint: 70.5 },
    { range: '81-100', count: 27, midpoint: 90.5 }
  ];

  const [selectedDataset, setSelectedDataset] = useState('dataset1');

  const datasets = {
    dataset1: {
      name: 'Class A: Normal Distribution',
      data: dataset1,
      mean: 75,
      median: 75,
      mode: '61-80',
      sd: 12,
      description: 'Most students clustered around average',
      color: 'bg-blue-500',
      interpretation: 'Students performing similarly. Standard teaching approach working for most. Few outliers.',
      recommendation: 'Continue current approach. Minimal differentiation needed.'
    },
    dataset2: {
      name: 'Class B: Bimodal Distribution',
      data: dataset2,
      mean: 75,
      median: 77,
      mode: '81-100 & 21-40',
      sd: 28,
      description: 'Two distinct groups of students',
      color: 'bg-green-500',
      interpretation: 'Clear split: strong performers and struggling students. Few in middle. May indicate prerequisite gaps or two teaching approaches.',
      recommendation: 'Investigate what separates groups. Consider differentiated instruction or support for lower group.'
    },
    dataset3: {
      name: 'Class C: Right-Skewed',
      data: dataset3,
      mean: 75,
      median: 78,
      mode: '81-100',
      sd: 18,
      description: 'Most students doing well, some struggling',
      color: 'bg-purple-500',
      interpretation: 'Bulk of students succeeding, but tail of low performers. Assessment may be too easy for most, or specific students facing challenges.',
      recommendation: 'Focus intervention on low tail. Consider if assessment ceiling is too low for high performers.'
    }
  };

  const current = datasets[selectedDataset];
  const maxCount = Math.max(...current.data.map(d => d.count));

  const calculatePercentage = (count) => {
    const total = current.data.reduce((sum, d) => sum + d.count, 0);
    return ((count / total) * 100).toFixed(1);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center gap-3 mb-3">
          <BarChart3 className="w-8 h-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-800">
            Same Mean, Different Distributions
          </h1>
        </div>
        <p className="text-gray-600 mb-4">
          Three classes with identical mean scores (75%) but completely different learning patterns. 
          This demonstrates why averages alone are insufficient for understanding student performance.
        </p>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-yellow-900 font-semibold">Key Question:</p>
              <p className="text-yellow-800 text-sm">
                If you only knew the average score was 75%, which class would you rather teach? 
                Click through each distribution to see why the answer isn't simple.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Selection */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Select a Class to Analyze:</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(datasets).map(([key, dataset]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedDataset(key);
                setShowInterpretation(false);
              }}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedDataset === key
                  ? 'border-purple-500 bg-purple-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-400 bg-white'
              }`}
            >
              <h3 className="font-bold text-gray-800 mb-2">{dataset.name}</h3>
              <p className="text-sm text-gray-600">{dataset.description}</p>
              <p className="text-lg font-bold text-purple-600 mt-2">Mean: {dataset.mean}%</p>
            </button>
          ))}
        </div>
      </div>

      {/* Main Visualization */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{current.name}</h2>
          <button
            onClick={() => setShowStats(!showStats)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            {showStats ? 'Hide' : 'Show'} Statistics
          </button>
        </div>

        {/* Histogram */}
        <div className="mb-6">
          <div className="h-80 border-l-2 border-b-2 border-gray-300 relative pl-8 pb-8">
            <div className="absolute left-0 top-0 bottom-8 w-6 flex flex-col justify-between text-xs text-gray-600">
              <span>{maxCount}</span>
              <span>{Math.floor(maxCount * 0.75)}</span>
              <span>{Math.floor(maxCount * 0.5)}</span>
              <span>{Math.floor(maxCount * 0.25)}</span>
              <span>0</span>
            </div>
            <div className="absolute left-6 top-0 bottom-0 text-xs text-gray-600 flex items-center">
              <span className="transform -rotate-90 whitespace-nowrap">Number of Students</span>
            </div>
            <div className="flex items-end justify-around h-full gap-1">
              {current.data.map((item, index) => {
                const heightPercent = maxCount > 0 ? (item.count / maxCount) * 100 : 0;
                return (
                  <div key={index} className="flex flex-col items-center flex-1 h-full justify-end">
                    <div 
                      className={`w-full ${current.color} rounded-t transition-all duration-500 hover:opacity-80 relative group flex items-end justify-center pb-2`}
                      style={{ height: `${heightPercent}%`, minHeight: item.count > 0 ? '20px' : '0' }}
                    >
                      {item.count > 0 && (
                        <>
                          <span className="text-white font-bold text-sm">{item.count}</span>
                          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                            {calculatePercentage(item.count)}% of students
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-around mt-2 pl-8">
            {current.data.map((item, index) => (
              <div key={index} className="flex-1 text-center">
                <p className="text-xs font-semibold text-gray-700">{item.range}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600 font-semibold">Score Range (%)</p>
          </div>
        </div>

        {/* Statistics Panel */}
        {showStats && (
          <div className="border-t-2 border-gray-200 pt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Descriptive Statistics</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600 font-semibold">Mean</p>
                <p className="text-2xl font-bold text-blue-900">{current.mean}%</p>
                <p className="text-xs text-blue-700 mt-1">Average score</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-600 font-semibold">Median</p>
                <p className="text-2xl font-bold text-green-900">{current.median}%</p>
                <p className="text-xs text-green-700 mt-1">Middle value</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-600 font-semibold">Mode</p>
                <p className="text-lg font-bold text-purple-900">{current.mode}</p>
                <p className="text-xs text-purple-700 mt-1">Most common</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <p className="text-sm text-orange-600 font-semibold">Std Dev</p>
                <p className="text-2xl font-bold text-orange-900">{current.sd}</p>
                <p className="text-xs text-orange-700 mt-1">Variability</p>
              </div>
            </div>
          </div>
        )}

        {/* Show Interpretation Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setShowInterpretation(!showInterpretation)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg"
          >
            {showInterpretation ? 'Hide' : 'Show'} Educational Interpretation
          </button>
        </div>
      </div>

      {/* Interpretation Panel */}
      {showInterpretation && (
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">What Does This Distribution Tell Us?</h3>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="font-semibold text-blue-900 mb-2">Interpretation:</p>
              <p className="text-blue-800">{current.interpretation}</p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
              <p className="font-semibold text-green-900 mb-2">Recommended Action:</p>
              <p className="text-green-800">{current.recommendation}</p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
              <p className="font-semibold text-yellow-900 mb-2">Why This Matters:</p>
              <p className="text-yellow-800">
                If you only looked at the mean (75%), you'd think all three classes are the same. 
                But the distribution reveals completely different learning situations requiring 
                completely different instructional responses.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Key Takeaways */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-6 text-white">
        <h3 className="text-2xl font-bold mb-4">Key Takeaways</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-white text-purple-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">
              1
            </div>
            <p>
              <strong>Averages can be misleading.</strong> The mean score of 75% appears identical 
              across all three classes, but they represent completely different learning situations.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-white text-purple-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">
              2
            </div>
            <p>
              <strong>Distribution shape matters.</strong> Normal, bimodal, and skewed distributions 
              require different instructional approaches and interventions.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-white text-purple-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">
              3
            </div>
            <p>
              <strong>Variability reveals important patterns.</strong> Standard deviation (12 vs. 28 vs. 18) 
              tells you how spread out students are, which impacts teaching strategy.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-white text-purple-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold">
              4
            </div>
            <p>
              <strong>Always visualize your data.</strong> A histogram or similar visualization reveals 
              patterns that summary statistics alone cannot show.
            </p>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-white/30">
          <p className="text-center italic text-lg">
            "Never trust a statistic you didn't visualize yourself." 
            <br/>
            <span className="text-sm">— Adapted from Churchill</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SameMeanDifferentDistributions;