import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  GraduationCap, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Target,
  Lightbulb,
  RotateCcw,
  Download
} from 'lucide-react';

const ResultDisplay = ({ result, onReset }) => {
  const [expandedSections, setExpandedSections] = useState({
    analysis: true,
    plan: true,
    activities: true,
    outcomes: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(result, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `learning_plan_${result.studentId || 'student'}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto space-y-6"
    >
      {/* Header with student info and next stage */}
      <motion.div variants={cardVariants} className="card card-hover">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center space-x-4 mb-4 lg:mb-0">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Student #{result.studentId || 'N/A'}
              </h2>
              <p className="text-gray-600">
                Current: {result.current_class} • {result.current_level} • {result.current_stage}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="badge badge-info mb-2">
                <GraduationCap className="w-4 h-4 mr-1" />
                {result.current_class}
              </div>
              <p className="text-sm text-gray-600">Current Stage</p>
            </div>
            
            <ArrowRight className="w-6 h-6 text-gray-400" />
            
            <div className="text-center">
              <div className="badge badge-success mb-2">
                <Target className="w-4 h-4 mr-1" />
                {result.next_class}
              </div>
              <p className="text-sm text-gray-600">Next Stage</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Analysis Section */}
      <motion.div variants={cardVariants} className="card card-hover">
        <button
          onClick={() => toggleSection('analysis')}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">📊 Performance Analysis</h3>
          </div>
          {expandedSections.analysis ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.analysis && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              <p className="text-gray-700 leading-relaxed">{result.analysis}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Plan Description */}
      <motion.div variants={cardVariants} className="card card-hover">
        <button
          onClick={() => toggleSection('plan')}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Target className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">🎯 Learning Plan</h3>
          </div>
          {expandedSections.plan ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.plan && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              <p className="text-gray-700 leading-relaxed">{result.plan_description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Suggested Activities */}
      <motion.div variants={cardVariants} className="card card-hover">
        <button
          onClick={() => toggleSection('activities')}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">💡 Suggested Activities</h3>
          </div>
          {expandedSections.activities ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.activities && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              <div className="space-y-3">
                {result.suggested_activities?.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{activity}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Required Outcomes Not Fulfilled */}
      <motion.div variants={cardVariants} className="card card-hover">
        <button
          onClick={() => toggleSection('outcomes')}
          className="w-full flex items-center justify-between text-left"
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">⚠️ Areas for Improvement</h3>
          </div>
          {expandedSections.outcomes ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.outcomes && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 pt-4 border-t border-gray-100"
            >
              <div className="space-y-3">
                {result.required_outcomes_not_fulfilled?.map((outcome, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200"
                  >
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">{outcome}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Action Buttons */}
      <motion.div variants={cardVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="btn-secondary flex items-center justify-center space-x-2"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Generate New Plan</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadJSON}
          className="btn-primary flex items-center justify-center space-x-2"
        >
          <Download className="w-5 h-5" />
          <span>Download Plan</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default ResultDisplay;
