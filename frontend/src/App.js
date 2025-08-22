import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InputForm from './components/InputForm';
import LoadingScreen from './components/LoadingScreen';
import ResultDisplay from './components/ResultDisplay';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (studentData) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/generate_plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: studentData }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎓 FLN Assessment Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Generate personalized learning plans for students
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" />
          ) : result ? (
            <ResultDisplay 
              key="result" 
              result={result} 
              onReset={handleReset}
            />
          ) : (
            <InputForm 
              key="input" 
              onSubmit={handleSubmit} 
              error={error}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
