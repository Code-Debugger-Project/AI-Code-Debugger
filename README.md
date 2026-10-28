# CodeDebugger

CodeDebugger is an AI-powered coding assistant that helps developers debug errors, analyze source code, and improve application quality through a clean web dashboard. The project combines a React frontend, a Node.js backend, Firebase authentication, and OpenAI-powered chat responses to create a practical developer workflow for everyday coding support.

## Demo Video

You can watch the project walkthrough here:

- [Watch the project walkthrough video](https://lnkd.in/p/dK2sCZUG)

If you want the video to play directly inside the README on GitHub, use a direct video file URL and embed it with HTML, for example:

```html
<p align="center">
  <video width="960" height="540" controls>
    <source src="https://your-direct-video-url.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</p>
```

> Note: GitHub does not play shortened links like `lnkd.in` directly inside Markdown. For inline playback, use a direct `.mp4` URL or upload the video to GitHub/Google Drive and use that direct file link.

## Project Overview

CodeDebugger is designed to help software developers in real time by providing:

- AI-based error detection and debugging guidance
- Source code analysis and explanations
- Chat-based assistant experience for coding support
- Secure user authentication using Firebase
- A modern dashboard interface with easy navigation

The app is split into two main parts:

- Frontend: React + Vite
- Backend: Express server that communicates with the OpenAI API

## Features

### 1. Error Rectifier
- Submit code errors, stack traces, and bug descriptions
- Get AI-powered explanations and possible fixes
- Receive clean, structured suggestions for debugging
- Copy generated solutions and code snippets with one click

### 2. Source Code Analysis
- Paste or describe source code for understanding and review
- Receive explanations of logic, flow, and implementation
- Get suggestions for improvements and best practices
- Review generated results in an interactive chat-style panel

### 3. User Authentication
- Email/password signup and login
- Google authentication support
- Protected routes to keep dashboard access secure
- Personalized user experience with Firebase auth state

### 4. AI Chat Interface
- Chat-based interaction for debugging and code analysis
- Separate modes for different use cases:
  - Error Rectifier
  - Source Code
- Contextual AI system messages based on selected feature mode

### 5. Dashboard Experience
- Sidebar navigation for fast switching between features
- New chat flows for each mode
- Clean developer-focused UI with responsive styling
- Welcome and landing pages for onboarding

### 6. Copy and Productivity Tools
- Copy full AI responses
- Copy code blocks directly from generated output
- Smooth scrolling and chat history management for better workflow

## Key Highlights

- Full-stack AI assistant for software debugging
- Built with modern frontend and backend tools
- Firebase-powered authentication and account management
- OpenAI integration for intelligent responses
- User-friendly UI focused on productivity and clarity
- Easy to extend with more AI-powered developer workflows in the future

## Tech Stack

### Frontend
- React
- Vite
- React Router DOM
- Firebase Authentication
- CSS Modules / Custom CSS

### Backend
- Node.js
- Express.js
- OpenAI API
- CORS
- dotenv

### Additional Tools
- GitHub for version control
- npm for dependency management
- REST API communication between frontend and backend

## Repository Structure

```bash
Code-Debugger/
├── Backend/
│   ├── controllers/
│   ├── .gitignore
│   ├── package.json
│   ├── server.js
│   └── package-lock.json
├── Frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   ├── eslint.config.js
│   └── README.md
├── .gitattributes
└── README.md
```

## How It Works

1. A user signs in or registers using Firebase authentication.
2. The user navigates to the dashboard and chooses a mode:
   - Error Rectifier
   - Source Code Analysis
3. The frontend sends a prompt to the backend API.
4. The backend uses the OpenAI API with a mode-specific system prompt.
5. The AI response is returned to the frontend and displayed in a chat interface.
6. The user can copy answers or code blocks for immediate use.

## Setup Instructions

### Prerequisites

- Node.js 18 or later
- npm
- Firebase project credentials
- OpenAI API key

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend`:

```env
OPENAI_API_KEY=your_openai_api_key
PORT=5001
```

Then start the backend:

```bash
npm start
```

### Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

Ensure the frontend is configured to communicate with the backend at:

```js
http://localhost:5001/api
```

## Environment Notes

The frontend service file calls the backend API at:

```js
const API_URL = 'http://localhost:5001/api';
```

The backend exposes:

- POST /api/chat
- GET /api/test

## Use Cases

- Debugging application runtime errors
- Understanding unfamiliar codebases
- Getting AI explanations for bug fixes
- Learning from AI-generated code suggestions
- Accelerating development workflows with a focused assistant

## Future Enhancements

- Save chat history in a database
- Add project-based AI debugging sessions
- Support code file uploads
- Add multi-language code analysis
- Improve conversation memory and context retention

## License

This project is open to use by anyone for learning, modification, and development purposes. There are no restrictions on using this project.

## Author

- Project Owner: MUNDRU SAI SRIJA
- GitHub: @Srija0770
- Role: Project Owner and Developer

## Summary

CodeDebugger is a practical AI-assisted debugging and code analysis platform that blends modern frontend design with intelligent backend processing. It is suitable for developers who want quick answers, structured debugging help, and improved productivity in everyday software development.
