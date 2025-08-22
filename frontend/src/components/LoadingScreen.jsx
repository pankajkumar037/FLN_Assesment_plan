import { motion } from 'framer-motion'
import { Brain, BookOpen, Target, Zap } from 'lucide-react'

const LoadingScreen = () => {
  const loadingSteps = [
    { icon: Brain, text: "Analyzing student performance...", delay: 0 },
    { icon: BookOpen, text: "Reviewing learning outcomes...", delay: 0.5 },
    { icon: Target, text: "Identifying skill gaps...", delay: 1 },
    { icon: Zap, text: "Generating personalized plan...", delay: 1.5 }
  ]

  return (
    <div className="max-w-2xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20"
      >
        {/* Main Loading Animation */}
        <div className="mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 mx-auto mb-6 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-20"></div>
            <div className="absolute inset-2 bg-gradient-to-r from-blue-500 to-purple-700 rounded-full"></div>
            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white mb-4"
          >
            🚀 Generating Your Learning Plan
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 text-lg"
          >
            Our AI is analyzing the data and creating a personalized plan just for you...
          </motion.p>
        </div>

        {/* Progress Steps */}
        <div className="space-y-4">
          {loadingSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: step.delay }}
              className="flex items-center justify-center space-x-3"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity, delay: step.delay }}
                className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center"
              >
                <step.icon className="w-4 h-4 text-white" />
              </motion.div>
              <span className="text-white/90">{step.text}</span>
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: step.delay + 0.2 }}
                className="w-2 h-2 bg-green-400 rounded-full"
              />
            </motion.div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3, ease: "easeInOut" }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-white/60 text-sm mt-2"
          >
            Almost there... ✨
          </motion.p>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default LoadingScreen
