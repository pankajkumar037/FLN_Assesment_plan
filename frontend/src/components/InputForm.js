import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Send, AlertCircle, CheckCircle } from 'lucide-react';

const InputForm = ({ onSubmit, error }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [isValidJson, setIsValidJson] = useState(true);

  const validateJson = (input) => {
    if (!input.trim()) return false;
    try {
      JSON.parse(input);
      return true;
    } catch {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setJsonInput(value);
    setIsValidJson(validateJson(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValidJson) return;

    try {
      const studentData = JSON.parse(jsonInput);
      onSubmit(studentData);
    } catch (err) {
      console.error('Error parsing JSON:', err);
    }
  };

  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData('text');
    setJsonInput(pastedText);
    setIsValidJson(validateJson(pastedText));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      <div className="card card-hover">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            📊 Student Assessment Data
          </h2>
          <p className="text-gray-600">
            Paste your student's assessment JSON data below to generate a personalized learning plan
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Student Data (JSON Format)
            </label>
            <div className="relative">
              <textarea
                value={jsonInput}
                onChange={handleInputChange}
                onPaste={handlePaste}
                placeholder={`Paste your student data here...
Example:
{
  "roName": "AGRA",
  "studentId": 1000001608,
  "IOX1": 4.0,
  "ENGLISH": 3.0,
  "HINDI": 3.0,
  "NUMERACY": 3.0,
  "OVERALL": 3.0
}`}
                className={`w-full h-64 p-4 border-2 rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${
                  jsonInput && !isValidJson
                    ? 'border-red-300 focus:ring-red-500'
                    : jsonInput && isValidJson
                    ? 'border-green-300 focus:ring-green-500'
                    : 'border-gray-300'
                }`}
              />
              
              {/* Validation indicator */}
              {jsonInput && (
                <div className="absolute top-4 right-4">
                  {isValidJson ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              )}
            </div>
            
            {jsonInput && !isValidJson && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-red-600 flex items-center"
              >
                <AlertCircle className="w-4 h-4 mr-1" />
                Invalid JSON format. Please check your input.
              </motion.p>
            )}
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4"
            >
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700 font-medium">Error:</span>
              </div>
              <p className="text-red-600 mt-1">{error}</p>
            </motion.div>
          )}

          <div className="flex justify-center">
            <motion.button
              type="submit"
              disabled={!isValidJson || !jsonInput.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`btn-primary flex items-center space-x-2 ${
                (!isValidJson || !jsonInput.trim()) && 'opacity-50 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
              <span>Generate Learning Plan</span>
            </motion.button>
          </div>
        </form>

        {/* Quick tips */}
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">💡 Quick Tips:</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Copy and paste your student assessment data directly</li>
            <li>• Make sure the JSON is properly formatted</li>
            <li>• The system will automatically validate your input</li>
            <li>• Click "Generate Learning Plan" to get personalized recommendations</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default InputForm;
