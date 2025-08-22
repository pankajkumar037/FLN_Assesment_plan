import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { FileText, Send, Sparkles, BarChart3, Upload, FileJson } from 'lucide-react'

const InputForm = ({ onSubmit }) => {
  const [jsonInput, setJsonInput] = useState('')
  const [isValid, setIsValid] = useState(true)
  const [validationMessage, setValidationMessage] = useState('')
  const [hasInteracted, setHasInteracted] = useState(false)
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef(null)

  const validateJSON = (input) => {
    if (!input.trim()) {
      setValidationMessage('')
      return false
    }
    try {
      const parsed = JSON.parse(input)
      
      // Check for required fields
      const requiredFields = ['studentId', 'roName', 'Overall']
      const missingFields = requiredFields.filter(field => !(field in parsed))
      
      if (missingFields.length > 0) {
        setValidationMessage(`Missing required fields: ${missingFields.join(', ')}`)
        return false
      }
      
      setValidationMessage('✅ Valid student data format')
      return true
    } catch (error) {
      setValidationMessage('❌ Invalid JSON format')
      return false
    }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setJsonInput(value)
    
    // Only validate if user has interacted (clicked load sample or manually typed)
    if (hasInteracted) {
      setIsValid(validateJSON(value))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isValid && jsonInput.trim()) {
      try {
        const parsedData = JSON.parse(jsonInput)
        onSubmit(parsedData)
      } catch (error) {
        setIsValid(false)
        setValidationMessage('❌ Invalid JSON format')
      }
    }
  }

  const handlePaste = (e) => {
    const pastedText = e.clipboardData.getData('text')
    setJsonInput(pastedText)
    // Don't validate on paste - wait for user interaction
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = (event) => {
        try {
          const content = event.target.result
          setJsonInput(content)
          setHasInteracted(true)
          setIsValid(validateJSON(content))
        } catch (error) {
          setValidationMessage('❌ Error reading file')
          setIsValid(false)
        }
      }
      reader.readAsText(file)
    }
  }

  const loadSampleData = () => {
    const sampleData = {
      "roName": "AGRA",
      "id": 11420.0,
      "studentId": 1000002009.0,
      "roID": 101.0,
      "kvID": 1704.0,
      "IOE1": 2.0,
      "IOE2": 2.0,
      "IWE1": 2.0,
      "IWE2": 2.0,
      "IWE3": 2.0,
      "IWE4": 2.0,
      "IRE1": 2.0,
      "IRE2": 2.0,
      "IRE3": 2.0,
      "IRE4": 2.0,
      "English": 2.0,
      "IHOE1": 2.0,
      "IHOE2": 2.0,
      "IHRE1": 2.0,
      "IHRE2": 2.0,
      "IHRE3": 2.0,
      "IHRE4": 2.0,
      "IHWE1": 2.0,
      "IHWE2": 2.0,
      "IHWE3": 2.0,
      "IHWE4": 2.0,
      "Hindi": 2.0,
      "INE1": 2.0,
      "INE2": 2.0,
      "INE3": 2.0,
      "INE4": 2.0,
      "INE5": 2.0,
      "INE6": 2.0,
      "INE7": 2.0,
      "Numeracy": 2.0,
      "Overall": 2.0
    }
    setJsonInput(JSON.stringify(sampleData, null, 2))
    setHasInteracted(true)
    setIsValid(true)
    setValidationMessage('✅ Sample data loaded')
    setFileName('')
  }

  const handleManualValidation = () => {
    setHasInteracted(true)
    setIsValid(validateJSON(jsonInput))
  }

  const clearData = () => {
    setJsonInput('')
    setHasInteracted(false)
    setIsValid(true)
    setValidationMessage('')
    setFileName('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto"
    >
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-3">
            📊 Student Assessment Data
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Upload JSON file or paste your student assessment data below to generate a personalized FLN learning plan
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* File Upload Section */}
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-white font-semibold text-lg mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Upload JSON File
            </h3>
            <div className="flex items-center space-x-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <FileJson className="w-4 h-4" />
                <span>Choose JSON File</span>
              </label>
              {fileName && (
                <span className="text-white/80 text-sm">
                  📄 {fileName}
                </span>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="block text-white font-semibold text-lg">
                Student Assessment Data (JSON Format)
              </label>
              <div className="flex space-x-2">
                <motion.button
                  type="button"
                  onClick={loadSampleData}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Load Sample Data
                </motion.button>
                <motion.button
                  type="button"
                  onClick={clearData}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                >
                  Clear
                </motion.button>
                {jsonInput.trim() && !hasInteracted && (
                  <motion.button
                    type="button"
                    onClick={handleManualValidation}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Validate JSON
                  </motion.button>
                )}
              </div>
            </div>
            
            <div className="relative">
              <textarea
                value={jsonInput}
                onChange={handleInputChange}
                onPaste={handlePaste}
                placeholder={`{
  "roName": "AGRA",
  "studentId": 1000002009.0,
  "Overall": 2.0,
  "English": 2.0,
  "Hindi": 2.0,
  "Numeracy": 2.0,
  ...
}`}
                className={`w-full h-80 p-6 rounded-xl border-2 transition-all duration-300 resize-none font-mono text-sm leading-relaxed ${
                  hasInteracted && isValid 
                    ? 'border-green-400 bg-green-50/5 text-green-100' 
                    : hasInteracted && !isValid
                    ? 'border-red-400 bg-red-50/5 text-red-100'
                    : 'border-gray-400 bg-white/5 text-white'
                } focus:outline-none focus:ring-4 focus:ring-blue-500/30 backdrop-blur-sm`}
              />
              
              {/* Validation Indicator */}
              <div className="absolute top-4 right-4">
                {hasInteracted && isValid && jsonInput.trim() && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white text-sm">✓</span>
                  </motion.div>
                )}
                {hasInteracted && !isValid && jsonInput.trim() && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white text-sm">✗</span>
                  </motion.div>
                )}
              </div>
            </div>
            
            {/* Validation Message */}
            {validationMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-3 p-3 rounded-lg text-sm font-medium ${
                  isValid 
                    ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-300 border border-red-500/30'
                }`}
              >
                {validationMessage}
              </motion.div>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={!isValid || !jsonInput.trim() || !hasInteracted}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-4 px-8 rounded-xl font-semibold text-lg flex items-center justify-center space-x-3 transition-all duration-300 ${
              isValid && jsonInput.trim() && hasInteracted
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                : 'bg-gray-600 text-gray-300 cursor-not-allowed opacity-50'
            }`}
          >
            <Sparkles className="w-6 h-6" />
            <span>Generate FLN Learning Plan</span>
            <Send className="w-6 h-6" />
          </motion.button>
        </form>

        <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">💡</span>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-2">Data Format Requirements:</h4>
              <ul className="text-white/80 text-sm space-y-1">
                <li>• <strong>studentId</strong>: Unique student identifier</li>
                <li>• <strong>roName</strong>: Regional office name</li>
                <li>• <strong>Overall</strong>: Overall assessment score</li>
                <li>• <strong>English, Hindi, Numeracy</strong>: Subject-wise scores</li>
                <li>• Individual assessment components (IOE1, IWE1, etc.)</li>
                <li>• You can upload a JSON file or paste the data directly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default InputForm
