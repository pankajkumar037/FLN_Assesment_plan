# FLN Assessment Dashboard Frontend

A modern, beautiful React frontend for the FLN Assessment & Learning Plan Generator API.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with TailwindCSS
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Real-time Validation**: JSON input validation with visual feedback
- **Engaging Loading**: Fun animated loading screen with progress indicators
- **Beautiful Results**: Organized display of learning plans with collapsible sections
- **Download Functionality**: Export learning plans as JSON files
- **Mobile Responsive**: Works perfectly on all device sizes

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TailwindCSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons
- **Fetch API** - For API communication

## 📦 Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🔧 Prerequisites

Make sure your FastAPI backend is running at `http://127.0.0.1:8000` before using the frontend.

## 📱 Usage

1. **Paste Student Data**: Copy and paste your student assessment JSON data into the text area
2. **Validate Input**: The system automatically validates JSON format
3. **Generate Plan**: Click "Generate Learning Plan" to send data to the backend
4. **View Results**: Explore the beautiful, organized learning plan results
5. **Download**: Save the plan as a JSON file for future reference

## 🎨 UI Components

### InputForm
- JSON textarea with real-time validation
- Visual feedback for valid/invalid input
- Paste functionality with automatic validation
- Helpful tips and examples

### LoadingScreen
- Animated progress bar
- Step-by-step process indicators
- Engaging animations and transitions
- Fun loading messages

### ResultDisplay
- Student information header with current/next stage
- Collapsible sections for analysis, plan, activities, and outcomes
- Color-coded badges and icons
- Download functionality
- Responsive design for all screen sizes

## 🎯 API Integration

The frontend communicates with your FastAPI backend at:
- **Endpoint**: `http://127.0.0.1:8000/generate_plan`
- **Method**: POST
- **Content-Type**: application/json
- **Body**: `{ "data": studentData }`

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── InputForm.js
│   │   ├── LoadingScreen.js
│   │   └── ResultDisplay.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## 🎨 Customization

### Colors
The app uses a custom color palette defined in `tailwind.config.js`:
- Primary: Blue gradient
- Success: Green
- Warning: Yellow
- Danger: Red

### Animations
Custom animations are defined in the Tailwind config:
- `fade-in`: Smooth opacity transitions
- `slide-up`: Upward slide animations
- `typing`: Typewriter effect
- `blink`: Cursor blink animation

## 🚀 Deployment

To build for production:

```bash
npm run build
```

This creates an optimized build in the `build/` directory ready for deployment.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the FLN Assessment system.

---

**Happy Learning Plan Generation! 🎓✨**
