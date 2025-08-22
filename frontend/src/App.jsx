import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import InputForm from './components/InputForm'
import LoadingScreen from './components/LoadingScreen'
import ResultDisplay from './components/ResultDisplay'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async (studentData) => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await fetch('http://127.0.0.1:8000/generate_plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: studentData }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate plan')
      }
      
      const data = await response.json()
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setResult(null)
    setError(null)
  }

  return (
    <div className="min-h-screen gradient-bg relative overflow-x-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 shadow-2xl">
            <span className="text-4xl">🎓</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            FLN Assessment
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Plan Generator
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            Transform student assessment data into personalized learning plans with AI-powered insights
          </p>
          
          {/* Stats */}
          <div className="flex justify-center mt-8 space-x-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">📊</div>
              <div className="text-white/80 text-sm">Assessment Data</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">🤖</div>
              <div className="text-white/80 text-sm">AI Analysis</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">📈</div>
              <div className="text-white/80 text-sm">Learning Plan</div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!result && !isLoading && (
            <motion.div
              key="input"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
            >
              <InputForm onSubmit={handleSubmit} />
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoadingScreen />
            </motion.div>
          )}

          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
            >
              <ResultDisplay result={result} onReset={handleReset} />
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-red-50/10 backdrop-blur-lg border border-red-200/30 rounded-2xl p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white text-xl">⚠️</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-red-300">Connection Error</h3>
                    <p className="text-red-200">Unable to connect to the backend service</p>
                  </div>
                </div>
                <p className="text-red-200 mb-6">
                  <strong>Error:</strong> {error}
                </p>
                <div className="space-y-3">
                  <p className="text-white/80 text-sm">
                    Please ensure that:
                  </p>
                  <ul className="text-white/70 text-sm space-y-1 ml-4">
                    <li>• Your FastAPI backend is running on <code className="bg-white/10 px-2 py-1 rounded">http://127.0.0.1:8000</code></li>
                    <li>• The <code className="bg-white/10 px-2 py-1 rounded">/generate_plan</code> endpoint is available</li>
                    <li>• CORS is properly configured for cross-origin requests</li>
                  </ul>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReset}
                  className="mt-6 btn-secondary"
                >
                  Try Again
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center mt-16 pt-8 border-t border-white/10"
        >
          <p className="text-white/60 text-sm">
            Built with ❤️ for FLN Assessment and Learning Planning
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default App
