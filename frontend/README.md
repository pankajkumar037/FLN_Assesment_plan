# 🎓 FLN Assessment Plan Generator - Frontend

A modern, interactive React frontend for the FLN (Foundational Literacy and Numeracy) Assessment Plan Generator. This application provides a beautiful, user-friendly interface for generating personalized learning plans based on student data.

## ✨ Features

- **Modern UI/UX**: Clean, responsive design with TailwindCSS
- **Interactive Animations**: Smooth transitions and loading animations using Framer Motion
- **Real-time Validation**: JSON input validation with visual feedback
- **Beautiful Results Display**: Organized cards with collapsible sections
- **Mobile Responsive**: Works perfectly on all device sizes

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- FastAPI backend running on `http://127.0.0.1:8000`

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`

## 📋 Usage

### 1. Input Student Data
- Paste your student JSON data into the text area
- The application validates JSON format in real-time
- Use the sample data provided in `sample-data.json` for testing

### 2. Generate Plan
- Click the "Generate Learning Plan" button
- Watch the beautiful loading animation
- The backend will process your data and return a personalized plan

### 3. View Results
- Results are displayed in organized, collapsible cards
- Each section can be expanded/collapsed for better organization
- Download reports or generate new plans as needed

## 🎨 UI Components

### InputForm
- JSON text area with real-time validation
- Visual feedback for valid/invalid JSON
- Submit button with loading states

### LoadingScreen
- Animated loading spinner
- Progress steps with icons
- Progress bar animation
- Floating particle effects

### ResultDisplay
- Student information header card
- Collapsible sections for different result types
- Interactive checklists for activities
- Warning tags for required outcomes
- Action buttons for downloading and resetting

## 🛠️ Technology Stack

- **React 19**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Lucide React**: Beautiful icons
- **Axios**: HTTP client for API calls

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── InputForm.jsx      # JSON input form
│   │   ├── LoadingScreen.jsx  # Loading animation
│   │   └── ResultDisplay.jsx  # Results display
│   ├── App.jsx               # Main application component
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles and Tailwind
├── public/                   # Static assets
├── sample-data.json          # Sample data for testing
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
└── package.json              # Dependencies and scripts
```

## 🎯 API Integration

The frontend communicates with your FastAPI backend at:
- **Endpoint**: `http://127.0.0.1:8000/generate_plan`
- **Method**: POST
- **Content-Type**: application/json

### Expected Input Format
```json
{
  "student_id": "STU001",
  "student_name": "John Doe",
  "current_level": "Foundation",
  "marks": {
    "reading": 75,
    "writing": 68,
    "numeracy": 82
  },
  "completed_activities": ["activity1", "activity2"],
  "learning_outcomes": {
    "outcome1": true,
    "outcome2": false
  }
}
```

### Expected Response Format
```json
{
  "student_id": "STU001",
  "student_name": "John Doe",
  "current_status": "Foundation",
  "next_stage": "Intermediate",
  "progress_score": "85%",
  "recommendation": "Continue with current level",
  "analysis": "Detailed analysis...",
  "learning_plan": "Personalized plan...",
  "suggested_activities": ["Activity 1", "Activity 2"],
  "required_outcomes": ["Outcome 1", "Outcome 2"]
}
```

## 🎨 Customization

### Colors and Themes
- Modify `tailwind.config.js` to change the color scheme
- Update gradient backgrounds in `index.css`
- Customize component colors in individual files

### Animations
- Adjust animation durations in Framer Motion components
- Modify loading animations in `LoadingScreen.jsx`
- Customize transition effects throughout the app

### Styling
- Use TailwindCSS classes for rapid styling
- Add custom CSS in `index.css` using `@layer` directives
- Modify component-specific styles in individual files

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is part of the FLN Assessment Plan Generator system.

---

**Happy Learning! 🎓✨**
