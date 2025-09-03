import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import ErrorRectifier from './components/ErrorRectifier'
import SourceCode from './components/SourceCode'
import WelcomePage from './pages/WelcomePage'
import LandingPage from './pages/LandingPage'
import { ChatProvider } from './context/ChatContext.jsx'

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Home route as a layout for nested routes, wrapped with ProtectedRoute and ChatProvider */}
        <Route path="/home" element={
          <ProtectedRoute> {/* Protect the home route and its children */}
            <ChatProvider> {/* Provide chat context to Home and its children */}
              <Home />
            </ChatProvider>
          </ProtectedRoute>
        }>
          {/* Default content for Home (e.g., Welcome section) - relative path */}
          <Route index element={<WelcomePage />} /> {/* Renders at /home */}

          {/* Routes for specific features - relative paths under /home */}
          <Route path="error-rectifier" element={<ErrorRectifier />} /> {/* Renders at /home/error-rectifier */}
          <Route path="source-code" element={<SourceCode />} />       {/* Renders at /home/source-code */}

          {/* Add relative paths for history routes here when you create components for them */}
          {/* <Route path="error-rectifier/history" element={<ErrorRectifierHistory />} /> */}
          {/* <Route path="source-code/history" element={<SourceCodeHistory />} /> */}

        </Route>

        {/* Redirect root path to /home */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Redirect any other unmatched path to /home */}
        <Route path="*" element={<Navigate to="/home" replace />} />

      </Routes>
    </Router>
  )
}

export default App;