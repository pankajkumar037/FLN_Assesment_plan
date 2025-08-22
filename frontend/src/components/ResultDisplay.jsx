import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Target, 
  BookOpen, 
  CheckCircle, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp,
  Download,
  RefreshCw,
  Star,
  TrendingUp,
  Award,
  BarChart3,
  Book,
  Calculator
} from 'lucide-react'

const ResultDisplay = ({ result, onReset }) => {
  const [expandedSections, setExpandedSections] = useState({
    analysis: true,
    plan: true,
    activities: true,
    outcomes: true
  })

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const getStatusColor = (score) => {
    if (score >= 3) return 'bg-green-100 text-green-800 border-green-200'
    if (score >= 2) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    return 'bg-red-100 text-red-800 border-red-200'
  }

  const getScoreLevel = (score) => {
    if (score >= 3) return 'Advanced'
    if (score >= 2) return 'Intermediate'
    return 'Foundation'
  }

  const getScoreColor = (score) => {
    if (score >= 3) return 'text-green-400'
    if (score >= 2) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getNextStageColor = (stage) => {
    const colors = {
      'Foundation': 'bg-gradient-to-r from-blue-500 to-blue-600',
      'Intermediate': 'bg-gradient-to-r from-yellow-500 to-orange-500',
      'Advanced': 'bg-gradient-to-r from-green-500 to-emerald-600',
      'Expert': 'bg-gradient-to-r from-purple-500 to-indigo-600'
    }
    return colors[stage] || 'bg-gradient-to-r from-gray-500 to-gray-600'
  }

  // Extract data from the result
  const studentId = result.studentId || result.student_id || 'N/A'
  const roName = result.roName || 'N/A'
  const overallScore = result.Overall || 0
  const englishScore = result.English || 0
  const hindiScore = result.Hindi || 0
  const numeracyScore = result.Numeracy || 0
  
  // Extract backend response fields
  const currentClass = result.current_class || 'N/A'
  const currentLevel = result.current_level || 'N/A'
  const currentStage = result.current_stage || 'N/A'
  const nextLevel = result.next_level || 'N/A'
  const nextStage = result.next_stage || 'N/A'
  const analysis = result.analysis || ''
  const planDescription = result.plan_description || ''
  const suggestedActivities = result.suggested_activities || []
  const requiredOutcomes = result.required_outcomes_not_fulfilled || []

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <User className="w-10 h-10 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">
                Student ID: {studentId}
              </h2>
              <p className="text-white/80 text-lg">Regional Office: {roName}</p>
              <p className="text-white/60 text-sm">Current: {currentClass} - {currentLevel} - {currentStage}</p>
            </div>
          </div>
          <div className="text-right">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(overallScore)}`}>
              <Target className="w-4 h-4 mr-2" />
              {getScoreLevel(overallScore)} Level
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-3">
              <TrendingUp className="w-6 h-6 text-blue-400" />
              <span className="text-white/80 font-medium">Current Stage</span>
            </div>
            <span className="text-2xl font-bold text-white">
              {currentLevel} - {currentStage}
            </span>
            <p className="text-white/60 text-sm mt-1">{currentClass}</p>
          </div>
          
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-3">
              <Book className="w-6 h-6 text-green-400" />
              <span className="text-white/80 font-medium">Next Stage</span>
            </div>
            <span className="text-2xl font-bold text-white">
              {nextLevel} - {nextStage}
            </span>
            <p className="text-white/60 text-sm mt-1">Target Level</p>
          </div>
          
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-3">
              <BookOpen className="w-6 h-6 text-yellow-400" />
              <span className="text-white/80 font-medium">Current Class</span>
            </div>
            <span className="text-3xl font-bold text-white">
              {currentClass}
            </span>
            <p className="text-white/60 text-sm mt-1">Student's Current Class</p>
          </div>
          
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-3">
              <Calculator className="w-6 h-6 text-purple-400" />
              <span className="text-white/80 font-medium">Status</span>
            </div>
            <span className="text-2xl font-bold text-white">
              {result.status || 'Active'}
            </span>
            <p className="text-white/60 text-sm mt-1">Plan Generated</p>
          </div>
        </div>
      </motion.div>

      {/* Analysis Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden shadow-xl"
      >
        <button
          onClick={() => toggleSection('analysis')}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-6 h-6 text-blue-400" />
            <h3 className="text-xl font-semibold text-white">📊 Performance Analysis</h3>
          </div>
          {expandedSections.analysis ? (
            <ChevronUp className="w-5 h-5 text-white/60" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/60" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.analysis && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-6 pb-6"
            >
              <div className="prose prose-invert max-w-none">
                <p className="text-white/90 leading-relaxed">
                  {analysis || `Student ${studentId} from ${roName} shows ${getScoreLevel(overallScore).toLowerCase()} level performance with an overall score of ${overallScore.toFixed(1)}. 
                  English proficiency is at ${getScoreLevel(englishScore).toLowerCase()} level (${englishScore.toFixed(1)}), 
                  Hindi at ${getScoreLevel(hindiScore).toLowerCase()} level (${hindiScore.toFixed(1)}), 
                  and Numeracy at ${getScoreLevel(numeracyScore).toLowerCase()} level (${numeracyScore.toFixed(1)}).`}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Learning Plan Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden shadow-xl"
      >
        <button
          onClick={() => toggleSection('plan')}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-semibold text-white">🎯 Learning Plan</h3>
          </div>
          {expandedSections.plan ? (
            <ChevronUp className="w-5 h-5 text-white/60" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/60" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.plan && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-6 pb-6"
            >
              <div className="prose prose-invert max-w-none">
                <p className="text-white/90 leading-relaxed">
                  {planDescription || `Based on the assessment results, a personalized learning plan has been developed focusing on improving areas where the student scored below the target level. 
                  The plan includes targeted interventions for ${englishScore < 3 ? 'English' : ''} ${hindiScore < 3 ? 'Hindi' : ''} ${numeracyScore < 3 ? 'Numeracy' : ''} 
                  to help achieve the next proficiency level.`}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Suggested Activities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden shadow-xl"
      >
        <button
          onClick={() => toggleSection('activities')}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-semibold text-white">✅ Suggested Activities</h3>
          </div>
          {expandedSections.activities ? (
            <ChevronUp className="w-5 h-5 text-white/60" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/60" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.activities && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-6 pb-6"
            >
              <div className="space-y-3">
                {suggestedActivities.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3 p-4 bg-white/5 rounded-lg border border-white/10"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-white/90">{activity}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Required Outcomes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden shadow-xl"
      >
        <button
          onClick={() => toggleSection('outcomes')}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h3 className="text-xl font-semibold text-white">⚠️ Focus Areas</h3>
          </div>
          {expandedSections.outcomes ? (
            <ChevronUp className="w-5 h-5 text-white/60" />
          ) : (
            <ChevronDown className="w-5 h-5 text-white/60" />
          )}
        </button>
        
        <AnimatePresence>
          {expandedSections.outcomes && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-6 pb-6"
            >
              <div className="flex flex-wrap gap-3">
                {requiredOutcomes.map((outcome, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-800 border border-red-200 shadow-sm"
                  >
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    {outcome}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn-primary flex items-center justify-center space-x-2 px-8 py-4"
        >
          <Download className="w-5 h-5" />
          <span>Download Report</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onReset}
          className="btn-secondary flex items-center justify-center space-x-2 px-8 py-4"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Generate New Plan</span>
        </motion.button>
      </motion.div>
    </div>
  )
}

export default ResultDisplay
